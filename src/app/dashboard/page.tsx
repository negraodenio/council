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
        <div className="min-h-screen bg-neutral-50 text-neutral-900">
            {/* Header */}
            <header className="bg-white border-b border-neutral-200">
                <div className="max-w-6xl mx-auto px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
                            <p className="text-neutral-500 text-sm mt-1">
                                Recent validations • Connected repositories
                            </p>
                        </div>
                        <div className="flex gap-3 items-center">
                            {/* Keep Export Audit if functionality exists, user had explicit button in their code */}
                            <a href="/api/audit/export" className="px-4 py-2 text-sm border border-neutral-200 rounded-md hover:border-neutral-300 transition">
                                Export CSV
                            </a>
                            <Link href="/new" className="bg-neutral-900 text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-neutral-800 transition">
                                New Session
                            </Link>
                            {/* Sign Out Logic */}
                            <form action="/api/auth/signout" method="post">
                                <button type="submit" className="p-2 hover:bg-neutral-100 rounded-md transition text-sm text-neutral-500 font-medium" title="Sign Out">
                                    Sign Out
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </header>

            <div className="max-w-6xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">

                    {/* Recent Validations */}
                    <div className="bg-white rounded-xl border border-neutral-200 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
                            <h2 className="text-lg font-semibold">Recent validations</h2>
                        </div>

                        {validations && validations.length > 0 ? (
                            <div className="space-y-3">
                                {validations.map((v) => (
                                    <Link key={v.id} href={`/report/${v.id}`} className="block border border-neutral-100 p-4 rounded-lg hover:bg-neutral-50 transition">
                                        <div className="font-medium text-neutral-900 truncate">{v.idea}</div>
                                        {/* Status Badge */}
                                        <div className="flex items-center gap-2 mt-2">
                                            <span className={`px-2 py-0.5 rounded text-xs font-medium ${v.status === 'complete' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>
                                                {v.status}
                                            </span>
                                            <span className="text-xs text-neutral-400">{new Date(v.created_at).toLocaleDateString()}</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl text-neutral-400">💭</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-neutral-900">No sessions yet</h3>
                                <p className="text-neutral-500 mb-8 max-w-sm mx-auto">
                                    Start your first validation to see the council in action.
                                    Takes 2 minutes.
                                </p>
                                <Link href="/new" className="inline-block bg-neutral-900 text-white px-6 py-3 rounded-md text-sm font-medium hover:bg-neutral-800 transition w-full sm:w-auto">
                                    Start first session
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Connected Repositories */}
                    <div className="bg-white rounded-xl border border-neutral-200 p-8">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                            <h2 className="text-lg font-semibold">Connected repositories</h2>
                        </div>

                        {repos && repos.length > 0 ? (
                            <div className="space-y-3">
                                {repos.map((r) => (
                                    <div key={r.id} className="border border-neutral-100 p-4 rounded-lg">
                                        <div className="font-mono text-sm text-neutral-900">{r.repo_name}</div>
                                        <div className="text-xs text-neutral-500 mt-1">{r.repo_url}</div>
                                        <div className="text-xs text-neutral-400 mt-2">Last sync: {new Date(r.created_at).toLocaleDateString()}</div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
                                    <span className="text-2xl text-neutral-400">📂</span>
                                </div>
                                <h3 className="text-xl font-semibold mb-2 text-neutral-900">Connect GitHub</h3>
                                <p className="text-neutral-500 mb-8 max-w-sm mx-auto">
                                    Link your repositories to validate PRs, issues, or entire
                                    codebases directly from GitHub.
                                </p>
                                <button className="border border-neutral-200 px-6 py-3 rounded-md text-sm font-medium hover:border-neutral-300 transition w-full sm:w-auto">
                                    Connect GitHub
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                {/* Quick Start Examples */}
                <div className="bg-white rounded-xl border border-neutral-200 p-8">
                    <h3 className="text-lg font-semibold mb-8">Quick start examples</h3>

                    <div className="grid md:grid-cols-3 gap-4">
                        <Link href="/new" className="block text-left group p-6 border border-neutral-200 rounded-lg hover:border-neutral-300 hover:shadow-sm transition">
                            <div className="font-mono text-sm text-neutral-500 mb-2 group-hover:text-neutral-900 transition">
                                "Is this PR production-ready?"
                            </div>
                            <div className="text-neutral-900 font-medium">Code review</div>
                        </Link>

                        <Link href="/new" className="block text-left group p-6 border border-neutral-200 rounded-lg hover:border-neutral-300 hover:shadow-sm transition">
                            <div className="font-mono text-sm text-neutral-500 mb-2 group-hover:text-neutral-900 transition">
                                "Should we enter the European market?"
                            </div>
                            <div className="text-neutral-900 font-medium">Strategy</div>
                        </Link>

                        <Link href="/new" className="block text-left group p-6 border border-neutral-200 rounded-lg hover:border-neutral-300 hover:shadow-sm transition">
                            <div className="font-mono text-sm text-neutral-500 mb-2 group-hover:text-neutral-900 transition">
                                "Are we GDPR compliant?"
                            </div>
                            <div className="text-neutral-900 font-medium">Compliance</div>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
