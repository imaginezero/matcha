import { Page, Content, Markdown } from '../components';
import { getPages, getPage } from '../services';

export default function ContentPage({ title, summary, contents }) {
  return (
    <Page title={title} description={summary}>
      <Content>
        <Markdown contents={contents} />
      </Content>
    </Page>
  );
}

export async function getStaticProps({ params: { slug }, preview }) {
  const { title, summary, contents } = await getPage({ slug }, preview);
  return { props: { title, summary, contents } };
}

export async function getStaticPaths() {
  const pages = await getPages();
  return {
    paths: pages.map(({ slug }) => ({ params: { slug } })),
    fallback: true,
  };
}
