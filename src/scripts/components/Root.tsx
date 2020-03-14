import React, {
  useState,
  useRef,
  useCallback,
} from 'react';

import Page from '~scripts/components/Page';

import useScaledViewport from '~scripts/hooks/useScaledViewport';
import usePixi from '~scripts/hooks/usePixi';
import useSprites from '~scripts/hooks/sprites/useSprites';

const Root = () => {

  /**
   * Initialize application state.
   * - {isLoading}: loading state (unset after assets are loaded)
   * - {isWatching}: video player visibility
   * - {scaledViewport}: dynamic dimensions + resolution
   * - {pixi}: Pixi.js renderer + stage
   */
  const [isLoading, setLoading] = useState(true);
  const [isWatching, setWatching] = useState(false);
  const scaledViewport = useScaledViewport();
  const [pixi] = usePixi(scaledViewport);

  useSprites(pixi, setLoading, setWatching);

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
