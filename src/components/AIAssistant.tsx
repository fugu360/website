import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Send, X, Loader } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface Message {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

const isInteractiveElement = (target: EventTarget | null) => {
  if (!(target instanceof HTMLElement)) {
    return false;
  }

  return Boolean(target.closest("input, textarea, select, button, [contenteditable='true']"));
};

const AIAssistant = () => {
  const { isEnglish } = useLanguage();
  const { pathname } = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const text = isEnglish
    ? {
        title: "Benjamin AI",
        subtitle: "Ask me anything about my work and projects",
        placeholder: "Ask me a question...",
        send: "Send",
        empty: "Start a conversation",
      }
    : {
        title: "Benjamin AI",
        subtitle: "Stelle mir Fragen zu meiner Arbeit und Projekten",
        placeholder: "Stelle mir eine Frage...",
        send: "Senden",
        empty: "Starte ein Gespräch",
      };

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Close on navigation
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  // Keyboard shortcut
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

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!inputValue.trim() || isLoading) {
      return;
    }

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
      timestamp: Date.now(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      // Call local Pi backend or Vercel proxy
      const apiUrl = 
        process.env.REACT_APP_AI_API_URL || 
        (typeof window !== 'undefined' && window.location.hostname === 'localhost' 
          ? 'http://localhost:3001' 
          : 'https://your-domain.ch'); // UPDATE THIS

      const response = await fetch(`${apiUrl}/api/chat`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: inputValue,
          conversationHistory: messages.map((m) => ({
            role: m.role,
            content: m.content,
          })),
          language: isEnglish ? "en" : "de",
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response");
      }

      const data = await response.json();

      // Add AI response
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: data.message,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      console.error("Chat error:", error);

      // Fallback error message
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: isEnglish
          ? "Sorry, I couldn't process your message. Please try again."
          : "Entschuldigung, ich konnte deine Nachricht nicht verarbeiten. Bitte versuche es erneut.",
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
  };

  return (
    <div className="fixed bottom-8 right-8 z-40 flex flex-col items-end gap-4">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-[min(28rem,calc(100vw-2rem))] h-[32rem] rounded-2xl border border-border/70 bg-card/95 shadow-2xl backdrop-blur overflow-hidden flex flex-col"
          >
            {/* Header */}
            <div className="border-b border-border/50 p-4 flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-foreground">{text.title}</h3>
                <p className="text-xs text-muted-foreground mt-1">{text.subtitle}</p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Close chat"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Container */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.length === 0 ? (
                <div className="flex items-center justify-center h-full text-center">
                  <p className="text-sm text-muted-foreground">{text.empty}</p>
                </div>
              ) : (
                <>
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                          message.role === "user"
                            ? "bg-accent text-accent-foreground rounded-br-none"
                            : "bg-secondary/60 text-foreground rounded-bl-none"
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </motion.div>
                  ))}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex justify-start"
                    >
                      <div className="bg-secondary/60 rounded-xl rounded-bl-none px-4 py-2 flex items-center gap-2">
                        <Loader size={16} className="animate-spin" />
                        <span className="text-xs text-muted-foreground">
                          {isEnglish ? "Thinking..." : "Überlege..."}
                        </span>
                      </div>
                    </motion.div>
                  )}
                  <div ref={messagesEndRef} />
                </>
              )}
            </div>

            {/* Input Area */}
            <div className="border-t border-border/50 p-3">
              <form onSubmit={handleSendMessage} className="flex gap-2">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder={text.placeholder}
                  disabled={isLoading}
                  className="flex-1 bg-secondary/40 rounded-xl px-3 py-2 text-sm placeholder-muted-foreground/50 border border-border/30 focus:border-accent focus:outline-none transition-colors disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={isLoading || !inputValue.trim()}
                  className="bg-accent hover:bg-accent/90 text-accent-foreground p-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label={text.send}
                >
                  <Send size={18} />
                </button>
              </form>
              {messages.length > 0 && (
                <button
                  onClick={clearChat}
                  className="w-full mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
                >
                  {isEnglish ? "Clear chat" : "Chat löschen"}
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar Button */}
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
          <div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center text-white text-2xl font-bold">
            AI
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

export default AIAssistant;
