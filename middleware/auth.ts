export default defineNuxtRouteMiddleware(async () => {
  const { supabase } = useSupabase();
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError) {
    // Invalid/expired refresh token can trigger repeated auth errors unless session is cleared.
    await supabase.auth.signOut();
    return navigateTo("/login");
  }

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
