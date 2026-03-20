import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";
import { Send, X, Loader } from "lucide-react";
import { useLanguage } from "@/lib/i18n";

interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
}

const isInteractiveElement = (target: EventTarget | null) => {
	if (!(target instanceof HTMLElement)) {
		return false;
	}

	return Boolean(target.closest("input, textarea, select, button, [contenteditable='true']"));
};

const getApiBaseUrl = () => {
	const envUrl = import.meta.env.VITE_AI_API_URL as string | undefined;
	if (envUrl && envUrl.trim().length > 0) {
		return envUrl.replace(/\/$/, "");
	}

	if (typeof window !== "undefined" && window.location.hostname === "localhost") {
		return "http://localhost:3001";
	}

	return "https://ai.benjamin-oehrli.ch";
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
				loading: "Thinking...",
				error: "Sorry, I couldn't process your message. Please try again.",
				clear: "Clear chat",
			}
		: {
				title: "Benjamin AI",
				subtitle: "Stelle mir Fragen zu meiner Arbeit und Projekten",
				placeholder: "Stelle mir eine Frage...",
				send: "Senden",
				empty: "Starte ein Gespräch",
				loading: "Überlege...",
				error: "Entschuldigung, ich konnte deine Nachricht nicht verarbeiten. Bitte versuche es erneut.",
				clear: "Chat löschen",
			};

	useEffect(() => {
		messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isLoading]);

	useEffect(() => {
		if (isOpen) {
			inputRef.current?.focus();
		}
	}, [isOpen]);

	useEffect(() => {
		setIsOpen(false);
	}, [pathname]);

	useEffect(() => {
		const onKeyDown = (event: KeyboardEvent) => {
			if (event.key === "Escape") {
				setIsOpen(false);
				return;
			}

			if ((event.key !== "/" && event.key.toLowerCase() !== "k") || isInteractiveElement(event.target)) {
				return;
			}

			event.preventDefault();
			setIsOpen((prev) => !prev);
		};

		window.addEventListener("keydown", onKeyDown);
		return () => window.removeEventListener("keydown", onKeyDown);
	}, []);

	useEffect(() => {
		if (!isOpen || typeof window === "undefined" || window.innerWidth >= 640) {
			return;
		}

		const previousOverflow = document.body.style.overflow;
		document.body.style.overflow = "hidden";

		return () => {
			document.body.style.overflow = previousOverflow;
		};
	}, [isOpen]);

	const handleSendMessage = async (event: React.FormEvent) => {
		event.preventDefault();
		const message = inputValue.trim();
		if (!message || isLoading) {
			return;
		}

		const userMessage: Message = {
			id: crypto.randomUUID(),
			role: "user",
			content: message,
		};

		setMessages((prev) => [...prev, userMessage]);
		setInputValue("");
		setIsLoading(true);

		try {
			const apiBaseUrl = getApiBaseUrl();
			const response = await fetch(`${apiBaseUrl}/api/chat`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					message,
					conversationHistory: messages.map((item) => ({
						role: item.role,
						content: item.content,
					})),
					language: isEnglish ? "en" : "de",
				}),
			});

			if (!response.ok) {
				throw new Error(`HTTP ${response.status}`);
			}

			const data = await response.json();
			const assistantText = typeof data.message === "string" ? data.message.trim() : "";
			if (!assistantText) {
				throw new Error("Empty assistant message");
			}

			setMessages((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					role: "assistant",
					content: assistantText,
				},
			]);
		} catch {
			setMessages((prev) => [
				...prev,
				{
					id: crypto.randomUUID(),
					role: "assistant",
					content: text.error,
				},
			]);
		} finally {
			setIsLoading(false);
		}
	};

	return (
		<div className="fixed left-4 right-4 bottom-4 z-40 flex flex-col items-end gap-3 sm:left-auto sm:right-8 sm:bottom-8 sm:gap-4">
			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ opacity: 0, scale: 0.9, y: 20 }}
						animate={{ opacity: 1, scale: 1, y: 0 }}
						exit={{ opacity: 0, scale: 0.9, y: 20 }}
						transition={{ type: "spring", stiffness: 300, damping: 30 }}
						className="w-full sm:w-[min(28rem,calc(100vw-2rem))] h-[calc(100dvh-6.75rem)] max-h-[calc(100dvh-6.75rem)] sm:h-[32rem] sm:max-h-[32rem] rounded-2xl border border-border/70 bg-card/95 shadow-2xl backdrop-blur overflow-hidden flex flex-col"
					>
						<div className="border-b border-border/50 px-4 py-3 sm:p-4 flex items-start justify-between">
							<div>
								<h3 className="font-semibold text-foreground">{text.title}</h3>
								<p className="text-xs text-muted-foreground mt-1 line-clamp-2 sm:line-clamp-none">{text.subtitle}</p>
							</div>
							<button
								onClick={() => setIsOpen(false)}
								className="text-muted-foreground hover:text-foreground transition-colors"
								aria-label="Close chat"
							>
								<X size={18} />
							</button>
						</div>

						<div className="flex-1 overflow-y-auto px-3 py-4 sm:p-4 space-y-3">
							{messages.length === 0 ? (
								<div className="flex items-center justify-center h-full text-center">
									<p className="text-sm text-muted-foreground">{text.empty}</p>
								</div>
							) : (
								messages.map((msg) => (
									<div key={msg.id} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
										<div
											className={`max-w-[85%] sm:max-w-[80%] rounded-xl px-4 py-2 text-sm whitespace-pre-wrap ${
												msg.role === "user"
													? "bg-accent text-accent-foreground rounded-br-none"
													: "bg-secondary/60 text-foreground rounded-bl-none"
											}`}
										>
											{msg.content}
										</div>
									</div>
								))
							)}

							{isLoading && (
								<div className="flex justify-start">
									<div className="bg-secondary/60 rounded-xl rounded-bl-none px-4 py-2 flex items-center gap-2">
										<Loader size={16} className="animate-spin" />
										<span className="text-xs text-muted-foreground">{text.loading}</span>
									</div>
								</div>
							)}
							<div ref={messagesEndRef} />
						</div>

						<div className="border-t border-border/50 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))]">
							<form onSubmit={handleSendMessage} className="flex gap-2">
								<input
									ref={inputRef}
									type="text"
									value={inputValue}
									onChange={(e) => setInputValue(e.target.value)}
									placeholder={text.placeholder}
									disabled={isLoading}
									className="flex-1 bg-secondary/40 rounded-xl px-3 py-2.5 sm:py-2 text-sm placeholder-muted-foreground/50 border border-border/30 focus:border-accent focus:outline-none transition-colors disabled:opacity-50"
								/>
								<button
									type="submit"
									disabled={isLoading || !inputValue.trim()}
									className="bg-accent hover:bg-accent/90 text-accent-foreground p-2.5 sm:p-2 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
									aria-label={text.send}
								>
									<Send size={18} />
								</button>
							</form>
							{messages.length > 0 && (
								<button
									onClick={() => setMessages([])}
									className="w-full mt-2 text-xs text-muted-foreground hover:text-foreground transition-colors"
								>
									{text.clear}
								</button>
							)}
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
				<motion.div
					className="absolute inset-0 -z-10 rounded-full bg-accent/30 blur-lg"
					animate={{ scale: [1, 1.06, 1], opacity: [0.22, 0.34, 0.22] }}
					transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
				/>
				<motion.div
					className="absolute inset-0 rounded-full border-2 border-accent"
					animate={{ scale: [1, 1.08, 1], opacity: [0.35, 0.14, 0.35] }}
					transition={{ duration: 2.8, repeat: Infinity, ease: "easeInOut" }}
				/>

				<div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full border-2 sm:border-3 border-accent overflow-hidden bg-gradient-to-br from-accent to-accent/80 flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow">
					<div className="w-full h-full bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 flex items-center justify-center text-white text-xl sm:text-2xl font-bold">
						AI
					</div>
				</div>
			</motion.button>
		</div>
	);
};

export default AIAssistant;
