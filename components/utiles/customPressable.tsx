import React from 'react';
import { Pressable, Animated } from 'react-native';

import { GestureResponderEvent, StyleProp, ViewStyle } from 'react-native';

interface CustomPressableProps {
  children: React.ReactNode;
  onPress?: (event: GestureResponderEvent) => void;
  onLongPress?: (event: GestureResponderEvent) => void;
  disabled?: boolean;
  activeOpacity?: number;
  style?: StyleProp<ViewStyle>;
  className?: string;
  [key: string]: any;
}

const CustomPressable: React.FC<CustomPressableProps> = ({ 
  children, 
  onPress, 
  onLongPress,
  disabled = false,
  activeOpacity = 0.6,
  style,
  className, // Para NativeWind
  ...restProps 
}) => {
  // Crear valor animado para la opacidad
  const animatedValue = React.useRef(new Animated.Value(1)).current;

  // Función para animar el press
  const animatePress = (toValue: number, duration = 150) => {
    Animated.timing(animatedValue, {
      toValue,
      duration,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Pressable
      onPress={onPress}
      onLongPress={onLongPress}
      disabled={disabled}
      onPressIn={() => animatePress(activeOpacity)}
      onPressOut={() => animatePress(1)}
      style={({ pressed }) => [
        style,
        disabled && { opacity: 0.5 }
      ]}
      className={className}
      {...restProps}
    >
      <Animated.View
        style={{
          opacity: animatedValue,
        }}
      >
        {children}
      </Animated.View>
    </Pressable>
  );
};

export default CustomPressable;