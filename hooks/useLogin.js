import {
  createElement,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

const LoginContext = createContext(null);

const fetchProfile = async () => {
  const response = await fetch('/api/auth/profile');
  if (response.status === 200 || response.status === 401) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
};

export function withLogin(Component) {
  const WrappedComponent = ({ profile: defaults = null, ...props }) => {
    const parentContext = useContext(LoginContext);
    const [profile, setProfile] = useState(defaults);
    const isLoggedIn = !profile ? null : !profile.error;
    let shouldFetch = true;
    useEffect(() => {
      if (parentContext) parentContext.setProfile(profile);
      else if (shouldFetch) (async () => setProfile(await fetchProfile()))();
    }, []);
    return createElement(
      LoginContext.Provider,
      {
        value: {
          isLoggedIn,
          profile: isLoggedIn ? profile : null,
          setProfile(profile) {
            shouldFetch = false;
            setProfile(profile);
          },
        },
      },
      createElement(Component, props)
    );
  };
  hoistNonReactStatics(WrappedComponent, Component);
  WrappedComponent.displayName = `WithLogin(${
    Component.displayName || Component.name || 'Component'
  })`;
  return WrappedComponent;
}

export function useLogin() {
  return useContext(LoginContext);
}
