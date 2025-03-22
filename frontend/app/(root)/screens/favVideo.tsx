import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import CourseCard from '../components/courseCard';
import { useRouter } from 'expo-router';
import icons from '@/constants/icons';
import NoResults from '../components/NoResults';

const FavVideo = () => {
    const [loading, setLoading] = useState<Boolean>(false);
    const router = useRouter();
    const courses = [
        { id: '1', name: 'Python Basics', channel: 'Channel 1', category: 'Python' },
        { id: '2', name: 'React Native', channel: 'Channel 2', category: 'React' },
        { id: '3', name: 'HTML Mastery', channel: 'Channel 3', category: 'HTML' },
        { id: '4', name: 'CSS for Beginners', channel: 'Channel 4', category: 'CSS' },
        { id: '5', name: 'JavaScript Fundamentals', channel: 'Channel 5', category: 'JavaScript' },
        { id: '6', name: 'TypeScript Deep Dive', channel: 'Channel 6', category: 'TypeScript' },
        { id: '7', name: 'React Hooks Explained', channel: 'Channel 7', category: 'ReactNative' },
        { id: '8', name: 'C# for Unity', channel: 'Channel 8', category: 'C#' },
        { id: '9', name: 'C++ Game Dev', channel: 'Channel 9', category: 'C++' }
      ];
    const handleCardClick = (id: string) => {
        router.push(`/properties/${id}`);
    }
    return (
        <SafeAreaView className='bg-white pb-3 flex-1'>

            {/* button back */}
            <View className='relative'>
                <TouchableOpacity onPress={() => router.back()}
                    className='absolute bg-white top-4 left-4 p-2 rounded-full z-10'>
                    <Image source={icons.backArrow} className='size-7' />
                </TouchableOpacity>
                <Text className='text-center font-rubik-bold text-xl mt-7'>Favorite Video</Text>
            </View>

            {/* card */}
            <View className='mt-2 px-3'>
                <FlatList
                    data={courses}
                    keyExtractor={(course) => course.id}
                    renderItem={({ item }) => (
                        <View className='w-100 p-2'>
                            <CourseCard item={item} onPress={() => handleCardClick(item.id)} />
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 60 }}
                    ListEmptyComponent={
                        loading ? (
                            <ActivityIndicator size="large"
                                className='text-violet-500 mt-5' />
                        ) : <NoResults />
                    }
                />
            </View>

        </SafeAreaView>
    );
}

export default FavVideo;