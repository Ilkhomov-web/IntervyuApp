import { QueryClient } from '@tanstack/react-query';

// Tanstack Query'ning markaziy klienti.
// staleTime: 1 daqiqa — har 60s ichida bir xil so'rov network'ga chiqmaydi (cache).
// gcTime: 5 daqiqa — ishlatilmagan cache 5 daqiqadan keyin tozalanadi.
// Senior intervyuda: staleTime !== gcTime farqini biling.

export const createQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      gcTime: 5 * 60_000,
      retry: 1,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: 0,
    },
  },
});
