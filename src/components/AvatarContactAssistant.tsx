import { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { Mail, Linkedin, Github, X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

const CONTACT_EMAIL = "oehrli.benjamin@gmail.com";
const LINKEDIN_URL = "https://www.linkedin.com/in/benjamin-oehrli/";
const GITHUB_URL = "https://github.com/fugu360";

const isInteractiveElement = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(target.closest("input, textarea, select, button, [contenteditable='true']"));
};

const AvatarContactAssistant = () => {
  const { isEnglish } = useLanguage();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);
  const emailTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const text = isEnglish
    ? {
        greeting: "Hey! How can I help?",
        subtitleProject: "Questions about this project? I'm here to help.",
        subtitleDefault: "Always happy to connect.",
        email: "Send email",
        copy: "Copy",
        copied: "Copied!",
        linkedin: "Open LinkedIn",
        github: "Open GitHub",
        contactNow: "Go to contact",
      }
    : {
        greeting: "Hey! Wie kann ich dir helfen?",
        subtitleProject: "Fragen zu diesem Projekt? Ich helfe gerne.",
        subtitleDefault: "Immer gerne in Kontakt.",
        email: "E-Mail senden",
        copy: "Kopieren",
        copied: "Kopiert!",
        linkedin: "LinkedIn öffnen",
        github: "GitHub öffnen",
        contactNow: "Zum Kontakt",
      };

  const subtitle = useMemo(() => {
    const isProject = /\/projects\//.test(pathname);

    if (isProject) {
      return text.subtitleProject;
    }

    return text.subtitleDefault;
  }, [pathname, text.subtitleDefault, text.subtitleProject]);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL);
      setEmailCopied(true);
      if (emailTimeoutRef.current) {
        clearTimeout(emailTimeoutRef.current);
      }
      emailTimeoutRef.current = setTimeout(() => setEmailCopied(false), 1600);
    } catch {
      setEmailCopied(false);
    }
  };

  useEffect(() => {
    return () => {
      if (emailTimeoutRef.current) {
        clearTimeout(emailTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.key !== "/" && event.key.toLowerCase() !== "k") || isInteractiveElement(event.target)) {
        return;
      }

      event.preventDefault();
      setIsOpen((prev) => !prev);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const homePath = isEnglish ? "/en" : "/";

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-[min(28rem,calc(100vw-2rem))] rounded-2xl border border-border/70 bg-card/95 p-5 shadow-2xl backdrop-blur"
          >
            <div className="flex items-start justify-between gap-3 mb-4">
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-2">{text.greeting}</h3>
                <p className="text-sm text-muted-foreground mb-3">{subtitle}</p>

                <div className="space-y-2 mb-4">
                  <Link
                    to={{ pathname: homePath, hash: "#contact" }}
                    className="w-full flex items-center justify-between rounded-xl border border-border/70 bg-accent/10 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-accent/20 transition-colors group"
                    onClick={() => setIsOpen(false)}
                  >
                    <span>{text.contactNow}</span>
                    <span className="text-accent group-hover:translate-x-1 transition-transform">→</span>
                  </Link>

                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="w-full flex items-center justify-between gap-2 rounded-xl border border-border/70 bg-secondary/40 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/60 transition-colors group"
                  >
                    <span className="flex items-center gap-2">
                      <Mail size={16} />
                      <span className="flex-1 text-left">{emailCopied ? text.copied : text.email}</span>
                    </span>
                    {emailCopied && <span className="text-accent text-xs font-semibold">✓</span>}
                  </button>

                  <a
                    href={LINKEDIN_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2 rounded-xl border border-border/70 bg-secondary/40 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/60 transition-colors"
                  >
                    <Linkedin size={16} />
                    <span className="flex-1">{text.linkedin}</span>
                  </a>

                  <a
                    href={GITHUB_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center gap-2 rounded-xl border border-border/70 bg-secondary/40 px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary/60 transition-colors"
                  >
                    <Github size={16} />
                    <span className="flex-1">{text.github}</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative group"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {/* Glow effect */}
        <motion.div
          className="absolute inset-0 -z-10 rounded-full bg-accent/30 blur-lg"
          animate={{ scale: isOpen ? 1.2 : 1 }}
          transition={{ duration: 0.3 }}
        />

        {/* Pulse ring */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-accent"
          animate={{ scale: [1, 1.3], opacity: [1, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Avatar button */}
        <div className="relative w-16 h-16 rounded-full border-3 border-accent overflow-hidden bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
          {/* Placeholder avatar - replace with actual image */}
          <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">
            BO
          </div>
        </div>

        {/* Close icon when open */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute -top-2 -right-2 bg-foreground rounded-full p-1"
            >
              <X size={14} className="text-background" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </div>
  );
};

export default AvatarContactAssistant;
