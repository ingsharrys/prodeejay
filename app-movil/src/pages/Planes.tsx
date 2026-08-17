import { Browser } from '@capacitor/browser';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonItem,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonSpinner,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { useEffect, useState } from 'react';
import { api, PlanApi } from '../api';
import { useStore } from '../store';

const PERIODOS = [1, 3, 6, 12];

export default function Planes() {
  const { metodos, usuario } = useStore();
  const [planes, setPlanes] = useState<PlanApi[] | null>(null);
  const [elegido, setElegido] = useState<PlanApi | null>(null);
  const [meses, setMeses] = useState(1);
  const [metodo, setMetodo] = useState('');
  const [aviso, setAviso] = useState('');
  const [pagando, setPagando] = useState(false);

  useEffect(() => {
    api.get('/planes').then((r) => setPlanes(r.planes)).catch(() => setPlanes([]));
  }, []);

  const metodoActivo = metodo || metodos[0]?.clave || '';

  async function suscribirme() {
    if (!usuario) {
      setAviso('Inicia sesión en la pestaña Cuenta para suscribirte.');
      return;
    }
    if (!elegido) return;
    setPagando(true);
    try {
      const r = await api.post('/suscribirme', {
        plan_id: elegido.id,
        meses,
        metodo: metodoActivo,
        nombre: usuario.nombre,
        email: usuario.email,
      });
      if (r.activado) {
        setAviso(`¡Listo! Tu plan quedó activo hasta ${r.vence}.`);
        setElegido(null);
      } else {
        await Browser.open({ url: r.url });
        setAviso('Completa el pago en el navegador y revisa tu plan en Cuenta.');
        setElegido(null);
      }
    } catch (e: any) {
      setAviso(e.message);
    } finally {
      setPagando(false);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Planes de suscripción</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {!planes ? (
          <div style={{ textAlign: 'center', padding: 40 }}>
            <IonSpinner name="crescent" />
          </div>
        ) : (
          planes.map((p) => (
            <div key={p.id} className="tarjeta" style={elegido?.id === p.id ? { borderColor: '#1db954' } : {}}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <h3 style={{ margin: 0, color: '#1db954' }}>{p.nombre}</h3>
                <strong style={{ fontSize: 18 }}>{p.precio > 0 ? `$${p.precio.toFixed(2)}/mes` : 'Gratis'}</strong>
              </div>
              <p style={{ color: '#b3b3b3', fontSize: 13, margin: '6px 0 12px' }}>
                {p.descargas} descargas al mes
              </p>

              {elegido?.id === p.id ? (
                <>
                  {p.precio > 0 && (
                    <>
                      <p style={{ fontSize: 13, margin: '0 0 6px' }}>Periodo:</p>
                      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 10 }}>
                        {PERIODOS.map((n) => (
                          <IonButton
                            key={n}
                            size="small"
                            fill={meses === n ? 'solid' : 'outline'}
                            onClick={() => setMeses(n)}
                          >
                            {n} {n === 1 ? 'mes' : 'meses'} — ${(p.precio * n).toFixed(2)}
                          </IonButton>
                        ))}
                      </div>
                      <IonRadioGroup value={metodoActivo} onIonChange={(e) => setMetodo(e.detail.value)}>
                        {metodos.map((m) => (
                          <IonItem key={m.clave} lines="none">
                            <IonRadio value={m.clave} labelPlacement="end" justify="start">
                              {m.titulo}
                              {m.tax > 0 ? ` (+${m.tax}% impuesto)` : ''}
                            </IonRadio>
                          </IonItem>
                        ))}
                      </IonRadioGroup>
                    </>
                  )}
                  <IonButton expand="block" onClick={suscribirme} disabled={pagando}>
                    {pagando ? 'Procesando...' : p.precio > 0 ? 'Pagar y activar' : 'Activar gratis'}
                  </IonButton>
                  <IonButton expand="block" fill="clear" color="medium" onClick={() => setElegido(null)}>
                    Cancelar
                  </IonButton>
                </>
              ) : (
                <IonButton expand="block" fill="outline" onClick={() => { setElegido(p); setMeses(1); }}>
                  Suscribirme
                </IonButton>
              )}
            </div>
          ))
        )}
        <div style={{ height: 90 }} />
        <IonToast isOpen={!!aviso} message={aviso} duration={3200} onDidDismiss={() => setAviso('')} />
      </IonContent>
    </IonPage>
  );
}
