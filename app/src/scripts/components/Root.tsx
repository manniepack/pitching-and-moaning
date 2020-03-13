import React, {
  useState,
  useRef,
  useCallback,
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
    if (!node) {
      rendererRef.current = undefined;
      return;
    }

    if (!node.hasChildNodes())
      node.appendChild(pixi.renderer.view);
    rendererRef.current = node;
  }), []);

  return (
    <Page isLoading={isLoading}>
      <div ref={setRendererRef} />
    </Page>
  );
};

export default Root;
