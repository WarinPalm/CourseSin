import { View, Text, ScrollView, Image, TouchableOpacity, Alert, TextInput, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import images from "@/constants/images";
import { useRouter } from 'expo-router';
import useStore from './(root)/store/store';

const SignIn = () => {
    const [loading, setLoading] = useState<boolean>(false);
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
            setLoading(true);
            await actionLogin(form);
            setForm({ email: '', password: '' });
        } catch (error) {
            Alert.alert('Error', 'ไม่สามารถเข้าสู่ระบบได้ หรือคุณอาจใส่รหัสผิด');
        } finally {
            setLoading(false);
        }
    };

    return (
        <SafeAreaView className="bg-white h-full">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }} keyboardShouldPersistTaps="handled">
                <View className="flex-1 justify-center px-8 pb-12">
                    <Image source={images.onboarding} className="w-full h-60 mb-6" resizeMode="contain" />

                    <Text className="text-3xl font-rubik-bold text-center text-violet-700 mb-2">
                        Welcome to CourseSin
                    </Text>

                    <Text className="font-kanit text-gray-600 text-center mb-8">
                        เข้าสู่ระบบเพื่อเริ่มต้นการเรียนรู้
                    </Text>

                    {/* Email Input */}
                    <Text className="text-sm text-gray-700 font-medium mb-1">Email</Text>
                    <TextInput
                        className="border border-gray-300 rounded-xl px-4 py-3 mb-5 bg-gray-50"
                        placeholder="your@gmail.com"
                        value={form.email}
                        onChangeText={(text) => handleChange("email", text)}
                        keyboardType="email-address"
                        autoCapitalize="none"
                        placeholderTextColor="#9CA3AF"
                    />

                    {/* Password Input */}
                    <Text className="text-sm text-gray-700 font-medium mb-1">Password</Text>
                    <TextInput
                        className="border border-gray-300 rounded-xl px-4 py-3 mb-6 bg-gray-50"
                        placeholder="รหัสผ่าน"
                        value={form.password}
                        onChangeText={(text) => handleChange("password", text)}
                        secureTextEntry
                        placeholderTextColor="#9CA3AF"
                    />

                    {/* Login Button */}
                    <TouchableOpacity
                        className="bg-violet-600 p-4 rounded-xl items-center shadow-md"
                        onPress={handleSubmit}
                    >
                        {
                            loading ? (
                                <ActivityIndicator size="small" color="#fff" />
                            ) : (
                                <Text className="text-white text-lg font-semibold">
                                    Log In
                                </Text>
                            )
                        }
                    </TouchableOpacity>

                    {/* Register link */}
                    <TouchableOpacity
                        className="mt-6"
                        onPress={() => router.push('/auth/register')}
                    >
                        <Text className="text-center font-kanit text-violet-600">
                            มีบัญชีแล้วหรือยัง? <Text className="underline font-kanit-bold">ลงทะเบียนที่นี่</Text>
                        </Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

export default SignIn;
