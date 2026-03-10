export default defineNuxtRouteMiddleware(async () => {
  const { supabase } = useSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return navigateTo("/login");

  const { data: profile } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (profile?.role !== "admin") {
    await supabase.auth.signOut();
    return navigateTo("/login");
  }
});
