import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import CourseCard from '../components/courseCard';
import { useRouter } from 'expo-router';
import { useNavigation } from '@react-navigation/native';
import icons from '@/constants/icons';
import NoResults from '../components/NoResults';

const ViewAll = () => {
    const navigation = useNavigation();
    const [loading, setLoading] = useState<Boolean>(false);
    const router = useRouter();
    const courses = [
        { id: '1', name: 'CourseName1', channel: 'Channel 1', category: 'Python' },
        { id: '2', name: 'CourseName2', channel: 'Channel 2', category: 'React' },
        { id: '3', name: 'CourseName3', channel: 'Channel 3', category: 'HTML' },
        { id: '4', name: 'CourseName4', channel: 'Channel 4', category: 'CSS' },
        { id: '5', name: 'CourseName5', channel: 'Channel 5', category: 'JavaScript' },
        { id: '6', name: 'CourseName6', channel: 'Channel 6', category: 'TypeScript' },
        { id: '7', name: 'CourseName7', channel: 'Channel 7', category: 'ReactNative' },
        { id: '8', name: 'CourseName8', channel: 'Channel 8', category: 'C#' },
        { id: '9', name: 'CourseName9', channel: 'Channel 9', category: 'C++' }
    ];
    const handleCardClick = (id: string) => {
        router.push(`/properties/${id}`);
    }
    return (
        <SafeAreaView className='bg-white flex-1'>

            {/* button back */}
            <View className='relative'>
                <TouchableOpacity onPress={() => navigation.goBack()}
                    className='absolute bg-white top-4 left-4 p-2 rounded-full z-10'>
                    <Image source={icons.backArrow} className='size-7' />
                </TouchableOpacity>
                <Text className='text-center font-rubik-bold text-xl mt-7'>ViewAll</Text>
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

export default ViewAll;