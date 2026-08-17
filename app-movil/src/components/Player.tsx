import { IonButton, IonIcon, IonModal } from '@ionic/react';
import { close, pause, play, stopOutline } from 'ionicons/icons';
import { useStore } from '../store';

/** Mini reproductor inferior (audio) y modal de video, como en la web. */
export default function Player() {
  const { sonando, alternarPausa, detener, video, verVideo } = useStore();

  return (
    <>
      {sonando && (
        <div className="mini-player">
          <div className={`eq ${sonando.pausado ? 'pausa' : ''}`}>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className="titulo">
            <strong>{sonando.track.titulo}</strong>
            <small>{sonando.track.artista || sonando.track.dj?.nombre || 'Preview'}</small>
          </div>
          <IonButton size="small" fill="clear" onClick={alternarPausa}>
            <IonIcon slot="icon-only" icon={sonando.pausado ? play : pause} />
          </IonButton>
          <IonButton size="small" fill="clear" color="medium" onClick={detener}>
            <IonIcon slot="icon-only" icon={stopOutline} />
          </IonButton>
        </div>
      )}

      <IonModal isOpen={!!video} onDidDismiss={() => verVideo(null)}>
        <div style={{ background: '#000', height: '100%', display: 'flex', flexDirection: 'column' }}>
          <div style={{ display: 'flex', alignItems: 'center', padding: '10px 14px' }}>
            <strong style={{ flex: 1, fontSize: 14 }}>{video?.titulo}</strong>
            <IonButton size="small" fill="clear" onClick={() => verVideo(null)}>
              <IonIcon slot="icon-only" icon={close} />
            </IonButton>
          </div>
          {video?.preview && (
            <video
              src={video.preview}
              controls
              autoPlay
              playsInline
              style={{ width: '100%', flex: 1, objectFit: 'contain', background: '#000' }}
            />
          )}
        </div>
      </IonModal>
    </>
  );
}
