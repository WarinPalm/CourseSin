import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, Image, TouchableOpacity, Dimensions, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LikeButton from '../components/LikeButton';
import icons from '@/constants/icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useVideoPlayer, VideoView } from 'expo-video';
import useStore from '../store/store';
import { CourseResponse } from '../types/responses/course';
import { getCourseById } from '@/app/(root)/api/course/course';
import { Video, ResizeMode } from 'expo-av';

import Constants from "expo-constants";
const API_URL_WITHOUT_API = Constants.expoConfig?.extra?.API_URL_WITHOUT_API;

const CourseDetails = () => {
  const [isActive, setIsActive] = React.useState<'About' | 'Video' | 'Benefit'>('About');
  const { id } = useLocalSearchParams<{ id?: string }>();
  const router = useRouter();
  const token = useStore((state) => state.token);
  const [course, setCourse] = useState<CourseResponse>();
  // Load video source
  const source = {
    uri: `${API_URL_WITHOUT_API}/uploads/video/${course?.video_file}`,
  };
  
  console.log(source)
  
  const player = useVideoPlayer(source, (player) => {
    player.loop = true;
    player.staysActiveInBackground = true;
  });
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        if (!token) throw new Error('Token is required');
        if (!id) throw new Error('Course ID is required');

        const res = await getCourseById(id, token);
        setCourse(res.data.Course);

      } catch (err) {
        console.error(err);
      }
    };

    fetchCourses();
  }, []);

  // Play video when mounted (only if tab is Video)
  useEffect(() => {
    if (isActive === 'Video') {
      player?.play();
    } else {
      player?.pause();
    }
  }, [isActive]);

  const handleClickUser = (id: string) => {
    router.push(`/users/${id}`);
  };

  return (
    <SafeAreaView className="flex-1">
      {course?.id && token && (
        <LikeButton courseId={course.id} token={token} />
      )}

      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        {/* Back Button */}
        <View className="relative">
          <Image className="w-full h-72 bg-violet-500"
            source={{ uri: `${API_URL_WITHOUT_API}/uploads/video/thumbnail/${course?.thumbnail}` }}
          />
          <TouchableOpacity
            className="absolute bg-white top-8 left-4 p-2 rounded-full"
            onPress={() => router.back()}
          >
            <Image source={icons.backArrow} className="size-7" />
          </TouchableOpacity>
        </View>

        {/* Header */}
        <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }} className="bg-white -mt-12 pt-6">
          <View className="px-5">
            <Text className="text-3xl font-rubik-bold">{course?.title}</Text>
            <Text className="text-sm font-rubik mt-2">{course?.Category.name}</Text>
          </View>
        </View>

        {/* Body */}
        <View className="bg-white flex-1">
          <View className="px-8 my-5 flex-row justify-between">
            {['About', 'Video', 'Benefit'].map((tab) => (
              <TouchableOpacity
                key={tab}
                className={`p-2 ${isActive === tab ? 'border-b-4 border-violet-500' : ''}`}
                onPress={() => setIsActive(tab as 'About' | 'Video' | 'Benefit')}
              >
                <Text className="font-rubik-bold text-xl">{tab}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {isActive === 'About' && (
            <View className="px-4">
              <Text className="pt-2 text-xl font-rubik-bold">Description </Text>
              <View className='p-2 bg-gray-100 rounded-lg border border-gray-200'>

                <Text className="py-4 font-rubik">{course?.description}</Text>
              </View>
              <Text className="mt-3 text-xl font-rubik-bold">Create By</Text>
              <View className=' bg-violet-100 rounded-lg border border-gray-200'>

                <TouchableOpacity className="flex flex-row items-center px-2 py-3" onPress={() => handleClickUser(`${course?.Channel.id}`)}>
                  <Image className="size-16 bg-violet-600 rounded-full border-2 border-white shadow-md"
                    source={{ uri: `${API_URL_WITHOUT_API}/uploads/profile/${course?.Channel.picture}` }} />
                  <Text className="text-lg font-rubik-semibold text-gray-800 ms-4">{course?.Channel.f_name} {course?.Channel.l_name}</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          {isActive === 'Video' && (
            <View>
              <Text className="px-4 py-4 text-2xl font-bold">Video</Text>
              <View className="bg-violet-700 p-3 rounded-3xl shadow-2xl mb-3 mx-2">
                <VideoView
                  player={player}
                  style={{
                    width: Dimensions.get('window').width - 32,
                    height: (Dimensions.get('window').width - 32) * (9 / 16),
                    borderRadius: 16,
                  }}
                  allowsFullscreen
                  allowsPictureInPicture
                  startsPictureInPictureAutomatically
                />

              </View>
            </View>
          )}

          {isActive === 'Benefit' && (
            <View className='px-4'>
              <Text className="pt-2 text-xl font-rubik-bold">Benefit Content </Text>
              <View className='p-2 bg-gray-100 rounded-lg border border-gray-200'>

                <Text className="py-4 font-rubik">✅  {course?.benefit}</Text>
              </View>

            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CourseDetails;
