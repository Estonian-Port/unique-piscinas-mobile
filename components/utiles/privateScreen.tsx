import React, { ReactNode, useEffect } from 'react';
import { useAuth } from '@/context/authContext';
import { router } from 'expo-router';

interface PrivateScreenProps {
  children: ReactNode;
}

const PrivateScreen = ({ children }: PrivateScreenProps) => {
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      router.replace('/index');
    }
  }, [user]);

  if (!user) return null;

  return <>{children}</>;
};

export default PrivateScreen;