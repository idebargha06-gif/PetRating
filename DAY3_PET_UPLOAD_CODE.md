// ============================================================================
// PETRATING - DAY 3 PET PHOTO UPLOAD CODE
// All code snippets ready to use
// ============================================================================

// FILE 1: components/pet/PetUploadForm.tsx
// ============================================================================
/*
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
      
      if (!selectedFile.type.startsWith('image/')) {
        setError('Please upload an image file');
        return;
      }
      
      if (selectedFile.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setFile(selectedFile);
      setError(null);

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

      setFile(null);
      setPetName('');
      setBreed('');
      setPetType('dog');
      setPreview(null);

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

        <div className="grid grid-cols-2 gap-4">
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

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

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
*/

// FILE 2: app/api/pets/upload/route.ts
// ============================================================================
/*
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
    const session = await getServerSession();
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }

    const userEmail = session.user.email;
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

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name}`;
    const filepath = join(process.cwd(), 'public', 'uploads', filename);

    try {
      await mkdir(join(process.cwd(), 'public', 'uploads'), { recursive: true });
    } catch (err) {
      // Directory might already exist
    }

    await writeFile(filepath, buffer);

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
*/

// FILE 3: app/rate-pet/page.tsx
// ============================================================================
/*
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
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={() => router.back()}
            className="px-4 py-2 text-gray-700 hover:text-gray-900 font-semibold"
          >
            ← Back
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Rate Your Pet</h1>
          <div className="w-16" />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-8">
          <PetUploadForm
            onSuccess={(petId) => {
              router.push(`/pet/${petId}`);
            }}
          />
        </div>
      </div>
    </div>
  );
}
*/

// FILE 4: Supabase SQL Schema
// ============================================================================
/*
CREATE TABLE pets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  name VARCHAR(255) NOT NULL,
  breed VARCHAR(255),
  type VARCHAR(50),
  photo_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE INDEX idx_pets_user_id ON pets(user_id);

ALTER TABLE pets ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own pets"
  ON pets FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Users can insert their own pets"
  ON pets FOR INSERT
  WITH CHECK (auth.uid()::text = user_id);

CREATE POLICY "Users can update their own pets"
  ON pets FOR UPDATE
  USING (auth.uid()::text = user_id);
*/

// FILE 5: .gitignore update
// ============================================================================
/*
Add these lines to petrating/.gitignore:

public/uploads/
*.jpg
*.jpeg
*.png
*.gif
*.webp
*/

// FILE 6: Environment variables (for future Cloudinary use)
// ============================================================================
/*
# Add to petrating/.env.local (when ready):

# Cloudinary (optional, for production)
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_API_KEY=your-api-key
CLOUDINARY_API_SECRET=your-api-secret
*/

// ============================================================================
// HOW TO USE THESE FILES
// ============================================================================
/*
1. Create PetUploadForm component (FILE 1)
   → Create: components/pet/PetUploadForm.tsx
   → Copy FILE 1 code (remove /* */ comments)

2. Create upload API endpoint (FILE 2)
   → Create: app/api/pets/upload/route.ts
   → Copy FILE 2 code

3. Create upload page (FILE 3)
   → Create: app/rate-pet/page.tsx
   → Copy FILE 3 code

4. Create Supabase schema (FILE 4)
   → Go to Supabase
   → Open SQL editor
   → Paste FILE 4 code
   → Run query

5. Update .gitignore (FILE 5)
   → Add lines from FILE 5 to petrating/.gitignore

6. Test upload flow
   → Run: npm run dev
   → Login
   → Click "Rate My Pet"
   → Upload pet photo
   → Check /uploads folder for file
   → Check Supabase for pet record
*/

export default {};
