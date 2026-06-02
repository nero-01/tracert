# Supabase Migrations

Database migrations for Tracert. Apply with a linked Supabase project:

```bash
pnpm dlx supabase link --project-ref YOUR_PROJECT_REF
pnpm dlx supabase db push
```

Or run the SQL files manually in the Supabase SQL editor (in order):

1. `20260601000001_core_schema.sql`
2. `20260601000002_rls.sql`
3. `20260601000003_functions.sql`
4. `20260601000004_seed_tracks.sql`

## Auth setup (Supabase dashboard)

1. Enable **Email** provider (confirm email optional for dev)
2. Enable **Google** OAuth — add redirect URL: `http://localhost:3000/callback`
3. Site URL: `http://localhost:3000`
4. Redirect URLs: `http://localhost:3000/callback`, `http://localhost:3000/**`

## Verify

After signup, confirm `profiles`, `user_streaks`, and `subscriptions` rows are created via the `handle_new_user` trigger.
