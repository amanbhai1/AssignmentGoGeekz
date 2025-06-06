import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import ImmigrationFile from "./pages/ImmigrationFile";
import CRSScore from "./pages/CRSScore";
import DocumentUpload from "./pages/DocumentUpload";
import ApplicationCategory from "./pages/ApplicationCategory";
import Checklist from "./pages/Checklist";
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
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/immigration-file" element={<ImmigrationFile />} />
          <Route path="/crs-score" element={<CRSScore />} />
          <Route path="/document-upload" element={<DocumentUpload />} />
          <Route
            path="/application-category"
            element={<ApplicationCategory />}
          />
          <Route path="/checklist" element={<Checklist />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
