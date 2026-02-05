import { useEffect, useState, useCallback } from 'react';
import * as SecureStore from 'expo-secure-store';
import { router } from 'expo-router';

import { useApi } from '@/hooks/use-api';
import { User } from '@/types/user';

const ACCESS_KEY = 'secure-access-token';
const REFRESH_KEY = 'secure-refresh-token';

import AsyncStorage from "@react-native-async-storage/async-storage";

export const useAuth = () => {
  const { post } = useApi();

  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isNotCompleteProfile , setCompleteProfile] = useState<any>(undefined);
  const [loading, setLoading] = useState(true);

  
  const logout = useCallback(async () => {
    await SecureStore.deleteItemAsync(ACCESS_KEY);
    await SecureStore.deleteItemAsync(REFRESH_KEY);

    setUser(null);
    setIsAuthenticated(false);
    setLoading(false);

    router.replace('/(auth)/login');
  }, []);

  const fetchUser = useCallback(async () => {
    setLoading(true);

    const response: any = await post('/get-user');

    if (response?.error) {
      const { message } = response.error;
      console.log(message);
      await logout();
      return;
    }

    const userData = response?.data?.user;
    const accessToken = userData?.accessToken;
    const refreshToken = userData?.refreshToken;

    if (!accessToken || !refreshToken) {
      await logout();
      return;
    }

    await SecureStore.setItemAsync(ACCESS_KEY, accessToken);
    await SecureStore.setItemAsync(REFRESH_KEY, refreshToken);

    setUser(userData);
    setIsAuthenticated(true);

    const isNotCompleted = await AsyncStorage.getItem('complete-profile');
   
    if(isNotCompleted){
      setCompleteProfile(isNotCompleted);
    }
    setLoading(false);
  }, [post, logout]);

  useEffect(() => {
    const initAuth = async () => {
      const accessToken = await SecureStore.getItemAsync(ACCESS_KEY);
      const refreshToken = await SecureStore.getItemAsync(REFRESH_KEY);

      if (!accessToken || !refreshToken) {
        setLoading(false);
        return;
      }

      setIsAuthenticated(true);
      await fetchUser();
    };

    initAuth();
  }, [fetchUser]);

  return {
    loading,
    isAuthenticated,
    user,
    logout,
    isNotCompleteProfile
  };
};
