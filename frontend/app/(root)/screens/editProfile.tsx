import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert, StyleSheet } from 'react-native';
import React, { useState, useEffect } from 'react';
import icons from '@/constants/icons';
import { useRouter } from 'expo-router';
import { CategoryType } from '../types/categoryType';
import { getAllCategory } from '../api/category/category';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { addCourse } from '../api/course/course';
import useStore from '../store/store';
import { Video, ResizeMode } from 'expo-av';
import { ProfileType } from '../types/userType';
import { editProfile, getProfile } from '../api/user/user';

const EditProfile = () => {
    const router = useRouter();
    const token = useStore((state) => state.token);

    const [profile, setProfile] = useState<ProfileType>();
    const [formProfile, setFormProfile] = useState({
        f_name: '',
        l_name: '',
        password: '',
        profile: '',
    });

    const handleChange = (key: string, value: string) => {
        setFormProfile({ ...formProfile, [key]: value });
    };



    useEffect(() => {
        const fetchProfile = async () => {
            try {
                if (!token) throw new Error('Token is required');
                const res = await getProfile(token);
                setProfile(res.data.user)
            } catch (err) {
                console.error(err);
            }
        }
        fetchProfile();
    }, []);


    const pickImage = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.7,
            base64: true,
        });

        if (!result.canceled && result.assets.length > 0) {
            const image = result.assets[0];
            setFormProfile({ ...formProfile, profile: `data:image/jpeg;base64,${image.base64}` });
        }
    };


    const handleEditProfile = async () => {
        try {
            if (!token) throw new Error('Token is required');
            await editProfile(token, formProfile);
            setFormProfile({ f_name: '', l_name: '', password: '', profile: '' })
            router.back()
        } catch (err) {
            console.error(err);
        }
    }

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
                <Text className="text-2xl font-bold text-gray-800 mb-3">แก้ไขโปรไฟล์</Text>

                {/* ชื่อ */}
                <View>
                    <Text className="text-sm font-semibold text-gray-700 mb-3">ชื่อ</Text>
                    <TextInput
                        className="mt-2 p-3 border border-gray-300 rounded-lg text-black"
                        placeholder={profile?.f_name}
                        value={formProfile.f_name}
                        onChangeText={(text) => handleChange('f_name', text)}
                    />
                </View>


                {/* นามสกุล */}
                <View>
                    <Text className="text-sm font-semibold text-gray-700 mt-3">นามสกุล</Text>
                    <TextInput
                        className="mt-2 p-3 border border-gray-300 rounded-lg text-black"
                        placeholder={profile?.l_name}
                        value={formProfile.l_name}
                        onChangeText={(text) => handleChange('l_name', text)}
                    />
                </View>

                {/* รหัสผ่าน */}
                {/* <View>
                    <Text className="text-sm font-semibold text-gray-700 mt-3">รหัสผ่าน</Text>
                    <TextInput
                    className="mt-2 p-3 border border-gray-300 rounded-lg text-black"
                    placeholder="เปลี่ยนรหัสผ่าน"
                    value={formProfile.l_name}
                    onChangeText={(text) => handleChange('password', text)}
                    />
                    </View> */}

                <Text className="text-sm font-semibold text-gray-700 mt-3">รูปโปรไฟล์</Text>
                <View className="items-center mb-6">

                    <TouchableOpacity onPress={pickImage}>
                        {formProfile.profile ? (
                            <Image
                                source={{ uri: formProfile.profile }}
                                className="w-32 h-32 rounded-full bg-gray-200"
                            />
                        ) : (
                            <View className="w-32 h-32 rounded-full bg-gray-200 items-center justify-center">
                                <Text className="text-gray-500">เลือกรูปภาพ</Text>
                            </View>
                        )}
                    </TouchableOpacity>
                </View>


                {/* Submit */}
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
