import Link from 'next/link';
import { MouseEvent } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { PostType } from '@interfaces/postTypes';
import styles from './markdown.module.scss';

interface Props {
  post: PostType;
}

export default function PostContent({ post }: Props) {
  function copyCodeBtn(e: MouseEvent<HTMLElement>, dados: string) {
    e.preventDefault();
    const btn = e.currentTarget;

    const updateAndRemove = (value: string, type = 'add') => {
      btn.innerHTML = value;
      btn.classList[type]('copy');
    };

    updateAndRemove('Copiado');
    setTimeout(() => updateAndRemove('Copiar', 'remove'), 5000);

    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(dados);
    } else {
      let textArea = document.createElement('textarea');
      textArea.value = dados;
      textArea.style.position = 'fixed';
      textArea.style.left = '-999999px';
      textArea.style.top = '-999999px';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();
      return new Promise<void>((res, rej) => {
        document.execCommand('copy') ? res() : rej();
        textArea.remove();
      });
    }
  }

  return (
    <article className={styles.content}>
      <h1>{post.title}</h1>
      <ReactMarkdown
        transformImageUri={(uri) =>
          uri.startsWith('http') ? uri : `${process.env.PUBLIC_URL}`
        }
        components={{
          pre: ({ node, children }) => {
            if (node.children[0]['tagName'] === 'code') {
              const dadosCopy = node.children[0]['children'][0]['value'];
              return (
                <pre>
                  <button onClick={(e) => copyCodeBtn(e, dadosCopy)}>
                    Copiar
                  </button>
                  {children}
                </pre>
              );
            } else {
              return <pre>{children}</pre>;
            }
          },
          a: ({ node, children }) => {
            const url = String(node.properties['href']);
            const possibleDomains = ['localhost', 'jsreference'];
            const checkHrefDomain = possibleDomains.some((domain) =>
              url.toLowerCase().includes(domain.toLowerCase())
            );
            return checkHrefDomain ? (
              <Link href={url}>
                <a>{children}</a>
              </Link>
            ) : (
              <a href={url} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            );
          },
          code({ className, children }) {
            const language = className && className.replace('language-', '');

            return (
              <SyntaxHighlighter
                style={a11yDark}
                language={language}
                children={children[0]}
              />
            );
          },
        }}
      >
        {post.content}
      </ReactMarkdown>
    </article>
  );
}
