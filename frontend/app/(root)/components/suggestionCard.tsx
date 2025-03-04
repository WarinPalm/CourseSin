import { View, Text, TouchableWithoutFeedback, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';
import { CourseCardProps } from '../types/cardType';
import icons from '@/constants/icons';

const SuggestionCard: React.FC<CourseCardProps> = ({ item }) => {

    return (
        <Link href="/screens/courseDetail" asChild>
            <TouchableOpacity>
                <View className='mr-6 bg-white rounded-3xl shadow-lg'>
                    <Image className="h-36 w-72 bg-violet-500 rounded-t-3xl" />
                    <View className="px-3 pb-4 space-y-2">
                        <View className='flex-row items-center space-x-1 pt-2'>
                            <Image className='w-3 h-3 bg-yellow-500' />
                            <Text className='font-rubik text-sm ms-2 mt-1 text-gray-500'>{item.channel}</Text>
                        </View>
                        <Text className='text-lg font-rubik-bold mt-1'>{item.name}</Text>
                        <View className='flex-row items-center space-x-1'>
                            <Image source={icons.star} className='size-5' />
                            <Text className='font-rubik text-sm ms-1 mt-1 text-gray-500'>4.5 . {item.category}</Text>
                        </View>
                    </View>
                </View>
            </TouchableOpacity>
        </Link>

    );
};

export default SuggestionCard;