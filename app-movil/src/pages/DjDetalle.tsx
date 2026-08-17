import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api, Track } from '../api';
import TrackFila from '../components/TrackFila';

export default function DjDetalle() {
  const { id } = useParams<{ id: string }>();
  const [nombre, setNombre] = useState('');
  const [foto, setFoto] = useState<string | null>(null);
  const [tracks, setTracks] = useState<Track[] | null>(null);
  const [aviso, setAviso] = useState('');

  useEffect(() => {
    api
      .get(`/djs/${id}`)
      .then((r) => {
        setNombre(r.dj.nombre);
        setFoto(r.dj.foto);
        setTracks(r.tracks);
      })
      .catch((e) => {
        setAviso(e.message);
        setTracks([]);
      });
  }, [id]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/djs" text="" />
          </IonButtons>
          <IonTitle>{nombre || 'DJ'}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {foto && (
          <div style={{ textAlign: 'center', padding: '20px 0 6px' }}>
            <img src={foto} alt={nombre} style={{ width: 110, height: 110, borderRadius: '50%', objectFit: 'cover' }} />
          </div>
        )}
        {!tracks ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <IonList>
            {tracks.map((t) => (
              <TrackFila key={t.id} track={t} alerta={setAviso} />
            ))}
          </IonList>
        )}
        <div style={{ height: 90 }} />
        <IonToast isOpen={!!aviso} message={aviso} duration={2600} onDidDismiss={() => setAviso('')} />
      </IonContent>
    </IonPage>
  );
}
