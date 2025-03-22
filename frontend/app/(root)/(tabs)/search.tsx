// Search.tsx
import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import * as Icon from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import Category from '../components/category';
import CourseCard from '../components/courseCard';
import SearchBar from '../components/searchBar';
import NoResults from '../components/NoResults';

const Search = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchText, setSearchText] = useState<string>(''); 

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

  const filteredCourses = courses.filter(course =>
    (selectedCategory === 'All' || course.category === selectedCategory) &&
    course.name.toLowerCase().includes(searchText.toLowerCase())
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
        data={filteredCourses}
        keyExtractor={(course) => course.id}
        renderItem={({ item }) => (
          <View className="w-100 px-3 p-2">
            <CourseCard item={item} onPress={() => handleCardClick(item.id)} />
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
              <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
            </View>

            {/* all course */}
            <View className="mt-2 mb-2">
              <View className="flex-row items-center justify-between px-4">
                <View>
                  <Text className="font-rubik-bold text-lg">คอร์สเรียน</Text>
                  <Text className="font-rubik text-black text-xs">คอร์สเรียนทั้งหมด</Text>
                </View>
                <TouchableOpacity onPress={() => router.push("/screens/viewAll")}>
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
