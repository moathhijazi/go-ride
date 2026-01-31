import axios from 'axios';
import { useCallback } from 'react';
import * as Secure from 'expo-secure-store';

const api = axios.create({
  baseURL: process.env.EXPO_PUBLIC_API_URL || '',
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Inject the bearer token

api.interceptors.request.use(async (config: any) => {
  const token = await Secure.getItemAsync('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Handle errors

const normalizeError = (error: any) => {
  if (axios.isAxiosError(error)) {
    console.log(error?.code);
    
    return {
      status: error.response?.status ?? null,
      message:
        error.response?.data?.message || error.response?.data?.error || 'Something went wrong',
      data: error.response?.data ?? null,
    };
  }
  
  return {
    status: null,
    message: 'Unexpected error',
    data: null,
  };
};

export function useApi() {
  const get = useCallback(async (url: any, config = {}) => {
    try {
      const res = await api.get(url, config);
      return { data: res.data, error: null };
    } catch (err) {
      return { data: null, error: normalizeError(err) };
    }
  }, []);

  const post = useCallback(async (url: any, body = {}, config = {}) => {
    try {
      const res = await api.post(url, body, config);
      return { data: res.data, error: null };
    } catch (err) {
      return { data: null, error: normalizeError(err) };
    }
  }, []);

  return { get, post };
}
