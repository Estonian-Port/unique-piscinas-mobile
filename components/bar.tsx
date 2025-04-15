import { View } from 'react-native'
import React from 'react'

const Bar = ({currentValue, colorBar} : {currentValue : number, colorBar:any}) => {
    const percentage = Math.min(Math.max(((currentValue) / (100)) * 100, 0), 100)
  return (
      <View className="h-2 w-full bg-gray-200 rounded-full overflow-hidden">
        <View className={`h-full bg-${colorBar}`} style={{ width: `${percentage}%`}} />
      </View>
  )
}

export default Bar