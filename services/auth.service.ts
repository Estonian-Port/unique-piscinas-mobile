import api from './api';
import { UserLogin } from '@/data/domain/user';

class AuthService {
  // POST /login — devuelve solo el token
  login = async (username: string, password: string): Promise<string> => {
    const response = await api.post('/login', { username, password });
    return response.data.token;
  };

  // GET /usuario/me — devuelve el usuario actual a partir del token
  getCurrentUser = async (): Promise<UserLogin> => {
    const response = await api.get('/usuario/me');
    return response.data;
  };
}

export const authService = new AuthService();
