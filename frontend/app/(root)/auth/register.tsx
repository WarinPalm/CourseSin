import { View, Text, Alert, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import axios from 'axios';
import Constants from 'expo-constants';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

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
      Alert.alert('ข้อมูลไม่ครบ', 'กรุณากรอกข้อมูลให้ครบทุกช่อง');
      return;
    }

    try {
      setLoading(true);
      await axios.post(`${API_URL}/register`, form);
      Alert.alert('สำเร็จ', 'สมัครสมาชิกเรียบร้อยแล้ว');
      setForm({ email: "", password: "", fName: "", lName: "" });
      router.push('/sign-in');
    } catch (error) {
      console.log(error);
      Alert.alert('ผิดพลาด', 'สมัครสมาชิกไม่สำเร็จ');
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white justify-center">
     
        <View className="px-8 pt-6">
          <Text className="text-3xl font-rubik-bold text-violet-700 text-center mb-2">Create Account</Text>
          <Text className="font-kanit text-gray-500 text-center mb-8">สมัครสมาชิกเพื่อเริ่มต้นการเรียนรู้</Text>

          <Text className="text-sm font-rubik-medium text-gray-700 mb-1">Email</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 mb-4 bg-gray-50"
            placeholder="your@email.com"
            placeholderTextColor="#9CA3AF"
            value={form.email}
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          <Text className="text-sm font-rubik-medium text-gray-700 mb-1">Password</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 mb-4 bg-gray-50"
            placeholder="********"
            placeholderTextColor="#9CA3AF"
            secureTextEntry
            value={form.password}
            onChangeText={(text) => handleChange('password', text)}
          />

          <Text className="text-sm font-rubik-medium text-gray-700 mb-1">First Name</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 mb-4 bg-gray-50"
            placeholder="ชื่อจริง"
            placeholderTextColor="#9CA3AF"
            value={form.fName}
            onChangeText={(text) => handleChange('fName', text)}
          />

          <Text className="text-sm font-rubik-medium text-gray-700 mb-1">Last Name</Text>
          <TextInput
            className="border border-gray-300 rounded-xl px-4 py-3 mb-6 bg-gray-50"
            placeholder="นามสกุล"
            placeholderTextColor="#9CA3AF"
            value={form.lName}
            onChangeText={(text) => handleChange('lName', text)}
          />

          <TouchableOpacity
            className="bg-violet-600 p-4 rounded-xl items-center shadow-md"
            onPress={handleSubmit}
          >
            {
              loading ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <Text className="text-white text-lg font-rubik-semibold">Sign Up</Text>
              )
            }
          </TouchableOpacity>

          <TouchableOpacity className="mt-6" onPress={() => router.push('/sign-in')}>
            <Text className="text-center font-kanit text-violet-600">
              มีบัญชีแล้วใช่ไหม? <Text className="underline font-kanit-bold">เข้าสู่ระบบ</Text>
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

export default Register;
