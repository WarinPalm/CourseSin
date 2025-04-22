import { View, Text, TextInput, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import icons from '@/constants/icons';
import { useRouter } from 'expo-router';
import { CategoryResponse } from '../types/responses/category';
import { getAllCategory } from '@/app/(root)/api/category/category';
import { Picker } from '@react-native-picker/picker';
import * as ImagePicker from 'expo-image-picker';
import { addCourse } from '@/app/(root)/api/course/course';
import useStore from '../store/store';

const Create = () => {
    const router = useRouter();
    const token = useStore((state) => state.token);
    const [loading, setLoading] = useState<boolean>(false);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    const [formCourse, setFormCourse] = useState({
        title: '',
        description: '',
        benefit: '',
        thumbnail: '', // URI ของรูป thumbnail
        video: '',     // URI ของวิดีโอ
        category_id: '',
    });

    const handleChange = (key: string, value: string) => {
        setFormCourse({ ...formCourse, [key]: value });
    };

    
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const res = await getAllCategory();
                setCategories(res.data.Category);
            } catch (err) {
                console.error(err);
            }
        };
        fetchCategories();
    }, []);

    const handlePickThumbnail = async () => {
        const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (!permission.granted) {
            alert('ต้องอนุญาตให้เข้าถึงคลังสื่อเพื่อเลือกรูปภาพ');
            return;
        }

        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            quality: 1,
        });

        if (!result.canceled && result.assets.length > 0) {
            handleChange('thumbnail', result.assets[0].uri);
        }
    };

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
            handleChange('video', result.assets[0].uri);
        }
    };

    const handleCreateVideo = async () => {
        try {
            const { title, description, benefit, thumbnail, video, category_id } = formCourse;

            if (!title || !description || !benefit || !category_id || !thumbnail || !video) {
                alert('กรุณากรอกข้อมูลให้ครบถ้วน');
                return;
            }
            if(!token) throw new Error('token is required')
            const formData = new FormData();

            formData.append('title', title);
            formData.append('description', description);
            formData.append('benefit', benefit);
            formData.append('category_id', category_id);

            // thumbnail
            const thumbName = thumbnail.split('/').pop() || 'thumbnail.jpg';
            const thumbExt = thumbName.split('.').pop() || 'jpg';
            const thumbType = `image/${thumbExt}`;

            formData.append('thumbnail', {
                uri: thumbnail,
                name: thumbName,
                type: thumbType,
            } as any);

            // video
            const videoName = video.split('/').pop() || 'video.mp4';
            const videoExt = videoName.split('.').pop() || 'mp4';
            const videoType = `video/${videoExt}`;

            formData.append('video', {
                uri: video,
                name: videoName,
                type: videoType,
            } as any);

            await addCourse(token, formData);

            Alert.alert('สำเร็จ', 'สร้างคอร์สเรียบร้อยแล้ว');
            setFormCourse({
                title: '',
                description: '',
                benefit: '',
                thumbnail: '',
                video: '',
                category_id: '',
            });

        } catch (err: any) {
            console.error(err);
            Alert.alert('เกิดข้อผิดพลาด', 'ไม่สามารถสร้างคอร์สได้');
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
                {/* Title */}
                <Text className="text-md font-bold text-gray-800 mb-3">ชื่อวีดีโอ</Text>
                <TextInput
                    className="mb-3 p-3 border border-gray-300 rounded-lg text-black"
                    placeholder="ชื่อวีดีโอ"
                    value={formCourse.title}
                    onChangeText={(text) => handleChange('title', text)}
                />

                {/* Description */}
                <Text className="text-md font-bold text-gray-800 mb-3">คำอธิบาย</Text>
                <TextInput
                    className="mb-3 p-3 border border-gray-300 rounded-lg text-black h-24"
                    placeholder="คำอธิบายวีดีโอ"
                    multiline
                    value={formCourse.description}
                    onChangeText={(text) => handleChange('description', text)}
                />

                {/* Benefit */}
                <Text className="text-md font-bold text-gray-800 mb-3">ประโยชน์ที่จะได้รับ</Text>
                <TextInput
                    className="mb-3 p-3 border border-gray-300 rounded-lg text-black"
                    placeholder="ประโยชน์ที่จะได้รับ"
                    value={formCourse.benefit}
                    onChangeText={(text) => handleChange('benefit', text)}
                />

                {/* Category Picker */}
                <Text className="text-md font-bold text-gray-800 mb-3">หมวดหมู่</Text>
                <View className="mb-3 border border-gray-300 rounded-lg">
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

                {/* Thumbnail Picker */}
                <TouchableOpacity
                    onPress={handlePickThumbnail}
                    className="mb-3 bg-orange-200 p-3 rounded-lg"
                >
                    <Text className="text-orange-800 font-medium">
                        {formCourse.thumbnail ? 'เปลี่ยนรูป Thumbnail' : 'เลือกรูปภาพ Thumbnail'}
                    </Text>
                </TouchableOpacity>
                {formCourse.thumbnail ? (
                    <Image source={{ uri: formCourse.thumbnail }} className="w-full h-40 rounded-lg mb-3" />
                ) : null}

                {/* Video Picker */}
                <TouchableOpacity
                    onPress={handlePickVideo}
                    className="mb-3 bg-violet-200 p-3 rounded-lg"
                >
                    <Text className="text-violet-700 font-medium">
                        {formCourse.video ? 'เปลี่ยนวิดีโอ' : 'เลือกวิดีโอจากเครื่อง'}
                    </Text>
                </TouchableOpacity>
                {formCourse.video ? (
                    <Text className="text-xs text-gray-500 mb-3">เลือกแล้ว: {formCourse.video}</Text>
                ) : null}

                {/* Submit */}
                <TouchableOpacity
                    onPress={handleCreateVideo}
                    className="bg-violet-600 p-4 rounded-lg items-center"
                >
                    <Text className="text-white font-semibold">สร้างวีดีโอ</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    );
};

export default Create;
