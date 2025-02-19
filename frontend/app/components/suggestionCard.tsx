import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router';

interface Course {
    id: number;
    name: string;
    description: string;
    category: string;
}

interface SuggestionCardProps {
    item: Course;
}

const SuggestionCard: React.FC<SuggestionCardProps> = ({ item }) => {

    return (
        <Link href="/screens/courseDetail" asChild>
            <TouchableWithoutFeedback>
                <View className='mr-6 bg-white rounded-3xl shadow-lg'>
                    <Image className="h-36 w-64 bg-purple-500 rounded-t-3xl" />
                    <View className="px-3 pb-4 space-y-2">
                        <Text className='text-lg font-bold pt-2'>{item.name}</Text>
                        <View className='flex-row items-center space-x-1'>
                            <Image className='w-4 h-4 bg-yellow-500' />
                            <Text className='text-sm ms-2 text-gray-500'>4.5 . {item.category}</Text>
                        </View>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </Link>

    );
};

export default SuggestionCard;