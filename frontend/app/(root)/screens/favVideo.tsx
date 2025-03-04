import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import React from 'react';
import CourseCard from '../components/courseCard';

import { useNavigation } from '@react-navigation/native';
import icons from '@/constants/icons';

const FavVideo = () => {
    const navigation = useNavigation();
    const courses = [
        { id: 1, name: 'CourseName1', channel: 'Channel 1', category: 'Programming' },
        { id: 2, name: 'CourseName2', channel: 'Channel 2', category: 'Web Development' },
        { id: 3, name: 'CourseName3', channel: 'Channel 3', category: 'Web Development' },
        { id: 4, name: 'CourseName4', channel: 'Channel 4', category: 'Programming' },
        { id: 5, name: 'CourseName5', channel: 'Channel 5', category: 'Programming' },
        { id: 6, name: 'CourseName6', channel: 'Channel 6', category: 'Programming' },
        { id: 7, name: 'CourseName7', channel: 'Channel 7', category: 'Programming' },
        { id: 8, name: 'CourseName8', channel: 'Channel 8', category: 'Programming' },
        { id: 9, name: 'CourseName9', channel: 'Channel 9', category: 'Programming' }
      ];

    return (
        <SafeAreaView className='bg-white flex-1'>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {/* button back */}
                <View className='relative'>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        className='absolute bg-white top-4 left-4 p-2 rounded-full z-10'>
                        <Image source={icons.backArrow} className='size-7'/>
                    </TouchableOpacity>
                    <Text className='text-center font-rubik-bold text-xl mt-7'>Favorite Video</Text>
                </View>

                <View className='mt-5 px-3 flex-col'>
                    {courses.map((course, index) => (
                        <View key={index} className='p-2'>
                            <CourseCard item={course} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default FavVideo;