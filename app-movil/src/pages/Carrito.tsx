import { Browser } from '@capacitor/browser';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonLabel,
  IonList,
  IonPage,
  IonRadio,
  IonRadioGroup,
  IonTitle,
  IonToast,
  IonToolbar,
} from '@ionic/react';
import { lockClosedOutline, trashOutline } from 'ionicons/icons';
import { useMemo, useState } from 'react';
import { api } from '../api';
import { useStore } from '../store';

export default function Carrito() {
  const { carrito, quitarCarrito, vaciarCarrito, metodos, usuario } = useStore();
  const [metodo, setMetodo] = useState('');
  const [nombre, setNombre] = useState(usuario?.nombre || '');
  const [email, setEmail] = useState(usuario?.email || '');
  const [aviso, setAviso] = useState('');
  const [pagando, setPagando] = useState(false);
  const [pedidoId, setPedidoId] = useState<number | null>(null);

  const metodoActivo = metodo || metodos[0]?.clave || '';
  const subtotal = useMemo(() => carrito.reduce((s, t) => s + t.precio, 0), [carrito]);
  const tax = useMemo(() => {
    const m = metodos.find((x) => x.clave === metodoActivo);
    return Math.round(subtotal * (m?.tax || 0)) / 100;
  }, [subtotal, metodoActivo, metodos]);

  async function pagar() {
    if (!usuario) {
      setAviso('Inicia sesión en la pestaña Cuenta para pagar.');
      return;
    }
    if (!nombre.trim() || !email.trim()) {
      setAviso('Completa tu nombre y correo.');
      return;
    }
    setPagando(true);
    try {
      const r = await api.post('/comprar', {
        tracks: carrito.map((t) => t.id),
        metodo: metodoActivo,
        nombre,
        email,
      });
      setPedidoId(r.pedido);
      await Browser.open({ url: r.url });
    } catch (e: any) {
      setAviso(e.message);
    } finally {
      setPagando(false);
    }
  }

  async function verificarPago() {
    if (!pedidoId) return;
    try {
      const r = await api.get(`/pedidos/${pedidoId}`);
      if (r.estado === 'paid') {
        vaciarCarrito();
        setPedidoId(null);
        setAviso('¡Pago confirmado! Ya puedes descargar tu música en Música o en Cuenta.');
      } else {
        setAviso('El pago aún no se confirma. Si ya pagaste, espera unos segundos y vuelve a verificar.');
      }
    } catch (e: any) {
      setAviso(e.message);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Carrito</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        {carrito.length === 0 && !pedidoId ? (
          <p style={{ textAlign: 'center', color: '#b3b3b3', padding: 40 }}>
            Tu carrito está vacío. Agrega canciones desde la pestaña Música.
          </p>
        ) : (
          <>
            <IonList>
              {carrito.map((t) => (
                <IonItem key={t.id} lines="full">
                  <IonLabel>
                    <h2 style={{ fontSize: 14 }}>{t.titulo}</h2>
                    <p style={{ fontSize: 12 }}>{t.artista || t.dj?.nombre || '—'}</p>
                  </IonLabel>
                  <strong slot="end" style={{ fontSize: 13 }}>${t.precio.toFixed(2)}</strong>
                  <IonButton slot="end" fill="clear" color="medium" onClick={() => quitarCarrito(t.id)}>
                    <IonIcon slot="icon-only" icon={trashOutline} />
                  </IonButton>
                </IonItem>
              ))}
            </IonList>

            {carrito.length > 0 && (
              <div className="tarjeta">
                <h3 style={{ margin: '0 0 10px', fontSize: 15 }}>Datos de facturación</h3>
                <IonItem lines="full">
                  <IonInput label="Nombre" labelPlacement="stacked" value={nombre} onIonInput={(e) => setNombre(e.detail.value || '')} />
                </IonItem>
                <IonItem lines="full">
                  <IonInput label="Correo" labelPlacement="stacked" type="email" value={email} onIonInput={(e) => setEmail(e.detail.value || '')} />
                </IonItem>

                <h3 style={{ margin: '16px 0 6px', fontSize: 15 }}>Método de pago</h3>
                <IonRadioGroup value={metodoActivo} onIonChange={(e) => setMetodo(e.detail.value)}>
                  {metodos.map((m) => (
                    <IonItem key={m.clave} lines="full">
                      <IonRadio value={m.clave} labelPlacement="end" justify="start">
                        {m.titulo}
                        {m.tax > 0 ? `  (+${m.tax}% impuesto)` : ''}
                      </IonRadio>
                    </IonItem>
                  ))}
                </IonRadioGroup>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '14px 4px 2px', color: '#b3b3b3', fontSize: 14 }}>
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '2px 4px', color: '#b3b3b3', fontSize: 14 }}>
                  <span>Impuesto</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 4px', fontWeight: 800, fontSize: 18 }}>
                  <span>Total</span>
                  <span style={{ color: '#1db954' }}>${(subtotal + tax).toFixed(2)}</span>
                </div>

                <IonButton expand="block" onClick={pagar} disabled={pagando || metodos.length === 0}>
                  <IonIcon icon={lockClosedOutline} style={{ marginRight: 6 }} />
                  {pagando ? 'Abriendo pago...' : 'Pagar ahora'}
                </IonButton>
                {metodos.length === 0 && (
                  <p style={{ color: '#e8b433', fontSize: 12, textAlign: 'center' }}>
                    Los pagos en línea aún no están configurados.
                  </p>
                )}
              </div>
            )}

            {pedidoId && (
              <div className="tarjeta" style={{ borderColor: '#1db954' }}>
                <p style={{ fontSize: 13, color: '#b3b3b3', margin: '0 0 10px' }}>
                  El pago se abrió en el navegador seguro. Cuando termines, vuelve aquí y verifica.
                </p>
                <IonButton expand="block" fill="outline" onClick={verificarPago}>
                  Ya pagué — verificar mi pago
                </IonButton>
              </div>
            )}
          </>
        )}
        <div style={{ height: 90 }} />
        <IonToast isOpen={!!aviso} message={aviso} duration={3200} onDidDismiss={() => setAviso('')} />
      </IonContent>
    </IonPage>
  );
}
