"use client";

import {
  QueryClientProvider,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { ReactNode, useState } from "react";

export const ReactQueryProvider = ({
  children,
  dehydratedState,
}: {
  children: ReactNode;
  dehydratedState: unknown;
}) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      <HydrationBoundary state={dehydratedState}>{children}</HydrationBoundary>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
};
