/** Cliente de la API del sitio. La URL del servidor se puede cambiar en Cuenta → Ajustes. */

const URL_POR_DEFECTO = 'http://200.7.108.43/~prodeejayremix/nueva';

export function baseUrl(): string {
  return (localStorage.getItem('servidor') || URL_POR_DEFECTO).replace(/\/+$/, '');
}

export function setBaseUrl(url: string) {
  localStorage.setItem('servidor', url.trim().replace(/\/+$/, ''));
}

export function getToken(): string | null {
  return localStorage.getItem('token');
}

export function setToken(token: string | null) {
  if (token) localStorage.setItem('token', token);
  else localStorage.removeItem('token');
}

export class ApiError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

async function llamar(ruta: string, opciones: RequestInit = {}): Promise<any> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    ...(opciones.body ? { 'Content-Type': 'application/json' } : {}),
    ...(getToken() ? { Authorization: `Bearer ${getToken()}` } : {}),
  };

  let res: Response;
  try {
    res = await fetch(`${baseUrl()}/api${ruta}`, { ...opciones, headers });
  } catch {
    throw new ApiError(0, 'No hay conexión con el servidor. Revisa tu internet.');
  }

  let data: any = null;
  try {
    data = await res.json();
  } catch {
    /* respuesta sin cuerpo */
  }

  if (!res.ok) {
    const msg =
      data?.message ||
      (data?.errors ? String(Object.values(data.errors)[0]) : `Error ${res.status}`);
    throw new ApiError(res.status, msg);
  }

  return data;
}

export const api = {
  get: (ruta: string) => llamar(ruta),
  post: (ruta: string, cuerpo?: any) =>
    llamar(ruta, { method: 'POST', body: cuerpo ? JSON.stringify(cuerpo) : undefined }),
};

export interface Track {
  id: number;
  titulo: string;
  artista: string | null;
  dj: { id: number; nombre: string } | null;
  genero: string | null;
  bpm: string | null;
  tipo: string;
  precio: number;
  preview: string | null;
  es_video: boolean;
  comprado: boolean;
}

export interface PlanApi {
  id: number;
  nombre: string;
  precio: number;
  descargas: number;
}

export interface MetodoPago {
  clave: string;
  titulo: string;
  tax: number;
}
