import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Category = () => {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const categories = [
        { id: 1, name: 'Python' },
        { id: 2, name: 'React' },
        { id: 3, name: 'HTML/CSS' },
        { id: 4, name: 'JavaScript' },
        { id: 5, name: 'TypeScript' },
        { id: 6, name: 'Flutter' },
        { id: 7, name: 'React Native' },
        { id: 8, name: 'C#' },
        { id: 9, name: 'C++/C' }
    ];

    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                className='overflow-visible'>
                {categories.map((category, index) => {
                    let isActive = category.id === activeCategory;
                    let btnClass = isActive ? 'bg-purple-400' : 'bg-gray-200';
                    let textClass = isActive ? 'font-semibold text-purple-800' : 'text-black';
                    return (
                        <View key={index} className='flex items-center justify-center mr-6'>
                            <TouchableOpacity
                                onPress={() => setActiveCategory(category.id)}
                                className={`p-1 rounded-full shadow border border-purple-900 ${btnClass}`}>
                                <Image style={{ width: 45, height: 45 }} />
                            </TouchableOpacity>
                            <Text className={`text-sm mt-1 ${textClass}`}>{category.name}</Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default Category;