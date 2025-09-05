import { View, Image } from 'react-native'
import React from 'react'

const LogoUniqueHeader = () => {
  return (
    <View>
    <Image
      source={require('../../assets/images/logo-unique-encabezado.png')}
      resizeMode="contain"
      style={{ width: 100, height: 25 }}
    />
  </View>
  )
}

export default LogoUniqueHeader