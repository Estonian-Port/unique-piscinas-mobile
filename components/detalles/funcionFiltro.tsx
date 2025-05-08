import type React from "react"
import { View, Text, TouchableOpacity } from "react-native"
import { Filter, RefreshCw, Trash2, Droplet, RotateCcw, Power } from "react-native-feather"

const StyledView = View
const StyledText = Text
const StyledTouchableOpacity = TouchableOpacity

interface ControlButtonProps {
  icon: React.ReactNode
  label: string
  onPress: () => void
  position: "top" | "right" | "bottom-left" | "bottom-right" | "left"
}

const ControlButton = ({ icon, label, onPress, position }: ControlButtonProps) => {
  const positionStyles = {
    top: "absolute -top-10 left-20 ml-2",
    right: "absolute top-10 -right-5",
    left: "absolute top-10 -left-5",
    "bottom-left": "absolute bottom-0 left-0",
    "bottom-right": "absolute bottom-0 right-0",
  }[position]

  return (
    <StyledView className={`${positionStyles}`}>
      <StyledTouchableOpacity
        onPress={onPress}
        className="items-center justify-center w-20 h-20 rounded-full bg-yellow-50 border border-yellow-200"
        activeOpacity={0.7}
      >
        <StyledView className="items-center justify-center">
          {icon}
          <StyledText className="text-gray-500 text-xs mt-1">{label}</StyledText>
        </StyledView>
      </StyledTouchableOpacity>
    </StyledView>
  )
}

interface CircularControlProps {
  onFilter: () => void
  onBackwash: () => void
  onRinse: () => void
  onDrain: () => void
  onRecirculate: () => void
  onPower: () => void
  isPowerOn: boolean
}

const CircularControl = ({
  onFilter,
  onBackwash,
  onRinse,
  onDrain,
  onRecirculate,
  onPower,
  isPowerOn = false,
}: CircularControlProps) => {
  return (
    <StyledView className="flex-1 items-center justify-center w-full mt-5">
      <StyledView className="relative w-64 h-64">
        {/* Central power button */}
        <StyledTouchableOpacity
          onPress={onPower}
          className={`absolute top-1/2 left-1/2 -mt-16 -ml-16 w-32 h-32 rounded-full items-center justify-center ${isPowerOn ? "bg-yellow-400" : "bg-yellow-100"} border-2 border-yellow-300`}
          activeOpacity={0.7}
        >
          <Power stroke={isPowerOn ? "#FFF" : "#D97706"} width={32} height={32} />
        </StyledTouchableOpacity>

        {/* Surrounding buttons */}
        <ControlButton
          icon={<Filter stroke="#D97706" width={24} height={24} />}
          label="Filtrar"
          onPress={onFilter}
          position="top"
        />

        <ControlButton
          icon={<RefreshCw stroke="#D97706" width={24} height={24} />}
          label="Retrolavar"
          onPress={onBackwash}
          position="right"
        />

        <ControlButton
          icon={<Droplet stroke="#D97706" width={24} height={24} />}
          label="Enjuagar"
          onPress={onRinse}
          position="bottom-right"
        />

        <ControlButton
          icon={<Trash2 stroke="#D97706" width={24} height={24} />}
          label="Desagotar"
          onPress={onDrain}
          position="bottom-left"
        />

        <ControlButton
          icon={<RotateCcw stroke="#D97706" width={24} height={24} />}
          label="Recircular"
          onPress={onRecirculate}
          position="left"
        />
      </StyledView>
    </StyledView>
  )
}

export default CircularControl
