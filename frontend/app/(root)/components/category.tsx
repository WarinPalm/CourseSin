import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const Category = () => {
    const [activeCategory, setActiveCategory] = useState<number | null>(null);
    const categories = [
        { id: 1, name: 'Python', path: require('../../../assets/images/python.png') },
        { id: 2, name: 'React', path: require('../../../assets/images/react.png') },
        { id: 3, name: 'HTML', path: require('../../../assets/images/html.png') },
        { id: 4, name: 'CSS', path: require('../../../assets/images/css.png') },
        { id: 5, name: 'JavaScript', path: require('../../../assets/images/js.png') },
        { id: 6, name: 'TypeScript', path: require('../../../assets/images/ts.png') },
        { id: 7, name: 'Flutter', path: require('../../../assets/images/flutter.png') },
        { id: 8, name: 'React Native', path: require('../../../assets/images/react-native.png') },
        { id: 9, name: 'C#', path: require('../../../assets/images/c#.png') },
        { id: 10, name: 'C++', path: require('../../../assets/images/c++.png') }
    ];

    return (
        <View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 20 }}
                className='overflow-visible'>
                {categories.map((category, index) => {
                    let isActive = category.id === activeCategory;
                    let btnClass = isActive ? 'bg-purple-300' : 'bg-gray-200';
                    let textClass = isActive ? 'font-semibold text-purple-800' : 'text-black';
                    return (
                        <View key={index} className='flex items-center justify-center mr-6'>
                            <TouchableOpacity
                                onPress={() => setActiveCategory(category.id)}
                                className={`p-1 rounded-full shadow border border-violet-900 ${btnClass}`}>
                                <Image style={{ width: 45, height: 45 }} source={category.path} />
                            </TouchableOpacity>
                            <Text className={`font-rubik-semibold text-sm mt-2 ${textClass}`}>{category.name}</Text>
                        </View>
                    );
                })}
            </ScrollView>
        </View>
    );
}

export default Category;