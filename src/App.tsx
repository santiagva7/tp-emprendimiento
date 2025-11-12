import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import SplashScreen from "@/components/SplashScreen";
import Dashboard from "./pages/Dashboard";
import Stock from "./pages/Stock";
import Sales from "./pages/Sales";
import Suppliers from "./pages/Suppliers";
import Finance from "./pages/Finance";
import Reports from "./pages/Reports";
import Clients from "./pages/Clients";
import Settings from "./pages/Settings";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showSplash ? (
          <SplashScreen onFinish={() => setShowSplash(false)} />
        ) : (
          <BrowserRouter>
            <SidebarProvider>
              <div className="min-h-screen flex w-full bg-background">
                <AppSidebar />
                <main className="flex-1 overflow-y-auto">
                  <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-card px-6">
                    <SidebarTrigger />
                    <div className="flex items-center gap-2">
                      <img src="/logo.jpeg" alt="COBET" className="h-8 w-8 rounded-lg object-contain" />
                      <span className="font-semibold">COBET</span>
                    </div>
                  </header>
                  <div className="p-6">
                    <Routes>
                      <Route path="/" element={<Dashboard />} />
                      <Route path="/stock" element={<Stock />} />
                      <Route path="/sales" element={<Sales />} />
                      <Route path="/suppliers" element={<Suppliers />} />
                      <Route path="/finance" element={<Finance />} />
                      <Route path="/reports" element={<Reports />} />
                      <Route path="/clients" element={<Clients />} />
                      <Route path="/settings" element={<Settings />} />
                      <Route path="*" element={<NotFound />} />
                    </Routes>
                  </div>
                </main>
              </div>
            </SidebarProvider>
          </BrowserRouter>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
