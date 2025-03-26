import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import React, { useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from "@/constants/icons"

interface SettingsItemProps {
    icon: ImageSourcePropType;
    title: string;
    onPress: () => void;
    textStyle?: string;
    showArrow?: boolean;
}

const SettingsItem = ({ icon, title, onPress, showArrow = true }: SettingsItemProps) => {
    return (
        <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
            <View className='flex flex-row items-center gap-3'>
                <Image source={icon} className='size-6' />
                <Text className={`text-lg font-rubik-medium text-black-300`}>{title}</Text>
            </View>
            {showArrow && <Image source={icons.rightArrow} className='size-5' />}
        </TouchableOpacity>
    );
}

const UserProfile = () => {
    const handleLogout = () => { };
    const { id } = useLocalSearchParams<{ id?: string }>();
    const router = useRouter();
    return (
        <SafeAreaView className='h-full bg-white'>
            <View className='relative'>
                    <TouchableOpacity onPress={() => router.back()}
                        className='absolute bg-white top-4 left-4 p-2 rounded-full z-10'>
                        <Image source={icons.backArrow} className='size-7' />
                    </TouchableOpacity>
                    <Text className='text-center font-rubik-bold text-xl mt-7'></Text>
                </View>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerClassName='pb-32 px-7'>
                
               

                <View className='flex flex-row justify-center mt-5'>
                    <View className='flex flex-col items-center relative mt-5'>
                        <Image className='bg-violet-500 size-44 rounded-full' />
                        
                        <Text className='text-2xl font-rubik-bold mt-2'>Warin Phromwaranon {1}</Text>
                    </View>
                </View>
                <View className='flex flex-row justify-between mx-16 mt-4'>

                    <TouchableOpacity onPress={() => router.push("/screens/follower")}>
                        <Text className='text-center font-rubik-bold'>200</Text>
                        <Text className='text-xl font-rubik'>ผู้ติดตาม</Text>
                    </TouchableOpacity>


                    <TouchableOpacity onPress={() => router.push("/screens/follower")}>
                        <Text className='text-center font-rubik-bold'>300</Text>
                        <Text className='text-xl font-rubik'>กำลังติดตาม</Text>
                    </TouchableOpacity>

                </View>

                <View className='flex flex-col mt-10'>
                    <SettingsItem icon={icons.wallet} title='คอร์สเรียนที่ถูกใจ' onPress={() => router.push(`/screens/favVideo?id=${id}`)} />                    
                    <SettingsItem icon={icons.wallet} title='คอร์สเรียนที่เป็นเจ้าของ' onPress={() => router.push(`/screens/myVideo?id=${id}`)} />                    
                    
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default UserProfile;
