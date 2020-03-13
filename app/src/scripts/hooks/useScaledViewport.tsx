import {
  useState,
  useEffect,
} from 'react';
import * as AS from 'adaptive-scale';

const TargetSize = new AS.Size(3200, 2320);
const getScaledRect = (container: AS.Size): AS.Rect => {
  return AS.getScaledRect({
    container,
    target: TargetSize,
    policy: AS.POLICY.ShowAll,
  });
};

export interface ScaledViewport {
  viewportSize: AS.Size,
  scaledSize: AS.Rect,
  resolution: number,
}

export default (): ScaledViewport => {

  const [viewportSize, setViewportSize] = useState<AS.Size>(new AS.Size(window.innerWidth, window.innerHeight));
  const [scaledSize, setScaledSize] = useState<AS.Rect>(getScaledRect(viewportSize));
  const [resolution, setResolution] = useState(window.devicePixelRatio);

  useEffect(() => {
    if (resolution !== window.devicePixelRatio)
      setResolution(window.devicePixelRatio);
    setScaledSize(getScaledRect(viewportSize));
  }, [viewportSize]);

  const handleWindowResize = () => {
    setViewportSize(new AS.Size(window.innerWidth, window.innerHeight));
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => {
      window.removeEventListener('resize', handleWindowResize);
    };
  }, []);

  return {
    viewportSize,
    scaledSize,
    resolution,
  };
};
