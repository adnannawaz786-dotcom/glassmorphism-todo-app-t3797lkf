/* EXPORTS: default (MyApp component) */

import '../styles/globals.css';
import { TodoProvider } from '../context/TodoContext';

function MyApp({ Component, pageProps }) {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="absolute inset-0 bg-[#FF0000] opacity-20"></div>
        <div className="relative z-10">
          <Component {...pageProps} />
        </div>
      </div>
    </TodoProvider>
  );
}

export default MyApp;
