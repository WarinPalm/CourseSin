import { View, Platform, TouchableOpacity, LayoutChangeEvent } from 'react-native';
import { Text, PlatformPressable } from '@react-navigation/elements';
import { createBottomTabNavigator, BottomTabBarProps } from '@react-navigation/bottom-tabs';
import * as Icon from 'react-native-feather';
import TabBarButton from './TabBarButton';
import { useState } from 'react';
import Animated,{ useSharedValue, useAnimatedStyle, withSpring} from 'react-native-reanimated';

export default function TabBar({ state, descriptors, navigation }: BottomTabBarProps) {

    return (
        <View  className='bg-white p-3 flex-row bottom-0 justify-between items-center border-t-2 border-purple-800 '>
           
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const label =
                    typeof options.tabBarLabel === 'string'
                        ? options.tabBarLabel
                        : options.title !== undefined
                            ? options.title
                            : route.name;

                const isFocused = state.index === index;

                const onPress = () => {

                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (
                    <TabBarButton
                        key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routeName={route.name}
                        color={isFocused ? "#673ab7" : "#222"}
                        label={label}
                    />
                );
            })}
        </View>
    );
}