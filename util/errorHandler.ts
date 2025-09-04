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

const INTERNAL_SERVER_ERROR = 500

export const mostrarMensajeError = (error: ErrorResponse) => {
  const status = error.response?.status
  const mensajeError = status >= INTERNAL_SERVER_ERROR
    ? 'Ocurrió un error. Consulte al administrador del sistema'
    : axios.isAxiosError(error) && !status
      ? 'Ocurrió un error al conectarse al backend. Consulte al administrador del sistema'
      : error.response.data.message
  if (status >= INTERNAL_SERVER_ERROR) {
    console.error(error) //Recordar que el profe dijo que esto no es buena práctica, se usan bibliotecas de manejo de errores
  }
  return mensajeError
}

export type ErrorResponse = {
  response: {
    status: number,
    data: {
      message: string
    }
  }
}