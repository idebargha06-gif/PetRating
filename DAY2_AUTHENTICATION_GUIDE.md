# Phase 1, Day 2: Authentication Setup Guide

## 🎯 Goal
Set up NextAuth.js with Google OAuth so users can sign up/login with persistent sessions.

## 📋 Tasks for Day 2

- [ ] Task 1: Configure NextAuth.js
- [ ] Task 2: Create Google OAuth credentials
- [ ] Task 3: Build login page
- [ ] Task 4: Build signup page
- [ ] Task 5: Create user profile page
- [ ] Task 6: Test authentication flow

## 🔧 Step-by-Step Implementation

### STEP 1: Install NextAuth.js (Already in package.json)

NextAuth is already included in package.json from Day 1 bootstrap.

```bash
cd petrating
npm install  # This will install next-auth
```

### STEP 2: Create NextAuth Configuration

Create file: `app/api/auth/[...nextauth]/route.ts`

```typescript
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
    signOut: "/",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
```

### STEP 3: Create Environment Variables

Update `.env.local` in the petrating folder:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=<generate-with-openssl-rand-base64-32>
GOOGLE_CLIENT_ID=<from Google Cloud Console>
GOOGLE_CLIENT_SECRET=<from Google Cloud Console>
```

**How to generate NEXTAUTH_SECRET:**
```bash
openssl rand -base64 32
# Copy the output and paste as NEXTAUTH_SECRET value
```

### STEP 4: Get Google OAuth Credentials

1. Go to: https://console.cloud.google.com
2. Create a new project or select existing
3. Enable Google+ API
4. Go to "Credentials" → "Create Credentials" → "OAuth 2.0 Client ID"
5. Select "Web application"
6. Add authorized redirect URIs:
   - `http://localhost:3000/api/auth/callback/google`
   - `http://localhost:3000/api/auth/signin`
7. Copy Client ID and Client Secret to `.env.local`

### STEP 5: Create Login Page

Create file: `app/(auth)/login/page.tsx`

```typescript
'use client';

import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        redirect: false,
        callbackUrl: '/',
      });
      router.push('/');
    } catch (error) {
      console.error('Sign in error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">🐕</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">PetRating</h2>
          <p className="text-gray-600">Rate your pet on absurd metrics</p>
        </div>

        {/* Error Message */}
        {searchParams.get('error') && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            Sign in failed. Please try again.
          </div>
        )}

        {/* Sign In Button */}
        <button
          onClick={() => handleSignIn('google')}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Signing in...
            </>
          ) : (
            <>
              <span>🔓</span>
              Sign in with Google
            </>
          )}
        </button>

        {/* Footer */}
        <p className="text-center text-gray-600 text-sm mt-6">
          By signing in, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
```

### STEP 6: Create Signup Page

Create file: `app/(auth)/signup/page.tsx`

```typescript
'use client';

import { signIn } from 'next-auth/react';
import Link from 'next/link';
import { useState } from 'react';

export default function SignupPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleSignUp = async (provider: string) => {
    setIsLoading(true);
    try {
      await signIn(provider, {
        redirect: false,
        callbackUrl: '/onboarding',
      });
    } catch (error) {
      console.error('Sign up error:', error);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 to-blue-50 p-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">🐕</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Join PetRating</h2>
          <p className="text-gray-600">Get started rating your pets</p>
        </div>

        {/* Benefits */}
        <div className="mb-8 space-y-3">
          <div className="flex gap-3">
            <span>✨</span>
            <span className="text-gray-700">Get AI-generated stat cards for your pets</span>
          </div>
          <div className="flex gap-3">
            <span>🏆</span>
            <span className="text-gray-700">Compete on global leaderboards</span>
          </div>
          <div className="flex gap-3">
            <span>📱</span>
            <span className="text-gray-700">Share with friends and collect pet cards</span>
          </div>
        </div>

        {/* Sign Up Button */}
        <button
          onClick={() => handleSignUp('google')}
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-pink-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Creating account...
            </>
          ) : (
            <>
              <span>🚀</span>
              Sign up with Google
            </>
          )}
        </button>

        {/* Login Link */}
        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-pink-500 hover:text-pink-600 font-semibold">
            Sign in
          </Link>
        </p>

        {/* Footer */}
        <p className="text-center text-gray-600 text-xs mt-6">
          We only use your email for your account
        </p>
      </div>
    </div>
  );
}
```

### STEP 7: Create User Profile Page

Create file: `app/profile/page.tsx`

```typescript
'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProfilePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!session?.user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
            className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Sign Out
          </button>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex items-center gap-6 mb-8 pb-8 border-b border-gray-200">
            {session.user.image && (
              <img
                src={session.user.image}
                alt={session.user.name || 'User'}
                className="w-20 h-20 rounded-full"
              />
            )}
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{session.user.name}</h2>
              <p className="text-gray-600">{session.user.email}</p>
              <p className="text-sm text-gray-500 mt-1">Joined just now</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            <div className="text-center p-4 bg-pink-50 rounded-lg">
              <p className="text-3xl font-bold text-pink-500">0</p>
              <p className="text-gray-600 text-sm">Pets Rated</p>
            </div>
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <p className="text-3xl font-bold text-blue-500">0</p>
              <p className="text-gray-600 text-sm">Upvotes</p>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <p className="text-3xl font-bold text-purple-500">0</p>
              <p className="text-gray-600 text-sm">Badges</p>
            </div>
          </div>

          {/* Call to Action */}
          <button
            onClick={() => router.push('/')}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            🐕 Start Rating Your Pets
          </button>
        </div>

        {/* Session Info (Development Only) */}
        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-sm text-gray-700">
          <p className="font-mono break-all">Session: {JSON.stringify(session, null, 2)}</p>
        </div>
      </div>
    </div>
  );
}
```

