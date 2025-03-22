import { View, Text, TextInput, TouchableOpacity, ScrollView, Image } from 'react-native';
import React, { useState } from 'react';
import icons from '@/constants/icons';
import { useRouter } from 'expo-router';
const Create = () => {
    const [videoTitle, setVideoTitle] = useState('');
    const [videoDescription, setVideoDescription] = useState('');
    const [videoCategory, setVideoCategory] = useState('');
    const [videoTags, setVideoTags] = useState('');
    const router = useRouter();
    const handleCreateVideo = () => {
        // Handle video creation logic here
        console.log('Creating video with details:', {
            videoTitle,
            videoDescription,
            videoCategory,
            videoTags,
        });
    };

    return (
        <ScrollView className="bg-white flex-1">
            {/* button back */}
            <View className='relative'>
                <TouchableOpacity onPress={() => router.back()}
                    className='absolute bg-white top-4 left-4 p-2 rounded-full z-10'>
                    <Image source={icons.backArrow} className='size-7' />
                </TouchableOpacity>
                <Text className='text-center font-rubik-bold text-xl mt-7'>ViewAll</Text>
            </View>
            <View className="p-6">
                <Text className="text-2xl font-bold text-gray-800 mb-3">สร้างวีดีโอ</Text>

                {/* Video Title */}
                <View>
                    <Text className="text-sm font-semibold text-gray-700 mb-3">ชื่อวีดีโอ</Text>
                    <TextInput
                        className="mt-2 p-3 border border-gray-300 rounded-lg text-black"
                        placeholder="กรอกชื่อวีดีโอ"
                        value={videoTitle}
                        onChangeText={setVideoTitle}
                    />
                </View>

                {/* Video Description */}
                <View>
                    <Text className="text-sm font-semibold text-gray-700 mb-3 mt-3">คำอธิบายวีดีโอ</Text>
                    <TextInput
                        className="mt-2 p-3 border border-gray-300 rounded-lg text-black h-28 text-top"
                        placeholder="กรอกคำอธิบายวีดีโอ"
                        multiline
                        numberOfLines={4}
                        value={videoDescription}
                        onChangeText={setVideoDescription}
                    />
                </View>

                {/* Video Category */}
                <View>
                    <Text className="text-sm font-semibold text-gray-700 mt-3 mb-3">หมวดหมู่วีดีโอ</Text>
                    <TextInput
                        className="mt-2 p-3 border border-gray-300 rounded-lg text-black"
                        placeholder="กรอกหมวดหมู่วีดีโอ"
                        value={videoCategory}
                        onChangeText={setVideoCategory}
                    />
                </View>

                {/* Video Tags */}
                <View>
                    <Text className="text-sm font-semibold text-gray-700 mt-3">แท็กวีดีโอ</Text>
                    <TextInput
                        className="mt-2 p-3 border border-gray-300 rounded-lg text-black"
                        placeholder="กรอกแท็กวีดีโอ"
                        value={videoTags}
                        onChangeText={setVideoTags}
                    />
                </View>

                {/* Submit Button */}
                <TouchableOpacity
                    onPress={handleCreateVideo}
                    className="mt-6 bg-violet-600 p-4 rounded-lg items-center"
                >
                    <Text className="text-white font-semibold">สร้างวีดีโอ</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Create;
