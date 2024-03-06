"use client";

import React, { FunctionComponent, PropsWithChildren, useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import ModalProvider from "@/components/providers/ModalProvider";
import WSProvider from "@/components/providers/WSProvider";

const Providers: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            // With SSR, we usually want to set some default staleTime
            // above 0 to avoid re-fetching immediately on the client
            staleTime: 60 * 1000,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <WSProvider>
        <ModalProvider>{children}</ModalProvider>
      </WSProvider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
};

export default Providers;
