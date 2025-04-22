import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import icons from '@/constants/icons';
import { useRouter } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';

import useStore from '../store/store';
import { ProfileResponse } from '../types/responses/user';
import { editProfile, getProfile } from '@/app/(root)/api/user/user';

const EditProfile = () => {
    const router = useRouter();
    const token = useStore((state) => state.token);

    const [profile, setProfile] = useState<ProfileResponse>();
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordMatchError, setPasswordMatchError] = useState(false);

    const [formProfile, setFormProfile] = useState({
        f_name: '',
        l_name: '',
        password: '',
        profile: null as any,
    });

    const handleChange = (key: string, value: string) => {
        setFormProfile({ ...formProfile, [key]: value });
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!token) throw new Error('Token is required');
                const res = await getProfile(token);
                setProfile(res.data.user);
            } catch (err) {
                console.error(err);
            }
        };
        fetchProfile();
    }, []);

    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
        });

        if (!result.canceled && result.assets.length > 0) {
            const image = result.assets[0];
            const localUri = image.uri;
            const filename = localUri.split('/').pop() || 'profile.jpg';
            const ext = filename.split('.').pop()?.toLowerCase();
            const mimeType = ext === 'jpg' || ext === 'jpeg' ? 'image/jpeg' :
                             ext === 'png' ? 'image/png' : 'image';

            setFormProfile({ 
                ...formProfile, 
                profile: { uri: localUri, name: filename, type: mimeType }
            });
        }
    };

    const handleEditProfile = async () => {
        try {
            if (!token) throw new Error('Token is required');

            // ตรวจสอบรหัสผ่านทั้งสองช่อง
            if (formProfile.password !== confirmPassword) {
                setPasswordMatchError(true);
                return;
            }

            const formData = new FormData();
            formData.append('f_name', formProfile.f_name || profile?.f_name || '');
            formData.append('l_name', formProfile.l_name || profile?.l_name || '');
            // ส่ง password ถ้ามีการเปลี่ยนแปลง
            if (formProfile.password) {
                formData.append('password', formProfile.password);
            }

            // ส่ง profile ถ้ามีการเปลี่ยนแปลง
            if (formProfile.profile) {
                formData.append('profile', {
                    uri: formProfile.profile.uri,
                    name: formProfile.profile.name,
                    type: formProfile.profile.type,
                } as any);
            }

            await editProfile(token, formData);
            Alert.alert("สำเร็จ", "อัปเดตรายการแล้ว");
            router.back();
        } catch (err) {
            console.error(err);
            Alert.alert("เกิดข้อผิดพลาด", "ไม่สามารถอัปโหลดข้อมูลได้");
        }
        
    };

    return (
        <ScrollView className="bg-white flex-1">
            <View className="relative">
                <TouchableOpacity
                    onPress={() => router.back()}
                    className="absolute bg-white top-4 left-4 p-2 rounded-full z-10"
                >
                    <Image source={icons.backArrow} className="size-7" />
                </TouchableOpacity>
                <Text className="text-center font-rubik-bold text-xl mt-7">Edit Profile</Text>
            </View>

            <View className="p-6">

                <View>
                    <Text className="text-sm font-semibold text-gray-700 mb-3">ชื่อ</Text>
                    <TextInput
                        className="mt-2 p-3 border border-gray-300 rounded-lg text-black"
                        placeholder={profile?.f_name}
                        value={formProfile.f_name}
                        onChangeText={(text) => handleChange('f_name', text)}
                    />
                </View>

                <View>
                    <Text className="text-sm font-semibold text-gray-700 mt-3">นามสกุล</Text>
                    <TextInput
                        className="mt-2 p-3 border border-gray-300 rounded-lg text-black"
                        placeholder={profile?.l_name}
                        value={formProfile.l_name}
                        onChangeText={(text) => handleChange('l_name', text)}
                    />
                </View>

                <View>
                    <Text className="text-sm font-semibold text-gray-700 mt-3">รหัสผ่าน</Text>
                    <TextInput
                        className="mt-2 p-3 border border-gray-300 rounded-lg text-black"
                        placeholder="เปลี่ยนรหัสผ่าน"
                        secureTextEntry
                        value={formProfile.password}
                        onChangeText={(text) => handleChange('password', text)}
                    />
                </View>

                <View>
                    <Text className="text-sm font-semibold text-gray-700 mt-3">ยืนยันรหัสผ่าน</Text>
                    <TextInput
                        className="mt-2 p-3 border border-gray-300 rounded-lg text-black"
                        placeholder="ยืนยันรหัสผ่าน"
                        secureTextEntry
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                    />
                    {passwordMatchError && <Text className="text-red-500 text-sm mt-2">รหัสผ่านไม่ตรงกัน</Text>}
                </View>

                <Text className="text-sm font-semibold text-gray-700 mt-3">รูปโปรไฟล์</Text>
                <View className="items-center mb-6">
                    <TouchableOpacity onPress={pickImage}>
                        {formProfile.profile ? (
                            <Image
                                source={{ uri: formProfile.profile.uri }}
                                className="w-32 h-32 rounded-full bg-gray-200"
                            />
                        ) : (
                            <View className="w-32 h-32 rounded-full bg-gray-200 items-center justify-center">
                                <Text className="text-gray-500">เลือกรูปภาพ</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={handleEditProfile}
                    className="mt-6 bg-violet-600 p-4 rounded-lg items-center"
                >
                    <Text className="text-white font-semibold">ยืนยันการแก้ไข</Text>
                </TouchableOpacity>

            </View>
        </ScrollView>
    );
};

export default EditProfile;
