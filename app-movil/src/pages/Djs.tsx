import {
  IonContent,
  IonHeader,
  IonPage,
  IonSpinner,
  IonTitle,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { api } from '../api';

interface DjItem {
  id: number;
  nombre: string;
  foto: string | null;
  tracks: number;
}

export default function Djs() {
  const [djs, setDjs] = useState<DjItem[] | null>(null);
  const history = useHistory();

  useEffect(() => {
    api.get('/djs').then((r) => setDjs(r.djs)).catch(() => setDjs([]));
  }, []);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Nuestros DJs</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!djs ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <IonSpinner name="crescent" />
          </div>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
              gap: 12,
              padding: 16,
            }}
          >
            {djs.map((dj) => (
              <div
                key={dj.id}
                className="tarjeta"
                style={{ margin: 0, textAlign: 'center', cursor: 'pointer' }}
                onClick={() => history.push(`/djs/${dj.id}`)}
              >
                {dj.foto ? (
                  <img
                    src={dj.foto}
                    alt={dj.nombre}
                    style={{ width: 84, height: 84, borderRadius: '50%', objectFit: 'cover' }}
                  />
                ) : (
                  <div
                    style={{
                      width: 84,
                      height: 84,
                      borderRadius: '50%',
                      background: '#242424',
                      color: '#1db954',
                      fontSize: 30,
                      fontWeight: 800,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto',
                    }}
                  >
                    {dj.nombre.charAt(0).toUpperCase()}
                  </div>
                )}
                <h3 style={{ fontSize: 14, margin: '10px 0 2px' }}>{dj.nombre}</h3>
                <p style={{ color: '#b3b3b3', fontSize: 12, margin: 0 }}>{dj.tracks} tracks</p>
              </div>
            ))}
          </div>
        )}
        <div style={{ height: 90 }} />
      </IonContent>
    </IonPage>
  );
}
