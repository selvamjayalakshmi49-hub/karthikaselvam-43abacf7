import { useChat } from "@ai-sdk/react";
import { DefaultChatTransport } from "ai";
import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const { messages, sendMessage, status } = useChat({
    transport: new DefaultChatTransport({ api: "/api/chat" }),
  });

  const isLoading = status === "submitted" || status === "streaming";

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 100);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, status]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;
    sendMessage({ text });
    setInput("");
  };

  return (
    <>
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close chat" : "Open chat"}
        className="fixed bottom-6 right-6 z-50 grid place-items-center h-14 w-14 rounded-full bg-primary text-primary-foreground shadow-lg hover:scale-105 transition"
      >
        {open ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" />}
      </button>

      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-[min(380px,calc(100vw-3rem))] h-[min(560px,calc(100vh-8rem))] flex flex-col rounded-2xl border border-border bg-background shadow-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-border bg-primary text-primary-foreground">
            <p className="font-semibold text-sm">Chat with Karthika's Assistant</p>
            <p className="text-xs opacity-80">Ask about skills, projects, or services</p>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.length === 0 && (
              <div className="text-sm text-muted-foreground text-center mt-8">
                Hi! 👋 Ask me anything about Karthika's work, skills, or how to get in touch.
              </div>
            )}
            {messages.map((m) => {
              const text = m.parts
                .map((p) => (p.type === "text" ? p.text : ""))
                .join("");
              const isUser = m.role === "user";
              return (
                <div key={m.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
                  <div
                    className={
                      isUser
                        ? "max-w-[85%] rounded-2xl px-3 py-2 text-sm bg-primary text-primary-foreground"
                        : "max-w-[85%] text-sm text-foreground whitespace-pre-wrap"
                    }
                  >
                    {text}
                  </div>
                </div>
              );
            })}
            {status === "submitted" && (
              <div className="text-sm text-muted-foreground italic">Thinking…</div>
            )}
          </div>

          <form onSubmit={onSubmit} className="border-t border-border p-3 flex gap-2">
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message…"
              className="flex-1 rounded-lg border border-border bg-background px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-primary"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="grid place-items-center h-9 w-9 rounded-lg bg-primary text-primary-foreground disabled:opacity-50"
              aria-label="Send"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
