import { View, Text, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { CourseCardProps } from '../types/responses/course';
import icons from '@/constants/icons';
import Constants from "expo-constants";
const API_URL_WITHOUT_API = Constants.expoConfig?.extra?.API_URL_WITHOUT_API;

const SuggestionCard: React.FC<CourseCardProps> = ({ thumbnail, title, f_name, l_name, category_name, like, onPress}) => {
    return (

        <TouchableOpacity onPress={onPress}>
            <View className='mr-6 bg-white rounded-3xl shadow-lg'>
                <Image
                    className="h-36 w-72 bg-violet-500 rounded-t-3xl"
                    source={{ uri: `${API_URL_WITHOUT_API}/uploads/video/thumbnail/${thumbnail}` }}
                />


                <View className="px-3 pb-4 space-y-2">
                    <View className='flex-row items-center space-x-1 pt-2'>
                        <Image className='w-3 h-3 bg-violet-700 rounded-full' />
                        <Text className='font-rubik text-sm ms-2 mt-1 text-gray-500'>{f_name} {l_name}</Text>
                    </View>
                    <Text className='text-lg font-rubik-bold mt-1'>{title}</Text>
                    <View className='flex-row items-center space-x-1'>
                        <Image source={icons.star} className='size-5' />
                        <Text className='font-rubik text-sm ms-1 mt-1 text-gray-500'>{like} . {category_name}</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>


    );
};

export default SuggestionCard;