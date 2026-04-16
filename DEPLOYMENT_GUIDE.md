# PetRating Deployment Guide

## Environment Variables Required

For the app to work in production, you need to set these environment variables in Vercel:

### NextAuth Configuration
- `NEXTAUTH_URL` - Your deployed domain (e.g., `https://your-app.vercel.app`)
- `NEXTAUTH_SECRET` - Generate with: `openssl rand -base64 32`

### Google OAuth
- `GOOGLE_CLIENT_ID` - Get from Google Cloud Console
- `GOOGLE_CLIENT_SECRET` - Get from Google Cloud Console

### Supabase
- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `NEXT_PUBLIC_SUPABASE_ANON_KEY` - Your Supabase anon key

## Setting Up Google OAuth

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing one
3. Go to "APIs & Services" > "Credentials"
4. Create OAuth 2.0 credentials:
   - Application type: Web application
   - Authorized redirect URIs:
     - `https://your-app.vercel.app/api/auth/callback/google`
     - `http://localhost:3000/api/auth/callback/google` (for local dev)
5. Copy Client ID and Client Secret

## Setting Up Environment Variables in Vercel

1. Go to your Vercel project dashboard
2. Go to Settings > Environment Variables
3. Add each variable from the list above
4. Redeploy the project

## Fixing Login 404 Error

If you're getting a 404 error on login:

1. **Check environment variables are set** - All 6 variables must be set in Vercel
2. **Check NEXTAUTH_URL** - Must be your actual deployed domain, not localhost
3. **Check Google OAuth redirect URIs** - Must include your Vercel domain
4. **Rebuild the project** - After setting variables, trigger a new deployment

## Local Development

Create a `.env.local` file in `petrating/` directory:

```env
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your_secret_here
GOOGLE_CLIENT_ID=your_client_id_here
GOOGLE_CLIENT_SECRET=your_client_secret_here
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

Then run: `npm run dev`
