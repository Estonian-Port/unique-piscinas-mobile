import { UsuarioAlta } from '@/app/registro';
import api from '../helper/auth.interceptor';
import { NuevoUsuario, UsuarioLogin } from '@/data/domain/user';

const USUARIO = '/usuario';

class UsuarioService {

  altaUsuario = async (nuevoUsuario: NuevoUsuario) : Promise<{data: any; message: string}> => {
    const response = await api.post(`${USUARIO}/altaUsuario`, nuevoUsuario);
    return {
      data: response.data.data,
      message: response.data.message,
    };
  };

  registro = async (
    usuarioActualizado: UsuarioAlta
  ): Promise<{ data: UsuarioLogin; message: string }> => {
    const response = await api.put(`${USUARIO}/registro`, usuarioActualizado);
    return {
      data: response.data.data,
      message: response.data.message,
    };
  };

  eliminar = async (userId: number, administradorId: number): Promise<void> => {
    const response = await api.delete(`${USUARIO}/delete/${userId}/${administradorId}`);
    return response.data;
  }
}

export const usuarioService = new UsuarioService();
