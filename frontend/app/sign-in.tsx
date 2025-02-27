import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from "@/constants/images"
import icons from "@/constants/icons"
import { Redirect } from 'expo-router'

const SignIn = () => {
    const loading = false; //กำลังโหลดรึป่าว
    const isLoggedIn = false; //true - login แล้ว, false - ยังไม่ login
    if(!loading && isLoggedIn) return <Redirect href="/"/> //ถ้าเขามี token login แล้ว ให้ไปหน้า home

    const result = true;
    const handleLogin = () => { 
        if(result){
            console.log('Login Success');
        }else{
            Alert.alert('Error','Failed to login');
        }
    };
    return (
        <SafeAreaView className='bg-white h-full'>
            <ScrollView contentContainerClassName='h-full'>
                <Image source={images.onboarding} className="w-full h-3/6" resizeMode="contain" />
                <View className='px-10'>
                    <Text className='text-base text-center uppercase font-rubik text-black-200'>
                        Welcome to CourseSin
                    </Text>
                    <Text className='text-2xl font-rubik-bold text-black-300 text-center mt-2'>
                        Let's Learning yourself to{"\n"}
                        <Text className='text-blue-600'>Make Your Dream</Text>
                    </Text>
                    <Text className='text-lg font-rubik text-black text-center mt-12'>
                        Login to CourseSin with Google
                    </Text>
                    <TouchableOpacity onPress={handleLogin}
                        className='bg-white shadow-md shadow-zinc-400 rounded-full w-full py-4 mt-5'>
                        <View className='flex flex-row items-center justify-center'>
                            <Image source={icons.google} className='w-5 h-5' resizeMode='contain' />
                            <Text className='text-lg font-rubik-bold text-black ml-2'>
                                Continue with Google
                            </Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default SignIn