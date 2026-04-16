# Phase 1, Day 3: Pet Photo Upload System

## 🎯 Goal for Today

Enable users to upload pet photos with metadata (name, breed) and display them in the app.

### What Users Will Do:
1. Click "Rate My Pet" button on homepage
2. Upload pet photo (drag-drop or click)
3. Enter pet name & breed
4. Submit form
5. See uploaded photo displayed

---

## 📋 Tasks for Day 3

- [ ] Task 1: Install react-dropzone
- [ ] Task 2: Set up Cloudinary integration
- [ ] Task 3: Create upload form component
- [ ] Task 4: Add validation (file size, type)
- [ ] Task 5: Create database schema for pets
- [ ] Task 6: Build upload API endpoint
- [ ] Task 7: Connect form to API
- [ ] Task 8: Test upload flow

---

## 🔧 Step-by-Step Implementation

### STEP 1: Install Dependencies

react-dropzone is already in package.json. Just verify:

```bash
cd petrating
npm install
```

Verify it's installed:
```bash
npm list react-dropzone
# Should show: react-dropzone@14.2.3
```

### STEP 2: Create Supabase Schema

We need a `pets` table to store pet info. Create in Supabase:

**SQL Query to run in Supabase SQL Editor:**

```sql
-- Create pets table
CREATE TABLE pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  name VARCHAR(255) NOT NULL,
  breed VARCHAR(255),
  type VARCHAR(50), -- 'dog', 'cat', 'other'
  photo_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_pets_user_id ON pets(user_id);

-- Enable RLS (Row Level Security)
ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

-- Allow users to see only their own pets
CREATE POLICY "Users can view their own pets"
  ON pets FOR SELECT
  USING (auth.uid()::text = user_id);

-- Allow users to insert their own pets
CREATE POLICY "Users can insert their own pets"
  ON pets FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

-- Allow users to update their own pets
CREATE POLICY "Users can update their own pets"
  ON pets FOR UPDATE
  USING (auth.uid()::text = user_id);
```

### STEP 3: Create Upload Component

Create file: `components/pet/PetUploadForm.tsx`

```typescript
'use client';

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

interface UploadFormProps {
  onSuccess?: (petId: string) => void;
}

export function PetUploadForm({ onSuccess }: UploadFormProps) {
  const [file, setFile] = useState<File | null>(null);
  const [petName, setPetName] = useState('');
  const [petBreed, setBreed] = useState('');
  const [petType, setPetType] = useState<'dog' | 'cat' | 'other'>('dog');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      const selectedFile = acceptedFiles[0];
      
      // Validate file
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      
      if (selectedFile.size > 5 * 1024 * 1024) { // 5MB
        setError('File size must be less than 5MB');
        return;
      }

      setFile(selectedFile);
      setError(null);

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxFiles: 1
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!file) {
      setError('Please select a photo');
      return;
    }

    if (!petName.trim()) {
      setError('Please enter pet name');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Upload photo to Cloudinary and save pet info
      const formData = new FormData();
      formData.append('file', file);
      formData.append('petName', petName);
      formData.append('petBreed', petBreed);
      formData.append('petType', petType);

      const response = await axios.post('/api/pets/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Reset form
      setFile(null);
      setPetName('');
      setBreed('');
      setPetType('dog');
      setPreview(null);

      // Call success callback
      if (onSuccess) {
        onSuccess(response.data.petId);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Upload failed');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Your Pet Photo</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Photo Upload */}
        <div
          {...getRootProps()}
          className={`p-8 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
            isDragActive
              ? 'border-pink-500 bg-pink-50'
              : 'border-gray-300 bg-gray-50 hover:border-pink-300'
          }`}
        >
          <input {...getInputProps()} />
          
          {preview ? (
            <div className="space-y-4">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg mx-auto"
              />
              <p className="text-sm text-gray-600">Click or drag to change photo</p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-4xl">📸</p>
              <p className="text-gray-700 font-semibold">
                {isDragActive
                  ? 'Drop your pet photo here'
                  : 'Drag pet photo here or click to select'}
              </p>
              <p className="text-sm text-gray-500">
                PNG, JPG, GIF or WebP (max 5MB)
              </p>
            </div>
          )}
        </div>

        {/* Pet Details */}
        <div className="grid grid-cols-2 gap-4">
          {/* Pet Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pet Name *
            </label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              placeholder="e.g., Fluffy"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            />
          </div>

          {/* Pet Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Pet Type
            </label>
            <select
              value={petType}
              onChange={(e) => setPetType(e.target.value as any)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
            >
              <option value="dog">🐕 Dog</option>
              <option value="cat">🐈 Cat</option>
              <option value="other">🦜 Other</option>
            </select>
          </div>
        </div>

        {/* Pet Breed */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Breed (optional)
          </label>
          <input
            type="text"
            value={petBreed}
            onChange={(e) => setBreed(e.target.value)}
            placeholder="e.g., Golden Retriever"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
          />
        </div>

        {/* Error Message */}
        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full py-3 px-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {isLoading ? (
            <>
              <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full" />
              Uploading...
            </>
          ) : (
            <>
              <span>🚀</span>
              Upload Pet Photo
            </>
          )}
        </button>
      </form>
    </div>
  );
}
```

