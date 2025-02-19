import { View, Text, ScrollView, Image, TouchableOpacity, SafeAreaView} from 'react-native';
import React, { useState } from 'react';
import * as Icon from 'react-native-feather';
import Cart from '../components/cart';
import { Link } from 'expo-router';

const CourseDetail = () => {

    const [isActive, setIsActive] = useState('About');

    return (
        <SafeAreaView className='flex-1'>
            <Cart />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                {/* button back */}
                <View className='relative'>
                    <Image className='w-full h-72 bg-purple-500' />
                    <TouchableOpacity className='absolute bg-white top-8 left-4 p-2 rounded-full'>
                        <Link href="/(tabs)"><Icon.ArrowLeft strokeWidth={3} color={"black"} /></Link>
                    </TouchableOpacity>
                </View>

                {/* Header */}
                <View style={{ borderTopLeftRadius: 40, borderTopRightRadius: 40 }}
                    className='bg-white -mt-12 pt-6'
                >
                    <View className='px-5'>
                        <Text className='text-3xl font-bold'>Course Name</Text>
                        <Text className='text-sm'>category</Text>
                    </View>
                </View>

                {/* body  */}
                <View className='bg-white flex-1'>
                    <View className='px-8 my-5 flex-row justify-between'>
                        <TouchableOpacity
                            className={`p-2 ${isActive === 'About' ? 'border-b-4 border-purple-500' : ''}`}
                            onPress={() => setIsActive('About')}
                        >
                            <Text className='font-bold text-xl'>About</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`p-2 ${isActive === 'Video' ? 'border-b-4 border-purple-500' : ''}`}
                            onPress={() => setIsActive('Video')}
                        >
                            <Text className='font-bold text-xl'>Video</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            className={`p-2 ${isActive === 'Benefit' ? 'border-b-4 border-purple-500' : ''}`}
                            onPress={() => setIsActive('Benefit')}
                        >
                            <Text className='font-bold text-xl'>Benefit</Text>
                        </TouchableOpacity>
                    </View>
                    {isActive === 'About' && (
                        <View>
                            <Text className='px-4 py-4 text-2xl font-bold'>Description :</Text>
                        </View>
                    )}
                    {isActive === 'Video' && (
                        <View>
                            <Text className='px-4 py-4 text-2xl font-bold'>Video</Text>
                            <View className='bg-purple-300 p-3 rounded-3xl shadow-2xl mb-3 mx-2'>
                                <Image className='w-25 h-36' />
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
    );
}

export default CourseDetail;