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

    get canvasSize_Scaled() {
      const windowSize = new AS.Size(this.viewportHeight, this.viewportHeight);

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

const WrappedProvider = (props: {children?: any}) => {

  const store = useLocalStore(create);

  return useObserver(() => (
    <ContextProvider value={store}>
      {props.children}
    </ContextProvider>
  ));
};

function hook() {

  const store = useContext(context);

  if (!store) {
    // Unreached, kept for compiler
    throw new Error();
  }

  return store;
}

export {
  WrappedProvider as AppStateProvider,
  hook as useAppState,
}
