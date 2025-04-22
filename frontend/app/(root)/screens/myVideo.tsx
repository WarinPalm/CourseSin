import { View, Text, SafeAreaView, TextInput, TouchableOpacity, Image, FlatList, ActivityIndicator, Alert, Modal } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Picker } from '@react-native-picker/picker';
import CourseCard from '../components/courseCard';
import { useRouter } from 'expo-router';
import icons from '@/constants/icons';
import NoResults from '../components/NoResults';
import Pagination from '../components/Pagination';
import useStore from '../store/store';
import { ViewCourseResponse } from '../types/responses/course';
import { viewMyCourse } from '@/app/(root)/api/user/user';
import { CategoryResponse } from '../types/responses/category';
import { getAllCategory } from '@/app/(root)/api/category/category';
import { deleteCourse, editCourse } from '@/app/(root)/api/course/course';

const MyVideo = () => {
    const [loading, setLoading] = useState<boolean>(false);
    const token = useStore((state) => state.token);
    const [categories, setCategories] = useState<CategoryResponse[]>([]);
    //pagination
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const [courses, setCourses] = useState<ViewCourseResponse[]>();
    const [totalPage, setTotalPage] = useState<number>(0);
    const [user, setUser] = useState<{ f_name: string, l_name: string } | null>(null);

    //CRUD
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<ViewCourseResponse | null>();
    const [formCourse, setFormCourse] = useState({
        title: '',
        description: '',
        benefit: '',
        category_id: '',
    });

    const handleChange = (key: string, value: string) => {
        setFormCourse({ ...formCourse, [key]: value });
    };
    const router = useRouter();

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

    const fetchCourses = async () => {
        try {
            if (!token) throw new Error('Token is required');

            setLoading(true);

            const res = await viewMyCourse(token, page, limit);
            setCourses(res.data.channel.course);
            setTotalPage(res.data.total_pages)
            setUser({ f_name: res.data.channel.f_name, l_name: res.data.channel.l_name });

        } catch (err) {
            console.error(err, "course error fetch");
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {

        fetchCourses();
    }, [page, limit]);

    const handleEdit = (course: ViewCourseResponse) => {
        setSelectedCourse(course);
        setFormCourse({
            title: course.title,
            description: course.description,
            benefit: course.benefit,
            category_id: course.Category.id,
        });
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedCourse(null);
    };

    const handleUpdate = async () => {
        if (selectedCourse) {
            try {
                console.log(selectedCourse.id)
                if (!token) throw new Error("token is require");
                await editCourse(token, selectedCourse.id, formCourse);
                Alert.alert("success", "แก้ไขคอร์สสำเร็จ");
                fetchCourses();
                closeModal();
            } catch (err) {
                console.error(err);
                Alert.alert("error", "แก้ไขคอร์สไม่สำเร็จ");
            }

        } else {
            Alert.alert("error", "โปรดเลือกคอร์สที่จะแก้ไข");
        }
    };

    const handleDelete = async (id: string) => {
        try {
            if (!token) throw new Error("token is require");
            await deleteCourse(token, id)
            fetchCourses();
            Alert.alert("success", "ลบคอร์สสำเร็จ");

        } catch (err) {
            console.error(err);
            Alert.alert("error", "ลบคอร์สไม่สำเร็จ");
        }
    };


    const handleCardClick = (id: string) => {
        router.push(`/properties/${id}`);
    };
    return (
        <SafeAreaView className='bg-white pb-3 flex-1'>
            <View className='relative'>
                <TouchableOpacity onPress={() => router.back()} className='absolute bg-white top-4 left-4 p-2 rounded-full z-10'>
                    <Image source={icons.backArrow} className='size-7' />
                </TouchableOpacity>
                <Text className='text-center font-rubik-bold text-xl mt-7'>My Video</Text>
            </View>

            <View className='mt-2 px-3'>
                <FlatList
                    data={courses}
                    keyExtractor={(course) => course.id}
                    renderItem={({ item }) => (
                        <View className='w-100 p-2'>
                            <View className='p-2 bg-violet-200 rounded-xl border border-gray-200'>

                                <CourseCard
                                    thumbnail={item.thumbnail}
                                    title={item.title}
                                    f_name={user?.f_name}
                                    l_name={user?.l_name}
                                    category_name={item.Category.name}
                                    like={item._count?.like}
                                    onPress={() => handleCardClick(item.id)}
                                />
                                <View className='flex flex-row justify-end'>

                                    <TouchableOpacity className='p-2 mt-2 mx-1 rounded-lg bg-blue-500'
                                        onPress={() => handleEdit(item)}>
                                        <Text className='font-bold text-white text-center'>Edit</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity className='p-2 mt-2 mx-1 rounded-lg bg-red-500'
                                        onPress={() => handleDelete(item.id)}>
                                        <Text className='font-bold text-white text-center'>Delete</Text>
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ paddingBottom: 100 }}
                    ListEmptyComponent={
                        loading ? (
                            <ActivityIndicator size="large" className='text-violet-500 mt-5' />
                        ) : <NoResults />
                    }
                    ListFooterComponent={
                        (totalPage > 1 || (courses && courses.length > 0 && courses.length <= limit)) ? (
                            <Pagination page={page} totalPage={totalPage || page + 1} setPage={setPage} limit={limit} setLimit={setLimit} />
                        ) : null
                    }
                />
            </View>
            <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={closeModal}
            >
                <View className='flex-1 justify-center items-center bg-violet-500 bg-opacity-50'>
                    <View className='bg-white p-6 rounded-lg w-4/5'>
                        <Text className='text-lg font-bold mb-4'>Edit Course</Text>
                        <TextInput
                            className='border border-gray-300 p-2 mb-4 rounded-lg'
                            placeholder="Title"
                            value={formCourse?.title}
                            onChangeText={(text) => handleChange("title", text)}
                        />
                        <TextInput
                            className='border border-gray-300 p-2 mb-4 rounded-lg'
                            placeholder="Author"
                            value={formCourse?.description}
                            onChangeText={(text) => handleChange("description", text)}
                        />
                        <TextInput
                            className='border border-gray-300 p-2 mb-4 rounded-lg'
                            placeholder="Description"
                            value={formCourse?.benefit}
                            onChangeText={(text) => handleChange("benefit", text)}
                        />
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
                        <View className='flex-row justify-between'>
                            <TouchableOpacity className='p-2 bg-blue-500 rounded-lg'
                                onPress={handleUpdate}>
                                <Text className='text-white font-bold'>Update</Text>
                            </TouchableOpacity>
                            <TouchableOpacity className='p-2 bg-gray-500 rounded-lg'
                                onPress={closeModal}>
                                <Text className='text-white font-bold'>Cancel</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>

        </SafeAreaView>
    );
};

export default MyVideo;
