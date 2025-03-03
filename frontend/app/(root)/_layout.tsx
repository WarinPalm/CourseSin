import { ActivityIndicator } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Redirect, Slot, Stack } from 'expo-router';
import React, { useState } from "react";

export default function RootLayout() {
    const [loading, setLoading] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(true); // true - login แล้ว, false - ยังไม่ login

    if (loading) {
        return (
            <SafeAreaView className="bg-white h-full flex justify-center items-center">
                <ActivityIndicator className="text-purple-500" size="large" />
            </SafeAreaView>
        );
    }

    if (!isLoggedIn) return <Redirect href="/sign-in" />;

    return (
        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="(tabs)" />
            <Slot />
        </Stack>
    );
}
