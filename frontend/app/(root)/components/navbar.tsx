import { View, Text, TouchableOpacity, TextInput } from 'react-native'
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
            <Icon.Heart height="25" width="25" strokeWidth={2.5} stroke="white" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default Navbar