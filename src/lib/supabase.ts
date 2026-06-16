import { createBrowserClient } from '@supabase/ssr';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';

// Lazy singleton — only created when first accessed, avoids build-time URL validation errors
let _client: ReturnType<typeof createBrowserClient> | null = null;

export const supabase = new Proxy({} as ReturnType<typeof createBrowserClient>, {
  get(_target, prop) {
    if (!_client) {
      _client = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    }
    const val = (_client as Record<string, unknown>)[prop as string];
    return typeof val === 'function' ? val.bind(_client) : val;
  },
});
