import { useState, useEffect } from 'react';

// Hook to check if the store is currently open (11:30 AM - 11:30 PM IST)
export const useStoreStatus = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const istTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Kolkata' }));
      const hours = istTime.getHours();
      const minutes = istTime.getMinutes();
      const timeInHours = hours + (minutes / 60);
      setIsOpen(timeInHours >= 11.5 && timeInHours < 23.5);
    };
    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return isOpen;
};
