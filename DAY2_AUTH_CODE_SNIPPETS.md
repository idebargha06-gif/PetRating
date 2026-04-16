// ============================================================================
// PETRATING - DAY 2 AUTHENTICATION CODE
// All code snippets for NextAuth.js setup with Google OAuth
// ============================================================================

// FILE 1: app/api/auth/[...nextauth]/route.ts
// ============================================================================
/*
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
        (session.user as any).id = token.id as string;
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
*/

// FILE 2: app/(auth)/login/page.tsx
// ============================================================================
/*
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
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">🐕</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">PetRating</h2>
          <p className="text-gray-600">Rate your pet on absurd metrics</p>
        </div>

        {searchParams.get('error') && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            Sign in failed. Please try again.
          </div>
        )}

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

        <p className="text-center text-gray-600 text-sm mt-6">
          By signing in, you agree to our Terms of Service
        </p>
      </div>
    </div>
  );
}
*/

// FILE 3: app/(auth)/signup/page.tsx
// ============================================================================
/*
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
        <div className="text-center mb-8">
          <h1 className="text-4xl mb-2">🐕</h1>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">Join PetRating</h2>
          <p className="text-gray-600">Get started rating your pets</p>
        </div>

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

        <p className="text-center text-gray-600 text-sm mt-6">
          Already have an account?{' '}
          <Link href="/login" className="text-pink-500 hover:text-pink-600 font-semibold">
            Sign in
          </Link>
        </p>

        <p className="text-center text-gray-600 text-xs mt-6">
          We only use your email for your account
        </p>
      </div>
    </div>
  );
}
*/

// FILE 4: app/profile/page.tsx
// ============================================================================
/*
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
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Your Profile</h1>
          <button
            onClick={() => signOut({ redirect: true, callbackUrl: '/' })}
            className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
          >
            Sign Out
          </button>
        </div>

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

          <button
            onClick={() => router.push('/')}
            className="w-full py-3 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all"
          >
            🐕 Start Rating Your Pets
          </button>
        </div>
      </div>
    </div>
  );
}
*/

// FILE 5: hooks/useAuth.ts
// ============================================================================
/*
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
*/

// FILE 6: app/layout.tsx (UPDATED)
// ============================================================================
/*
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
*/

// FILE 7: app/page.tsx (UPDATED)
// ============================================================================
/*
'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/profile');
    }
  }, [status, router]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-blue-50">
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
*/

// .env.local REQUIREMENTS
// ============================================================================
/*
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
*/

// ============================================================================
// HOW TO USE THESE FILES
// ============================================================================
/*
1. Create the file structure:
   app/api/auth/[...nextauth]/route.ts
   app/(auth)/login/page.tsx
   app/(auth)/signup/page.tsx
   app/profile/page.tsx
   hooks/useAuth.ts

2. Copy the code from each FILE section into the corresponding file

3. Remove the /* */ comments that wrap each file

4. Update app/layout.tsx to wrap with SessionProvider

5. Update app/page.tsx with homepage code

6. Update .env.local with Google OAuth credentials

7. Run: npm run dev

8. Test: Visit http://localhost:3000
*/

export default {};