### STEP 4: Create Upload API Endpoint

Create file: `app/api/pets/upload/route.ts`

```typescript
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { getServerSession } from 'next-auth';
import { createClient } from '@supabase/supabase-js';
import { NextRequest, NextResponse } from 'next/server';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user ID from session
    const userEmail = session.user.email;

    // Parse form data
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const petName = formData.get('petName') as string;
    const petBreed = formData.get('petBreed') as string;
    const petType = formData.get('petType') as string;

    if (!file) {
      return NextResponse.json(
        { message: 'No file provided' },
        { status: 400 }
      );
    }

    // For now, save to public folder (later use Cloudinary)
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const filepath = join(process.cwd(), 'public', 'uploads', filename);

    // Ensure directory exists
    try {
      await mkdir(join(process.cwd(), 'public', 'uploads'), { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    // Save file
    await writeFile(filepath, buffer);

    // Save pet info to Supabase
    const { data, error } = await supabase
      .from('pets')
      .insert({
        user_id: userEmail,
        name: petName,
        breed: petBreed || null,
        type: petType,
        photo_url: `/uploads/${filename}`
      })
      .select();

    if (error) {
      return NextResponse.json(
        { message: 'Failed to save pet info', error: error.message },
        { status: 500 }
      );
    }

    return NextResponse.json({
      success: true,
      petId: data[0].id,
      photoUrl: `/uploads/${filename}`
    });

  } catch (error: any) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Upload failed', error: error.message },
      { status: 500 }
    );
  }
}
```

### STEP 5: Create Pet Display Page

Create file: `app/rate-pet/page.tsx`

```typescript
'use client';

import { useAuthProtected } from '@/hooks/useAuth';
import { PetUploadForm } from '@/components/pet/PetUploadForm';
import { useRouter } from 'next/navigation';

export default function RatePetPage() {
  const { isLoading } = useAuthProtected();
  const router = useRouter();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-pink-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 to-blue-50 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-semibold"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Rate Your Pet</h1>
          <div className="w-16" /> {/* Spacer */}
        </div>

        {/* Upload Form */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <PetUploadForm
            onSuccess={(petId) => {
              // After upload, redirect to stats page
              router.push(`/pet/${petId}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
```

### STEP 6: Update Homepage with CTA

Update `app/page.tsx` to add "Rate Your Pet" button:

```typescript
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
            <>
              <Link
                href="/rate-pet"
                className="px-4 py-2 bg-gradient-to-r from-pink-500 to-blue-500 text-white rounded-lg hover:shadow-lg transition-all"
              >
                🐕 Rate Pet
              </Link>
              <Link
                href="/profile"
                className="px-4 py-2 bg-gray-200 text-gray-900 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Profile
              </Link>
            </>
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
          {status === 'authenticated' ? (
            <Link
              href="/rate-pet"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-lg font-semibold rounded-lg hover:shadow-xl transition-all"
            >
              🚀 Rate My Pet Now
            </Link>
          ) : (
            <Link
              href="/signup"
              className="px-8 py-4 bg-gradient-to-r from-pink-500 to-blue-500 text-white text-lg font-semibold rounded-lg hover:shadow-xl transition-all"
            >
              🚀 Get Started
            </Link>
          )}
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

### STEP 7: Create .gitignore Entry

Make sure `.gitignore` includes uploads folder:

```
# In petrating/.gitignore, add:
public/uploads/
*.jpg
*.jpeg
*.png
```

### STEP 8: Add to .env.local (if using Cloudinary later)

For now, we're saving to public folder. Later, add Cloudinary:

```env
# For future use:
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
```

---

## ✅ Testing Checklist

- [ ] Run `npm run dev`
- [ ] Log in with Google
- [ ] Click "Rate My Pet"
- [ ] Drag & drop image (or click to select)
- [ ] See preview
- [ ] Enter pet name
- [ ] Select pet type
- [ ] Enter breed
- [ ] Click "Upload Pet Photo"
- [ ] See success message
- [ ] Image saved to public/uploads/
- [ ] Pet info saved to Supabase
- [ ] Can upload another pet

## 📊 Files Created on Day 3

```
components/
├── pet/
│   └── PetUploadForm.tsx    ✅ NEW

app/
├── api/
│   └── pets/
│       └── upload/
│           └── route.ts      ✅ NEW
├── rate-pet/
│   └── page.tsx             ✅ NEW
└── page.tsx                 ✅ UPDATED

public/
└── uploads/                 ✅ NEW (for images)

.gitignore                   ✅ UPDATED
```

## 🎯 What User Sees

1. Homepage with "Rate My Pet" button (if logged in)
2. Click button → /rate-pet page
3. Drag/drop photo area
4. Enter pet details
5. Click upload
6. Success!

---

**Phase 1, Day 3 Status:** IN PROGRESS
**Estimated Completion:** ~1-2 hours
**Next:** Day 4 - OpenAI Integration (THE CRITICAL PART)
