import { View, Text, TouchableOpacity, TextInput} from 'react-native'
import React from 'react'
import * as Icon from 'react-native-feather';
import { Link } from 'expo-router';

const Navbar = () => {
  return (
    <View>
    {/* header */}
    <View>
    <View className='flex-row justify-between items-center px-4 pt-4'>
      <Text className='text-2xl font-bold'>CourseSin</Text>
      <TouchableOpacity className='p-3 bg-purple-500 rounded-2xl w-12 h-12 items-center justify-center'>

        <Link href="/(tabs)/profile"><Icon.Heart height="25" width="25" strokeWidth={2.5} stroke="white" /></Link>
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
  </View>
  )
}

export default Navbar