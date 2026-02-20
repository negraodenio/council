export type PlanType = 'free' | 'pro' | 'team' | 'unlimited';

export const PLAN_LIMITS: Record<PlanType, number> = {
    free: 2,
    pro: 30,
    team: 300,
    unlimited: 999999,
};

export function getLimitForPlan(plan: string | null | undefined): number {
    const p = (plan?.toLowerCase() || 'free') as PlanType;
    return PLAN_LIMITS[p] || PLAN_LIMITS.free;
}
