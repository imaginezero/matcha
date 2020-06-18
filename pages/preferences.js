import { Page, PreferenceForm } from '../components';

export default function Prefs({ preferences }) {
  return (
    <Page>
      <PreferenceForm preferences={preferences} />
    </Page>
  );
}

export async function getServerSideProps({ req }) {
  const { getPrefs } = require('../utils/prefs');
  const preferences = getPrefs(req);
  return {
    props: { preferences },
  };
}
