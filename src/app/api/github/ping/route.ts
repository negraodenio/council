import { NextResponse } from 'next/server';
import { gh } from '@/lib/github/client';

export async function GET() {
    if (!process.env.GITHUB_TOKEN) {
        return NextResponse.json({ ok: false, error: 'Missing GITHUB_TOKEN' }, { status: 400 });
    }
    try {
        const me = await gh('/user');
        return NextResponse.json({ ok: true, login: me.login, id: me.id });
    } catch (err: any) {
        return NextResponse.json({ ok: false, error: err.message }, { status: 500 });
    }
}
