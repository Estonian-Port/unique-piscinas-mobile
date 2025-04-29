import { View, Text, ScrollView, Pressable, FlatList } from "react-native"
import { ConfigurationIcon, EyeIcon } from "@/assets/icons"
import { MaterialIcons } from "@expo/vector-icons"

const TablaPiscinas = () => {
  const datos = Array.from({ length: 20 }, (_, index) => ({
    nombre: `Piscina ${index + 1}`,
    propietario: `Propietario ${index + 1}`,
    tipo: index % 2 === 0 ? ("Skimmer" as const) : ("Desborde" as const),
    ph: Number.parseFloat((6.5 + Math.random() * 2).toFixed(1)),
    equipos: [
      { tipo: "uv", estado: index % 3 === 0 ? "operativo" : "reemplazo" },
      { tipo: "ionizador", estado: index % 4 === 0 ? "inactivo" : "operativo" },
      { tipo: "trasductor", estado: index % 5 === 0 ? "reemplazo" : "operativo" },
      { tipo: "calentador", estado: index % 2 === 0 ? "inactivo" : "operativo" },
    ],
  }))

  // Define column widths for consistency
  const columnWidths = {
    nombre: 150,
    propietario: 150,
    tipo: 120,
    ph: 100,
    equipos: 150,
    acciones: 190,
  }

  return (
    <View className="flex-1">
      <ScrollView horizontal={true} showsHorizontalScrollIndicator={true}>
        <View>
          <Encabezado columnWidths={columnWidths} />
          <FlatList
            data={datos}
            renderItem={({ item }) => (
              <Fila
                key={item.nombre}
                nombre={item.nombre}
                propietario={item.propietario}
                tipo={item.tipo}
                ph={item.ph}
                equipos={item.equipos}
                columnWidths={columnWidths}
              />
            )}
            getItemLayout={(data, index) => ({
              length: 80, // altura aproximada de cada fila
              offset: 80 * index,
              index,
            })}
            removeClippedSubviews={true}
            initialNumToRender={10}
            maxToRenderPerBatch={10}
            windowSize={10}
          />
        </View>
      </ScrollView>
    </View>
  )
}

export default TablaPiscinas

const Encabezado = ({ columnWidths }: { columnWidths: { nombre: number; propietario: number; tipo: number; ph: number; equipos: number; acciones: number } }) => {
  return (
    <View className="flex-row border-b border-gray-300" style={{ backgroundColor: "#F3F4F6" }}>
      <View style={{ width: columnWidths.nombre, height: 40 }} className="py-4 px-3 items-center justify-center">
        <Text className="font-semibold text-text">Nombre</Text>
      </View>
      <View style={{ width: columnWidths.propietario, height: 40 }} className="py-4 px-3 items-center justify-center">
        <Text className="font-semibold text-text">Propietario</Text>
      </View>
      <View style={{ width: columnWidths.tipo, height: 40 }} className="py-4 px-3 items-center justify-center">
        <Text className="font-semibold text-text">Tipo</Text>
      </View>
      <View style={{ width: columnWidths.ph, height: 40 }} className="py-4 px-3 items-center justify-center">
        <Text className="font-semibold text-text">pH</Text>
      </View>
      <View style={{ width: columnWidths.equipos, height: 40 }} className="py-4 px-3 items-center justify-center">
        <Text className="font-semibold text-text">Estado Equipos</Text>
      </View>
      <View style={{ width: columnWidths.acciones, height: 40 }} className="py-4 px-3 items-center justify-center">
        <Text className="font-semibold text-text">Acciones</Text>
      </View>
    </View>
  )
}

type FilaProps = {
  nombre: string
  propietario: string
  tipo: "Skimmer" | "Desborde"
  ph: number
  equipos: Array<{ tipo: string; estado: string }>
  columnWidths: {
    nombre: number
    propietario: number
    tipo: number
    ph: number
    equipos: number
    acciones: number
  }
}

const Fila = ({ nombre, propietario, tipo, ph, equipos, columnWidths }: FilaProps) => {
  return (
    <View className="flex-row bg-white border-b border-gray-200">
      <View style={{ width: columnWidths.nombre, height: 40 }} className="py-4 px-3 items-center justify-center">
        <Text className="text-gray-800">{nombre}</Text>
      </View>

      <View style={{ width: columnWidths.propietario, height: 40 }} className="py-4 px-3 items-center justify-center">
        <Text className="text-gray-800">{propietario}</Text>
      </View>

      <View style={{ width: columnWidths.tipo, height: 40 }} className="py-4 px-3 items-center justify-center">
        <View
          className={`p-2 rounded-full ${tipo === "Skimmer" ? "bg-white border border-gray-300" : "bg-black"}`}
        >
          <Text className={`font-medium text-sm ${tipo === "Skimmer" ? "text-gray-800" : "text-white"}`}>{tipo}</Text>
        </View>
      </View>

      <View style={{ width: columnWidths.ph, height: 40 }} className="flex-row py-4 px-3 items-center justify-center">
        <View className={`w-3 h-3 rounded-full mr-2 ${ph < 7 || ph >= 8 ? "bg-orange-400" : "bg-green-500"}`} />
        <Text className="text-gray-800">{ph}</Text>
      </View>

      <View style={{ width: columnWidths.equipos, height: 40 }} className="py-4 px-3 items-center justify-center">
        <View className="flex-row items-center gap-2">
          {equipos.map((equipo, index) => (
            <MaterialIcons
              key={index}
              name={
                equipo.tipo === "uv"
                  ? "electric-bolt"
                  : equipo.tipo === "ionizador"
                    ? "lightbulb"
                    : equipo.tipo === "trasductor"
                      ? "waves"
                      : "thermostat"
              }
              size={24}
              color={equipo.estado === "operativo" ? "#4CAF50" : equipo.estado === "inactivo" ? "#FF9800" : "#F44336"}
            />
          ))}
        </View>
      </View>

      <View style={{ width: columnWidths.acciones, height: 40 }} className="py-4 px-3 items-center justify-center">
        <View className="flex-row">
          <Pressable className="bg-white rounded-md py-2 px-4 flex-row items-center justify-center border border-gray-200 mr-2">
            <EyeIcon size={16} />
            <Text className="text-gray-800 text-sm ml-1">Panel</Text>
          </Pressable>
          <Pressable className="bg-white rounded-md py-2 px-4 flex-row items-center justify-center border border-gray-200">
            <ConfigurationIcon size={16} />
            <Text className="text-gray-800 text-sm ml-1">Equipos</Text>
          </Pressable>
        </View>
      </View>
    </View>
  )
}
