# ⏱️ PHASE 1, DAY 2 - AUTHENTICATION SETUP CHECKLIST

## 🎯 Goal for Today

Set up NextAuth.js with Google OAuth so users can:
- ✅ Sign up with Google
- ✅ Log in to their account
- ✅ Maintain persistent sessions
- ✅ View their profile

## ✅ Pre-Requisites (From Day 1)

- [x] Bootstrap script run (`npm install` completed)
- [x] Project running with `npm run dev`
- [x] NextAuth.js in package.json (already installed)

## 📋 Step-by-Step Checklist

### PART 1: Google OAuth Setup (15 min)

- [ ] Go to https://console.cloud.google.com
- [ ] Create new project (or select existing)
- [ ] Search for "Google+ API" and enable it
- [ ] Go to "Credentials" tab
- [ ] Click "Create Credentials" → "OAuth 2.0 Client ID"
- [ ] Choose "Web application"
- [ ] Name: "PetRating Local Dev"
- [ ] Add authorized redirect URI:
  - [ ] `http://localhost:3000/api/auth/callback/google`
- [ ] Add authorized JavaScript origin:
  - [ ] `http://localhost:3000`
- [ ] Copy `Client ID` (save for later)
- [ ] Copy `Client Secret` (save for later)

### PART 2: Environment Setup (10 min)

- [ ] Generate NextAuth secret:
  ```bash
  # Run this in terminal/cmd:
  openssl rand -base64 32
  # Copy the output
  ```

- [ ] Edit `petrating/.env.local`:
  ```
  NEXTAUTH_URL=http://localhost:3000
  NEXTAUTH_SECRET=<paste-the-openssl-output>
  GOOGLE_CLIENT_ID=<from-google-console>
  GOOGLE_CLIENT_SECRET=<from-google-console>
  ```

- [ ] Save `.env.local`
- [ ] Restart `npm run dev` (Ctrl+C, then `npm run dev`)

### PART 3: Create NextAuth Configuration (15 min)

- [ ] Create directory: `app/api/auth/[...nextauth]/`
- [ ] Create file: `app/api/auth/[...nextauth]/route.ts`
- [ ] Copy code from `DAY2_AUTH_CODE_SNIPPETS.ts` (FILE 1: nextauth-route.ts)
- [ ] Verify file is created and saved

### PART 4: Update Root Layout (5 min)

- [ ] Open `app/layout.tsx`
- [ ] Replace entire content with FILE 6 from `DAY2_AUTH_CODE_SNIPPETS.ts`
- [ ] Make sure SessionProvider wraps {children}
- [ ] Save file

### PART 5: Create Authentication Pages (20 min)

- [ ] Create directory: `app/(auth)/login/`
- [ ] Create file: `app/(auth)/login/page.tsx`
- [ ] Copy FILE 2 from code snippets
- [ ] Save file

- [ ] Create directory: `app/(auth)/signup/`
- [ ] Create file: `app/(auth)/signup/page.tsx`
- [ ] Copy FILE 3 from code snippets
- [ ] Save file

### PART 6: Create Profile Page (10 min)

- [ ] Create directory: `app/profile/`
- [ ] Create file: `app/profile/page.tsx`
- [ ] Copy FILE 4 from code snippets
- [ ] Save file

### PART 7: Create Auth Hook (5 min)

- [ ] Create directory: `hooks/` (if not exists)
- [ ] Create file: `hooks/useAuth.ts`
- [ ] Copy FILE 5 from code snippets
- [ ] Save file

### PART 8: Update Homepage (10 min)

- [ ] Open `app/page.tsx`
- [ ] Replace with FILE 7 from code snippets
- [ ] Save file

## 🧪 Testing (15 min)

In terminal, verify everything works:

```bash
cd petrating
npm run dev
```

Then visit each URL and test:

- [ ] Visit `http://localhost:3000` → See homepage
- [ ] Click "Sign Up" → See signup page
- [ ] Click "Sign In" → See login page
- [ ] Click "Sign up with Google" → Google OAuth popup
- [ ] Login with Google account
- [ ] Redirected to profile page
- [ ] See your name, email, avatar
- [ ] Click "Sign Out" → Back to homepage
- [ ] Verify you're logged out

## 🆘 Troubleshooting

| Issue | Solution |
|-------|----------|
| "GOOGLE_CLIENT_ID is undefined" | Check `.env.local` has correct values, restart `npm run dev` |
| OAuth redirect URI mismatch error | Add `http://localhost:3000/api/auth/callback/google` to Google Console |
| White screen on profile page | Check browser console for errors (F12) |
| "Cannot find module 'next-auth'" | Run `npm install` in petrating folder |
| Infinite redirect loop | Make sure `.env.local` is correct and reload page |
| Google login doesn't work | Check that GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET are correct |

## 📊 Expected File Structure After Day 2

```
petrating/
├── app/
│   ├── api/
│   │   └── auth/
│   │       └── [...nextauth]/
│   │           └── route.ts              ✅ NEW
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx                  ✅ NEW
│   │   └── signup/
│   │       └── page.tsx                  ✅ NEW
│   ├── profile/
│   │   └── page.tsx                      ✅ NEW
│   ├── layout.tsx                        ✅ UPDATED (SessionProvider)
│   ├── page.tsx                          ✅ UPDATED (with nav)
│   └── globals.css
│
├── hooks/
│   └── useAuth.ts                        ✅ NEW
│
├── .env.local                            ✅ UPDATED (with Google creds)
└── ...other files
```

## ✨ What You've Accomplished

By end of Day 2, you have:

- ✅ NextAuth.js configured
- ✅ Google OAuth working
- ✅ User login/signup
- ✅ User profile page
- ✅ Protected routes
- ✅ Session management
- ✅ Beautiful auth UI

## 📈 Progress Update

```
Phase 1 (Days 1-6):
├─ ✅ Day 1: Project Setup
├─ 🟡 Day 2: Authentication (IN PROGRESS)
├─ ⏳ Day 3: Pet Upload (READY)
├─ ⏳ Day 4: OpenAI Integration (READY)
├─ ⏳ Day 5: Stat Cards (READY)
└─ ⏳ Day 6: Sharing (READY)

Overall: 1.5 of 6 Phase 1 days = 25%
```

## 🚀 Next: Day 3 Preview

Once Day 2 is complete:
- Pet photo upload with react-dropzone
- Cloudinary integration for image storage
- Pet metadata (name, breed)
- Form validation

---

## 📝 Quick Reference: Important Links

- **Google OAuth Setup:** https://console.cloud.google.com
- **NextAuth.js Docs:** https://next-auth.js.org
- **Code Snippets:** See `DAY2_AUTH_CODE_SNIPPETS.ts`
- **Full Guide:** See `DAY2_AUTHENTICATION_GUIDE.md`

---

**Duration:** ~2 hours
**Difficulty:** Medium
**Critical Items:** Google OAuth credentials setup
**Next Checkpoint:** Day 3 - Pet Photo Upload

---

✅ **Status:** Ready to start Day 2
🟢 **Block:** Unblocked (Day 1 complete)
