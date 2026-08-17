import {
  IonApp,
  IonBadge,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { cartOutline, headsetOutline, idCardOutline, musicalNotesOutline, personOutline } from 'ionicons/icons';
import { Redirect, Route } from 'react-router-dom';

import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import './theme.css';

import Player from './components/Player';
import Carrito from './pages/Carrito';
import Cuenta from './pages/Cuenta';
import DjDetalle from './pages/DjDetalle';
import Djs from './pages/Djs';
import Musica from './pages/Musica';
import Planes from './pages/Planes';
import { StoreProvider, useStore } from './store';

setupIonicReact({ mode: 'md' });

function Tabs() {
  const { carrito } = useStore();

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route exact path="/musica" component={Musica} />
        <Route exact path="/djs" component={Djs} />
        <Route exact path="/djs/:id" component={DjDetalle} />
        <Route exact path="/planes" component={Planes} />
        <Route exact path="/carrito" component={Carrito} />
        <Route exact path="/cuenta" component={Cuenta} />
        <Route exact path="/">
          <Redirect to="/musica" />
        </Route>
      </IonRouterOutlet>
      <IonTabBar slot="bottom">
        <IonTabButton tab="musica" href="/musica">
          <IonIcon icon={musicalNotesOutline} />
          <IonLabel>Música</IonLabel>
        </IonTabButton>
        <IonTabButton tab="djs" href="/djs">
          <IonIcon icon={headsetOutline} />
          <IonLabel>DJs</IonLabel>
        </IonTabButton>
        <IonTabButton tab="planes" href="/planes">
          <IonIcon icon={idCardOutline} />
          <IonLabel>Planes</IonLabel>
        </IonTabButton>
        <IonTabButton tab="carrito" href="/carrito">
          <IonIcon icon={cartOutline} />
          {carrito.length > 0 && <IonBadge color="primary">{carrito.length}</IonBadge>}
          <IonLabel>Carrito</IonLabel>
        </IonTabButton>
        <IonTabButton tab="cuenta" href="/cuenta">
          <IonIcon icon={personOutline} />
          <IonLabel>Cuenta</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

export default function App() {
  return (
    <IonApp>
      <StoreProvider>
        <IonReactRouter>
          <Tabs />
        </IonReactRouter>
        <Player />
      </StoreProvider>
    </IonApp>
  );
}
