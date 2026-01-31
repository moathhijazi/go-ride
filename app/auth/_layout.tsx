import { View, Text } from 'react-native'
import React from 'react'
import "@/global.css"
import { Slot } from 'expo-router'
import { SafeAreaView } from 'react-native-safe-area-context'
export default function _layout() {
  return (
    <SafeAreaView className='flex-1'>
        <Slot />
    </SafeAreaView>
  )
}