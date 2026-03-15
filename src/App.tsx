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

const queryClient = new QueryClient();

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

    // Browser back from a project detail page should land directly on the projects section.
    if (navigationType === "POP" && isHomePath && cameFromProjectDetail) {
      const target = document.getElementById("projects");
      if (target) {
        const html = document.documentElement;
        const body = document.body;
        const previousHtmlBehavior = html.style.scrollBehavior;
        const previousBodyBehavior = body.style.scrollBehavior;

        html.style.scrollBehavior = "auto";
        body.style.scrollBehavior = "auto";
        target.scrollIntoView({ behavior: "auto", block: "start" });

        const restoreId = window.setTimeout(() => {
          html.style.scrollBehavior = previousHtmlBehavior;
          body.style.scrollBehavior = previousBodyBehavior;
        }, 0);

        previousPathname.current = pathname;
        return () => {
          window.clearTimeout(restoreId);
          html.style.scrollBehavior = previousHtmlBehavior;
          body.style.scrollBehavior = previousBodyBehavior;
        };
      }
    }

    // Keep browser back/forward behavior in all other cases.
    if (navigationType === "POP") {
      previousPathname.current = pathname;
      return;
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
