import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin, Send } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useLanguage } from "@/lib/i18n";

const ContactSection = () => {
  const { lang } = useLanguage();
  const text =
    lang === "en"
      ? {
          eyebrow: "Contact",
          title: "Contact",
          subtitle: "I welcome feedback and conversations",
          copy: "Copy",
          copied: "Copied!",
        }
      : {
          eyebrow: "Kontakt",
          title: "Kontakt",
          subtitle: "Ich freue mich über Rückmeldungen und Gespräche",
          copy: "Kopieren",
          copied: "Kopiert!",
        };
  const [copied, setCopied] = useState(false);
  const copyTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText("oehrli.benjamin@gmail.com");
      setCopied(true);
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
      copyTimeoutRef.current = setTimeout(() => setCopied(false), 1600);
    } catch {
      setCopied(false);
    }
  };

  useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) {
        clearTimeout(copyTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section id="contact" className="bg-primary">
      <div className="section-container text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-2">
            <Send size={20} className="text-accent" />
            <p className="text-accent font-medium text-sm tracking-widest uppercase">
              {text.eyebrow}
            </p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            <span className="gold-underline">{text.title}</span>
          </h2>
          <p className="text-primary-foreground/60 text-lg mb-10 max-w-xl mx-auto">
            {text.subtitle}
          </p>

          <div className="flex flex-col items-center justify-center gap-2 mb-6">
            <TooltipProvider delayDuration={100}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent/90 text-accent-foreground font-semibold text-sm shadow-[0_10px_25px_-12px_hsl(var(--accent)/0.8)] hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_16px_30px_-14px_hsl(var(--accent)/0.9)] active:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-primary transition-all"
                  >
                    <Mail size={18} />
                    oehrli.benjamin@gmail.com
                  </button>
                </TooltipTrigger>
                <TooltipContent className="border-border/60 bg-popover/95 text-popover-foreground backdrop-blur">
                  {copied ? text.copied : text.copy}
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <motion.span
              aria-live="polite"
              initial={false}
              animate={copied ? { opacity: 1, y: 0 } : { opacity: 0, y: -4 }}
              transition={{ duration: 0.2 }}
              className="text-xs text-accent"
            >
              {text.copied}
            </motion.span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <a
              href="https://www.linkedin.com/in/benjamin-oehrli/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary-foreground/20 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition-all"
            >
              <Linkedin size={18} />
              LinkedIn
            </a>
            <a
              href="https://github.com/fugu360"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary-foreground/20 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition-all"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.009-.868-.013-1.703-2.782.604-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              GitHub
            </a>
          </div>
          <div className="flex items-center justify-center gap-2 text-primary-foreground/70">
            <MapPin size={18} />
            <span className="text-sm">Bern</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactSection;
