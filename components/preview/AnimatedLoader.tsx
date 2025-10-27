'use client';

import { useEffect, useState } from 'react';

interface AnimatedLoaderProps {
  loaderIndex: number;
}

const loaderClasses = [
  'loader-spinner',
  'loader-flip',
  'loader-eyes',
  'loader-slide',
  'loader-polygon',
];

export function AnimatedLoader({ loaderIndex }: AnimatedLoaderProps) {
  const [currentLoader, setCurrentLoader] = useState(0);

  useEffect(() => {
    setCurrentLoader(loaderIndex % loaderClasses.length);
  }, [loaderIndex]);

  return (
    <div className="flex items-center justify-center py-12">
      <div className={loaderClasses[currentLoader]} />
    </div>
  );
}
