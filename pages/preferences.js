import { PreferenceForm } from '../components';

export default function Prefs({ preferences }) {
  return <PreferenceForm preferences={preferences} />;
}

export async function getServerSideProps({ req }) {
  const { getPrefs } = require('../utils/prefs');
  const preferences = getPrefs(req);
  return {
    props: { preferences },
  };
}
