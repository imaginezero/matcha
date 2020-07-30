import {
  createElement,
  createContext,
  useState,
  useEffect,
  useContext,
} from 'react';
import hoistNonReactStatics from 'hoist-non-react-statics';

const LoginContext = createContext({});

const fetchProfile = async () => {
  const response = await fetch('/api/auth/profile');
  if (response.status === 200 || response.status === 401) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
};

export function withLogin(Component) {
  const WrappedComponent = ({ profile: serverSideProfile, ...props }) => {
    // If we have determined during SSR that our user is not logged-in, mimic
    // the fetchProfile()-call's corresponding return value. If, however, we
    // have a truthy SSR injected profile use that, otherwise default to null.
    const [profile, setProfile] = useState(
      serverSideProfile === null ? { error: true } : serverSideProfile || null
    );

    // If we have a falsey profile state, set to null to signal the fact that
    // login state is not yet determined. If we have a profile (or error
    // response), use that to determine logged-in state.
    const isLoggedIn = !profile ? null : !profile.error;

    // If we have nested contexts, the child context is responsible for
    // determining login state, since we are passing profile data to childs on
    // some pages (esp. protected ones).
    const { setParentProfile } = useContext(LoginContext);

    // This variable will be changed by child components that call
    // setParentProfile for this one.
    let shouldFetch = isLoggedIn === null;

    // Reminder: useEffect is called just once and child first, parent last.
    useEffect(() => {
      (async () => {
        if (setParentProfile) setParentProfile(profile);
        if (shouldFetch) setProfile(await fetchProfile());
      })();
    }, []);

    return createElement(
      LoginContext.Provider,
      {
        value: {
          isLoggedIn,
          profile: isLoggedIn ? profile : null,
          setParentProfile(profile) {
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
  const { isLoggedIn, profile } = useContext(LoginContext);
  return { isLoggedIn, profile };
}
