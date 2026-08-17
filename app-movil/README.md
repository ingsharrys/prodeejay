# Prodeejay Remix — App móvil (Ionic + React + Capacitor)

App para **clientes**: registrarse, escuchar previews (audio y video), comprar
música con Square/PayPal, suscribirse a planes y descargar. Toda la
administración se hace desde la web.

La app consume la API del sitio Laravel (`/api/...`, tokens de Sanctum).
La URL del servidor se puede cambiar dentro de la app en **Cuenta → Ajustes**
(por defecto apunta a `http://200.7.108.43/~prodeejayremix/nueva`).

## Probar en el navegador

```bash
cd app-movil
npm install
npm run dev        # abre http://localhost:5173
```

## Compilar para Android

Necesitas Android Studio instalado.

```bash
npm install
npm run build
npx cap add android      # solo la primera vez
npx cap sync android
npx cap open android     # abre Android Studio → Run
```

Para iOS (necesitas una Mac con Xcode): `npx cap add ios && npx cap sync ios && npx cap open ios`.

## Notas

- `capacitor.config.ts` tiene `cleartext: true` porque el servidor está por IP
  sin SSL. **Cuando el dominio tenga HTTPS, elimina esa línea** y cambia la URL
  del servidor en la app.
- El pago se abre en el navegador seguro del sistema (Square/PayPal). Al volver
  a la app, el botón "Ya pagué — verificar mi pago" confirma el pedido.
- Íconos y splash: reemplaza los recursos generados en `android/app/src/main/res`
  o usa `npx capacitor-assets generate` con tu logo.
