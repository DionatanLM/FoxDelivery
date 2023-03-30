import 'bootstrap/dist/css/bootstrap.min.css';
import { IntlProvider } from 'react-intl';
import '../../styles/globals.css';
import AppLocale from '../lang';
import { useLocale } from '../stores/locale.store';
import { SessionProvider } from 'next-auth/react';
import { QueryClient, QueryClientProvider } from 'react-query';

function MyApp({ Component, pageProps }) {
  const { language } = useLocale();
  const currentAppLocale = AppLocale[language];
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <SessionProvider
          session={pageProps.session}
          options={{ clientMaxAge: 200 }}
        >
          <IntlProvider
            locale={currentAppLocale.locale}
            messages={currentAppLocale.messages}
          >
            <Component {...pageProps} />
          </IntlProvider>
        </SessionProvider>
      </QueryClientProvider>
    </>
  );
}

export default MyApp;
