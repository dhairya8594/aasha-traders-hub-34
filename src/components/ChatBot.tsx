import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

type Message = {
  id: number;
  from: "bot" | "user";
  text: string;
};

const steps = [
  { key: "name", prompt: "Hello! 👋 Welcome to Aasha Traders. I'd love to help with your inquiry.\n\nCould you please share your **full name**?" },
  { key: "email", prompt: "Thanks! What's your **email address**?" },
  { key: "phone", prompt: "And your **phone number**?" },
  { key: "address", prompt: "Please share your **address** (city / region is fine)." },
  { key: "service", prompt: "Which service are you interested in?\n\n1️⃣ Chemicals\n2️⃣ EXIM (Export-Import)\n3️⃣ Both" },
  { key: "message", prompt: "Great! Please describe your **inquiry** in detail — products needed, quantities, or any questions you have." },
] as const;

type FormData = Record<string, string>;

const validateStep = (key: string, value: string): string | null => {
  const trimmed = value.trim();
  if (!trimmed) return "Please provide a response to continue.";
  if (key === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) return "Please enter a valid email address.";
  if (key === "phone" && !/^[\d\s\-+()]{7,20}$/.test(trimmed)) return "Please enter a valid phone number.";
  if (key === "name" && trimmed.length < 2) return "Name should be at least 2 characters.";
  return null;
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({});
  const [completed, setCompleted] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const idRef = useRef(0);

  const addMsg = (from: "bot" | "user", text: string) => {
    idRef.current += 1;
    const msg: Message = { id: idRef.current, from, text };
    setMessages((prev) => [...prev, msg]);
    return msg;
  };

  // Start conversation on open
  useEffect(() => {
    if (open && messages.length === 0) {
      addMsg("bot", steps[0].prompt);
    }
    if (open) {
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [open]);

  // Auto-scroll
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    if (!input.trim() || completed) return;

    const currentStep = steps[step];
    const value = input.trim();

    // Validate
    const error = validateStep(currentStep.key, value);
    if (error) {
      addMsg("user", value);
      setInput("");
      setTimeout(() => addMsg("bot", `⚠️ ${error}`), 400);
      return;
    }

    addMsg("user", value);
    setInput("");

    const newData = { ...formData, [currentStep.key]: value };
    setFormData(newData);

    const nextStep = step + 1;

    if (nextStep < steps.length) {
      setStep(nextStep);
      setTimeout(() => addMsg("bot", steps[nextStep].prompt), 500);
    } else {
      // Complete
      setCompleted(true);
      setTimeout(() => {
        addMsg(
          "bot",
          `Thank you, **${newData.name}**! 🎉\n\nHere's a summary of your inquiry:\n\n` +
          `📧 **Email:** ${newData.email}\n` +
          `📞 **Phone:** ${newData.phone}\n` +
          `📍 **Address:** ${newData.address}\n` +
          `🏷️ **Service:** ${newData.service}\n` +
          `💬 **Message:** ${newData.message}\n\n` +
          `Our team will get back to you within **24 hours**. You can also reach us at **info@aashatraders.com**.`
        );
        toast({
          title: "Inquiry Submitted!",
          description: "We'll get back to you within 24 hours.",
        });
      }, 500);
    }
  };

  const handleReset = () => {
    setMessages([]);
    setStep(0);
    setFormData({});
    setCompleted(false);
    idRef.current = 0;
    setTimeout(() => addMsg("bot", steps[0].prompt), 200);
  };

  return (
    <>
      {/* Floating Button */}
      {!open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-secondary text-secondary-foreground flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] h-[520px] max-h-[calc(100vh-3rem)] bg-card border border-border rounded-2xl flex flex-col overflow-hidden"
          style={{ boxShadow: "var(--shadow-elevated)" }}
        >
          {/* Header */}
          <div className="bg-primary px-4 py-3 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-secondary/20 flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-secondary" />
              </div>
              <div>
                <p className="text-primary-foreground text-sm font-semibold">Aasha Traders</p>
                <p className="text-primary-foreground/60 text-xs">Inquiry Assistant</p>
              </div>
            </div>
            <button onClick={() => setOpen(false)} className="text-primary-foreground/60 hover:text-primary-foreground transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed whitespace-pre-line ${
                    msg.from === "user"
                      ? "bg-secondary text-secondary-foreground rounded-br-md"
                      : "bg-muted text-foreground rounded-bl-md"
                  }`}
                >
                  {msg.text.split(/(\*\*.*?\*\*)/).map((part, i) =>
                    part.startsWith("**") && part.endsWith("**") ? (
                      <strong key={i}>{part.slice(2, -2)}</strong>
                    ) : (
                      <span key={i}>{part}</span>
                    )
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="border-t border-border p-3 shrink-0">
            {completed ? (
              <Button onClick={handleReset} variant="outline" className="w-full">
                Start New Inquiry
              </Button>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend();
                }}
                className="flex gap-2"
              >
                <Input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Type your response…"
                  className="flex-1"
                  maxLength={500}
                />
                <Button type="submit" size="icon" className="shrink-0 bg-secondary hover:bg-secondary/90 text-secondary-foreground">
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ChatBot;
