import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { useLanguage } from "@/lib/i18n";

const navItems = {
  de: [
    { label: "Über mich", href: "#about" },
    { label: "Projekte", href: "#projects" },
    { label: "Berufserfahrung", href: "#experience" },
    { label: "Ausbildung", href: "#education" },
    { label: "Kompetenzen", href: "#skills" },
    { label: "Kontakt", href: "#contact" },
  ],
  en: [
    { label: "About", href: "#about" },
    { label: "Projects", href: "#projects" },
    { label: "Experience", href: "#experience" },
    { label: "Education", href: "#education" },
    { label: "Skills", href: "#skills" },
    { label: "Contact", href: "#contact" },
  ],
};

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { lang, isEnglish } = useLanguage();
  const isHome = location.pathname === "/" || location.pathname === "/en";
  const homePath = isEnglish ? "/en" : "/";
  const getNavHref = (href: string) => (isHome ? href : `${homePath}${href}`);
  const navLinks = navItems[lang];
  const switchLabel = isEnglish ? "DE" : "EN";
  const pathWithoutLang = isEnglish ? location.pathname.replace(/^\/en/, "") : location.pathname;
  const dePath = pathWithoutLang === "" ? "/" : pathWithoutLang;
  const enPath = isEnglish ? location.pathname : `/en${location.pathname === "/" ? "" : location.pathname}`;
  const switchPath = isEnglish ? dePath : enPath;
  const switchTo = `${switchPath}${location.hash}`;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/90 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-5xl px-6 flex items-center justify-between h-16">
        <Link to="/" className="font-display text-xl font-bold text-foreground">
          Portfolio<span className="text-accent">.</span>
        </Link>

        {/* Desktop */}
        <ul className="hidden md:flex items-center gap-8">
          {navLinks.map((item) => (
            <li key={item.href}>
              <a
                href={getNavHref(item.href)}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="ml-6">
            <Link
              to={switchTo}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              aria-label={isEnglish ? "Switch to German" : "Switch to English"}
            >
              {switchLabel}
            </Link>
          </li>
        </ul>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-foreground"
          aria-label={lang === "en" ? "Menu" : "Menü"}
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-b border-border overflow-hidden"
          >
            <ul className="flex flex-col px-6 py-4 gap-4">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <a
                    href={getNavHref(item.href)}
                    onClick={() => setMobileOpen(false)}
                    className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
              <li className="ml-auto">
                <Link
                  to={switchTo}
                  onClick={() => setMobileOpen(false)}
                  className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
                  aria-label={isEnglish ? "Switch to German" : "Switch to English"}
                >
                  {switchLabel}
                </Link>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
