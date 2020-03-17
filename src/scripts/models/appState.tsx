import * as AS from 'adaptive-scale';
import React, {
  useContext,
} from 'react';
import {
  useObserver,
  useLocalStore,
} from 'mobx-react-lite';

function create() {

  const canvasSize_Absolute = new AS.Rect(3200, 2320, 0, 0);

  return {
    
    isLoading: true,
    
    viewportWidth: window.innerWidth,
    viewportHeight: window.innerHeight,

    resolution: window.devicePixelRatio,

    get canvasSize_Scaled() {
      const windowSize = new AS.Size(this.viewportWidth, this.viewportHeight);

      return AS.getScaledRect({
        container: windowSize,
        target: canvasSize_Absolute,
        policy: AS.POLICY.ShowAll,
      });
    },
  };
}

type TAppState = ReturnType<typeof create>;

const context = React.createContext<TAppState | null>(null);
const ContextProvider = context.Provider;

const AppStateProvider = (props: {children?: any}) => {

  const store = useLocalStore(create);

  return useObserver(() => (
    <ContextProvider value={store}>
      {props.children}
    </ContextProvider>
  ));
};

function useAppState() {

  const store = useContext(context);

  if (!store) {
    // Unreached, kept for compiler
    throw new Error();
  }

  return store;
}

export {
  AppStateProvider,
  useAppState,
}
