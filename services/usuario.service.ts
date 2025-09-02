import api from '../helper/auth.interceptor';
import { NuevoUsuario } from '@/data/domain/user';

const USUARIO = '/usuario'

class UsuarioService {


  altaUsuario = async (nuevoUsuario: NuevoUsuario) => {
    try {
      const response = await api.post(`${USUARIO}/altaUsuario`, {
        email: nuevoUsuario.email,
      });

      console.log("Respuesta:", response.data);
    } catch (error) {
      console.error("Error en la request:", error);
    }
  }
}

export const usuarioService = new UsuarioService()