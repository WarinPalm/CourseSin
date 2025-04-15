import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { Link } from 'expo-router';
import { CourseCardProps } from '../types/courseType';
import icons from '@/constants/icons';
import Constants from "expo-constants";
const API_URL_WITHOUT_API = Constants.expoConfig?.extra?.API_URL_WITHOUT_API;

const CourseCard: React.FC<CourseCardProps> = ({ thumbnail, title, f_name, l_name, category_name, like, onPress }) => {
    
    return (

        <TouchableOpacity onPress={onPress} className='bg-white rounded-3xl shadow-lg p-1 pb-3 flex-row'>
            <View className='w-2/5'>
                <Image
                    className="w-full bg-violet-500 rounded-3xl"
                    style={{ aspectRatio: 1.5, resizeMode: 'cover' }}
                    source={{ uri: `${API_URL_WITHOUT_API}/uploads/video/thumbnail/${thumbnail}` }}
                />
            </View>

            <View className='w-2/3 px-4 pb-4 space-y-2'>
                <Text className='text-lg font-rubik-bold pt-3'>{title}</Text>
                <View className='flex-row items-center space-x-1'>
                    <Image className='w-4 h-4 bg-yellow-500' />
                    <Text className='font-rubik text-sm ms-2 mt-1 text-gray-500'>{f_name} {l_name}</Text>
                </View>
                <View className='flex-row items-center space-x-1 pt-1'>
                    <Image source={icons.star} className='size-5' />
                    <Text className='font-rubik text-sm ms-1 mt-1 text-gray-500'>{like} . {category_name}</Text>
                </View>

            </View>
        </TouchableOpacity>

    );
};

export default CourseCard;