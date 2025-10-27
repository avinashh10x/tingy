export function StructuredData() {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Tingy',
    applicationCategory: 'UtilityApplication',
    operatingSystem: 'Any',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    description: 'Free online image compression tool. Compress JPG, PNG, WEBP, and AVIF images up to 20MB without losing quality.',
    url: 'https://tingy.vercel.app',
    featureList: [
      'Compress JPG, PNG, WEBP, and AVIF images',
      'Support for images up to 20MB',
      'No quality loss',
      'No signup required',
      'Completely free',
      'Secure processing',
    ],
    screenshot: 'https://tingy.vercel.app/og-image.png',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
