import { View, TextInput, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, usePathname, router } from 'expo-router'
import icons from '@/constants/icons'
import { useDebouncedCallback } from 'use-debounce';

const SearchBar = () => {
    const path = usePathname();
    const params = useLocalSearchParams<{ query?: string }>();
    const [search, setSearch] = useState(params.query);

    const debounceSearch = useDebouncedCallback((text: string) => {
        router.setParams({ query: text })
    }, 500)

    const handleSearch = (text: string) => {
        setSearch(text);
        debounceSearch(text);
    };

    return (
        <View className="flex flex-row items-center bg-white border border-gray-300 rounded-full shadow-lg px-4 py-2">
            <Image source={icons.search} className="w-5 h-5 opacity-60" />

            <TextInput
                value={search}
                onChangeText={handleSearch}
                placeholder="ค้นหาคอร์สเรียน..."
                placeholderTextColor="#999"
                className="text-base text-black ml-3 flex-1"
            />


        </View>
    );
};

export default SearchBar;
