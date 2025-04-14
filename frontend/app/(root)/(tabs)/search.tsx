// Search.tsx
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Icon from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Category from '../components/category';
import CourseCard from '../components/courseCard';
import SearchBar from '../components/searchBar';
import NoResults from '../components/NoResults';
import { getAllCourse, getCourseByCategory } from '../api/course/course';
import { CourseType } from '../types/courseType';
import useStore from '../store/store';
const Search = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [categoryName, setCategoryName] = useState<string>('All');
  const token = useStore((state) => state.token);
  const [courses, setCourses] = useState<CourseType[]>();
  const [searchText, setSearchText] = useState<string>('');

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
  const filteredCourses = courses?.filter(course =>
    (selectedCategory === 'All' || course.Category.id === selectedCategory) &&
    course.title.toLowerCase().includes(searchText.toLowerCase())
  );


  const handleCardClick = (id: string) => {
    router.push(`/properties/${id}`);
  };


  const handleSearch = (text: string) => {
    setSearchText(text);
  };

  return (
    <SafeAreaView className="bg-white pb-3 flex-1">
      <FlatList
        data={filteredCourses?.slice(0, 3)}
        keyExtractor={(course) => course.id}
        renderItem={({ item }) => (
          <View className="w-100 px-3 p-2">
            <CourseCard thumbnail={item.thumbnail} title={item.title}
              f_name={item.Channel.f_name} l_name={item.Channel.l_name}
              category_name={item.Category.name} onPress={() => handleCardClick(item.id)}
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
            {/* Search Bar */}
            <View className="mx-4 my-5">
              <SearchBar onSearch={handleSearch} />
            </View>

            {/* bar */}
            <View className="flex-row items-center justify-between mx-9">
              <TouchableOpacity className="flex-1 p-4 bg-purple-600 rounded-md mr-2">
                <View className="flex-row items-center justify-center">
                  <Icon.Folder height={20} width={20} stroke="white" />
                  <Text className="font-rubik text-white ms-3">คอร์สเรียนทั้งหมด</Text>
                </View>
              </TouchableOpacity>
              <TouchableOpacity className="flex-1 p-4 bg-blue-600 rounded-md ml-2">
                <View className="flex-row items-center justify-center">
                  <Icon.Menu height={20} width={20} stroke="white" />
                  <Text className="font-rubik text-white ms-3">ช่องที่แนะนำ</Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* category */}
            <View className="my-4">
              <View className="flex-row items-center ms-3 my-2">
                <Icon.Book height={20} width={20} stroke="black" />
                <Text className="ms-2 font-rubik-bold text-xl">หมวดหมู่</Text>
              </View>
              <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory}
                categoryName={categoryName} setCategoryName={setCategoryName}
              />
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

export default Search;
