import { action } from 'mobx';
import React, {
  useEffect,
} from 'react';
import { useObserver } from 'mobx-react-lite';
import { useAppState } from '~scripts/models/appState';
import Page from '~scripts/components/Page';

export default () => {

  const appStateStore = useAppState();

  useEffect(() => {
    window.setInterval(action(() => {
      appStateStore.isLoading = !(appStateStore.isLoading);
    }), 3000);
  }, []);

  return useObserver(() => (
    <Page isLoading={appStateStore.isLoading}>
      <h1>Loaded!</h1>
    </Page>
  ));
};