### STEP 8: Create Auth Context Hook

Create file: `hooks/useAuth.ts`

```typescript
'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export function useAuth() {
  const { data: session, status } = useSession();
  const router = useRouter();

  const isLoading = status === 'loading';
  const isAuthenticated = status === 'authenticated';
  const user = session?.user;

  return {
    session,
    status,
    user,
    isLoading,
    isAuthenticated,
  };
}

export function useAuthProtected() {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      router.push('/login');
    }
  }, [auth.isLoading, auth.isAuthenticated, router]);

  return auth;
}
```

### STEP 9: Create Protected Layout Wrapper

Create file: `components/layout/ProtectedLayout.tsx`

```typescript
'use client';

import { useAuthProtected } from '@/hooks/useAuth';
import { ReactNode } from 'react';

export function ProtectedLayout({ children }: { children: ReactNode }) {
  const { isLoading } = useAuthProtected();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return <>{children}</>;
}
```

### STEP 10: Update Root Layout

Update `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PetRating - Rate Your Pet on Absurd Metrics",
  description:
    "Upload your pet photo and get AI-generated funny stat cards. Compare pets globally.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionProvider>
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}
```

### STEP 11: Update Home Page

Update `app/page.tsx`:

```typescript
'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  // Redirect to profile if already authenticated
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/profile');
    }
  }, [status, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
      {/* Navigation */}
      <nav className="flex items-center justify-between p-6 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold">🐕 PetRating</h1>
        <div className="flex gap-4">
          {status === 'unauthenticated' ? (
            <>
              <Link
                href="/login"
                className="px-4 py-2 text-gray-700 hover:text-gray-900 font-semibold"
              >
                Sign In
              </Link>
              <Link
                href="/signup"
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <Link
              href="/profile"
              className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Profile
            </Link>
          )}
        </div>
      </nav>

      {/* Hero */}
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] px-4 text-center">
        <h2 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
          Rate Your Pet on Absurd Metrics
        </h2>
        <p className="text-xl text-gray-600 mb-12 max-w-2xl">
          Upload a photo of your pet and get AI-generated funny stat cards. 
          Compete on leaderboards and share with friends.
        </p>
        <div className="flex gap-4">
          <Link
            href="/signup"
            className="px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-lg font-semibold rounded-lg hover:shadow-xl transition-all"
          >
            🚀 Get Started
          </Link>
          <Link
            href="#"
            className="px-8 py-4 border-2 border-gray-300 text-gray-700 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-all"
          >
            📖 Learn More
          </Link>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20 max-w-4xl">
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <p className="text-4xl mb-4">✨</p>
            <h3 className="text-xl font-bold mb-2">AI-Generated Stats</h3>
            <p className="text-gray-600">Get unique stat cards for each pet rating</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <p className="text-4xl mb-4">🏆</p>
            <h3 className="text-xl font-bold mb-2">Compete Globally</h3>
            <p className="text-gray-600">See how your pet ranks on leaderboards</p>
          </div>
          <div className="p-6 bg-white rounded-2xl shadow-lg">
            <p className="text-4xl mb-4">📱</p>
            <h3 className="text-xl font-bold mb-2">Share & Collect</h3>
            <p className="text-gray-600">Share cards with friends and collect badges</p>
          </div>
        </div>
      </div>
    </div>
  );
}
```

## ✅ Testing Checklist

After implementing all steps, test:

- [ ] `npm run dev` starts server successfully
- [ ] Visiting http://localhost:3000 shows homepage
- [ ] Clicking "Sign Up" goes to /signup page
- [ ] Clicking "Sign In" goes to /login page
- [ ] Google OAuth button appears on both pages
- [ ] Clicking Google button initiates OAuth flow
- [ ] After OAuth, redirects to /profile
- [ ] Profile page shows user info (name, email, avatar)
- [ ] Sign Out button works and redirects to home
- [ ] Protected routes redirect to /login if not authenticated

## 🚨 Common Issues & Solutions

**Issue:** "GOOGLE_CLIENT_ID not defined"
→ Make sure .env.local has credentials and restart `npm run dev`

**Issue:** "Invalid request: redirect_uri mismatch"
→ Add `http://localhost:3000/api/auth/callback/google` to Google Console authorized URIs

**Issue:** "Session is null"
→ Make sure SessionProvider wraps app in layout.tsx

**Issue:** Infinite redirect loop
→ Check that callback URLs don't have trailing slashes

## 📊 Files Created on Day 2

```
app/
├── api/
│   └── auth/
│       └── [...nextauth]/
│           └── route.ts          (NextAuth handler)
├── (auth)/
│   ├── login/
│   │   └── page.tsx             (Login page)
│   └── signup/
│       └── page.tsx             (Signup page)
├── profile/
│   └── page.tsx                 (Profile page)
├── layout.tsx                   (Root layout with SessionProvider)
├── page.tsx                     (Updated homepage)
└── globals.css                  (Tailwind styles)

hooks/
├── useAuth.ts                   (Auth context hook)
└── useAuthProtected.ts          (Protected route hook)

components/
├── layout/
│   └── ProtectedLayout.tsx      (Protected wrapper)
└── ...

.env.local                        (Update with credentials)
```

## 🎯 Next Steps

After Day 2 completion:
- ✅ Users can sign up with Google
- ✅ Users can log in
- ✅ User sessions persist
- ✅ Profile page shows user info

**Ready for Day 3:** Pet Photo Upload functionality

---

**Phase 1, Day 2 Status:** IN PROGRESS
**Estimated Completion:** ~1 day
