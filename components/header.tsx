import { View, Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View className="w-full shadow-xl">
    <Image
      source={require('../assets/images/logo-unique-encabezado.png')}
      resizeMode="contain"
      style={{ width: 260, height: 80 }}
    />
  </View>
  )
}

export default Header