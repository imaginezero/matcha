import { useLogin, useTranslation } from '../../hooks';

export function Login() {
  const { isLoggedIn, profile } = useLogin();
  const { t } = useTranslation();
  switch (isLoggedIn) {
    case true:
      return (
        <>
          <p>
            {`${t('loginInfo', profile)} `}
            <a href="/api/auth/logout">{t('logout')}</a>
          </p>
        </>
      );
    case false:
      return (
        <>
          <p>
            {`${t('loggedoutInfo')} `}
            <a href="/api/auth/login">{t('login')}</a>
          </p>
        </>
      );
    case null:
      return <span>...</span>;
  }
}
