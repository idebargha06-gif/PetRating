# 🐕 PetRating - Complete Build Instructions

## ⚡ Quick Start (Recommended)

### Step 1: Run Bootstrap Script

**Windows (CMD):**
```cmd
cd c:\Projects\Fun project
bootstrap-petrating.bat
```

This will:
- ✅ Create Next.js 14 project with TypeScript + Tailwind CSS
- ✅ Install all dependencies
- ✅ Create `.env.local` template
- ✅ Configure everything for Phase 1 development

### Step 2: Update Environment Variables

Edit `.env.local` in `petrating/` folder with your API keys:

```env
# Required for development
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate-a-random-string-here

# Get from Google Cloud Console
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Get from Supabase
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxx

# Get from OpenAI
OPENAI_API_KEY=sk-xxx

# Get from Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud
```

### Step 3: Start Development

```bash
cd petrating
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) - you should see Next.js default page.

---

## 📋 Project Structure After Setup

```
petrating/
├── app/                          # Next.js 14 App Router
│   ├── layout.tsx               # Root layout wrapper
│   ├── page.tsx                 # Homepage
│   ├── api/
│   │   ├── auth/               # NextAuth authentication
│   │   ├── upload/             # File uploads
│   │   ├── pets/               # Pet API routes
│   │   ├── stats/              # AI stat generation
│   │   └── leaderboard/        # Leaderboard queries
│   └── (auth)/
│       ├── login/              # Login page
│       └── signup/             # Signup page
│
├── components/                   # React Components
│   ├── layout/
│   │   ├── Header.tsx          # Navigation header
│   │   ├── Footer.tsx          # Footer
│   │   └── Navbar.tsx          # Mobile navbar
│   │
│   ├── pet/
│   │   ├── PetUpload.tsx       # Photo upload form
│   │   ├── StatCard.tsx        # Stat card display
│   │   └── PetProfile.tsx      # Pet profile page
│   │
│   ├── leaderboard/
│   │   ├── LeaderboardTable.tsx # Leaderboard display
│   │   └── RankBadge.tsx       # Rank badge component
│   │
│   └── ui/
│       ├── Button.tsx          # Reusable button
│       ├── Card.tsx            # Card wrapper
│       └── Loading.tsx         # Loading spinner
│
├── lib/
│   ├── supabase.ts            # Supabase client
│   ├── openai.ts              # OpenAI integration
│   ├── cloudinary.ts          # Image uploads
│   └── utils.ts               # Utilities
│
├── hooks/
│   ├── useAuth.ts             # Auth context hook
│   ├── usePets.ts             # Pet data hook
│   └── useLeaderboard.ts      # Leaderboard data
│
├── store/
│   ├── authStore.ts           # Zustand auth store
│   ├── petStore.ts            # Zustand pet store
│   └── uiStore.ts             # Zustand UI store
│
├── public/                     # Static assets
│   ├── images/
│   ├── icons/
│   └── favicon.ico
│
├── styles/
│   └── globals.css            # Global Tailwind styles
│
├── config/
│   ├── site.ts                # Site configuration
│   ├── nav.ts                 # Navigation config
│   └── constants.ts           # App constants
│
├── .env.local                 # Environment variables (create this)
├── .env.example               # Example env file
├── package.json               # Dependencies
├── tsconfig.json              # TypeScript config
├── tailwind.config.ts         # Tailwind config
├── next.config.js             # Next.js config
└── README.md                  # Project documentation
```

---

## 🚀 Phase 1 Development Tasks

### ✅ Day 1: Project Setup (Today)
- [x] Create Next.js 14 project with TypeScript
- [x] Set up Tailwind CSS + shadcn/ui
- [x] Initialize git repo (optional, skipped)
- [x] Create Supabase project (setup separately)
- [x] Set up environment variables template

**Status:** Complete ✅

### 📅 Day 2: Authentication (Tomorrow)
- [ ] Set up NextAuth.js
- [ ] Add Google OAuth
- [ ] Create login/signup pages
- [ ] Test auth flow

### 📅 Day 3: Pet Photo Upload (Day After Tomorrow)
- [ ] Build upload form with react-dropzone
- [ ] Integrate Cloudinary
- [ ] Add pet name/breed fields
- [ ] Form validation

### 📅 Day 4: OpenAI Integration
- [ ] Set up GPT-4V Vision API
- [ ] Create stat generation prompt
- [ ] Implement 5-roasts generation
- [ ] Add rate limiting

### 📅 Day 5: Stat Card Design
- [ ] Beautiful stat card UI
- [ ] Progress bars and icons
- [ ] Mobile responsive
- [ ] Loading states

### 📅 Day 6: Share Functionality
- [ ] Server-side image generation
- [ ] Social share buttons
- [ ] Shareable links
- [ ] Platform integration

---

## 🔧 Setup Checklist

After running bootstrap script, verify:

```bash
cd petrating

# Check Node version (should be 16+)
node --version

# Check npm version
npm --version

# Verify dependencies installed
ls node_modules

# Check configuration files exist
ls tailwind.config.ts
ls next.config.js
ls tsconfig.json

# Verify app directory structure
ls -la app/
```

---

## 🚨 Troubleshooting

### "npx command not found"
- Install Node.js from https://nodejs.org (LTS recommended)
- Restart Command Prompt

### "Port 3000 already in use"
```bash
npm run dev -- -p 3001
```

### Module not found errors
```bash
rm -rf node_modules package-lock.json
npm install
```

### Build fails
```bash
npm run lint
npm run type-check
npm run build
```

---

## 📚 Next Steps After Setup

1. **Update `.env.local`** with your API keys
2. **Create Supabase project** and get credentials
3. **Set up Google OAuth** credentials
4. **Run Phase 1 Day 2** - Authentication setup
5. **Track progress** in development log

---

## 🎯 Development Commands

```bash
npm run dev          # Start development server (port 3000)
npm run build        # Create production build
npm run start        # Run production build
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript check
npm test             # Run tests (if configured)
npm run dev -- -p 3001  # Use different port
```

---

## 📊 Project Status

```
PHASE 1: Foundation (Days 1-6)
├── ✅ Day 1: Project Setup
├── ⏳ Day 2: Authentication
├── ⏳ Day 3: Pet Upload
├── ⏳ Day 4: OpenAI Integration
├── ⏳ Day 5: Stat Card Design
└── ⏳ Day 6: Share Functionality

Expected completion: ~6 days

Phase 1 MVP:
✓ Upload pet photo
✓ Get AI stat card
✓ Share with friends
✓ View leaderboard (basic)
```

---

**⏱️ Phase 1, Day 1 Status:** Complete - Ready for Day 2 Authentication Setup
