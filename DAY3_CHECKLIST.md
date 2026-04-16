# Day 3 Quick Checklist - Pet Photo Upload

## Pre-requisites ✅

- [x] Logged into Supabase account
- [x] Next.js project running locally (`npm run dev`)
- [x] NextAuth authenticated (can login/signup)
- [x] Have test pet photos ready (.jpg/.png)

---

## STEP 1: Create Supabase Schema (5 mins)

- [ ] Go to Supabase console → your project
- [ ] Click "SQL Editor" in left sidebar
- [ ] Click "+ New Query"
- [ ] Copy & paste FILE 4 from DAY3_PET_UPLOAD_CODE.ts
- [ ] Click "Run" button
- [ ] ✅ Check: "pets" table appears in left sidebar

---

## STEP 2: Create PetUploadForm Component (3 mins)

- [ ] Open VS Code
- [ ] Create folder: `components/pet/` (if not exists)
- [ ] Create file: `components/pet/PetUploadForm.tsx`
- [ ] Copy FILE 1 code from DAY3_PET_UPLOAD_CODE.ts
- [ ] Paste into file
- [ ] Save

**Check:** File shows no red squiggly errors

---

## STEP 3: Create Upload API Endpoint (3 mins)

- [ ] Create folder: `app/api/pets/upload/` (if not exists)
- [ ] Create file: `app/api/pets/upload/route.ts`
- [ ] Copy FILE 2 code from DAY3_PET_UPLOAD_CODE.ts
- [ ] Paste into file
- [ ] Save

**Check:** No red errors, TypeScript happy

---

## STEP 4: Create Upload Page (2 mins)

- [ ] Create folder: `app/rate-pet/` (if not exists)
- [ ] Create file: `app/rate-pet/page.tsx`
- [ ] Copy FILE 3 code from DAY3_PET_UPLOAD_CODE.ts
- [ ] Paste into file
- [ ] Save

**Check:** File created successfully

---

## STEP 5: Update Homepage (2 mins)

- [ ] Open `app/page.tsx`
- [ ] Look for navigation section
- [ ] Add button to /rate-pet route when authenticated:
  ```jsx
  {status === 'authenticated' && (
    <Link href="/rate-pet" className="px-4 py-2 bg-pink-500 text-white rounded">
      🐕 Rate Pet
    </Link>
  )}
  ```
- [ ] Save

---

## STEP 6: Update .gitignore (1 min)

- [ ] Open `petrating/.gitignore`
- [ ] Add these lines at the end:
  ```
  public/uploads/
  *.jpg
  *.jpeg
  *.png
  *.gif
  *.webp
  ```
- [ ] Save

---

## STEP 7: Test Upload Flow (5 mins)

Open browser to `http://localhost:3000`

- [ ] **Homepage test:**
  - [ ] Not logged in: See homepage with signup button ✅
  - [ ] Logged in: See "Rate Pet" button in nav ✅

- [ ] **Upload page test:**
  - [ ] Click "Rate Pet" button
  - [ ] Page loads with upload form ✅
  - [ ] See upload area with "📸" icon ✅

- [ ] **Upload test:**
  - [ ] Drag & drop a pet photo onto upload area
  - [ ] See image preview ✅
  - [ ] Enter pet name (e.g., "Fluffy")
  - [ ] Select pet type (e.g., "Dog")
  - [ ] Enter breed (optional)
  - [ ] Click "Upload Pet Photo" button
  - [ ] Loading spinner shows ✅
  - [ ] Success! Message appears ✅

- [ ] **File verification:**
  - [ ] Check `petrating/public/uploads/` folder
  - [ ] Find new file with timestamp (e.g., `1709843920-fluffy.jpg`)
  - [ ] File size looks correct ✅

- [ ] **Database verification:**
  - [ ] Go to Supabase SQL Editor
  - [ ] Run: `SELECT * FROM pets ORDER BY created_at DESC LIMIT 1;`
  - [ ] See your pet record ✅
  - [ ] Columns: id, user_id, name, breed, type, photo_url ✅

---

## ✅ Day 3 Complete Indicators

All of these should be true:

- ✅ PetUploadForm component created
- ✅ /api/pets/upload endpoint created
- ✅ /rate-pet page created
- ✅ Supabase pets table created
- ✅ .gitignore updated
- ✅ Homepage has "Rate Pet" button (when logged in)
- ✅ Can upload pet photos successfully
- ✅ Images saved to public/uploads/
- ✅ Pet records in Supabase database
- ✅ No console errors during upload

---

## 🐛 Common Issues & Fixes

| Issue | Cause | Fix |
|-------|-------|-----|
| "Cannot find module react-dropzone" | Dependency missing | Run `npm install` |
| Upload fails with 401 | Not logged in | Make sure you're authenticated |
| File not appearing in uploads folder | Permission issue | Check folder permissions, try creating `public/uploads` manually |
| Supabase error "relation \"pets\" does not exist" | Schema not created | Run the SQL from FILE 4 in Supabase |
| Button doesn't appear on homepage | Navigation not updated | Check app/page.tsx has the button code |
| Image preview not showing | CORS issue or bad upload | Check browser console for errors |
| Pet not in database | API not saving to Supabase | Check SUPABASE_SERVICE_ROLE_KEY is set |

---

## 📁 Files to Create/Update Today

```
components/
└── pet/
    └── PetUploadForm.tsx         ✅ CREATE

app/
├── api/
│   └── pets/
│       └── upload/
│           └── route.ts          ✅ CREATE
├── rate-pet/
│   └── page.tsx                 ✅ CREATE
└── page.tsx                     ✅ UPDATE

public/
└── uploads/                     ✅ CREATE (auto-created by code)

Supabase:
└── pets table                   ✅ CREATE (SQL)

.gitignore                       ✅ UPDATE
```

---

## ⏱️ Timing

- Setup: 1 min
- Coding: 14 mins
- Testing: 5 mins
- **Total: ~20 minutes**

---

**Next:** Day 4 - OpenAI Vision Integration (THE CRITICAL PART - 🌟)
