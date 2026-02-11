import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Linkedin, Mail, MapPin, Send } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

const ContactSection = () => {
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
            <p className="text-accent font-medium text-sm tracking-widest uppercase">Kontakt</p>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            <span className="gold-underline">Kontakt</span>
          </h2>
          <p className="text-primary-foreground/60 text-lg mb-10 max-w-xl mx-auto">
            Ich freue mich über Rückmeldungen und Gespräche.
          </p>

          <div className="flex flex-col items-center justify-center gap-2 mb-6">
            <TooltipProvider>
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
                  {copied ? "Kopiert!" : "Kopieren"}
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
              Kopiert!
            </motion.span>
          </div>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
            <a
              href="https://www.linkedin.com/in/benjamin-oehrli/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-primary-foreground/20 text-primary-foreground font-semibold text-sm hover:bg-primary-foreground/10 transition-all"
            >
              <Linkedin size={18} />
              LinkedIn
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
