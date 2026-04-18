import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";
import ChemicalCatalog from "./pages/ChemicalCatalog.tsx";
import Shop from "./pages/Shop.tsx";
import ProductDetail from "./pages/ProductDetail.tsx";
import { CartProvider } from "./context/CartContext";
import { Helmet } from "react-helmet-async";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>

      {/* ✅ SEO Helmet INSIDE component */}
      <Helmet>
        <title>Aasha Traders | Chemicals & Export Import Services</title>

        <meta
          name="description"
          content="Aasha Traders provides chemical products and export-import services across India. Contact us for bulk orders and business inquiries."
        />

        <meta
          name="keywords"
          content="chemicals, export import, cleaning products, Aasha Traders India"
        />

        <meta name="robots" content="index, follow" />

        {/* Bing Verification */}
        <meta name="msvalidate.01" content="YOUR_BING_CODE" />

        {/* Open Graph */}
        <meta property="og:title" content="Aasha Traders" />
        <meta property="og:description" content="Chemical & EXIM services" />
        <meta property="og:url" content="https://aashatraders.com" />
      </Helmet>

      <Toaster />
      <Sonner />

      <BrowserRouter>
        <CartProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/chemicals" element={<ChemicalCatalog />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/shop/:id" element={<ProductDetail />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </CartProvider>
      </BrowserRouter>

    </TooltipProvider>
  </QueryClientProvider>
);

export default App;