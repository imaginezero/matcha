import { useState, useEffect } from 'react';

const fetchProfile = async () => {
  const response = await fetch('/api/auth/profile');
  if (response.status === 200 || response.status === 401) {
    return await response.json();
  } else {
    throw new Error(response.statusText);
  }
};

export function useLogin() {
  const [profile, setProfile] = useState(null);
  useEffect(() => {
    (async () => setProfile(await fetchProfile()))();
  }, []);
  const isLoggedIn = !profile ? null : !profile.error;
  return {
    isLoggedIn,
    profile: isLoggedIn ? profile : null,
  };
}
