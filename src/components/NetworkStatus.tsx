import { useState, useEffect } from 'react';

const NetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      setHasError(false);
    };
    
    const handleOffline = () => {
      setIsOnline(false);
      setHasError(true);
    };

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Test connectivity with a simple fetch
    const testConnectivity = async () => {
      try {
        const response = await fetch('/', { method: 'HEAD', mode: 'no-cors' });
        setHasError(false);
      } catch (error) {
        setHasError(true);
      }
    };

    // Test connectivity on mount and periodically
    testConnectivity();
    const interval = setInterval(testConnectivity, 30000); // Test every 30 seconds

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearInterval(interval);
    };
  }, []);

  // Only show if there are network issues
  if (isOnline && !hasError) {
    return null;
  }

  return (
    <div className="fixed top-0 left-0 right-0 bg-red-500 text-white text-center py-2 text-sm z-50">
      {!isOnline ? 'No internet connection' : 'Network issues detected'}
    </div>
  );
};

export default NetworkStatus;
