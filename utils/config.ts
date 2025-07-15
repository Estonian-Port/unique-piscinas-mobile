const isDev = __DEV__;

export const API_BASE_URL = isDev
  ? "http://192.168.0.36:8080"
  : "https://api.tuapp.com";
