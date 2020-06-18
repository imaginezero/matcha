import { useLogin } from '../hooks';

export function Login() {
  const { isLoggedIn } = useLogin();
  switch (isLoggedIn) {
    case true:
      return <a href="/api/auth/logout">Abmelden</a>;
    case false:
      return <a href="/api/auth/login">Anmelden</a>;
    case null:
      return <span>...</span>;
  }
}
