-- 1. Cria função que auto-cria profile quando user é criado
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, tenant_id, role)
  VALUES (
    NEW.id,
    NEW.email,
    gen_random_uuid(), -- cada user tem seu tenant
    'member'           -- role padrão
  );
  RETURN NEW;
EXCEPTION
  WHEN others THEN
    RAISE LOG 'Error creating profile: %', SQLERRM;
    RETURN NEW; -- não bloqueia signup se der erro
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 2. Deleta trigger antigo (se existir) e cria novo
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 3. Garante que RLS está habilitado
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- 4. Policy: SERVIÇO pode inserir profiles (via trigger)
DROP POLICY IF EXISTS "Service can insert profiles" ON public.profiles;
CREATE POLICY "Service can insert profiles"
  ON public.profiles
  FOR INSERT
  WITH CHECK (true); -- permite qualquer INSERT (trigger roda como service_role)

-- 5. Policy: usuário pode ver próprio perfil
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles
  FOR SELECT
  USING (auth.uid() = id);

-- 6. Policy: usuário pode editar próprio perfil
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
CREATE POLICY "Users can update own profile"
  ON public.profiles
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);
