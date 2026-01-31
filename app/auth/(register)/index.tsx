import { View, Text, ScrollView , Pressable, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { ZodInput } from '@/components/custom/zod-input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { loginSchema, LoginForm } from '@/lib/validation/auth-schema';
import { Button } from '@/components/ui/button';


import Google from '@/components/icons/google';
import Github from '@/components/icons/github';
import { router } from 'expo-router';

export default function register() {
  const { control, handleSubmit } = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const [loading , setLoading] = useState(false);

  const onSubmit = (data: LoginForm) => {
    console.log(data);
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
        <View className='gap-y-4 mt-6'>
          <Pressable disabled={loading} className="flex flex-row items-center p-3 border-[.4px] rounded-lg gap-x-4 active:bg-zinc-100">
            <Google style={{ width : 30 , height : 30 }} />
            <Text className='text-md font-semi-bold'>Continue with Google</Text>
          </Pressable>
          <Pressable disabled={loading} className="flex flex-row items-center p-3 border-[.4px] rounded-lg gap-x-4 active:bg-zinc-100">
            <Github style={{ width : 30 , height : 30 }} />
            <Text className='text-md font-semi-bold'>Continue with Github</Text>
          </Pressable>
        </View>
      </View>

      <View className="gap-y-2 p-4">
        <View className='w-full flex flex-row items-center justify-between'>
          <Text className='font-medium text-md'>Already have an account ?</Text>
          <Button disabled={loading} variant={"link"} className='active:bg-zinc-100' onPress={() => router.replace('/auth/login')}>
            <Text className='font-bold'>Login</Text>
          </Button>
        </View>
        <Button disabled={loading} onPress={handleSubmit(onSubmit)}>
          {
            loading ? (
              <ActivityIndicator size={"small"} color={"white"} />
              
            ) : (

              <Text className="text-white">Create account</Text>
            )
          }
        </Button>
        <Text className="text-center text-xs text-zinc-500">
          By registering you accept that we going to use your phone number to call you or send sms or
          whatsapp messages.
        </Text>
      </View>
    </ScrollView>
  );
}
