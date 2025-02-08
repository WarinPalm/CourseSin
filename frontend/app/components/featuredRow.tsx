import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import SuggestionCard from './suggestionCard';

const FeatureRow = () => {
    const featureRows = [
        {
            title: 'Suggestion Courses',
            description: 'Top rated courses',
            courses: [
                { id: 1, name: 'CourseName1', description: 'Learn the basics of Python programming.', category: 'Programming' },
                { id: 2, name: 'CourseName2', description: 'Deep dive into React and its ecosystem.', category: 'Web Development' },
                { id: 3, name: 'CourseName3', description: 'Introduction to HTML and CSS.', category: 'Web Development' },
                { id: 4, name: 'CourseName4', description: 'Advanced JavaScript techniques.', category: 'Programming' },
            ],
        }
    ];

    return (
        <View className='mt-5'>
            {featureRows.map((row, rowIndex) => (
                <View key={rowIndex}>
                    <View className='flex-row items-center justify-between px-4'>
                        <View>
                            <Text className='font-bold text-lg'>{row.title}</Text>
                            <Text className="text-black text-xs">{row.description}</Text>
                        </View>
                        <TouchableOpacity>
                            <Text className='font-semibold text-black'>View All</Text>
                        </TouchableOpacity>
                    </View>
                    <ScrollView
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        contentContainerStyle={{ paddingHorizontal: 20 }}
                        className='overflow-visible py-5'>
                        <View className='flex-row'>
                            {row.courses.map((course, index) => (
                                <SuggestionCard key={index} item={course} />
                            ))}
                        </View>
                    </ScrollView>
                </View>
            ))}
        </View>
    );
};

export default FeatureRow;