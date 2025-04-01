import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cart from '../components/cart';
import icons from '@/constants/icons';
import { useLocalSearchParams, useRouter } from 'expo-router'
import VideoPlayer from 'react-native-video-player';

const CourseDetails = () => {
  const [isActive, setIsActive] = useState<string>('About');
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const handleClickUser = (id: string) => {
    router.push(`/users/${id}`);
  };
  return (
    <SafeAreaView className='flex-1'>
      <Cart />
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* button back */}
        <View className='relative'>
          <Image className='w-full h-72 bg-violet-500' />
          <TouchableOpacity
            className='absolute bg-white top-8 left-4 p-2 rounded-full'
            onPress={() => router.back()}
          >
            <Image source={icons.backArrow} className='size-7' />
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
          className='bg-white -mt-12 pt-6'
        >
          <View className='px-5'>
            <Text className='text-3xl font-rubik-bold'>Course Name {id}</Text>
            <Text className='text-sm font-rubik'>category</Text>
          </View>
        </View>

        {/* body  */}
        <View className='bg-white flex-1'>
          <View className='px-8 my-5 flex-row justify-between'>
            {/* tab */}
            <TouchableOpacity
              className={`p-2 ${isActive === 'About' ? 'border-b-4 border-violet-500' : ''}`}
              onPress={() => setIsActive('About')}
            >
              <Text className='font-rubik-bold text-xl'>About</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`p-2 ${isActive === 'Video' ? 'border-b-4 border-violet-500' : ''}`}
              onPress={() => setIsActive('Video')}
            >
              <Text className='font-rubik-bold text-xl'>Video</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className={`p-2 ${isActive === 'Benefit' ? 'border-b-4 border-violet-500' : ''}`}
              onPress={() => setIsActive('Benefit')}
            >
              <Text className='font-rubik-bold text-xl'>Benefit</Text>
            </TouchableOpacity>
          </View>

          {/* detail in tab */}
          {isActive === 'About' && (
            <View className='px-4'>
              <Text className='pt-2 text-xl font-rubik-bold'>Description </Text>
              <Text className='py-4 font-rubik'>คอร์สนี้โครตโหด โครตอันตราย</Text>
              <Text className='mt-3 text-xl font-rubik-bold'>Create By</Text>
              <TouchableOpacity className="flex flex-row items-center px-2 py-3"
                onPress={() => handleClickUser('1')}>
                <Image className="size-16 bg-violet-600 rounded-full border-2 border-white shadow-md" />
                <Text className="text-lg font-rubik-semibold text-gray-800 ms-4">Name</Text>
              </TouchableOpacity>
            </View>
          )}
          {isActive === 'Video' && (
            <View>
              <Text className='px-4 py-4 text-2xl font-bold'>Video</Text>
              <View className='bg-purple-300 p-3 rounded-3xl shadow-2xl mb-3 mx-2'>
                <VideoPlayer
                  video={require('../../../assets/video/Learn 2D arrays in 8 minutes! ⬜.mp4')}
                  autoplay={false}
                  defaultMuted={true}
                  videoWidth={1600}
                  videoHeight={900}
                  thumbnail={require('../../../assets/images/icon.png')}
                />

              </View>
            </View>
          )}

          {isActive === 'Benefit' && (
            <View>
              <Text className='px-4 py-4 text-2xl font-bold'>Benefit Content</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default CourseDetails
