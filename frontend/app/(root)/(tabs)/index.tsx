import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icon from 'react-native-feather';

import Category from '../components/category';
import CourseCard from '../components/courseCard';
import Navbar from '../components/navbar';
import { useRouter } from 'expo-router';
import SuggestionCard from '../components/suggestionCard';
import NoResults from '../components/NoResults';
import { getAllCourse, getCourseByCategory } from '../api/course/course';
import { CourseResponse } from '../types/responses/course';
import useStore from '../store/store';

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categoryName, setCategoryName] = useState<string>('All');
  const token = useStore((state) => state.token);
  const [courses, setCourses] = useState<CourseResponse[]>();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (!token) throw new Error('Token is required');

        setLoading(true);

        if (selectedCategory === 'All') {
          const res = await getAllCourse(token);
          setCourses(res.data.courses);
        } else {
          const res = await getCourseByCategory(selectedCategory, token);
          setCourses(res.data.courses);
        }

      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCourses();
  }, [selectedCategory]);

  const handleCardClick = (id: string) => {
    router.push(`/properties/${id}`);
  };

  return (
    <SafeAreaView className="bg-white pb-3 flex-1">
      <FlatList
        data={courses?.slice(0, 3)}
        keyExtractor={(course) => course.id}
        renderItem={({ item }) => (
          <View className="w-100 px-3 p-2">
            <CourseCard
              thumbnail={item.thumbnail}
              title={item.title}
              f_name={item.Channel.f_name}
              l_name={item.Channel.l_name}
              category_name={item.Category.name}
              like={item._count?.like}
              onPress={() => handleCardClick(item.id)}
            />
          </View>
        )}
        contentContainerStyle={{ paddingBottom: 60 }}
        ListEmptyComponent={
          loading ? (
            <ActivityIndicator size="large" className="text-violet-500 mt-5" />
          ) : (
            <NoResults />
          )
        }
        ListHeaderComponent={
          <>
            {/* Navbar */}
            <Navbar />
            {/* <Text>{token}</Text> */}

            {/* search bar */}
            {/* category */}
            <View className="flex-row items-center ms-3 my-4">
              <Icon.Book height={20} width={20} stroke="black" />
              <Text className="ms-2 font-bold text-xl">หมวดหมู่</Text>
            </View>
            <Category
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              categoryName={categoryName}
              setCategoryName={setCategoryName}
            />

            {/* suggestion */}
            <View className="mt-3">
              <View className="flex-row items-center justify-between px-4">
                <View>
                  <Text className="font-rubik-bold text-lg">คอร์สแนะนำ</Text>
                  <Text className="font-rubik text-black text-xs">ยอดนิยม</Text>
                </View>
                <TouchableOpacity onPress={() => router.push(`/screens/viewAll?category=${selectedCategory}&name=${encodeURIComponent(categoryName)}`)}>
                  <Text className="font-rubik-semibold text-black">ดูทั้งหมด</Text>
                </TouchableOpacity>
              </View>

              {/* Suggestion Card */}
              <View className="py-5">
                <FlatList
                  data={courses}
                  keyExtractor={(course) => course.id}
                  renderItem={({ item }) => (

                    <SuggestionCard
                      thumbnail={item.thumbnail}
                      title={item.title}
                      f_name={item.Channel.f_name}
                      l_name={item.Channel.l_name}
                      category_name={item.Category.name}
                      like={item._count?.like}
                      onPress={() => handleCardClick(item.id)}
                    />

                  )}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 10 }}
                  ListEmptyComponent={
                    loading ? (
                      <View className="w-[300px] h-40 justify-center items-center">
                        <ActivityIndicator size="large" className="text-violet-500 mt-5" />
                      </View>
                    ) : (
                      <NoResults />
                    )
                  }
                />
              </View>
            </View>

            {/* all course */}
            <View className="mt-2 mb-2">
              <View className="flex-row items-center justify-between px-4">
                <View>
                  <Text className="font-rubik-bold text-lg">คอร์สเรียน</Text>
                  <Text className="font-rubik text-black text-xs">คอร์สเรียนทั้งหมด</Text>
                </View>
                <TouchableOpacity onPress={() => router.push(`/screens/viewAll?category=${selectedCategory}&name=${encodeURIComponent(categoryName)}`)}>
                  <Text className="font-rubik-semibold text-black">ดูทั้งหมด</Text>
                </TouchableOpacity>
              </View>
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

export default Home;
