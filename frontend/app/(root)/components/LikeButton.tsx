import { View, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useEffect } from 'react';
import * as Icon from 'react-native-feather';
import { likeCourse, listFavorite, unlikeCourse } from '@/app/(root)/api/favorite/favorite';

interface LikeButtonProps {
    courseId: string;
    token: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ courseId, token }) => {
    const [favoriteCourseIds, setFavoriteCourseIds] = useState<string[]>([]);
    
    useEffect(() => {
        const fetchFavorites = async () => {
            try {
                const res = await listFavorite(token);
                // ดึง course id ออกมา
                const ids = res.data.favorites.map((item: any) => item.course);
                setFavoriteCourseIds(ids);
            } catch (error) {
                console.error("Error fetching favorites", error);
            }
        };
        
        fetchFavorites();
    }, []);
    const isLiked = favoriteCourseIds.includes(courseId);
    const btnClass = isLiked ? 'bg-red-500' : 'bg-purple-700';
    
    const handleFavPress = async () => {
        try {
            if (isLiked) {
                await unlikeCourse(token, courseId);
                setFavoriteCourseIds(prev => prev.filter(id => id !== courseId));
                Alert.alert("Success", "Removed from favorite");
            } else {
                await likeCourse(token, { course_id: courseId });
                setFavoriteCourseIds(prev => [...prev, courseId]);
                Alert.alert("Success", "Added to favorite");
            }
        } catch (error: any) {
            console.error('Error handling favorite:', error);
        }
    };
    
    return (
        <View className='absolute top-40 mt-10 w-full z-50 px-4'>
            <View className='flex-row items-center justify-end space-x-4'>
                <TouchableOpacity
                    onPress={handleFavPress}
                    className={`${btnClass} justify-center items-center rounded-full me-3 p-4 shadow-lg`}
                >
                    <Icon.Heart
                        className='text-white'
                        strokeWidth={2.5}
                        stroke="white"
                        width={24}
                        height={24}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LikeButton;
