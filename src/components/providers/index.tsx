"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import dynamic from "next/dynamic";
import { useState } from "react";

const ClientThemeProvider = dynamic(() => import("./theme"), { ssr: false });

export function Providers({ children }: React.PropsWithChildren) {
  const [client] = useState(new QueryClient());

  return (
    <QueryClientProvider client={client}>
      <ClientThemeProvider attribute="class" defaultTheme="dark">
        {children}
      </ClientThemeProvider>
    </QueryClientProvider>
  );
}
