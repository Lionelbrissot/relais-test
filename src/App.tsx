import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Envoyer from "./pages/Envoyer";
import Suivi from "./pages/Suivi";
import PointRelais from "./pages/PointRelais";
import Livreur from "./pages/Livreur";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [code, setCode] = useState("");
  const [authorized, setAuthorized] = useState(false);

  const handleLogin = () => {
    if (code === "relaisnc2024**") {
      setAuthorized(true);
    } else {
      alert("Code incorrect !");
    }
  };

  if (!authorized) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "#f1f5f9" }}>
        <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>Accès protégé</h2>
        <input
          type="password"
          placeholder="Entrez le code"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          style={{ padding: "10px", fontSize: "16px", marginBottom: "12px" }}
        />
        <button onClick={handleLogin} style={{ padding: "10px 20px", fontSize: "16px" }}>
          Valider
        </button>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/envoyer" element={<Envoyer />} />
          <Route path="/suivi" element={<Suivi />} />
          <Route path="/point-relais" element={<PointRelais />} />
          <Route path="/livreur" element={<Livreur />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
