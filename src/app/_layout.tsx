import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// excecao a regra
const queryClient = new QueryClient();

export default function RootLayout() {

  // Sempre o retorna um template jsx
  return (
    <QueryClientProvider client={queryClient}>
      <Stack />;
    </QueryClientProvider>
    );
}
