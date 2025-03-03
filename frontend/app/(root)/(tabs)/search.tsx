import { View, Text, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import * as Icon from 'react-native-feather';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link } from 'expo-router';
import Category from '../components/category';
import CourseCard from '../components/courseCard';
import SearchBar from '../components/searchBar';

const Search = () => {
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
      <ScrollView contentContainerStyle={{ paddingBottom:20 }}>
        {/* search bar */}
        <View className='mx-4 mb-5'>
          <SearchBar />
        </View>

        <View className='flex-row items-center justify-between mx-9'>
          <TouchableOpacity className='flex-1 p-4 bg-purple-600 rounded-md mr-2'>
            <View className='flex-row items-center justify-center'>
              <Icon.Folder height="20" width="20" stroke="white" />
              <Text className='text-white ms-3'>คอร์สเรียนทั้งหมด</Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity className='flex-1 p-4 bg-blue-600 rounded-md ml-2'>
            <View className='flex-row items-center justify-center'>
              <Icon.Menu height="20" width="20" stroke="white" />
              <Text className='text-white ms-3'>ช่องที่แนะนำ</Text>
            </View>
          </TouchableOpacity>
        </View>
        <View className='my-4'>
          <View className="flex-row items-center ms-3 my-2">
            <Icon.Book height="20" width="20" stroke="black" />
            <Text className='ms-2 font-bold text-xl'>หมวดหมู่</Text>
          </View>
          <Category />
        </View>
        {/* all course */}
        <View className='mt-2 flex-1'>
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
    </SafeAreaView>
  );
}

export default Search;