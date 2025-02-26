import { View, Text, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import CourseCard from '../components/courseCard';
import * as Icon from 'react-native-feather';
import { useNavigation } from '@react-navigation/native';

const ViewAll = () => {
    const navigation = useNavigation();
    const courses = [
        { id: 1, name: 'CourseName1', description: 'Learn the basics of Python programming.', category: 'Programming' },
        { id: 2, name: 'CourseName2', description: 'Deep dive into React and its ecosystem.', category: 'Web Development' },
        { id: 3, name: 'CourseName3', description: 'Introduction to HTML and CSS.', category: 'Web Development' },
        { id: 4, name: 'CourseName4', description: 'Advanced JavaScript techniques.', category: 'Programming' },
        { id: 5, name: 'CourseName5', description: 'Advanced JavaScript techniques.', category: 'Programming' },
        { id: 6, name: 'CourseName6', description: 'Advanced JavaScript techniques.', category: 'Programming' },
        { id: 7, name: 'CourseName7', description: 'Advanced JavaScript techniques.', category: 'Programming' },
        { id: 8, name: 'CourseName8', description: 'Advanced JavaScript techniques.', category: 'Programming' },
        { id: 9, name: 'CourseName9', description: 'Advanced JavaScript techniques.', category: 'Programming' }
    ];

    return (
        <SafeAreaView className='bg-white flex-1'>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {/* button back */}
                <View className='relative'>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        className='absolute bg-white top-4 left-4 p-2 rounded-full z-10'>
                        <Icon.ArrowLeft strokeWidth={3} color={"black"} />
                    </TouchableOpacity>
                    <Text className='text-center font-bold text-xl mt-5'>Category: xxxxx</Text>
                </View>

                <View className='mt-5 px-4 flex-row flex-wrap'>
                    {courses.map((course, index) => (
                        <View key={index} className='w-1/2 p-2'>
                            <CourseCard item={course} />
                        </View>
                    ))}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ViewAll;