# PetRating - Project Setup Instructions

## Quick Start

Since automated setup is encountering shell limitations, here's how to manually set it up:

### Option 1: Using Windows Terminal or Command Prompt

```cmd
cd /d "c:\Projects\Fun project"
npx create-next-app@latest petrating --typescript --tailwind --eslint --app --no-git --import-alias "@/*" --yes
cd petrating
npm install
npm run dev
```

### Option 2: Using Git Bash or WSL

```bash
cd "/c/Projects/Fun project"
npx create-next-app@latest petrating --typescript --tailwind --eslint --app --no-git --import-alias "@/*" --yes
cd petrating
npm install
npm run dev
```

## What This Creates

```
petrating/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Home page
│   └── api/                # API routes (NextAuth, uploads, etc)
├── components/             # React components
├── public/                 # Static assets
├── styles/                 # Global CSS
├── lib/                    # Utilities
├── hooks/                  # Custom React hooks
├── store/                  # Zustand state
├── config/                 # Configuration
├── package.json            # Dependencies
├── tsconfig.json           # TypeScript config
├── tailwind.config.ts      # Tailwind config
├── next.config.js          # Next.js config
└── .env.local              # Environment variables
```

## Environment Setup After Installation

Create `.env.local` file in the petrating root:

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# OpenAI
OPENAI_API_KEY=your-openai-api-key

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret

# NextAuth
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-with-openssl-rand-base64-32
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-pk-key
STRIPE_SECRET_KEY=your-sk-key
```

## Development Status

- **Phase 1, Day 1:** Project Setup (IN PROGRESS)
- Created: Initial boilerplate setup instructions
- Next: Create Next.js project structure and dependencies

## Running Tests

```bash
npm run dev    # Development server at http://localhost:3000
npm run build  # Production build
npm run start  # Production server
npm run lint   # ESLint check
```

---

**Once project is created, proceed with Phase 1 Day 2: Authentication Setup**
