import React from 'react';
import { Text, Pressable } from 'react-native';

interface RadiusButtonProps {
    title?: string;
    onPress: () => void;
}

const RadiusButton = ({title = '', onPress}: RadiusButtonProps) => {
    return (
        <Pressable
            className="bg-blue-500 py-3 px-5 rounded-full items-center justify-center"
            onPress={onPress}
        >
            <Text className="text-white text-base font-bold">{title}</Text>
        </Pressable>
    );
};

export default RadiusButton;
