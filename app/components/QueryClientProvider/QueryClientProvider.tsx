"use client";

import { PropsWithChildren, useState } from "react";
import {
  QueryClient,
  QueryClientProvider as TanstackQueryClientProvider,
} from "react-query";

const QueryClientProvider = ({ children }: PropsWithChildren) => {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <TanstackQueryClientProvider client={queryClient}>
      {children}
    </TanstackQueryClientProvider>
  );
};

export { QueryClientProvider };
