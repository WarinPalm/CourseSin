import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icon from 'react-native-feather';
import Category from '../components/category';
import CourseCard from '../components/courseCard';
import Navbar from '../components/navbar';
import { Link } from 'expo-router';
import icons from '@/constants/icons';

import SuggestionCard from '../components/suggestionCard';

const Home = () => {
  const courses = [
    { id: 1, name: 'CourseName1', channel: 'Channel 1', category: 'Programming' },
    { id: 2, name: 'CourseName2', channel: 'Channel 2', category: 'Web Development' },
    { id: 3, name: 'CourseName3', channel: 'Channel 3', category: 'Web Development' },
    { id: 4, name: 'CourseName4', channel: 'Channel 4', category: 'Programming' },
    { id: 5, name: 'CourseName5', channel: 'Channel 5', category: 'Programming' },
    { id: 6, name: 'CourseName6', channel: 'Channel 6', category: 'Programming' },
    { id: 7, name: 'CourseName7', channel: 'Channel 7', category: 'Programming' },
    { id: 8, name: 'CourseName8', channel: 'Channel 8', category: 'Programming' },
    { id: 9, name: 'CourseName9', channel: 'Channel 9', category: 'Programming' }
  ];

  return (
    <SafeAreaView className='bg-white flex-1'>
      
      {/* main */}
      <View className='flex-1'>

        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          {/* navbar */}
          <Navbar />  

          <View className="flex-row items-center ms-3 my-4">
            <Icon.Book height="20" width="20" stroke="black" />
            <Text className='ms-2 font-bold text-xl'>หมวดหมู่</Text>
          </View>
          <Category />
          {/* suggestion */}
          <View className='mt-3'>
            <View className='flex-row items-center justify-between px-4'>
              <View>
                <Text className='font-rubik-bold text-lg'>คอร์สแนะนำ</Text>
                <Text className="font-rubik text-black text-xs">ยอดนิยม</Text>
              </View>
              <Link href="/screens/viewAll">
                <Text className='font-rubik-semibold text-black'>ดูทั้งหมด</Text>
              </Link>
            </View>

            {/* card */}
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ paddingHorizontal: 20 }}
              className='overflow-visible py-5'>
              <View className='flex-row'>
                {courses.map((course, index) => (
                  <SuggestionCard key={index} item={course} />
                ))}
              </View>
            </ScrollView>
          </View>

          {/* all course */}
          <View className='mt-2'>
            <View className='flex-row items-center justify-between px-4'>
              <View>
                <Text className='font-rubik-bold text-lg'>คอร์สเรียน</Text>
                <Text className="font-rubik text-black text-xs">คอร์สเรียนทั้งหมด</Text>
              </View>
              <Link href="/screens/viewAll">
                <Text className='font-rubik-semibold text-black'>ดูทั้งหมด</Text>
              </Link>
            </View>
            {/* card */}
            <View className='mt-2 px-3 flex-col'>
              {courses.slice(0, 4).map((course, index) => (
                <View key={index} className='w-100 p-2'>
                  <CourseCard item={course} />
                </View>
              ))}
            </View>
          </View>

        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Home;