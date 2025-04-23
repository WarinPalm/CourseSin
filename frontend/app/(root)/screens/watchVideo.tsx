import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import CourseCard from '../components/courseCard';
import { useRouter } from 'expo-router';
import icons from '@/constants/icons';
import NoResults from '../components/NoResults';
import { useLocalSearchParams } from 'expo-router';
import Pagination from '../components/Pagination';
import useStore from '../store/store';
import { ViewCourseResponse } from '../types/responses/course';
import { watchChannelCourse } from '@/app/(root)/api/user/user';


const WatchVideo = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const token = useStore((state) => state.token);
    const params = useLocalSearchParams();
    const id = Array.isArray(params.category) ? params.category[0] : (params.id as string);
    const fname = Array.isArray(params.name) ? params.name[0] : params.fname;

    //pagination
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const [courses, setCourses] = useState<ViewCourseResponse[]>();
    const [totalPage, setTotalPage] = useState<number>(0);
    const [user, setUser] = useState<{ f_name: string, l_name: string } | null>(null);

    const router = useRouter();

    useEffect(() => {
        const fetchCourses = async () => {
            try {
                if (!token) throw new Error('Token is required');

                setLoading(true);
                const res = await watchChannelCourse(token, id as string, page, limit);
                setCourses(res.data.channel.course);
                setTotalPage(res.data.total_pages)
                setUser({ f_name: res.data.channel.f_name, l_name: res.data.channel.l_name });

            } catch (err) {
                console.error(err);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, [page, limit]);


    const handleCardClick = (id: string) => {
        router.push(`/properties/${id}`);
    };
    return (
        <SafeAreaView className='bg-white pb-3 flex-1'>
            <View className='relative'>
                <TouchableOpacity onPress={() => router.back()} className='absolute bg-white top-4 left-4 p-2 rounded-full z-10'>
                    <Image source={icons.backArrow} className='size-7' />
                </TouchableOpacity>
                <Text className='text-center font-rubik-bold text-xl mt-7'>{fname}'s Video</Text>
            </View>

            <View className='mt-2 px-3'>
                <FlatList
                    data={courses}
                    keyExtractor={(course) => course.id}
                    renderItem={({ item }) => (
                        <View className='w-100 p-2'>
                            <CourseCard 
                            thumbnail={item.thumbnail} 
                            title={item.title}
                                f_name={user?.f_name} 
                                l_name={user?.l_name}
                                category_name={item.Category.name} 
                                like={item._count.like}
                                onPress={() => handleCardClick(item.id)}
                            />
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={
                        loading ? (
                            <ActivityIndicator size="large" className='text-violet-500 mt-5' />
                        ) : <NoResults />
                    }
                    ListFooterComponent={
                        (totalPage > 1 || (courses && courses.length > 0 && courses.length <= limit)) ? (
                            <Pagination page={page} totalPage={totalPage || page + 1} setPage={setPage} limit={limit} setLimit={setLimit} />
                        ) : null
                    }
                />
            </View>


        </SafeAreaView>
    );
};

export default WatchVideo;
