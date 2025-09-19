import { useState } from "react"
import { View, Text, SafeAreaView } from "react-native"
import PanelFuncionesFiltro from "./funcionFiltro"
import { PiscinaResume } from "@/data/domain/piscina";

const FuncionFiltroScreen = ({piscina, entradaDeAguaActiva} : {piscina: PiscinaResume ; entradaDeAguaActiva : boolean}) => {
  const [activo, setActivo] = useState(entradaDeAguaActiva)
  const [hayFuncionActiva, setHayFuncionActiva] = useState(piscina.funcionActiva.length > 0)

  const handlePower = () => {
    setHayFuncionActiva(!hayFuncionActiva)
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

        <PanelFuncionesFiltro
          botonesActivos={activo}
          onFilter={handleFilter}
          onBackwash={handleBackwash}
          onRinse={handleRinse}
          onDrain={handleDrain}
          onRecirculate={handleRecirculate}
          onPower={handlePower}
          funcionActiva={hayFuncionActiva}
          opacidad={!activo ? 0.4 : 1}
        />
      </View>
    </SafeAreaView>
  )
}

export default FuncionFiltroScreen