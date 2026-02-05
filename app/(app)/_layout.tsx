import React, { useEffect } from 'react';
import { useAuth } from '@/hooks/use-auth';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { Slot } from 'expo-router';
import { usePathname } from 'expo-router';

export default function AppLayout() {
  const { loading, isAuthenticated , user , isNotCompleteProfile } = useAuth();


  if (loading) {
    return (
      <View className="flex-1 justify-center items-center">
        <ActivityIndicator />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/(auth)/login" />;
  }

  if(isNotCompleteProfile == "email"){
    return <Redirect href="/(auth)/complete/email" />;
  }

  if(isNotCompleteProfile == "phone"){
    return <Redirect href="/(auth)/complete/rest" />;
  }

  

  return (
    <Slot />
  ); // children render automatically
}
