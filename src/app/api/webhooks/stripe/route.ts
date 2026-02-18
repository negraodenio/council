import { NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import Stripe from 'stripe';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

    if (!stripeKey || !webhookSecret) {
        return NextResponse.json({ error: 'Stripe configuration missing' }, { status: 500 });
    }

    const stripe = new Stripe(stripeKey, { apiVersion: '2025-01-27.acacia' as any });
    const supabase = createAdminClient();
    const body = await req.text();
    const sig = req.headers.get('stripe-signature')!;

    let event: Stripe.Event;
    try {
        event = stripe.webhooks.constructEvent(body, sig, webhookSecret);
    } catch (err: any) {
        return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
    }

    switch (event.type) {
        case 'customer.subscription.created':
        case 'customer.subscription.updated': {
            const sub = event.data.object as Stripe.Subscription;

            const tenantId = sub.metadata.tenant_id;
            if (!tenantId) break;

            await supabase.from('subscriptions').upsert({
                id: sub.id,
                tenant_id: tenantId,
                stripe_customer_id: sub.customer as string,
                status: sub.status,
                plan: sub.metadata.plan || 'starter',
                current_period_start: new Date((sub as any).current_period_start * 1000).toISOString(),
                current_period_end: new Date((sub as any).current_period_end * 1000).toISOString()
            });
            break;
        }

        case 'customer.subscription.deleted': {
            const sub = event.data.object as Stripe.Subscription;
            await supabase.from('subscriptions').update({ status: 'canceled' }).eq('id', sub.id);
            break;
        }

        default:
            console.log(`Unhandled event type: ${event.type}`);
    }

    return NextResponse.json({ received: true });
}
