export function getPublicEnv() {
  return {
    clerkPublishableKey: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY,
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseAnonKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
  };
}

export function hasSupabaseEnv() {
  const env = getPublicEnv();
  return Boolean(env.supabaseUrl && env.supabaseAnonKey);
}
