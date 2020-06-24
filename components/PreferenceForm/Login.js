import { useLogin, useTranslation } from '../../hooks';

export default function Login() {
  const { isLoggedIn, profile } = useLogin();
  const { t } = useTranslation();
  switch (isLoggedIn) {
    case true:
      return (
        <>
          <span>
            {`${t('loginInfo', profile)} `}
            <a href="/api/auth/logout">{t('logout')}</a>
          </span>
        </>
      );
    case false:
      return (
        <>
          <span>
            {`${t('loggedoutInfo')} `}
            <a href="/api/auth/login">{t('login')}</a>
          </span>
        </>
      );
    case null:
      return <span>...</span>;
  }
}
