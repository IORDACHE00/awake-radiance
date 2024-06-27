import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import WebRouter from "./router";
import UpdateNoteDialog from "./components/shared/UpdateNoteDialog";
import CreateNoteDialog from "./components/shared/CreateNoteDialog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="awake-radiance-theme">
        <WebRouter />

        <Toaster />

        <UpdateNoteDialog />
        <CreateNoteDialog />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
