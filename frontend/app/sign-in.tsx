import { View, Text, ScrollView, Image, TouchableOpacity, Alert, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from "@/constants/images";
import { useRouter } from 'expo-router';
import useStore from './(root)/store/store';


const SignIn = () => {
    const router = useRouter();
    const actionLogin = useStore((state) => state.actionLogin);
    const user = useStore((state) => state.user);
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    useEffect(() => {
        if (user) {
            router.push('/'); 
        }
    }, [user, router]);

    const handleChange = (key: string, value: string) => {
        setForm({ ...form, [key]: value });
    };

    const handleSubmit = async () => {
        if (!form.email || !form.password) {
            Alert.alert('Error', 'กรุณากรอกอีเมลและรหัสผ่าน');
            return;
        }

        try {
            await actionLogin(form);
            setForm({ email: '', password: '' });
        } catch (error) {
            console.log(error);
            Alert.alert('Error', 'ไม่สามารถเข้าสู่ระบบได้ หรือคุณอาจใส่รหัสผิด');
        }
    };
    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Image source={images.onboarding} className="w-full h-3/6" resizeMode="contain" />

                <View className="px-10">
                    <Text className="text-2xl font-rubik-bold text-black-300 text-center">
                        Welcome to CourseSin
                    </Text>

                    <Text className="text-lg font-rubik text-black text-center mt-6">
                        Sign in to continue
                    </Text>

                    {/* Email Input */}
                    <Text className="text-base font-rubik mt-8 text-black-500">Email</Text>
                    <TextInput
                        className="border border-gray-300 p-3 rounded-lg mt-2"
                        placeholder="Enter your email"
                        value={form.email}
                        onChangeText={(text) => handleChange("email", text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />

                    {/* Password Input */}
                    <Text className="text-base font-rubik mt-4 text-black-500">Password</Text>
                    <TextInput
                        className="border border-gray-300 p-3 rounded-lg mt-2"
                        placeholder="Enter your password"
                        value={form.password}
                        onChangeText={(text) => handleChange("password", text)}
                        secureTextEntry
                    />

                    {/* Login Button */}
                    <TouchableOpacity
                        className="bg-blue-600 p-4 mt-6 rounded-lg items-center"
                        onPress={handleSubmit}
                    >
                        <Text className="text-white text-lg font-rubik-bold">
                            Log In
                        </Text>
                    </TouchableOpacity>

                    {/* Forgot Password */}
                    <TouchableOpacity className="mt-4" onPress={() => router.push('/auth/register')}>
                        <Text className="text-blue-600 text-center text-sm font-rubik">
                            Register?
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
