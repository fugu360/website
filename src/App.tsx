import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useLayoutEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./pages/ProjectDetail";
import { LanguageProvider } from "@/lib/i18n";
import AIAssistant from "@/components/AIAssistant";
const queryClient = new QueryClient();
const RETURN_TO_PROJECTS_KEY = "return-to-projects";

const ScrollToTop = () => {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const previousPathname = useRef(pathname);

  useLayoutEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    const isHomePath = pathname === "/" || pathname === "/en";
    const cameFromProjectDetail = /\/projects\//.test(previousPathname.current);
    const shouldReturnToProjects = sessionStorage.getItem(RETURN_TO_PROJECTS_KEY) === "true";

    const scrollToProjects = () => {
      const target = document.getElementById("projects");
      if (!target) {
        return;
      }

      const html = document.documentElement;
      const body = document.body;
      const previousHtmlBehavior = html.style.scrollBehavior;
      const previousBodyBehavior = body.style.scrollBehavior;

      html.style.scrollBehavior = "auto";
      body.style.scrollBehavior = "auto";
      target.scrollIntoView({ behavior: "auto", block: "start" });

      window.setTimeout(() => {
        html.style.scrollBehavior = previousHtmlBehavior;
        body.style.scrollBehavior = previousBodyBehavior;
      }, 0);
    };

    // Browser back from a project detail page should land directly on the projects section.
    if (navigationType === "POP" && isHomePath && (cameFromProjectDetail || shouldReturnToProjects)) {
      sessionStorage.removeItem(RETURN_TO_PROJECTS_KEY);
      const frameId = window.requestAnimationFrame(() => {
        window.requestAnimationFrame(scrollToProjects);
      });

      previousPathname.current = pathname;
      return () => {
        window.cancelAnimationFrame(frameId);
      };
    }

    // Keep browser back/forward behavior in all other cases.
    if (navigationType === "POP") {
      previousPathname.current = pathname;
      return;
    }

    if (isHomePath) {
      sessionStorage.removeItem(RETURN_TO_PROJECTS_KEY);
    }

    const html = document.documentElement;
    const body = document.body;
    const previousHtmlBehavior = html.style.scrollBehavior;
    const previousBodyBehavior = body.style.scrollBehavior;

    html.style.scrollBehavior = "auto";
    body.style.scrollBehavior = "auto";

    html.scrollTop = 0;
    body.scrollTop = 0;
    window.scrollTo(0, 0);

    const restoreId = window.setTimeout(() => {
      html.style.scrollBehavior = previousHtmlBehavior;
      body.style.scrollBehavior = previousBodyBehavior;
    }, 0);

    return () => {
      window.clearTimeout(restoreId);
      html.style.scrollBehavior = previousHtmlBehavior;
      body.style.scrollBehavior = previousBodyBehavior;
    };
  }, [navigationType, pathname]);

  useLayoutEffect(() => {
    previousPathname.current = pathname;
  }, [pathname]);

  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <LanguageProvider>
          <ScrollToTop />
          <AIAssistant />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/en" element={<Index />} />
            <Route path="/projects/:slug" element={<ProjectDetail />} />
            <Route path="/en/projects/:slug" element={<ProjectDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </LanguageProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
