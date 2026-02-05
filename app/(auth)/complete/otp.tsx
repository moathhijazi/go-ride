import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { ZodInput } from '@/components/custom/zod-input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { emailOTPschema, EmailOTP } from '@/lib/validation/emailOTP-schema';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner-native';

import { router } from 'expo-router';

import { useApi } from '@/hooks/use-api';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function index() {
  const { control, handleSubmit } = useForm<EmailOTP>({
    resolver: zodResolver(emailOTPschema),
    defaultValues: {
      otp : ''
    },
  });

  const { post } = useApi();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: EmailOTP) => {
    setLoading(true);
    post('/verify-phone-number', data).then((res: any) => {
      if (res.error) {
        toast.error(res.error.message);
      }else{
        toast.success(res.data.message);
        AsyncStorage.clear().then(() => {
          router.replace('/(app)')
        });
      }
      setLoading(false);
    });
  };

  return (
    <ScrollView contentContainerClassName="flex-1">
      <View className="flex-1 p-4">
        <View className="gap-y-2">
          <Text className="text-3xl">Verify your phone number</Text>
          <Text className="text-zinc-600">We've sent you an sms.</Text>
        </View>
        <View className="mt-16 gap-y-4">
          <View>
            <ZodInput
              control={control}
              editable={!loading}
              name="otp"
              label="OTP 6 numbers"
              placeholder="012345"
              keyboardType="numeric"
              autoCapitalize="none"
              maxLength={6}
            />
          </View>
     
        </View>
       
       
      
      </View>

      <View className="gap-y-2 p-4">
        <View className="flex w-full flex-row items-center justify-between">
          <Text className="text-md font-medium">Didn't receive sms ?</Text>
          <Button
            disabled={loading}
            variant={'link'}
            className="active:bg-zinc-100"
            onPress={() => router.replace('/(auth)/register')}>
            <Text className="font-bold">Send again (0:45)</Text>
          </Button>
        </View>
        <Button disabled={loading} onPress={handleSubmit(onSubmit)}>
          {loading ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <Text className="text-white">Verify</Text>
          )}
        </Button>
        <Text className="text-center text-xs text-zinc-500">
          Please check you sms inbox you will findout our team sent you a verification code with 6-digits.
        </Text>
      </View>
    </ScrollView>
  );
}
