import { View, Text, ScrollView, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import { getAllCategory } from '@/app/(root)/api/category/category';
import { CategoryResponse } from '../types/responses/category';

const imageMap: Record<string, any> = {
  'C#': require('../../../assets/images/C#.png'),
  'C++': require('../../../assets/images/C++.png'),
  'CSS': require('../../../assets/images/CSS.png'),
  'Flutter': require('../../../assets/images/Flutter.png'),
  'HTML': require('../../../assets/images/HTML.png'),
  'JavaScript': require('../../../assets/images/JavaScript.png'),
  'Python': require('../../../assets/images/Python.png'),
  'React': require('../../../assets/images/React.png'),
  'ReactNative': require('../../../assets/images/ReactNative.png'),
  'TypeScript': require('../../../assets/images/TypeScript.png'),
};

const Category = ({
  selectedCategory,
  setSelectedCategory,
  categoryName,
  setCategoryName,
}: {
  selectedCategory: string;
  setSelectedCategory: (categoryId: string) => void;
  categoryName: string;
  setCategoryName: (categoryName: string) => void;
}) => {
  const [categories, setCategories] = useState<CategoryResponse[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCategories = async () => {
    try {
      const res = await getAllCategory();
      setCategories(res.data.Category);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleCategory = (categoryId: string, categoryName: string) => {
    if (selectedCategory === categoryId) {
      setSelectedCategory('All');
      setCategoryName('All');
    } else {
      setSelectedCategory(categoryId);
      setCategoryName(categoryName);
    }
  };

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }}>
        {loading ? (
          <View className="w-[300px] h-40 justify-center items-center">
            <ActivityIndicator size="large" color="#8B5CF6" />
          </View>
        ) : (
          categories.map((category, index) => (
            <View key={index} className="flex items-center justify-center mr-6">
              <TouchableOpacity
                onPress={() => handleCategory(category.id, category.name)}
                className={`p-1 rounded-full shadow border border-violet-900 
                ${selectedCategory === category.id ? 'bg-purple-300' : 'bg-gray-200'}`}>
                <Image
                  style={{ width: 45, height: 45 }}
                  source={imageMap[category.name]}
                />
              </TouchableOpacity>
              <Text className={`font-rubik-semibold text-sm mt-2 
                ${selectedCategory === category.id ? 'font-semibold text-purple-800' : 'text-black'}`}>
                {category.name}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
};

export default Category;
