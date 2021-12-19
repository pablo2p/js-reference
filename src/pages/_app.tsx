import { AppProps } from 'next/app';

import '../styles/global.scss';
const dados = import('./api/dados.json');

export default function MyApp({ Component, pageProps }: AppProps) {
  return <Component dados={dados} {...pageProps} />;
}
