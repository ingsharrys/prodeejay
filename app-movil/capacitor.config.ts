import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.prodeejayremix.app',
  appName: 'Prodeejay Remix',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // Necesario mientras el servidor esté por IP sin SSL.
    // Cuando el dominio tenga HTTPS, elimina esta línea.
    cleartext: true,
  },
};

export default config;
