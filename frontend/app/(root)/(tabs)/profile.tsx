import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import React, { useState } from 'react';

import { Link } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from "@/constants/icons"

interface SettingsItemProps{
    icon: ImageSourcePropType;
    title: string;
    onPress: () => void;
    textStyle?: string;
    showArrow?: boolean;
}

const SettingsItem = ({ icon, title, onPress, textStyle, showArrow = true}:SettingsItemProps) =>{
    return (
        <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
            <View className='flex flex-row items-center gap-3'>
                <Image source={icon} className='size-6'/>
                <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
            </View>
            {showArrow && <Image source={icons.rightArrow} className='size-5'/>}
        </TouchableOpacity>
    );
}

const Profile = () => {
    const handleLogout = () =>{};

    return (
        <SafeAreaView className='h-full bg-white'>
            <ScrollView showsVerticalScrollIndicator={false}
            contentContainerClassName='pb-32 px-7'>
                <View className='flex flex-row items-center justify-between mt-5'>
                    <Text className='text-xl font-rubik-bold'>
                    Profile
                    </Text>
                    <Image source={icons.bell} className='size-5'/>
                </View>

                <View className='flex flex-row justify-center mt-5'>
                    <View className='flex flex-col items-center relative mt-5'>
                        <Image className='bg-purple-500 size-44 rounded-full'/>
                        <TouchableOpacity className='absolute bottom-11 right-2'>
                            <Image source={icons.edit} className='size-9'/>
                        </TouchableOpacity>
                        <Text className='text-2xl font-rubik-bold mt-2'>Warin Phromwaranon</Text>
                    </View>
                </View>

                <View className='flex flex-col mt-10'>
                    <SettingsItem icon={icons.calendar} title='My bookings' onPress={() => {}}/>
                    <SettingsItem icon={icons.wallet} title='Payment' onPress={() => {}}/>
                </View>

              

            </ScrollView>
            
        </SafeAreaView>
    );
}

export default Profile;