import { View, Image } from 'react-native'
import React from 'react'

const Header = () => {
  return (
    <View>
    <Image
      source={require('../../assets/images/logo-unique-encabezado.png')}
      resizeMode="contain"
      //style={{ width: 260, height: 80 }}
      style={{ width: 100, height: 25 }} // En iOS
    />
  </View>
  )
}

export default Header