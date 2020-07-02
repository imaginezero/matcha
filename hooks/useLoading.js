import {
  createElement,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import { useRouter } from 'next/router';
import hoistNonReactStatics from 'hoist-non-react-statics';

const LoadingContext = createContext(null);

export function withLoading(Component) {
  const WrappedComponent = (props) => {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      const handleStart = () => setLoading(true);
      const handleComplete = () => setLoading(false);
      router.events.on('routeChangeStart', handleStart);
      router.events.on('routeChangeComplete', handleComplete);
      router.events.on('routeChangeError', handleComplete);
      return () => {
        router.events.off('routeChangeStart', handleStart);
        router.events.off('routeChangeComplete', handleComplete);
        router.events.off('routeChangeError', handleComplete);
      };
    });
    useEffect(() => setLoading(false), []);
    return createElement(
      LoadingContext.Provider,
      { value: { loading, setLoading } },
      createElement(Component, props)
    );
  };
  hoistNonReactStatics(WrappedComponent, Component);
  WrappedComponent.displayName = `WithLoading(${
    Component.displayName || Component.name || 'Component'
  })`;
  return WrappedComponent;
}

export function useLoading() {
  return useContext(LoadingContext);
}
