'use client';

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="min-h-screen bg-[#0f172a] flex items-center justify-center p-4">
            <div className="bg-red-500/10 border border-red-500/30 rounded-xl p-8 max-w-lg">
                <h2 className="text-2xl font-bold text-red-400 mb-4">Something went wrong</h2>
                <p className="text-slate-300 mb-6">{error.message}</p>
                <button
                    onClick={reset}
                    className="bg-red-500 text-white px-6 py-3 rounded font-bold"
                >
                    Try again
                </button>
            </div>
        </div>
    );
}
