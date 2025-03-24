import { View, Text, ScrollView, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import { useRouter } from 'expo-router'

interface FollowerListProps {
    name: string;
}

const FollowerList= ({ name }:FollowerListProps) => {
    return (
        <TouchableOpacity className="flex flex-row items-center mt-4 px-6 py-3">
            <Image className="size-16 bg-violet-600 rounded-full border-2 border-white shadow-md" />
            <Text className="text-lg font-semibold text-gray-800 ms-4">{name}</Text>
        </TouchableOpacity>
    )
}


const followers = [
    { id: 1, name: "Wangsua1" },
    { id: 2, name: "Wangsua2" },
    { id: 3, name: "Wangsua3" }
];

const following = [
    { id: 1, name: "Warin1" },
    { id: 2, name: "Warin2" },
    { id: 3, name: "Warin3" }
];

const Follower = () => {
    const [isActive, setActive] = useState<string>("follower");
    const router = useRouter();

    return (
        <SafeAreaView className="bg-white flex-1">
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
                {/* button back */}
                <View className="relative">
                    <TouchableOpacity onPress={() => router.back()}
                        className="absolute bg-white top-4 left-4 p-2 rounded-full z-10">
                        <Image source={icons.backArrow} className="size-7" />
                    </TouchableOpacity>
                    <Text className="text-center font-rubik-bold text-xl mt-7">My Channel</Text>
                </View>

                {/* Tab */}
                <View className="flex flex-row items-center justify-between mx-16 mt-7">
                    <TouchableOpacity 
                        className={`p-2 ${isActive === 'follower' ? 'border-b-2 border-violet-600' : ''}`}
                        onPress={() => setActive('follower')}>
                        <Text className="text-xl font-semibold">ผู้ติดตาม</Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        className={`p-2 ${isActive === 'following' ? 'border-b-2 border-violet-600' : ''}`}
                        onPress={() => setActive("following")}>
                        <Text className="text-xl font-semibold">กำลังติดตาม</Text>
                    </TouchableOpacity>
                </View>

                {/* list follower / following */}
                <View className="mt-5 px-2">
                    {isActive === "follower" ? (
                        followers.map((user) => <FollowerList key={user.id} name={user.name} />)
                    ) : (
                        following.map((user) => <FollowerList key={user.id} name={user.name} />)
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default Follower
