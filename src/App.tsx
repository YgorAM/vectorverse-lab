import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { I18nProvider } from "./lib/i18n";
import { ThemeProvider } from "./lib/theme";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Vectors from "./pages/Vectors";
import Matrices from "./pages/Matrices";
import Fundamentals from "./pages/Fundamentals";
import Practice from "./pages/Practice";
import MiniGame from "./pages/MiniGame";
import Playground from "./pages/Playground";
import CodeConsole from "./pages/CodeConsole";
import Examples from "./pages/Examples";
import About from "./pages/About";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <I18nProvider>
        <ThemeProvider>
        <BrowserRouter>
          <Layout>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/fundamentals" element={<Fundamentals />} />
              <Route path="/vectors" element={<Vectors />} />
              <Route path="/matrices" element={<Matrices />} />
              <Route path="/practice" element={<Practice />} />
              <Route path="/minigame" element={<MiniGame />} />
              <Route path="/playground" element={<Playground />} />
              <Route path="/console" element={<CodeConsole />} />
              <Route path="/examples" element={<Examples />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Layout>
        </BrowserRouter>
        </ThemeProvider>
      </I18nProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
