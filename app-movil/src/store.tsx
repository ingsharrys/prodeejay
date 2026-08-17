import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { api, getToken, setToken, Track, MetodoPago } from './api';

/** Estado global: sesión, carrito, métodos de pago y reproductor. */

interface Usuario {
  id: number;
  nombre: string;
  email: string;
}

interface Sonando {
  track: Track;
  pausado: boolean;
}

interface Store {
  usuario: Usuario | null;
  setSesion: (token: string | null, usuario: Usuario | null) => void;
  carrito: Track[];
  agregarCarrito: (t: Track) => void;
  quitarCarrito: (id: number) => void;
  vaciarCarrito: () => void;
  metodos: MetodoPago[];
  sonando: Sonando | null;
  reproducir: (t: Track) => void;
  alternarPausa: () => void;
  detener: () => void;
  video: Track | null;
  verVideo: (t: Track | null) => void;
}

const Ctx = createContext<Store>(null as any);
export const useStore = () => useContext(Ctx);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(() => {
    const guardado = localStorage.getItem('usuario');
    return guardado ? JSON.parse(guardado) : null;
  });
  const [carrito, setCarrito] = useState<Track[]>(() => {
    const guardado = localStorage.getItem('carrito');
    return guardado ? JSON.parse(guardado) : [];
  });
  const [metodos, setMetodos] = useState<MetodoPago[]>([]);
  const [sonando, setSonando] = useState<Sonando | null>(null);
  const [video, setVideo] = useState<Track | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    api.get('/config').then((c) => setMetodos(c.metodos || [])).catch(() => {});
    // Validar el token guardado al abrir la app.
    if (getToken()) {
      api.get('/perfil').catch((e) => {
        if (e.status === 401) setSesion(null, null);
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }, [carrito]);

  function setSesion(token: string | null, u: Usuario | null) {
    setToken(token);
    setUsuario(u);
    if (u) localStorage.setItem('usuario', JSON.stringify(u));
    else localStorage.removeItem('usuario');
  }

  function audio(): HTMLAudioElement {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.addEventListener('ended', () => setSonando(null));
    }
    return audioRef.current;
  }

  function reproducir(t: Track) {
    if (!t.preview) return;
    if (t.es_video) {
      audio().pause();
      setSonando(null);
      setVideo(t);
      return;
    }
    const a = audio();
    if (sonando?.track.id === t.id) {
      alternarPausa();
      return;
    }
    a.src = t.preview;
    a.play().catch(() => {});
    setSonando({ track: t, pausado: false });
  }

  function alternarPausa() {
    const a = audio();
    if (!sonando) return;
    if (a.paused) {
      a.play().catch(() => {});
      setSonando({ ...sonando, pausado: false });
    } else {
      a.pause();
      setSonando({ ...sonando, pausado: true });
    }
  }

  function detener() {
    audio().pause();
    setSonando(null);
  }

  const store: Store = {
    usuario,
    setSesion,
    carrito,
    agregarCarrito: (t) => setCarrito((c) => (c.some((x) => x.id === t.id) ? c : [...c, t])),
    quitarCarrito: (id) => setCarrito((c) => c.filter((x) => x.id !== id)),
    vaciarCarrito: () => setCarrito([]),
    metodos,
    sonando,
    reproducir,
    alternarPausa,
    detener,
    video,
    verVideo: setVideo,
  };

  return <Ctx.Provider value={store}>{children}</Ctx.Provider>;
}
