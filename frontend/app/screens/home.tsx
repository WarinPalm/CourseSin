import { View, Text, TextInput, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Icon from 'react-native-feather';
import Category from '../components/category';
import FeatureRow from '../components/featuredRow';
import CourseCard from '../components/courseCard';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type navList ={
  Profile: undefined;
};

type NavigationProp =  StackNavigationProp<navList>;

const Home = () => {
  const navigation = useNavigation<NavigationProp>();

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
      {/* header */}
      <View>
        <View className='flex-row justify-between items-center px-4 pt-4'>
          <Text className='text-2xl font-bold'>CourseSin</Text>
          <TouchableOpacity onPress={()=> navigation.navigate('Profile')}
           className='p-3 bg-purple-500 rounded-2xl w-12 h-12 items-center justify-center'>
            
            <Icon.Heart height="25" width="25" strokeWidth={2.5} stroke="white" />
          </TouchableOpacity>
        </View>
      </View>
      {/* search bar */}
      <View className='flex-row items-center space-x-2 px-4 pb-2'>
        <View className='bg-white flex-row flex-1 items-center p-3 m-3 rounded-2xl border border-purple-900'>
          <Icon.Search height="25" width="25" stroke="gray" />
          <TextInput placeholder="Search for Course" className='ml-2 flex-1' />
        </View>

      </View>
      {/* main */}
      <View className='flex-1'>

      <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
        <Category />
        {/* suggestion */}
        <FeatureRow />

        {/* all course */}
        <View className='mt-3'>
          <View className='flex-row items-center justify-between px-4'>
            <View>
              <Text className='font-bold text-lg'>Courses</Text>
              <Text className="text-black text-xs">all Course</Text>
            </View>
            <TouchableOpacity>
              <Text className='font-semibold text-black'>View All</Text>
            </TouchableOpacity>
          </View>
          <View className='mt-5 px-4 flex-row flex-wrap'>
            {courses.map((course, index) => (
              <View key={index} className='w-1/2  p-2'>
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