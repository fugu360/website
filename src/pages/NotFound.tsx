import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { setSeo } from "@/lib/seo";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    setSeo({
      title: "404 - Seite nicht gefunden",
      description: "Die angeforderte Seite wurde nicht gefunden.",
      canonical: "https://www.benjamin-oehrli.ch/",
      ogUrl: "https://www.benjamin-oehrli.ch/",
    });
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted">
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a href="/" className="text-primary underline hover:text-primary/90">
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
