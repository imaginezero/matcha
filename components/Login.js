import { useLogin, useTranslation } from '../hooks';

export function Login() {
  const { isLoggedIn } = useLogin();
  const { t } = useTranslation();
  switch (isLoggedIn) {
    case true:
      return <a href="/api/auth/logout">{t('logout')}</a>;
    case false:
      return <a href="/api/auth/login">{t('login')}</a>;
    case null:
      return <span>...</span>;
  }
}
