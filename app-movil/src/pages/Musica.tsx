import {
  IonContent,
  IonHeader,
  IonInfiniteScroll,
  IonInfiniteScrollContent,
  IonList,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSearchbar,
  IonSegment,
  IonSegmentButton,
  IonSpinner,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useRef, useState } from 'react';
import { api, Track } from '../api';
import TrackFila from '../components/TrackFila';

const TIPOS = [
  { valor: '', texto: 'Todo' },
  { valor: 'audio', texto: 'Audio' },
  { valor: 'pack', texto: 'Packs' },
  { valor: 'set', texto: 'Sets' },
  { valor: 'video', texto: 'Videos' },
];

export default function Musica() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [busqueda, setBusqueda] = useState('');
  const [tipo, setTipo] = useState('');
  const [pagina, setPagina] = useState(1);
  const [paginas, setPaginas] = useState(1);
  const [cargando, setCargando] = useState(true);
  const [aviso, setAviso] = useState('');
  const pedido = useRef(0);

  async function cargar(pag: number, reemplazar: boolean) {
    const id = ++pedido.current;
    if (reemplazar) setCargando(true);
    try {
      const q = new URLSearchParams();
      if (busqueda) q.set('q', busqueda);
      if (tipo) q.set('tipo', tipo);
      q.set('page', String(pag));
      const r = await api.get(`/catalogo?${q.toString()}`);
      if (id !== pedido.current) return;
      setPagina(r.pagina);
      setPaginas(r.paginas);
      setTracks((antes) => (reemplazar ? r.tracks : [...antes, ...r.tracks]));
    } catch (e: any) {
      setAviso(e.message);
    } finally {
      if (id === pedido.current) setCargando(false);
    }
  }

  useEffect(() => {
    cargar(1, true);
  }, [busqueda, tipo]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle style={{ color: '#1db954', fontWeight: 800 }}>PRODEEJAY</IonTitle>
        </IonToolbar>
        <IonToolbar>
          <IonSearchbar
            placeholder="Buscar canción, artista o DJ"
            debounce={400}
            onIonInput={(e) => setBusqueda(e.detail.value || '')}
          />
        </IonToolbar>
        <IonToolbar>
          <IonSegment value={tipo} onIonChange={(e) => setTipo(String(e.detail.value ?? ''))} scrollable>
            {TIPOS.map((t) => (
              <IonSegmentButton key={t.valor} value={t.valor}>
                {t.texto}
              </IonSegmentButton>
            ))}
          </IonSegment>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={async (e) => { await cargar(1, true); e.detail.complete(); }}>
          <IonRefresherContent />
        </IonRefresher>

        {cargando ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <IonList>
            {tracks.map((t) => (
              <TrackFila key={t.id} track={t} alerta={setAviso} />
            ))}
            {tracks.length === 0 && (
              <p style={{ textAlign: 'center', color: '#b3b3b3', padding: 30 }}>Sin resultados.</p>
            )}
          </IonList>
        )}

        <IonInfiniteScroll
          disabled={pagina >= paginas}
          onIonInfinite={async (e) => {
            await cargar(pagina + 1, false);
            (e.target as HTMLIonInfiniteScrollElement).complete();
          }}
        >
          <IonInfiniteScrollContent loadingText="Cargando más..." />
        </IonInfiniteScroll>

        <div style={{ height: 90 }} />
        <IonToast isOpen={!!aviso} message={aviso} duration={2600} onDidDismiss={() => setAviso('')} />
      </IonContent>
    </IonPage>
  );
}
