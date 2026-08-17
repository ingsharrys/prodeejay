import { Browser } from '@capacitor/browser';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonPage,
  IonRefresher,
  IonRefresherContent,
  IonSegment,
  IonSegmentButton,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { downloadOutline, logOutOutline } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { api, baseUrl, setBaseUrl } from '../api';
import { useStore } from '../store';

export default function Cuenta() {
  const { usuario, setSesion } = useStore();
  const [modo, setModo] = useState<'entrar' | 'registro'>('entrar');
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [cuenta, setCuenta] = useState<any>(null);
  const [aviso, setAviso] = useState('');
  const [enviando, setEnviando] = useState(false);
  const [servidor, setServidor] = useState(baseUrl());

  async function cargarCuenta() {
    if (!usuario) return;
    try {
      setCuenta(await api.get('/mi-cuenta'));
    } catch (e: any) {
      if (e.status === 401) setSesion(null, null);
    }
  }

  useEffect(() => {
    cargarCuenta();
  }, [usuario?.id]);

  async function enviar() {
    setEnviando(true);
    try {
      const r =
        modo === 'entrar'
          ? await api.post('/entrar', { email, password })
          : await api.post('/registro', { nombre, email, password });
      setSesion(r.token, r.usuario);
      setAviso(`¡Hola, ${r.usuario.nombre}!`);
    } catch (e: any) {
      setAviso(e.message);
    } finally {
      setEnviando(false);
    }
  }

  async function salir() {
    try {
      await api.post('/salir');
    } catch {
      /* el token ya no sirve */
    }
    setSesion(null, null);
    setCuenta(null);
  }

  async function descargar(id: number) {
    try {
      const r = await api.get(`/descargar/${id}`);
      await Browser.open({ url: r.url });
    } catch (e: any) {
      setAviso(e.message);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi cuenta</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonRefresher slot="fixed" onIonRefresh={async (e) => { await cargarCuenta(); e.detail.complete(); }}>
          <IonRefresherContent />
        </IonRefresher>

        {!usuario ? (
          <div className="tarjeta">
            <IonSegment value={modo} onIonChange={(e) => setModo(e.detail.value as any)}>
              <IonSegmentButton value="entrar">Entrar</IonSegmentButton>
              <IonSegmentButton value="registro">Crear cuenta</IonSegmentButton>
            </IonSegment>
            <div style={{ marginTop: 12 }}>
              {modo === 'registro' && (
                <IonItem lines="full">
                  <IonInput label="Nombre" labelPlacement="stacked" value={nombre} onIonInput={(e) => setNombre(e.detail.value || '')} />
                </IonItem>
              )}
              <IonItem lines="full">
                <IonInput label="Correo" labelPlacement="stacked" type="email" value={email} onIonInput={(e) => setEmail(e.detail.value || '')} />
              </IonItem>
              <IonItem lines="full">
                <IonInput label="Contraseña" labelPlacement="stacked" type="password" value={password} onIonInput={(e) => setPassword(e.detail.value || '')} />
              </IonItem>
              <IonButton expand="block" style={{ marginTop: 14 }} onClick={enviar} disabled={enviando}>
                {enviando ? 'Un momento...' : modo === 'entrar' ? 'Entrar' : 'Crear mi cuenta'}
              </IonButton>
              {modo === 'registro' && (
                <p style={{ color: '#8a8a8a', fontSize: 12, textAlign: 'center' }}>
                  Con tu cuenta puedes comprar música, suscribirte y descargar.
                </p>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="tarjeta">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <h2 style={{ margin: 0, fontSize: 18 }}>{usuario.nombre}</h2>
                  <p style={{ color: '#b3b3b3', fontSize: 13, margin: '2px 0 0' }}>{usuario.email}</p>
                </div>
                <IonButton fill="clear" color="medium" onClick={salir}>
                  <IonIcon slot="icon-only" icon={logOutOutline} />
                </IonButton>
              </div>
            </div>

            <div className="tarjeta">
              <h3 style={{ margin: '0 0 8px', fontSize: 15 }}>Mi suscripción</h3>
              {cuenta?.plan ? (
                <>
                  <p style={{ margin: 0, fontSize: 14 }}>
                    <strong style={{ color: '#1db954' }}>{cuenta.plan.nombre}</strong>
                    {' · '}quedan {cuenta.plan.restantes} de {cuenta.plan.por_mes} descargas
                  </p>
                  {cuenta.plan.vence && (
                    <p style={{ color: '#b3b3b3', fontSize: 12, margin: '4px 0 0' }}>Vigente hasta {cuenta.plan.vence}</p>
                  )}
                  <div style={{ background: '#242424', borderRadius: 99, height: 8, marginTop: 10, overflow: 'hidden' }}>
                    <div
                      style={{
                        height: '100%',
                        borderRadius: 99,
                        background: '#1db954',
                        width: `${cuenta.plan.por_mes > 0 ? Math.min(100, ((cuenta.plan.por_mes - cuenta.plan.restantes) / cuenta.plan.por_mes) * 100) : 0}%`,
                      }}
                    />
                  </div>
                </>
              ) : (
                <p style={{ color: '#b3b3b3', fontSize: 13, margin: 0 }}>
                  Sin suscripción activa. Mira los planes en la pestaña Planes.
                </p>
              )}
            </div>

            <div className="tarjeta">
              <h3 style={{ margin: '0 0 8px', fontSize: 15 }}>Mis compras</h3>
              {!cuenta?.compras?.length ? (
                <p style={{ color: '#b3b3b3', fontSize: 13, margin: 0 }}>Aún no tienes compras.</p>
              ) : (
                cuenta.compras.map((c: any, i: number) => (
                  <div key={i} style={{ borderBottom: '1px solid #242424', padding: '8px 0' }}>
                    {c.tipo === 'suscripcion' ? (
                      <p style={{ margin: 0, fontSize: 13 }}>
                        <span style={{ color: '#1db954' }}>Suscripción</span> {c.plan} × {c.meses}{' '}
                        {c.meses === 1 ? 'mes' : 'meses'} — ${c.total.toFixed(2)}
                        <span style={{ color: '#666', fontSize: 11 }}> · {c.fecha}</span>
                      </p>
                    ) : (
                      c.tracks.map((t: any) => (
                        <div key={t.id} style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '2px 0' }}>
                          <span style={{ flex: 1, fontSize: 13 }}>{t.titulo}</span>
                          <IonButton size="small" className="precio-btn" onClick={() => descargar(t.id)}>
                            <IonIcon icon={downloadOutline} />
                          </IonButton>
                        </div>
                      ))
                    )}
                  </div>
                ))
              )}
            </div>
          </>
        )}

        <div className="tarjeta">
          <h3 style={{ margin: '0 0 8px', fontSize: 15 }}>Ajustes</h3>
          <IonItem lines="none">
            <IonInput
              label="URL del servidor"
              labelPlacement="stacked"
              value={servidor}
              onIonInput={(e) => setServidor(e.detail.value || '')}
            />
          </IonItem>
          <IonButton size="small" fill="outline" onClick={() => { setBaseUrl(servidor); setAviso('Servidor guardado. Cierra y abre la app.'); }}>
            Guardar servidor
          </IonButton>
        </div>

        <div style={{ height: 90 }} />
        <IonToast isOpen={!!aviso} message={aviso} duration={3000} onDidDismiss={() => setAviso('')} />
      </IonContent>
    </IonPage>
  );
}
