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

const Create = () => {
    const router = useRouter();
    const token = useStore((state) => state.token);

    const [categories, setCategories] = useState<CategoryType[]>([]);
    const [formCourse, setFormCourse] = useState({
        title: '',
        description: '',
        benefit: '',
        video: '', // จะเก็บ URI ของวิดีโอ
        category_id: '',
    });

    const handleChange = (key: string, value: string) => {
        setFormCourse({ ...formCourse, [key]: value });
    };

    const fetchCategories = async () => {
        try {
            const res = await getAllCategory();
            setCategories(res.data.Category);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handlePickVideo = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert('ต้องอนุญาตให้เข้าถึงคลังสื่อเพื่อเลือกวิดีโอ');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: false,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            const videoUri = result.assets[0].uri;
            handleChange('video', videoUri);
        }
    };

    const handleCreateVideo = async () => {
        console.log(token);
        console.log(formCourse);
        try {
            if (!token) throw new Error('Token is required');
            await addCourse(token, formCourse);

            Alert.alert("Success", "สร้างวีดีโอสำเร็จ!");
            setFormCourse({ title: '', description: '', benefit: '', video: '', category_id: '', })

        } catch (err) {
            console.error(err)
            Alert.alert("Error", "สร้างวีดีโอไม่สำเร็จ!");

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
                <Text className="text-center font-rubik-bold text-xl mt-7">Create Course</Text>
            </View>

            <View className="p-6">
                <Text className="text-2xl font-bold text-gray-800 mb-3">สร้างวีดีโอ</Text>

                {/* ชื่อวีดีโอ */}
                <View>
                    <Text className="text-sm font-semibold text-gray-700 mb-3">ชื่อวีดีโอ</Text>
                    <TextInput
                        className="mt-2 p-3 border border-gray-300 rounded-lg text-black"
                        placeholder="กรอกชื่อวีดีโอ"
                        value={formCourse.title}
                        onChangeText={(text) => handleChange('title', text)}
                    />
                </View>

                {/* description */}
                <View>
                    <Text className="text-sm font-semibold text-gray-700 mb-3 mt-3">คำอธิบายวีดีโอ</Text>
                    <TextInput
                        className="mt-2 p-3 border border-gray-300 rounded-lg text-black h-28 text-top"
                        placeholder="กรอกคำอธิบายวีดีโอ"
                        multiline
                        numberOfLines={4}
                        value={formCourse.description}
                        onChangeText={(text) => handleChange('description', text)}
                    />
                </View>

                {/* category */}
                <View>
                    <Text className="text-sm font-semibold text-gray-700 mt-3 mb-3">หมวดหมู่วีดีโอ</Text>
                    <View className="border border-gray-300 rounded-lg">
                        <Picker
                            selectedValue={formCourse.category_id}
                            onValueChange={(value) => handleChange('category_id', value)}
                        >
                            <Picker.Item label="เลือกหมวดหมู่" value="" />
                            {categories.map((category) => (
                                <Picker.Item
                                    key={category.id}
                                    label={category.name}
                                    value={category.id}
                                />
                            ))}
                        </Picker>
                    </View>
                </View>

                {/* ประโยชน์ */}
                <View>
                    <Text className="text-sm font-semibold text-gray-700 mt-3">ประโยชน์ที่จะได้รับ</Text>
                    <TextInput
                        className="mt-2 p-3 border border-gray-300 rounded-lg text-black"
                        placeholder="กรอกสิ่งที่ผู้เรียนจะได้รับ"
                        value={formCourse.benefit}
                        onChangeText={(text) => handleChange('benefit', text)}
                    />
                </View>

                {/* เลือกวิดีโอจากเครื่อง */}
                <View className="mt-4">
                    <Text className="text-sm font-semibold text-gray-700">วิดีโอจากเครื่อง</Text>
                    <TouchableOpacity
                        onPress={handlePickVideo}
                        className="mt-2 bg-violet-200 p-3 rounded-lg"
                    >
                        <Text className="text-violet-700 font-medium">
                            {formCourse.video ? 'เปลี่ยนวิดีโอ' : 'เลือกวิดีโอจากเครื่อง'}
                        </Text>
                    </TouchableOpacity>
                    {formCourse.video ? (
                        <Text className="text-xs text-gray-500 mt-2">เลือกแล้ว: {formCourse.video}</Text>
                    ) : null}
                </View>

                {/* Submit */}
                <TouchableOpacity
                    onPress={handleCreateVideo}
                    className="mt-6 bg-violet-600 p-4 rounded-lg items-center"
                >
                    <Text className="text-white font-semibold">สร้างวีดีโอ</Text>
                </TouchableOpacity>

                {/* เช็คว่ามีวีดีโออยู่จริงๆ */}
                {formCourse.video && (
                    <Video
                        source={{ uri: formCourse.video }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={false}
                        resizeMode={ResizeMode.CONTAIN}
                        shouldPlay
                        useNativeControls
                        style={styles.video}
                    />
                )}

            </View>
        </ScrollView>
    );
};

export default Create;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    video: {
        width: 300,
        height: 200,
        marginTop: 20,
    },
});
