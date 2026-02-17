import DebateChamber from '@/ui/DebateChamber';

export default async function Page({ params }: { params: Promise<{ runId: string }> }) {
    const { runId } = await params;
    return <DebateChamber runId={runId} />;
}
