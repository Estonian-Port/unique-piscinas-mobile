import { useState } from "react"
import { View, Text, SafeAreaView } from "react-native"
import CircularControl from "./funcionFiltro"

const StyledView = View
const StyledText = Text
const StyledSafeAreaView = SafeAreaView

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
    <StyledSafeAreaView className="flex-1 bg-white">
      <StyledView className="flex-1 items-center justify-center p-4">
        <StyledText className="text-2xl font-bold mb-8 text-gray-800">Control de Sistema</StyledText>

        <CircularControl
          onFilter={handleFilter}
          onBackwash={handleBackwash}
          onRinse={handleRinse}
          onDrain={handleDrain}
          onRecirculate={handleRecirculate}
          onPower={handlePower}
          isPowerOn={isPowerOn}
        />
      </StyledView>
    </StyledSafeAreaView>
  )
}

export default ControlScreen