import { useState } from "react"
import { View, Text, SafeAreaView } from "react-native"
import CircularControl from "./funcionFiltro"

const ControlScreen = () => {
  const [isPowerOn, setIsPowerOn] = useState(false)

  const handlePower = () => {
    setIsPowerOn(!isPowerOn)
  }

  const handleFilter = () => {
    console.log("Filtrar")
  }

  const handleBackwash = () => {
    console.log("Retrolavar")
  }

  const handleRinse = () => {
    console.log("Enjuagar")
  }

  const handleDrain = () => {
    console.log("Desagotar")
  }

  const handleRecirculate = () => {
    console.log("Recircular")
  }

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 items-center justify-center p-4">
        <Text className="text-2xl mb-8 text-text font-geist-semi-bold">Control de Sistema</Text>

        <CircularControl
          onFilter={handleFilter}
          onBackwash={handleBackwash}
          onRinse={handleRinse}
          onDrain={handleDrain}
          onRecirculate={handleRecirculate}
          onPower={handlePower}
          isPowerOn={isPowerOn}
        />
      </View>
    </SafeAreaView>
  )
}

export default ControlScreen