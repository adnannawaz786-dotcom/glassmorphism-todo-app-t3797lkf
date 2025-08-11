/* EXPORTS: default (MyApp component) */

import '../styles/globals.css';
import { TodoProvider } from '../context/TodoContext';

function MyApp({ Component, pageProps }) {
  return (
    <TodoProvider>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.1"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
        <div className="relative z-10">
          <Component {...pageProps} />
        </div>
      </div>
    </TodoProvider>
  );
}

export default MyApp;