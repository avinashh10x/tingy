import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Tingy - Smart Image Compressor',
    short_name: 'Tingy',
    description: 'Compress images up to 20MB without losing quality. Fast, secure, and completely free.',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#5B7FFF',
    icons: [
      {
        src: '/og-image.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/og-image.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
