import {
  createElement,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import { useRouter } from 'next/router';
import hoistNonReactStatics from 'hoist-non-react-statics';

const EffortContext = createContext(null);

const setBackgroundColor = (effort) => {
  const root = document.documentElement;
  const property = '--effort-background';
  const hue = 200 - effort * 1.25;
  const saturation = 30 + effort * 0.4;
  const lightness = 75 - effort * 0.125;
  window.requestAnimationFrame(() =>
    root.style.setProperty(
      property,
      `hsl(${hue}, ${saturation}%, ${lightness}%)`
    )
  );
};

export const defaultEffort = 40;

export function withEffort(Component) {
  const WrappedComponent = (props) => {
    const router = useRouter();
    const { pathname, query } = router;

    const queryEffort = Number(query.e);
    const queryPage = Number(query.p || 1);

    const [timeoutId, setTimeoutId] = useState(null);
    const [effort, setEffort] = useState(defaultEffort);

    useEffect(() => {
      if (queryEffort && queryEffort !== effort) {
        setEffort(queryEffort);
      }
    }, [queryEffort]);

    useEffect(() => {
      setBackgroundColor(effort);
    }, [effort]);

    return createElement(
      EffortContext.Provider,
      {
        value: {
          effort,
          setEffort(e) {
            if (timeoutId) clearTimeout(timeoutId);
            setTimeoutId(
              setTimeout(() => router.push({ pathname, query: { e } }), 250)
            );
            setEffort(e);
          },
          getNextUrl() {
            return { pathname, query: { e: queryEffort, p: queryPage + 1 } };
          },
          getQuery() {
            return { e: effort };
          },
        },
      },
      createElement(Component, props)
    );
  };
  hoistNonReactStatics(WrappedComponent, Component);
  WrappedComponent.displayName = `WithEffort(${
    Component.displayName || Component.name || 'Component'
  })`;
  return WrappedComponent;
}

export function useEffort() {
  return useContext(EffortContext);
}
