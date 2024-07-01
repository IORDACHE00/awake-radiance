import { ThemeProvider } from "./components/theme-provider";
import { Toaster } from "@/components/ui/toaster";
import WebRouter from "./router";
import UpdateNoteDialog from "./components/shared/update-note-dialog";
import CreateNoteDialog from "./components/shared/create-note-dialog";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="awake-radiance-theme">
        <WebRouter />

        <Toaster />

        <UpdateNoteDialog />
        <CreateNoteDialog />
      </ThemeProvider>
    </QueryClientProvider>
  );
}
