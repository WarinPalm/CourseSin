import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import icons from "@/constants/icons";
import useStore from '../store/store';
import { watchChannelCourse, watchChannelProfile } from '@/app/(root)/api/user/user';
import Constants from "expo-constants";
const API_URL_WITHOUT_API = Constants.expoConfig?.extra?.API_URL_WITHOUT_API;

interface SettingsItemProps {
    icon: ImageSourcePropType;
    title: string;
    onPress: () => void;
    showArrow?: boolean;
}

const SettingsItem = ({ icon, title, onPress, showArrow = true }: SettingsItemProps) => {
    return (
        <TouchableOpacity onPress={onPress} className='flex flex-row items-center justify-between py-3'>
            <View className='flex flex-row items-center gap-3'>
                <Image source={icon} className='size-6' />
                <Text className='text-lg font-rubik-medium text-black-300'>{title}</Text>
            </View>
            {showArrow && <Image source={icons.rightArrow} className='size-5' />}
        </TouchableOpacity>
    );
}

const UserProfile = () => {

    const token = useStore((state) => state.token);

    const { id } = useLocalSearchParams<{ id?: string }>();
    const router = useRouter();

    //pagination
    const [user, setUser] = useState<{ f_name: string, l_name: string, picture:string } | null>(null);

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                if (!token) throw new Error('Token is required');
                if (!id) throw new Error('User ID is required');

                const res = await watchChannelProfile(token, id);
                setUser({ f_name: res.data.channel.f_name, l_name: res.data.channel.l_name, picture: res.data.channel.picture});

            } catch (err) {
                console.error(err);
            }
        };

        fetchCourses();
    }, []);

    return (
        <SafeAreaView className='h-full bg-white'>
            <View className='relative'>
                <TouchableOpacity onPress={() => router.back()}
                    className='absolute bg-white top-4 left-4 p-2 rounded-full z-10'>
                    <Image source={icons.backArrow} className='size-7' />
                </TouchableOpacity>
                <Text className='text-center font-rubik-bold text-xl mt-7'></Text>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerClassName='pb-32 px-7'>
                <View className='flex flex-row justify-center mt-5'>
                    <View className='flex flex-col items-center relative mt-5'>
                        <Image
                            className='bg-violet-500 size-44 rounded-full'
                            source={{ uri: `${API_URL_WITHOUT_API}/uploads/profile/${user?.picture}` }}
                        />
                        <Text className='text-2xl font-rubik-bold mt-2'>{user?.f_name} {user?.l_name}</Text>

                    </View>
                </View>


                <View className='flex flex-col mt-10'>
                    {/* <SettingsItem icon={icons.wallet} title='คอร์สเรียนที่ถูกใจ' onPress={() => router.push(`/screens/favVideo?id=${id}`)} /> */}
                    <SettingsItem icon={icons.wallet} title='คอร์สเรียนที่เป็นเจ้าของ' onPress={() => router.push(`/screens/watchVideo?id=${id}&fname=${encodeURIComponent(user?.f_name || '')}`)} />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default UserProfile;
