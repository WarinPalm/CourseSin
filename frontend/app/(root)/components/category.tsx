import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';

const Category = () => {
    const categories = [
        { id: '1', name: 'All', path: require('../../../assets/images/python.png') },
        { id: '2', name: 'Python', path: require('../../../assets/images/python.png') },
        { id: '3', name: 'React', path: require('../../../assets/images/react.png') },
        { id: '4', name: 'HTML', path: require('../../../assets/images/html.png') },
        { id: '5', name: 'CSS', path: require('../../../assets/images/css.png') },
        { id: '6', name: 'JavaScript', path: require('../../../assets/images/js.png') },
        { id: '7', name: 'TypeScript', path: require('../../../assets/images/ts.png') },
        { id: '8', name: 'Flutter', path: require('../../../assets/images/flutter.png') },
        { id: '9', name: 'React Native', path: require('../../../assets/images/react-native.png') },
        { id: '10', name: 'C#', path: require('../../../assets/images/c#.png') },
        { id: '11', name: 'C++', path: require('../../../assets/images/c++.png') }
    ];


    const params = useLocalSearchParams<{ filter?: string }>();
    const [selectedCategory, setSelectedCategory] = useState(params.filter || "All");

    const handleCategory = (category: string) => {
        if (selectedCategory === category) {
            setSelectedCategory('All');
            router.setParams({ filter: 'All' });
            return;
        };
        setSelectedCategory(category);
        router.setParams({ filter: category });
    }



    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                className='overflow-visible'>
                {categories.map((category, index) => {

                    return (
                        <View key={index} className='flex items-center justify-center mr-6'>
                            <TouchableOpacity
                                onPress={() => handleCategory(category.name)}
                                className={`p-1 rounded-full shadow border border-violet-900 
    ${selectedCategory === category.name ? 'bg-purple-300' : 'bg-gray-200'}`}>
                                <Image style={{ width: 45, height: 45 }} source={category.path} />
                            </TouchableOpacity>

                            <Text className={`font-rubik-semibold text-sm mt-2 
                            ${selectedCategory === category.name ? 'font-semibold text-purple-800' : 'text-black'}`}>
                                {category.name}
                            </Text>

                        </View>
                    );
                })}

            </ScrollView>
        </View>
    );
}

export default Category;