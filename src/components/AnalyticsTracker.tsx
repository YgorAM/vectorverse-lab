/**
 * AnalyticsTracker - Componente para rastrear mudanças de rota no Google Analytics 4
 * 
 * Este componente usa o useLocation do React Router para detectar mudanças de página
 * e envia eventos de pageview para o GA4, garantindo que SPAs sejam rastreadas corretamente.
 */

import { useEffect } from "react";
import { useLocation } from "react-router-dom";

// ID de medição do Google Analytics 4
const GA_MEASUREMENT_ID = "G-TVL5BWZECL";

// Declaração de tipos para o objeto gtag no window
declare global {
  interface Window {
    gtag: (
      command: string,
      targetId: string,
      config?: Record<string, unknown>
    ) => void;
    dataLayer: unknown[];
  }
}

export default function AnalyticsTracker() {
  // Hook que retorna a localização atual da rota
  const location = useLocation();

  useEffect(() => {
    // Verifica se o gtag está disponível (script carregado)
    if (typeof window.gtag === "function") {
      // Envia um evento de pageview para o GA4 com o caminho atual
      window.gtag("config", GA_MEASUREMENT_ID, {
        page_path: location.pathname + location.search,
        page_title: document.title,
      });
    }
  }, [location]); // Executa sempre que a localização mudar

  // Este componente não renderiza nada visualmente
  return null;
}
