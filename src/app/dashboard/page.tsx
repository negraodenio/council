import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function DashboardPage() {
    const supabase = await createClient();

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) redirect('/login');

    const { data: profile } = await supabase
        .from('profiles')
        .select('tenant_id')
        .eq('id', user.id)
        .single();

    const { data: validations } = await supabase
        .from('validations')
        .select('*')
        .eq('tenant_id', profile?.tenant_id)
        .order('created_at', { ascending: false })
        .limit(20);

    const { data: repos } = await supabase
        .from('repositories')
        .select('*')
        .eq('tenant_id', profile?.tenant_id)
        .order('created_at', { ascending: false })
        .limit(10);

    return (
        <div className="min-h-screen bg-[#0f172a] text-slate-100 p-8">
            <div className="max-w-6xl mx-auto">
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Dashboard</h1>
                    <div className="flex items-center gap-3">
                        <a
                            href="/api/audit/export"
                            download
                            className="px-4 py-2 bg-white/10 border border-white/20 rounded font-bold text-sm hover:bg-white/20"
                        >
                            Export Audit (CSV)
                        </a>
                        <Link href="/" className="px-4 py-2 bg-gradient-to-r from-purple-500 to-sky-400 rounded font-bold text-sm">
                            New Session
                        </Link>
                    </div>
                </div>

                {/* Validations */}
                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-4">Recent Validations</h2>
                    <div className="space-y-3">
                        {validations?.map((v) => (
                            <Link
                                key={v.id}
                                href={`/report/${v.id}`}
                                className="block bg-white/5 border border-white/10 p-4 rounded-lg hover:bg-white/10 transition-colors"
                            >
                                <div className="flex items-center justify-between">
                                    <div>
                                        <div className="font-mono text-sm text-slate-400">{v.id}</div>
                                        <div className="text-white mt-1">{v.idea.slice(0, 80)}...</div>
                                    </div>
                                    <div className={`px-3 py-1 rounded text-xs font-bold ${v.status === 'complete' ? 'bg-emerald-400/20 text-emerald-300' : 'bg-amber-400/20 text-amber-300'
                                        }`}>
                                        {v.status}
                                    </div>
                                </div>
                                <div className="flex gap-4 text-xs text-slate-400 mt-2">
                                    <span>Score: {v.consensus_score?.toFixed(1) || 'N/A'}</span>
                                    <span>Region: {v.region}</span>
                                    <span>{new Date(v.created_at).toLocaleDateString()}</span>
                                </div>
                            </Link>
                        ))}
                        {validations?.length === 0 && <p className="text-slate-500 text-sm">No validations found.</p>}
                    </div>
                </section>

                {/* Repos */}
                <section>
                    <h2 className="text-xl font-bold mb-4">Connected Repositories</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {repos?.map((r) => (
                            <div key={r.id} className="bg-white/5 border border-white/10 p-4 rounded-lg">
                                <div className="font-mono text-cyan-300 text-sm">{r.repo_name}</div>
                                <div className="text-xs text-slate-400 mt-1">{r.repo_url}</div>
                                <div className="text-xs text-slate-500 mt-2">Last sync: {new Date(r.created_at).toLocaleString()}</div>
                            </div>
                        ))}
                        {repos?.length === 0 && <p className="text-slate-500 text-sm">No repositories connected.</p>}
                    </div>
                </section>
            </div>
        </div>
    );
}
