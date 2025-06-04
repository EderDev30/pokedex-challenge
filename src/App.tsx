import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AppRouter } from "@/router";
import { AuthProvider } from "@/context/auth";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient();

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <AppRouter />
      </QueryClientProvider>
    </AuthProvider>
  );
}

export default App;
