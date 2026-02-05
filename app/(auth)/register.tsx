import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { ZodInput } from '@/components/custom/zod-input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginForm } from '@/lib/validation/auth-schema';
import { Button } from '@/components/ui/button';

import Google from '@/components/icons/google';
import Github from '@/components/icons/github';
import { router } from 'expo-router';

import { toast } from 'sonner-native';
import { useApi } from '@/hooks/use-api';

import * as Secure from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function register() {
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { post } = useApi();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: LoginForm) => {
    setLoading(true);
    post('/register', data).then(async (res: any) => {
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success(res.data.message);
        const { accessToken, refreshToken } = res.data.user;
        await Secure.setItemAsync('secure-access-token', accessToken).then(async () => {
          await Secure.setItemAsync('secure-refresh-token', refreshToken).then(async () => {
            await AsyncStorage.setItem('complete-profile' , 'email');
            router.push('/(auth)/complete/email');
          });
        });
      }
      setLoading(false);
    });
  };

  return (
    <ScrollView contentContainerClassName="flex-1">
      <View className="flex-1 p-4">
        <View className="gap-y-2">
          <Text className="text-3xl">Create new account</Text>
          <Text className="text-zinc-600">Enter your email and password below.</Text>
        </View>
        <View className="mt-16 gap-y-4">
          <View>
            <ZodInput
              control={control}
              editable={!loading}
              name="email"
              label="Email Or Phone number"
              placeholder="example@email.com"
              keyboardType="email-address"
              autoCapitalize="none"
              spellCheck={false}
            />
          </View>
          <View>
            <ZodInput
              control={control}
              name="password"
              label="Password"
              placeholder="Enter your strong password"
              keyboardType="email-address"
              autoCapitalize="none"
              secureTextEntry
              editable={!loading}
            />
          </View>
        </View>

        <View className="relative mt-6 border-t-[.4px] p-2">
          <Text className="absolute -top-6 left-[160] bg-white p-2 text-lg">Or</Text>
        </View>
        <View className="mt-6 gap-y-4">
          <Pressable
            disabled={loading}
            className="flex flex-row items-center gap-x-4 rounded-lg border-[.4px] p-3 active:bg-zinc-100">
            <Google style={{ width: 30, height: 30 }} />
            <Text className="text-md font-semi-bold">Continue with Google</Text>
          </Pressable>
          <Pressable
            disabled={loading}
            className="flex flex-row items-center gap-x-4 rounded-lg border-[.4px] p-3 active:bg-zinc-100">
            <Github style={{ width: 30, height: 30 }} />
            <Text className="text-md font-semi-bold">Continue with Github</Text>
          </Pressable>
        </View>
      </View>

      <View className="gap-y-2 p-4">
        <View className="flex w-full flex-row items-center justify-between">
          <Text className="text-md font-medium">Already have an account ?</Text>
          <Button
            disabled={loading}
            variant={'link'}
            className="active:bg-zinc-100"
            onPress={() => router.replace('/(auth)/login')}>
            <Text className="font-bold">Login</Text>
          </Button>
        </View>
        <Button disabled={loading} onPress={handleSubmit(onSubmit)}>
          {loading ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <Text className="text-white">Create account</Text>
          )}
        </Button>
        <Text className="text-center text-xs text-zinc-500">
          By registering you accept that we going to use your phone number to call you or send sms
          or whatsapp messages.
        </Text>
      </View>
    </ScrollView>
  );
}
