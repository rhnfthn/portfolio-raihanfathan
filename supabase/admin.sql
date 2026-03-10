-- Portfolio V5 - Create an admin profile row
--
-- Steps:
-- 1) Supabase Dashboard → Authentication → Users → Add User
-- 2) Copy the created user's UUID
-- 3) Replace USER_UUID below and run this script

INSERT INTO public.profiles (id, username, role)
VALUES ('USER_UUID', 'admin', 'admin');
