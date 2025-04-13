import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import CourseCard from '../components/courseCard';
import { useRouter } from 'expo-router';
import icons from '@/constants/icons';
import NoResults from '../components/NoResults';
import { useLocalSearchParams } from 'expo-router';
import Pagination from '../components/Pagination';

const ViewAll = () => {
    const [loading, setLoading] = useState<Boolean>(false);
    const courses = [
        { id: '1', name: 'Python Basics', channel: 'Channel 1', category: 'Python', createBy: '1' },
        { id: '2', name: 'React Native', channel: 'Channel 2', category: 'React', createBy: '2' },
        { id: '3', name: 'HTML Mastery', channel: 'Channel 3', category: 'HTML', createBy: '3' },
        { id: '4', name: 'CSS for Beginners', channel: 'Channel 4', category: 'CSS', createBy: '4' },
        { id: '5', name: 'JavaScript Fundamentals', channel: 'Channel 5', category: 'JavaScript', createBy: '5' },
        { id: '6', name: 'TypeScript Deep Dive', channel: 'Channel 6', category: 'TypeScript', createBy: '6' },
        { id: '7', name: 'Flutter', channel: 'Channel 6', category: 'Flutter', createBy: '7' },
        { id: '8', name: 'React Hooks Explained', channel: 'Channel 7', category: 'React Native', createBy: '8' },
        { id: '9', name: 'C# for Unity', channel: 'Channel 8', category: 'C#', createBy: '9' },
        { id: '10', name: 'C++ Game Dev', channel: 'Channel 9', category: 'C++', createBy: '10' },
    ];
    const { category } = useLocalSearchParams();
    const filteredCourses = category === 'All' || !category ? courses : courses.filter((course) => course.category === category);
    const router = useRouter();

    const handleCardClick = (id: string) => {
        router.push(`/properties/${id}`);
    }
    //pagination
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(5);

    // คำนวณค่าที่จะแสดงในหน้านั้น
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentCourses = filteredCourses.slice(indexOfFirstItem, indexOfLastItem);

    // reset page to 1 เมื่อเปลี่ยนหมวดหมู่
    useEffect(() => {
        setCurrentPage(1);
    }, [category]);
    return (
        <SafeAreaView className='bg-white pb-3 flex-1'>

            {/* button back */}
            <View className='relative'>
                <TouchableOpacity onPress={() => router.back()}
                    className='absolute bg-white top-4 left-4 p-2 rounded-full z-10'>
                    <Image source={icons.backArrow} className='size-7' />
                </TouchableOpacity>
                <Text className='text-center font-rubik-bold text-xl mt-7'>{category}</Text>
            </View>

            {/* card */}
            <View className='mt-2 px-3'>
                <FlatList
                    data={currentCourses}
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

            {/* Pagination */}
            <Pagination
                currentPage={currentPage}
                totalItems={filteredCourses.length}
                itemsPerPage={itemsPerPage}
                onPageChange={(page) => setCurrentPage(page)}
                onItemsPerPageChange={(perPage) => {
                    setItemsPerPage(perPage);
                    setCurrentPage(1);
                }}
            />
        </SafeAreaView>
    );
}

export default ViewAll;