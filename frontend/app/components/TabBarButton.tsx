import { View, Text, Pressable } from 'react-native';
import React, { useEffect } from 'react';
import { icon } from '../constants/icon';
import Animated, { interpolate, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated"
type TabBarButtonProps = {
  onPress: () => void;
  onLongPress: () => void;
  isFocused: boolean;
  routeName: string;
  color: string;
  label: string;
};

const TabBarButton: React.FC<TabBarButtonProps> = ({ onPress, onLongPress, isFocused, routeName, color, label }) => {
  const scale = useSharedValue(0);
  useEffect(() => {
    scale.value = withSpring(typeof isFocused === "boolean" ? (isFocused ? 1 : 0) : isFocused, { duration: 350 });
  }, [scale, isFocused])

  const animatedIconStyle = useAnimatedStyle(() => {
    const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);
    const top = interpolate(scale.value, [0,1],[0,9]);
    return {
      transform: [{
        scale: scaleValue
      }],
      top
    }
  });

  const animatedTextStyle = useAnimatedStyle(() => {
    const opacity = interpolate(scale.value, [0, 1], [1, 0])
    return {
      opacity
    }
  })
  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      className='flex-1 justify-center items-center gap-2'
    >
      <Animated.View style={animatedIconStyle}>

        {icon[routeName] && icon[routeName]({ color: isFocused ? "#673ab7" : "#222" })}
      </Animated.View>
      <Animated.Text style={[{ color: isFocused ? "#673ab7" : "#222" }, animatedTextStyle]}>
        {label}
      </Animated.Text>
    </Pressable>);
};

export default TabBarButton;
