import { dehydrate, QueryClient } from '@tanstack/react-query';

// SSR yordamchi: server'da prefetch qiladi, client'ga dehydrated state beradi.
// Senior pattern: bir xil queryKey server va client'da, hydration mismatch bo'lmaydi.

export async function prefetchQueries(prefetchFns) {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { staleTime: 60_000 } },
  });

  await Promise.all(prefetchFns.map((fn) => fn(queryClient)));

  return {
    dehydratedState: dehydrate(queryClient),
  };
}
