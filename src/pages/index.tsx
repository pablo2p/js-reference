import { useEffect, useState } from 'react';
import Head from 'next/head';
import { HiOutlineSearch } from 'react-icons/hi';

import styles from '@styles/pages/home.module.scss';

import ReactTooltip from 'react-tooltip';
import { GetStaticProps } from 'next';
import Link from 'next/link';

interface methodsProps {
  category: String;
  subcategory: String[];
  description: String;
  title: String;
  suggestions?: String[];
}

interface techProps {
  tech: methodsProps[];
}

export default function Home({ tech }: techProps) {
  const [search, setSearch] = useState('');
  const [listTechs, setListTechs] = useState(tech);

  useEffect(() => {
    if (!search) {
      setListTechs(tech);
      return;
    }

    const normalizeText = (text: String) =>
      text
        .toLowerCase()
        .normalize('NFD')
        .replace(/([\u0300-\u036f]|[^0-9a-zA-Z])/g, '');

    const findSearch = (text) =>
      normalizeText(text).indexOf(normalizeText(search)) !== -1;

    const findTechs = tech?.filter(
      (el) =>
        findSearch(el.title) ||
        findSearch(el.category) ||
        findSearch(el.subcategory.join(',')) ||
        (el.suggestions && findSearch(el.suggestions.join(',')))
    );

    setListTechs(findTechs);
  }, [search]);

  return (
    <>
      <Head>
        <title>Javascript Reference</title>
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
            <input
              onKeyUp={(e) => setSearch(e.currentTarget.value)}
              type="text"
              placeholder="Buscar por..."
            />
            <HiOutlineSearch />
          </div>
        </header>
        <section>
          {listTechs?.length > 0 ? (
            <ul className={styles.contentScroll}>
              {listTechs?.map((dado, index) => (
                <Link key={index} href={`/${dado['title'].toLowerCase()}`}>
                  <li>
                    <h4>{dado['title'].toLowerCase()}</h4>
                  </li>
                </Link>
              ))}
            </ul>
          ) : (
            <h5>Não foram encontrados resultados para a sua busca!</h5>
          )}
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
