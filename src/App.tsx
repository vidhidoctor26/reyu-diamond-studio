import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { MockProvider } from "@/contexts/MockContext";
import { AppLayout } from "@/components/layout";

// Pages
import ListingsPage from "@/pages/ListingsPage";
import MarketplacePage from "@/pages/MarketplacePage";
import InventoryPage from "@/pages/InventoryPage";
import BidsPage from "@/pages/BidsPage";
import ChatPage from "@/pages/ChatPage";
import NotificationsPage from "@/pages/NotificationsPage";
import ProfilePage from "@/pages/ProfilePage";
import PreferencesPage from "@/pages/PreferencesPage";
import SettingsPage from "@/pages/SettingsPage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <MockProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route element={<AppLayout />}>
              {/* Redirect root to listings */}
              <Route path="/" element={<Navigate to="/listings" replace />} />
              
              {/* Main routes */}
              <Route path="/listings" element={<ListingsPage />} />
              <Route path="/marketplace" element={<MarketplacePage />} />
              <Route path="/inventory" element={<InventoryPage />} />
              <Route path="/bids" element={<BidsPage />} />
              <Route path="/chat" element={<ChatPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/profile" element={<ProfilePage />} />
              <Route path="/preferences" element={<PreferencesPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
            
            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </MockProvider>
  </QueryClientProvider>
);

export default App;
