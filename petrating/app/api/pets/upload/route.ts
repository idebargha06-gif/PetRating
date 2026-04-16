import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/auth';

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json(
        { message: 'Unauthorized' },
        { status: 401 }
      );
    }
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const petName = (formData.get('petName') as string | null) ?? '';
    const petBreed = (formData.get('petBreed') as string | null) ?? '';
    const petType = (formData.get('petType') as string | null) ?? '';

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
    } catch {
      // Directory might already exist
    }

    await writeFile(filepath, buffer);

    // For now, return success without DB insert (since we may not have Supabase credentials)
    return NextResponse.json({
      success: true,
      petId: `pet-${timestamp}`,
      photoUrl: `/uploads/${filename}`,
      message: 'Pet photo uploaded successfully!',
      petProfile: {
        ownerEmail: session.user.email,
        petName,
        petBreed,
        petType,
      },
    });

  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown upload error';
    console.error('Upload error:', error);
    return NextResponse.json(
      { message: 'Upload failed', error: message },
      { status: 500 }
    );
  }
}
