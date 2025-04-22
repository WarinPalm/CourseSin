import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from "@/constants/icons"
import useStore from '../store/store';
import { getProfile } from '@/app/(root)/api/user/user';
import { ProfileResponse } from '../types/responses/user';
import Constants from "expo-constants";
import images from '@/constants/images';

const API_URL_WITHOUT_API = Constants.expoConfig?.extra?.API_URL_WITHOUT_API;


interface SettingsItemProps {
    icon: ImageSourcePropType;
    title: string;
    onPress: () => void;
    textStyle?: string;
    showArrow?: boolean;
}

const SettingsItem = ({ icon, title, onPress, textStyle, showArrow = true }: SettingsItemProps) => {
    return (
        <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
            <View className='flex flex-row items-center gap-3'>
                <Image source={icon} className='size-6' />
                <Text className={`text-lg font-rubik-medium text-black-300 ${textStyle}`}>{title}</Text>
            </View>
            {showArrow && <Image source={icons.rightArrow} className='size-5' />}
        </TouchableOpacity>
    );
}


const Profile = () => {
    const [profile, setProfile] = useState<ProfileResponse>();
    const token = useStore((state) => state.token);
    const router = useRouter();
    const Logout = useStore(state => state.actionLogout);
    const handleLogout = () => {
        Logout();
    };
    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!token) throw new Error('Token is required');
                const res = await getProfile(token);
                setProfile(res.data.user);
            } catch (err) {
                console.error(err);
            }
        }
        fetchProfile();
    }, [profile])
    return (
        <SafeAreaView className='h-full bg-white'>
            <ScrollView showsVerticalScrollIndicator={false}
                contentContainerClassName='pb-32 px-7'>
                <View className='flex flex-row items-center justify-between mt-5'>
                    <Text className='text-xl font-rubik-bold'>
                        Profile
                    </Text>
                    <Image source={icons.bell} className='size-5' />
                </View>

                <View className='flex flex-row justify-center mt-5'>
                    <View className='flex flex-col items-center relative mt-5'>
                        <View className='relative'>
                 
                            <Image
                                className='bg-violet-500 size-44 rounded-full'
                                source={{
                                    uri: profile?.picture
                                        ? `${API_URL_WITHOUT_API}/uploads/profile/${profile.picture}`
                                        : Image.resolveAssetSource(images.user).uri,
                                }}
                            />
                            <TouchableOpacity
                                className='absolute bottom-1 right-2'
                                onPress={() => router.push('/screens/editProfile')}
                            >
                                <Image source={icons.edit} className='size-9' />
                            </TouchableOpacity>
                        </View>
                        <Text className='text-2xl font-rubik-bold mt-2 text-center'>
                            {profile?.f_name} {profile?.l_name}
                        </Text>
                    </View>
                </View>


                <View className='flex flex-col mt-10'>

                    <SettingsItem icon={icons.wallet} title='คอร์สเรียนที่ถูกใจ' onPress={() => router.push(`/screens/favVideo`)} />
                    <SettingsItem icon={icons.wallet} title='คอร์สเรียนของฉัน' onPress={() => router.push(`/screens/myVideo`)} />
                    <SettingsItem icon={icons.wallet} title='สร้างวีดีโอของคุณเอง' onPress={() => { router.push('/screens/create') }} />
                    <View className='border-b my-4'></View>
                    <SettingsItem icon={icons.logout} title='ออกจากระบบ' textStyle='text-red-500'
                        showArrow={false} onPress={handleLogout} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default Profile;
