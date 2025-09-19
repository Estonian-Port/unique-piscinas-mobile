import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Filter, RefreshCw, Trash2, Droplet, RotateCcw, Power } from "react-native-feather"

interface ControlButtonProps {
  icon: React.ReactNode
  label: string
  onPress: () => void
  position: "top" | "right" | "bottom-left" | "bottom-right" | "left"
  activo: boolean
}

const ControlButton = ({ icon, label, onPress, position, activo }: ControlButtonProps) => {
  const positionStyles = {
    top: "absolute -top-10 left-20 ml-2",
    right: "absolute top-10 -right-5",
    left: "absolute top-10 -left-5",
    "bottom-left": "absolute bottom-0 left-0",
    "bottom-right": "absolute bottom-0 right-0",
  }[position]

  return (
    <View className={`${positionStyles}`}>
      <TouchableOpacity
        onPress={onPress}
        className="items-center justify-center w-20 h-20 rounded-full bg-grayish-unique border border-gray-400"
        activeOpacity={0.7}
        disabled={!activo}
      >
        <View className="items-center justify-center">
          {icon}
          <Text className="text-text font-geist text-xs mt-1">{label}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

interface PanelFuncionesFiltroProps {
  botonesActivos: boolean
  onFilter: () => void
  onBackwash: () => void
  onRinse: () => void
  onDrain: () => void
  onRecirculate: () => void
  onPower: () => void
  funcionActiva: boolean
  opacidad?: number
}

const PanelFuncionesFiltro = ({
  botonesActivos,
  onFilter,
  onBackwash,
  onRinse,
  onDrain,
  onRecirculate,
  funcionActiva = false,
  opacidad = 1,
}: PanelFuncionesFiltroProps) => {
  return (
    <View className="flex-1 items-center justify-center w-full mt-5">
      <View className="relative w-64 h-64" style={{ opacity: opacidad }}>
        {/* Central power button */}
        <View
          className={`absolute top-1/2 left-1/2 -mt-16 -ml-16 w-32 h-32 rounded-full items-center justify-center ${
            funcionActiva ? "bg-purple-unique" : "bg-grayish-unique"
          }`}
        >
          <Power stroke={funcionActiva ? "#FFF" : "#4e4965"} width={32} height={32} />
        </View>

        {/* Surrounding buttons */}
        <ControlButton
          icon={<Filter stroke="#4e4965" width={24} height={24} />}
          label="Filtrar"
          onPress={onFilter}
          position="top"
          activo={botonesActivos}
        />

        <ControlButton
          icon={<RefreshCw stroke="#4e4965" width={24} height={24} />}
          label="Retrolavar"
          onPress={onBackwash}
          position="right"
          activo={botonesActivos}
        />

        <ControlButton
          icon={<Droplet stroke="#4e4965" width={24} height={24} />}
          label="Enjuagar"
          onPress={onRinse}
          position="bottom-right"
          activo={botonesActivos}
        />

        <ControlButton
          icon={<Trash2 stroke="#4e4965" width={24} height={24} />}
          label="Desagotar"
          onPress={onDrain}
          position="bottom-left"
          activo={botonesActivos}
        />

        <ControlButton
          icon={<RotateCcw stroke="#4e4965" width={24} height={24} />}
          label="Recircular"
          onPress={onRecirculate}
          position="left"
          activo={botonesActivos}
        />
      </View>
    </View>
  )
}

export default PanelFuncionesFiltro
