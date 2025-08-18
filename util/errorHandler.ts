import axios from 'axios';

export const handleAxiosError = (error: unknown) => {
  if (axios.isAxiosError(error)) {

    if (error.response) {
      // El servidor respondió con un status fuera del rango 2xx
      console.error('Data:', error.response.data);
    } else if (error.request) {
      // La petición fue hecha pero no llegó respuesta
      console.error('No response received:', error.request);
    } else {
      // Algo pasó al preparar la petición
      console.error('Error setting up request:', error.message);
    }
  } else {
    // Error genérico (no de Axios)
    console.error('Generic Error:', error);
  }
};
