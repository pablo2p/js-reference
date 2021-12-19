import Head from 'next/head';
import { Header } from '../components/header';

import styles from './home.module.scss';

import ReactTooltip from 'react-tooltip';
import { GetStaticProps } from 'next';

interface methodsProps {
  category: String;
  description: String;
  title: String;
}

interface techProps {
  tech: methodsProps[];
}

export default function Home({ tech }: techProps) {
  return (
    <>
      <ReactTooltip />
      <Head>
        <title>Javascript Reference</title>
      </Head>
      <main className={styles.contentContainer}>
        <Header />
        <section>
          <ul>
            {tech?.map((dado, index) => (
              <li key={index}>
                <h1>{dado.title}</h1>
              </li>
            ))}
          </ul>
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

export const getStaticProps: GetStaticProps<techProps> = async () => {
  const dados = await import('./api/dados.json');
  return {
    props: {
      tech: dados['javascript'],
    },
    revalidate: 60 * 60 * 24, // 24 hours
  };
};
