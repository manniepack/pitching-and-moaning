import React, {
  useState,
  useRef,
  useCallback,
  useEffect,
} from 'react';

import Page from '~/scripts/components/Page';

import usePixi from '~/scripts/hooks/usePixi';
import { useScaledViewport } from '~/scripts/hooks/useScaledViewport';

const Root = () => {

  const [isLoading, setLoading] = useState(true);
  const scaledViewport = useScaledViewport();
  const [pixi] = usePixi(scaledViewport, setLoading);

  const rendererRef = useRef<HTMLDivElement>();
  const setRendererRef = useCallback(((node: HTMLDivElement) => {
    rendererRef.current = node;
  }), []);

  /**
   * Add Pixi.js rendering element to DOM.
   */
  useEffect(() => {
    const node = rendererRef.current;
    if (!pixi || !node || node.hasChildNodes())
      return;
    node.appendChild(pixi.renderer.view);
  });

  return (
    <Page isLoading={isLoading}>
      <div ref={setRendererRef} />
    </Page>
  );
};

export default Root;
