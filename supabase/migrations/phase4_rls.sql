-- Add permissive RLS policy for Phase 4 testing
create policy "Enable all for anyone" on repo_files for all using (true) with check (true);
