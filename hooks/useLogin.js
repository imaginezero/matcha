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
  const WrappedComponent = (props) => {
    const [profile, setProfile] = useState(null);
    const isLoggedIn = !profile ? null : !profile.error;
    const value = {
      isLoggedIn,
      profile: isLoggedIn ? profile : null,
    };
    useEffect(() => {
      (async () => setProfile(await fetchProfile()))();
    }, []);
    return createElement(
      LoginContext.Provider,
      { value },
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
