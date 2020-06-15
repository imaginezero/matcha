import Link from 'next/link';

import { useLogin } from '../hooks';

export function Login() {
  const { isLoggedIn } = useLogin();
  switch (isLoggedIn) {
    case true:
      return (
        <Link href="/api/auth/logout">
          <a>Logout</a>
        </Link>
      );
    case false:
      return (
        <Link href="/api/auth/login">
          <a>Login</a>
        </Link>
      );
    case null:
      return <span>...</span>;
  }
}
