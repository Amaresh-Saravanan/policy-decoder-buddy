import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import BottomNav from "@/components/BottomNav";
import Index from "./pages/Index";
import UploadPolicy from "./pages/UploadPolicy";
import PolicyReport from "./pages/PolicyReport";
import ClauseDetail from "./pages/ClauseDetail";
import Savings from "./pages/Savings";
import ClaimChat from "./pages/ClaimChat";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/upload" element={<UploadPolicy />} />
          <Route path="/policy/:id/report" element={<PolicyReport />} />
          <Route path="/policy/:policyId/clause/:clauseId" element={<ClauseDetail />} />
          <Route path="/savings" element={<Savings />} />
          <Route path="/claim" element={<ClaimChat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <BottomNav />
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
