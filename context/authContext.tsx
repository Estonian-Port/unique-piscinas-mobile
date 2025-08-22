import { UsuarioLogin } from "@/data/domain/usuario"
import { createContext, useContext, useEffect, useState, ReactNode } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { authService } from "@/services/auth.service"
import { piscinaService } from "@/services/piscina.service"
import { PiscinaListItem } from "@/data/domain/piscina"

type AuthContextType = {
  usuario: UsuarioLogin | null
  selectedPool: PiscinaListItem | null
  login: (username: string, password: string) => Promise<void>
  logout: () => Promise<void>
  seleccionarPiscina: (piscinaId: number) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const STORAGE_KEY_POOL = "pool_id"
export const STORAGE_KEY_TOKEN = "token"

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [usuario, setUsuario] = useState<UsuarioLogin | null>(null)
  const [selectedPool, setSelectedPool] = useState<PiscinaListItem | null>(null)

  const login = async (username: string, password: string) => {
    try {
      const receivedToken = await authService.login(username, password)
      await AsyncStorage.setItem(STORAGE_KEY_TOKEN, receivedToken)
      await authService.setAuthToken()
      
      const currentUser = await authService.getCurrentUser()
      setUsuario(currentUser)
    } catch (e) {
      console.error("Error en login:", e)
      throw e
    }
  }

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY_TOKEN)
      await AsyncStorage.removeItem(STORAGE_KEY_POOL)
      setUsuario(null)
      setSelectedPool(null)
    } catch (e) {
      console.error("Error en logout:", e)
    }
  }
    
  const seleccionarPiscina = async (piscinaId: number) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY_POOL, piscinaId.toString())
      const selectedPool = await piscinaService.getPiscinaHeaderById(piscinaId)
      setSelectedPool(selectedPool)
    } catch (e) {
      console.error("Error al seleccionar piscina:", e)
      throw e
    }
  }

  const value = {
    usuario,
    selectedPool,
    login,
    logout,
    seleccionarPiscina,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider")
  }
  return context
}
