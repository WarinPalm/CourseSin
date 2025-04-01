import { View, Text, TouchableOpacity, FlatList, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icon from 'react-native-feather';
import axios from 'axios';
import Constants from 'expo-constants';

import Category from '../components/category';
import CourseCard from '../components/courseCard';
import Navbar from '../components/navbar';
import { useRouter } from 'expo-router';
import SuggestionCard from '../components/suggestionCard';
import NoResults from '../components/NoResults';
import useStore from '../store/store';

const API_URL = Constants.expoConfig?.extra?.API_URL;

const Home = () => {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  // const token = useStore((state) => state.token);
 
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
    { id: '10', name: 'C++ Game Dev', channel: 'Channel 9', category: 'C++', createBy: '10' }
  ];
  const filteredCourses = selectedCategory === 'All' ? courses : courses.filter(course => course.category === selectedCategory);
  const handleCardClick = (id: string) => {
    router.push(`/properties/${id}`);
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
            {/* Navbar */}
            <Navbar />
            {/* <Text>{token}</Text> */}
            
            {/* search bar */}
            {/* category */}
            <View className="flex-row items-center ms-3 my-4">
              <Icon.Book height={20} width={20} stroke="black" />
              <Text className="ms-2 font-bold text-xl">หมวดหมู่</Text>
            </View>
            <Category selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />

            {/* suggestion */}
            <View className="mt-3">
              <View className="flex-row items-center justify-between px-4">
                <View>
                  <Text className="font-rubik-bold text-lg">คอร์สแนะนำ</Text>
                  <Text className="font-rubik text-black text-xs">ยอดนิยม</Text>
                </View>
                <TouchableOpacity onPress={() => router.push('/screens/viewAll')}>
                  <Text className="font-rubik-semibold text-black">ดูทั้งหมด</Text>
                </TouchableOpacity>
              </View>

              {/* Suggestion Card */}
              <View className="py-5">
                <FlatList
                  data={filteredCourses}
                  keyExtractor={(course) => course.id}
                  renderItem={({ item }) => <SuggestionCard item={item} onPress={() => handleCardClick(item.id)} />}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{ paddingHorizontal: 20 }}
                  ListEmptyComponent={
                    loading ? (
                      <ActivityIndicator size="large" className="text-violet-500 mt-5" />
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
                <TouchableOpacity onPress={() => router.push('/screens/viewAll')}>
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
