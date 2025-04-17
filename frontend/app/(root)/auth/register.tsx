import { View, Text, Alert, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native'
import React, { useState } from 'react'
import axios from 'axios'
import Constants from 'expo-constants'
import { useRouter } from 'expo-router'

const API_URL = Constants.expoConfig?.extra?.API_URL;

const Register = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const [form, setForm] = useState({
    email: '',
    password: '',
    fName: '',
    lName: '',
  });

  const handleChange = (key: string, value: string) => {
    setForm({ ...form, [key]: value });
  };

  const handleSubmit = async () => {
    if (!form.email || !form.password || !form.fName || !form.lName) {
      console.log('กรุณากรอกข้อมูลให้ครบ');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/register`, form);
      Alert.alert('Success', 'สมัครสมาชิกสำเร็จ');
      setForm({ email: "", password: "", fName: "", lName: "" });
      router.push('/sign-in');
    } catch (error) {
      console.log(error);
      Alert.alert('Error', 'สมัครสมาชิกไม่สำเร็จ');
    }finally{
      setLoading(false);
    }
  };

  return (
    <View className="flex-1 justify-center px-10">
      <Text className="text-2xl font-rubik-bold text-black text-center">Create Account</Text>

      <TextInput
        className="border border-gray-300 p-3 rounded-lg mt-8"
        placeholder="Email"
        value={form.email}
        onChangeText={(text) => handleChange('email', text)}
      />
      <TextInput
        className="border border-gray-300 p-3 rounded-lg mt-4"
        placeholder="Password"
        value={form.password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
      />
      <TextInput
        className="border border-gray-300 p-3 rounded-lg mt-4"
        placeholder="FirstName"
        value={form.fName}
        onChangeText={(text) => handleChange('fName', text)}

      />
      <TextInput
        className="border border-gray-300 p-3 rounded-lg mt-4"
        placeholder="LastName"
        value={form.lName}
        onChangeText={(text) => handleChange('lName', text)}

      />
      <TouchableOpacity
        className="bg-violet-600 p-4 mt-6 rounded-lg items-center"
        onPress={handleSubmit}
      >

        {
          loading ? (
            <ActivityIndicator size="large" className="text-white" />
          ) : (
            <Text className="text-white text-lg font-rubik-bold">
              Sign Up
            </Text>
          )
        }
      </TouchableOpacity>
    </View>
  );
};

export default Register;
