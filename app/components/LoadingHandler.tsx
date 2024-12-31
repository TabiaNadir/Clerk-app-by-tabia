'use client';

import { useState, useEffect } from 'react';

const LoadingHandler = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the time as needed

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <div>Loading...</div>; // Replace with a spinner or loading component
  }

  return <>{children}</>;
};

export default LoadingHandler;
