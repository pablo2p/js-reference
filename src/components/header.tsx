import { HiOutlineSearch } from 'react-icons/hi';

function Header() {
  return (
    <header>
      <h1>JS Reference</h1>
      <p>
        Esta referência contém uma lista de objetos, funções e propriedades
        suportados pelo mecanismo{' '}
        <strong
          data-type="dark"
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
          type="text"
          placeholder="Busque por valores, métodos, tipos ou derivados."
        />
        <HiOutlineSearch />
      </div>
    </header>
  );
}

export { Header };
