import React, { useState } from 'react';
import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import * as Icon from 'react-native-feather';

const Login = () => {
  const navigation = useNavigation();
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);

  return (
    <SafeAreaView className='bg-white flex-1 justify-center items-center px-4'>
      {/* logo  */}
      <View className='items-center mb-3'>
        <Image source={{ uri: 'https://via.placeholder.com/150' }} className="bg-purple-500 h-40 w-40 rounded-full" />
        <Text className='absolute top-16 text-white text-2xl font-bold'>CourseSin</Text>
      </View>
      <Text className='font-bold text-xl mt-5'>แพลตฟอร์มรวมคอร์สเขียนโปรแกรม</Text>
      <Text className='text-md mb-5'>เรามีคอร์สและคุณมี Sin เราเลยทำ tan ได้</Text>
      {/* login */}
      <View className='w-full'>
        <View className={`flex-row items-center bg-gray-100 p-4 mb-4 rounded-lg ${emailFocused ? 'border border-purple-500' : ''}`}>
          <Icon.Mail className='mr-2' color={emailFocused ? 'purple' : 'gray'} />
          <TextInput
            placeholder="อีเมล"
            className='flex-1'
            onFocus={() => setEmailFocused(true)}
            onBlur={() => setEmailFocused(false)}
          />
        </View>
        <View className={`flex-row items-center bg-gray-100 p-4 mb-8 rounded-lg ${passwordFocused ? 'border border-purple-500' : ''}`}>
          <Icon.Key className='mr-2' color={passwordFocused ? 'purple' : 'gray'} />
          <TextInput
            placeholder="รหัสผ่าน"
            secureTextEntry
            className='flex-1'
            onFocus={() => setPasswordFocused(true)}
            onBlur={() => setPasswordFocused(false)}
          />
        </View>

        {/* button */}
        <TouchableOpacity
          className='bg-purple-500 p-4 rounded-lg items-center'
        >
          <Text className='text-white text-lg font-bold'>Login</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Login;