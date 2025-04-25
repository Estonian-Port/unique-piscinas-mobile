import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

const TimeInput = ({title} : {title:string}) => {
  const [time, setTime] = useState(new Date());
  const [isPickerVisible, setPickerVisible] = useState(false);

  const handleConfirm = (selectedTime: Date) => {
    setPickerVisible(false); // Oculta el picker
    setTime(selectedTime); // Actualiza la hora seleccionada
  };

  return (
    <View className="items-center justify-center p-2">
      <Pressable 
        onPress={() => setPickerVisible(true)}
        className="items-center"
      >
        <View className="flex-row items-center mb-1">
          <MaterialIcons name="schedule" size={20} color="#000" />
          <Text className="font-geist text-text text-sm ml-1">
            {title}
          </Text>
        </View>
        <Text className="font-geist-semiBold text-text text-xl">
          {time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </Text>
      </Pressable>
      <DateTimePickerModal
        isVisible={isPickerVisible}
        mode="time"
        is24Hour={true}
        onConfirm={handleConfirm}
        onCancel={() => setPickerVisible(false)}
      />
    </View>
  );
};

export default TimeInput;