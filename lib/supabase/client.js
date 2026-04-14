import { createBrowserClient } from "@supabase/ssr";
import { getPublicEnv } from "@/lib/env";

export function createSupabaseBrowserClient() {
  const { supabaseUrl, supabaseAnonKey } = getPublicEnv();

  if (!supabaseUrl || !supabaseAnonKey) {
    return null;
  }

  return createBrowserClient(supabaseUrl, supabaseAnonKey);
}
