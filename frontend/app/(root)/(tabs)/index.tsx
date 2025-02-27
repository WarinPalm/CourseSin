
import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icon from 'react-native-feather';
import Category from '../components/category';
import CourseCard from '../components/courseCard';
import Navbar from '../components/navbar';
import { Link } from 'expo-router';
import SuggestionCard from '../components/suggestionCard';

const Home = () => {

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
      <Navbar />
      {/* main */}
      <View className='flex-1'>

        <ScrollView contentContainerStyle={{ paddingBottom: 80 }}>
          <View className="flex-row items-center ms-3 my-4">
            <Icon.Book height="20" width="20" stroke="black" />
            <Text className='ms-2 font-bold text-xl'>หมวดหมู่</Text>
          </View>
          <Category />
          {/* suggestion */}
          <View className='mt-3'>
            <View className='flex-row items-center justify-between px-4'>
              <View>
                <Text className='font-bold text-lg'>คอร์สแนะนำ</Text>
                <Text className="text-black text-xs">ยอดนิยม</Text>
              </View>
              <TouchableOpacity>
                <Link href="/screens/viewAll">
                  <Text className='font-semibold text-black'>ดูทั้งหมด</Text>
                </Link>
              </TouchableOpacity>
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
                <Text className='font-bold text-lg'>คอร์สเรียน</Text>
                <Text className="text-black text-xs">คอร์สเรียนทั้งหมด</Text>
              </View>
              <TouchableOpacity>
                <Link href="/screens/viewAll">
                  <Text className='font-semibold text-black'>ดูทั้งหมด</Text>

                </Link>
              </TouchableOpacity>
            </View>
            {/* card */}
            <View className='mt-2 px-4 flex-row flex-wrap'>
              {courses.slice(0, 4).map((course, index) => (
                <View key={index} className='w-1/2 p-2'>
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