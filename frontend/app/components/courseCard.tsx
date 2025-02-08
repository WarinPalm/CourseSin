import { View, Text, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';

interface Course {
    id: number;
    name: string;
    description: string;
    category: string;
}

interface CourseCardProps {
    item: Course;
}

const CourseCard: React.FC<CourseCardProps> = ({ item }) => {
    return (

        <TouchableOpacity className='bg-white rounded-3xl shadow-lg w-full p-2'>
            <Image className="h-36 w-full bg-purple-500 rounded-t-3xl" />
            <View className="px-3 pb-4 space-y-2">
                <Text className='text-lg font-bold pt-2'>{item.name}</Text>
                <View className='flex-row items-center space-x-1'>
                    <Image className='w-4 h-4 bg-yellow-500' />
                    <Text className='text-sm ms-2 text-gray-500'>4.5 . {item.category}</Text>
                </View>
                <Text className='text-sm text-gray-500'>{item.description}</Text>
            </View>
        </TouchableOpacity>


    );
};

export default CourseCard;
