import React from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'expo-router';
import { Slot } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
export default function AuthLayout() {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator />
      </View>
    );
  }

  return <Slot />;
}
