-- Create a trigger that creates a profile and tenant for every new user
-- Note: This assumes 'profiles' table has 'tenant_id' and 'id' as primary key

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
DECLARE
  new_tenant_id uuid;
BEGIN
  new_tenant_id := gen_random_uuid();
  
  INSERT INTO public.profiles (id, tenant_id, full_name, avatar_url)
  VALUES (
    new.id,
    new_tenant_id,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'avatar_url'
  );
  
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger the function every time a user is created
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();
