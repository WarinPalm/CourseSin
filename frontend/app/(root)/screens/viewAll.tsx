import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import CourseCard from '../components/courseCard';
import { useRouter } from 'expo-router';
import icons from '@/constants/icons';
import NoResults from '../components/NoResults';
import { useLocalSearchParams } from 'expo-router';
import Pagination from '../components/Pagination';
import useStore from '../store/store';
import { CourseType } from '../types/courseType';
import { getAllCoursePagination, getCatCoursePagination } from '../api/course/course';

const ViewAll = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const [selectedCategory, setSelectedCategory] = useState<string>('All');
    const token = useStore((state) => state.token);
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const [courses, setCourses] = useState<CourseType[]>();

    const { category } = useLocalSearchParams();
    const router = useRouter();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                if (!token) throw new Error('Token is required');
                
                setLoading(true);
                if (selectedCategory === 'All') {
                    const res = await getAllCoursePagination(token,page,limit);
                    setCourses(res.data.courses);
                } else {
                    const res = await getCatCoursePagination(token, page,limit);
                    setCourses(res.data.courses);
                }

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [category, page, limit]); // Added page and limit as dependencies

    const filteredCourses = category === 'All' || !category ? courses : courses?.filter((course) => course?.Category.name === category);

    const handleCardClick = (id: string) => {
        router.push(`/properties/${id}`);
    };

    return (
        <SafeAreaView className='bg-white pb-3 flex-1'>
            <View className='relative'>
                <TouchableOpacity onPress={() => router.back()} className='absolute bg-white top-4 left-4 p-2 rounded-full z-10'>
                    <Image source={icons.backArrow} className='size-7' />
                </TouchableOpacity>
                <Text className='text-center font-rubik-bold text-xl mt-7'>{category}</Text>
            </View>

            <View className='mt-2 px-3'>
                <FlatList
                    data={filteredCourses}
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
                            <ActivityIndicator size="large" className='text-violet-500 mt-5' />
                        ) : <NoResults />
                    }
                />
            </View>

            {/* Pagination */}
            <Pagination
                currentPage={page}
                totalItems={filteredCourses?.length || 0}
                itemsPerPage={limit}
                onPageChange={setPage}
                onItemsPerPageChange={setLimit}
            />
        </SafeAreaView>
    );
};

export default ViewAll;
