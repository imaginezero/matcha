import { useLogin, useTracking, useTranslation } from '../../hooks';

export default function Login() {
  const { profile } = useLogin();
  const { trackLogout } = useTracking();
  const { t } = useTranslation();
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
}
