import { action } from 'mobx';
import React, {
  useEffect,
  useRef,
  useCallback,
} from 'react';
import * as PIXI from 'pixi.js';
import { useObserver } from 'mobx-react-lite';
import Page from '~scripts/components/Page';
import { useAppState } from '~scripts/models/appState';
import usePixi from '~scripts/hooks/usePixi';

function Animation() {

  const appStateStore = useAppState();
  const [renderer] = usePixi();

  const containerRef = useRef<HTMLDivElement | null>(null);
  const setContainerRef = useCallback((node: HTMLDivElement) => {

    if (!node){
      containerRef.current = null;
      return;
    }

    const container = containerRef.current = node;

    if (container.hasChildNodes()) {
      container.textContent = '';
    }

    container.appendChild(renderer.view);
  }, []);

  useEffect(() => {
    const updateStoreOnResize = action(() => {
      appStateStore.viewportWidth = window.innerWidth;
      appStateStore.viewportHeight = window.innerHeight;
      appStateStore.resolution = window.devicePixelRatio;
    });

    window.addEventListener('resize', updateStoreOnResize);

    return () => {
      window.removeEventListener('resize', updateStoreOnResize);
    };
  }, []);

  return useObserver(() => {
    return (
      <Page isLoading={appStateStore.isLoading}>
        <div ref={setContainerRef} />
      </Page>
    );
  });
}

export default Animation;
