import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, usePathname, router } from 'expo-router'
import icons from '@/constants/icons'


const SearchBar = () => {

    const params = useLocalSearchParams<{ query?: string }>();
    const [search, setSearch] = useState(params.query);

    
    const handleSearch = (text: string) => {
        setSearch(text)
    }
    return (
        <View className='flex flex-row items-center justify-between w-full px-4 rounded-xl bg-purple-100
        bor border-purple-900 mt-5 py-2'>
            <View className='flex-1 flex flex-row items-center justify-start z-50'>
                <Image source={icons.search} className='size-5' />
                <TextInput
                    value={search}
                    onChangeText={handleSearch}
                    placeholder='Search for course'
                    className='text-sm font-rubik text-black ml-2 flex-1'
                />
                <TouchableOpacity>
                    <Image source={icons.filter} className='size-5'/>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SearchBar