import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next';
import Head from 'next/head';
import Link from 'next/link';

import { getPostData, getPostsFiles } from '@lib/post-utils';
import PostContent from '@components/PostContent';
import { PostType } from '@interfaces/postTypes';

import ReactTooltip from 'react-tooltip';
import { HiOutlineSearch } from 'react-icons/hi';
import styles from '@styles/pages/slug.module.scss';

interface Props {
  post: PostType;
}

export default function methodPosts({ post }: Props) {
  return (
    <>
      <Head>
        <title>
          {post.title ? `${post.title} | ` : ''}Javascript Reference
        </title>
      </Head>
      <main className={styles.contentContainer}>
        <ReactTooltip />
        <header>
          <Link href="./">JS Reference</Link>
          <p>
            Buque por objetos, funções e propriedades suportados pelo mecanismo{' '}
            <strong
              data-type="light"
              data-multiline="true"
              data-tip="QML é uma linguagem de marcação para interfaces de usuário.<br> É uma linguagem declarativa parecida com JSON<br> para criar aplicações focadas na interface do usuário."
            >
              QML
            </strong>
            .Para obter uma descrição detalhada, consulte a{' '}
            <a
              data-type="dark"
              data-tip="Clique para abrir a documentação"
              target="_blank"
              rel="noopener noreferrer"
              href="http://www.ecma-international.org/publications/standards/Ecma-262.htm"
            >
              especificação ECMA-262.
            </a>
          </p>
          <div>
            <input type="text" placeholder="Buscar por..." />
            <HiOutlineSearch />
          </div>
        </header>
        <section>
          <div>
            <PostContent post={post} />
          </div>
          <div>...</div>
        </section>
        <footer>
          <a href="">Criado por Pablo Paixão</a>
          <nav>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.linkedin.com/in/pablopaix%C3%A3o/"
            >
              Linkedin
            </a>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://www.instagram.com/pablopaixao_/"
            >
              Instagram
            </a>
          </nav>
        </footer>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async (
  context: GetStaticPropsContext
) => {
  let { slug } = context.params;
  slug = String(slug).toLowerCase();
  const postData = getPostData(slug);
  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const postFilenames = getPostsFiles();
  const slugs = postFilenames.map((fileName) => fileName.replace(/\.md$/, ''));
  return {
    paths: slugs.map((slug) => ({ params: { slug: slug } })),
    fallback: false,
  };
};
