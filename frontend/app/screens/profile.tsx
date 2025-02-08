import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import * as Icon from 'react-native-feather';
import Cart from '../components/cart';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';

type navList = {
    Home: undefined;
}

type NavigationProp = StackNavigationProp<navList>;

const Profile = () => {
    const navigation = useNavigation<NavigationProp>();
  return (
    <View>
        <ScrollView>
            <View className='relative'>
                <Image className='w-full h-40 bg-purple-500'/>
                <TouchableOpacity onPress={()=> navigation.navigate("Home")}
                className='absolute bg-white top-8 left-4 p-2 rounded-full'>
                    <Icon.ArrowLeft strokeWidth={3} color={"black"}/>
                </TouchableOpacity>
            </View>
            <View style={{borderTopLeftRadius:40, borderTopRightRadius:40}}
                className='bg-white -mt-12 pt-6'
            >
                <View className='px-5'>
                    <Text className='text-3xl font-bold'>Profile</Text>
                    <Text className='text-sm'>category</Text>
                </View>
            </View>
            <View className='bg-white pb-36'>
                <Text className='px-4 py-4 text-2xl font-bold'>Video</Text>
                <View className='bg-purple-300 p-3 rounded-3xl shadow-2xl mb-3 mx-2'>
                    <Image className='w-25 h-36'/>
                </View>
                
                <Text className='px-4 py-4 text-2xl font-bold'>Skill</Text>
                <Text className='px-4 py-4 text-2xl font-bold'>Description</Text>
                

            </View>
        </ScrollView>
    </View>
  )
}

export default Profile;