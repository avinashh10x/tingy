import { handleUpload, type HandleUploadBody } from '@vercel/blob/client';
import { NextRequest, NextResponse } from 'next/server';

export const runtime = 'nodejs';
export const maxDuration = 60;

/**
 * Client-side upload handler for Vercel Blob
 * This generates a client upload URL, allowing direct browser → Blob uploads
 * Bypasses the 4.5MB serverless payload limit
 */
export async function POST(request: NextRequest): Promise<NextResponse> {
  const body = (await request.json()) as HandleUploadBody;

  try {
    const jsonResponse = await handleUpload({
      body,
      request,
      onBeforeGenerateToken: async () => {
        // Allow all image uploads to temp/ folder with unique filenames
        return {
          allowedContentTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/avif'],
          addRandomSuffix: true, // Add random suffix to prevent filename conflicts
        };
      },
      onUploadCompleted: async ({ blob }) => {
        console.log('Blob uploaded:', blob.url);
      },
    });

    return NextResponse.json(jsonResponse);
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 400 }
    );
  }
}
