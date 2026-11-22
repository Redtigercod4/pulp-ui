import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';
import { Outlet, useLocation, useNavigation } from 'react-router';
import { AppContextProvider } from '../app-context';
import { LoadingSpinner } from '../components/loading-spinner';
import { UIVersion } from '../components/ui-version';
import { Layout } from '../layout';
import { ThemeProvider } from '../lib/theme/theme-context';
import { UserContextProvider } from '../user-context';

function Root() {
  const navigation = useNavigation();
  const isNavigating = Boolean(navigation.location);
  const location = useLocation();
  const [queryClient] = useState(() => new QueryClient());

  const isNextRoute =
    location.pathname === '/next' || location.pathname.startsWith('/next/');

  if (isNextRoute) {
    return (
      <QueryClientProvider client={queryClient}>
        <ThemeProvider>
          <Outlet />
        </ThemeProvider>
      </QueryClientProvider>
    );
  }

  return (
    <UserContextProvider>
      <AppContextProvider>
        <Layout>
          {isNavigating && <LoadingSpinner />}
          <Outlet />
        </Layout>
        <UIVersion />
      </AppContextProvider>
    </UserContextProvider>
  );
}

export default Root;
