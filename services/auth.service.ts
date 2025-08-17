import api from '../helper/auth.interceptor';
import { UserLogin } from '@/data/domain/user';

class AuthService {
  // POST /login — devuelve solo el token
  login = async (username: string, password: string): Promise<string> => {
    const response = await api.post('/login', { username, password });
    return response.headers['authorization'];
  };

  // GET /usuario/me — devuelve el usuario actual a partir del token
  getCurrentUser = async (): Promise<UserLogin> => {
    const response = await api.get('/usuario/me');
    return response.data.data;
  };

  // helper: setear token en axios
  setAuthToken = (token: string | null) => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete api.defaults.headers.common["Authorization"];
    }
  };
}

export const authService = new AuthService();
