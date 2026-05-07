import { useEffect, useState } from 'react';
import { Provider as ReduxProvider } from 'react-redux';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { SnackbarProvider } from 'notistack';
import { QueryClientProvider, HydrationBoundary } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import store from '@store';
import theme from '../common/theme';
import { hydrateFromStorage } from '../common/slices/study-plan';
import { createQueryClient } from '@lib/query-client';
import AppLayout from '../common/components/AppLayout';

function HydrateGate({ children }) {
  useEffect(() => {
    store.dispatch(hydrateFromStorage());
  }, []);
  return children;
}

export default function App({ Component, pageProps }) {
  // Har request uchun yangi QueryClient (SSR uchun) — useState bir marta initsializatsiya
  const [queryClient] = useState(() => createQueryClient());

  const getLayout = Component.getLayout || ((page) => <AppLayout>{page}</AppLayout>);

  return (
    <ReduxProvider store={store}>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <ThemeProvider theme={theme}>
            <CssBaseline />
            <SnackbarProvider
              maxSnack={3}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              <HydrateGate>
                {getLayout(<Component {...pageProps} />)}
              </HydrateGate>
            </SnackbarProvider>
          </ThemeProvider>
        </HydrationBoundary>
        {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
      </QueryClientProvider>
    </ReduxProvider>
  );
}
