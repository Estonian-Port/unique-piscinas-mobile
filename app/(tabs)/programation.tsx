import { View, ScrollView, ActivityIndicator } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ScreenTabs } from '@/components/utiles/Screen'
import ProgramacionIluminacion from '@/components/programacion/programacionIluminacion'
import ProgramacionFiltrado from '@/components/programacion/programacionFiltrado'
import { PiscinaProgramacion } from '@/data/domain/piscina'
import PrivateScreen from '@/components/utiles/privateScreen'
import { useAuth } from '@/context/authContext'
import WebTabBar from '@/components/utiles/webTabBar'
import Header from '@/components/utiles/header'
import { piscinaService } from '@/services/piscina.service'

const Programation = () => {

  const { usuario, selectedPool } = useAuth()
  const [piscina, setPiscina] = useState<PiscinaProgramacion | null>(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    if (!piscina) {
      const fetchPool = async () => {
        try {
          const data = await piscinaService.getPiscinaProgramacionById(selectedPool!.id)
          setPiscina(data)
        } catch (error) {
          console.error("Error al cargar el equipamiento de la piscina:", error)
        } finally {
          setLoading(false)
        }
      }
      fetchPool()
    }
  }, [piscina])

  if (loading || !usuario || !selectedPool || !piscina) {
    return (
      <View className="flex-1 justify-center items-center bg-white">
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    <PrivateScreen>
      <ScrollView className="flex-1 bg-white">
        <ScreenTabs>
          <Header 
            usuario={usuario!} 
            piscina={selectedPool!} 
          />
          <WebTabBar />
          <ProgramacionFiltrado programacion={piscina!.programacionFiltrado} />
          <ProgramacionIluminacion programacion={piscina!.programacionIluminacion} />
        </ScreenTabs>
      </ScrollView>
    </PrivateScreen>
  )
}

export default Programation
