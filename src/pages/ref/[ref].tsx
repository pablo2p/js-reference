import { useEffect, useState } from 'react';
import Head from 'next/head';
import { HiOutlineSearch } from 'react-icons/hi';

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

export default function Method({ tech }: techProps) {
  const [search, setSearch] = useState('');
  const [listTechs, setListTechs] = useState(tech);

  return (
    <>
      <Head>
        <title>Javascript Reference</title>
      </Head>
      <main className={styles.contentContainer}>
        <ReactTooltip />
        <header>
          <h1>JS Reference</h1>
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
          {listTechs && listTechs.length > 0 ? (
            <ul>
              {listTechs?.map((dado, index) => (
                <li key={index}>
                  <h3>{dado.title}</h3>
                </li>
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
