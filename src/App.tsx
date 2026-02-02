import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AppProvider } from "@/contexts/AppContext";
import Index from "./pages/Index";
import ScanPage from "./pages/ScanPage";
import HistoryPage from "./pages/HistoryPage";
import ResultPage from "./pages/ResultPage";
import AlertsPage from "./pages/AlertsPage";
import SchemesPage from "./pages/SchemesPage";
import ExpertPage from "./pages/ExpertPage";
import FertilizerPage from "./pages/FertilizerPage";
import WeatherPage from "./pages/WeatherPage";
import MarketPage from "./pages/MarketPage";
import SettingsPage from "./pages/SettingsPage";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AppProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/scan" element={<ScanPage />} />
              <Route path="/history" element={<HistoryPage />} />
              <Route path="/result/:id" element={<ResultPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/schemes" element={<SchemesPage />} />
              <Route path="/expert" element={<ExpertPage />} />
              <Route path="/fertilizer" element={<FertilizerPage />} />
              <Route path="/weather" element={<WeatherPage />} />
              <Route path="/market" element={<MarketPage />} />
              <Route path="/settings" element={<SettingsPage />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AppProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
