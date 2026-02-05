import { View, Text, ScrollView, Pressable, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { ZodInput } from '@/components/custom/zod-input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { restSchema, RestSchema } from '@/lib/validation/rest-schema';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner-native';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { router } from 'expo-router';

import { useApi } from '@/hooks/use-api';

export default function rest() {
  const { control, handleSubmit } = useForm<RestSchema>({
    resolver: zodResolver(restSchema),
    defaultValues: {
      fullName: '',
      phoneNumber: '',
    },
  });

  const { post } = useApi();

  const [loading, setLoading] = useState(false);

  const onSubmit = (data: RestSchema) => {
    setLoading(true);
    post('/complete-register', data).then((res: any) => {
      if (res.error) {
        toast.error(res.error.message);
      }else{
        toast.success(res.data.message);
        router.push('/(auth)/complete/otp')
      }
      setLoading(false);
    });
  };

  return (
    <ScrollView contentContainerClassName="flex-1">
      <View className="flex-1 p-4">
        <View className="gap-y-2">
          <Text className="text-3xl">Complete your profile setup</Text>
          <Text className="text-zinc-600">Enter your full name and your phone number below.</Text>
        </View>
        <View className='w-full flex flex-row justify-center mt-4'>
          <View>
            <Avatar
              style={{
                width : 140,
                height : 140
              }}
              alt="@mrzachnugent"
              className="-mr-2 border-2 border-background web:border-0 web:ring-2 web:ring-background">
              
              <AvatarFallback>
                <Text className='text-3xl'>
                  JD
                </Text>
              </AvatarFallback>
            </Avatar>
          </View>
        </View>
        <View className="mt-4 gap-y-4">
          <View>
            <ZodInput
              control={control}
              editable={!loading}
              name="fullName"
              label="Full name"
              placeholder="John doe"
              autoCorrect={false}
              autoComplete="off"
              spellCheck={false}
            />
          </View>
          <View>
            <ZodInput
              control={control}
              name="phoneNumber"
              label="Phone number"
              placeholder="+962-000-0000"
              keyboardType="numeric"
              autoCapitalize="none"
              editable={!loading}
              maxLength={9}
            />
          </View>
        </View>
      </View>

      <View className="gap-y-2 p-4">
        <Button disabled={loading} onPress={handleSubmit(onSubmit)}>
          {loading ? (
            <ActivityIndicator size={'small'} color={'white'} />
          ) : (
            <Text className="text-white">Continue</Text>
          )}
        </Button>
        <Text className="text-center text-xs text-zinc-500">
          You will recieve an SMS message with OTP-code to veify your phone number.
        </Text>
      </View>
    </ScrollView>
  );
}
