/**
 * Supabase client intentionally disabled.
 * To re-enable:
 * 1. Install the dependency: `npm install @supabase/supabase-js`
 * 2. Restore `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
 * 3. Uncomment the createClient code below.
 */

// import { createClient } from "@supabase/supabase-js";

// export const supabase = createClient(
//   process.env.NEXT_PUBLIC_SUPABASE_URL!,
//   process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
// );

// Export a safe stub to avoid import/runtime errors if this file is imported.
export const supabase = null;
