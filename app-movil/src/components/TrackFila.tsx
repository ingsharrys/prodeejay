import { IonButton, IonIcon, IonItem, IonLabel } from '@ionic/react';
import { cartOutline, checkmarkCircle, downloadOutline, play, videocamOutline } from 'ionicons/icons';
import { Browser } from '@capacitor/browser';
import { api, Track } from '../api';
import { useStore } from '../store';

/** Fila de canción: play/video, datos y botón de compra o descarga. */
export default function TrackFila({ track, alerta }: { track: Track; alerta: (msg: string) => void }) {
  const { reproducir, sonando, carrito, agregarCarrito, usuario } = useStore();
  const suena = sonando?.track.id === track.id && !sonando.pausado;
  const enCarrito = carrito.some((t) => t.id === track.id);

  async function descargar() {
    try {
      const r = await api.get(`/descargar/${track.id}`);
      await Browser.open({ url: r.url });
    } catch (e: any) {
      alerta(e.message || 'No se pudo descargar.');
    }
  }

  return (
    <IonItem lines="full">
      <IonButton
        slot="start"
        fill="clear"
        onClick={() => reproducir(track)}
        disabled={!track.preview}
        style={{ width: 40 }}
      >
        {suena ? (
          <span className="eq">
            <span></span>
            <span></span>
            <span></span>
          </span>
        ) : (
          <IonIcon slot="icon-only" icon={track.es_video ? videocamOutline : play} />
        )}
      </IonButton>
      <IonLabel>
        <h2 style={{ fontSize: 14, fontWeight: 600 }}>{track.titulo}</h2>
        <p style={{ fontSize: 12 }}>
          {track.artista || track.dj?.nombre || '—'}
          {track.bpm ? ` · ${track.bpm} BPM` : ''}
          {track.genero ? ` · ${track.genero}` : ''}
        </p>
      </IonLabel>
      {track.comprado ? (
        <IonButton slot="end" className="precio-btn" onClick={descargar}>
          <IonIcon icon={downloadOutline} style={{ marginRight: 4 }} /> Bajar
        </IonButton>
      ) : enCarrito ? (
        <IonIcon slot="end" icon={checkmarkCircle} color="primary" />
      ) : (
        <IonButton
          slot="end"
          className="precio-btn"
          onClick={() => {
            if (!usuario) {
              alerta('Inicia sesión o regístrate en la pestaña Cuenta para comprar.');
              return;
            }
            agregarCarrito(track);
          }}
        >
          ${track.precio.toFixed(2)} <IonIcon icon={cartOutline} style={{ marginLeft: 4 }} />
        </IonButton>
      )}
    </IonItem>
  );
}
