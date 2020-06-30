import { useLogin, useTracking, useTranslation } from '../../hooks';

export default function Login() {
  const { isLoggedIn, profile } = useLogin();
  const { trackLogin, trackLogout } = useTracking();
  const { t } = useTranslation();
  switch (isLoggedIn) {
    case true:
      return (
        <>
          <span>
            {`${t('loginInfo', profile)} `}
            <a
              href="/api/auth/logout"
              onClick={(event) => {
                event.preventDefault();
                trackLogout(event.target.href, true);
              }}
            >
              {t('logout')}
            </a>
          </span>
        </>
      );
    case false:
      return (
        <>
          <span>
            {`${t('loggedoutInfo')} `}
            <a
              href="/api/auth/login"
              onClick={(event) => {
                event.preventDefault();
                trackLogin(event.target.href, true);
              }}
            >
              {t('login')}
            </a>
          </span>
        </>
      );
    case null:
      return <span> </span>;
  }
}
