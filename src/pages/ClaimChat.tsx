import { useState, useRef, useEffect } from "react";
import { ArrowLeft, Send } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { mockPolicies, mockClaimMessages } from "@/data/mockData";

type Message = { role: "user" | "assistant"; content: string };

const quickPrompts = ["Car accident", "Hospital stay", "Theft at home", "Natural disaster"];

const mockResponses: Record<string, string> = {
  "car accident": `Based on your **Motor Comprehensive** policy (HDFC Ergo):\n\n✅ **Eligible for claim**\n\nYour policy covers own damage from accidents. Here's what you need:\n\n1. 📸 Photos of damage\n2. 🚔 FIR copy from police station\n3. 🪪 Driving license copy\n4. 📋 Claim form (available on HDFC Ergo portal)\n\n⚠️ **Important:** You must file within **24 hours** of the incident (Clause 14b). Don't delay!\n\nWant me to draft your claim letter?`,
  "hospital stay": `Based on your **Health Shield Plus** policy (Star Health):\n\n⚠️ **Partially Eligible**\n\nHospitalization is covered, but watch out for:\n\n- 🔴 Pre-existing conditions have a **48-month waiting period**\n- 🔴 Mental health treatment is **excluded**\n- Room rent is capped at ₹5,000/day\n\n**Documents needed:**\n1. Hospital discharge summary\n2. All medical bills (originals)\n3. Doctor's prescription\n4. Diagnostic reports\n\nShall I draft a claim letter?`,
  default: `I'd be happy to help analyze your claim. Could you provide more details about:\n\n1. **What happened?** (brief description)\n2. **When did it occur?**\n3. **Which policy should I check against?**\n\nI'll then check your coverage and guide you through the process.`,
};

const ClaimChat = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState<Message[]>(mockClaimMessages);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    const userMsg: Message = { role: "user", content: text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    const key = Object.keys(mockResponses).find((k) => text.toLowerCase().includes(k));
    const response = mockResponses[key || "default"];

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: response }]);
      setTyping(false);
    }, 1200);
  };

  return (
    <div className="min-h-screen pb-24 flex flex-col animate-fade-in">
      {/* Header */}
      <div className="px-5 pt-10 pb-4 border-b border-border">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-secondary">
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-lg font-bold">Claim Companion</h1>
            <p className="text-xs text-muted-foreground">AI-powered claim assistant</p>
          </div>
        </div>

        {/* Policy selector */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {mockPolicies.map((p) => (
            <button
              key={p.id}
              className="flex-shrink-0 px-3 py-1.5 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
            >
              {p.name}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
        {messages.map((msg, i) => (
          <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <Card
              className={`max-w-[85%] p-3 ${
                msg.role === "user"
                  ? "gradient-primary text-primary-foreground border-0"
                  : "bg-card"
              }`}
            >
              <p className="text-sm whitespace-pre-wrap leading-relaxed">{msg.content}</p>
            </Card>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start">
            <Card className="p-3 bg-card">
              <div className="flex gap-1">
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                <span className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
              </div>
            </Card>
          </div>
        )}

        {/* Quick prompts after initial message */}
        {messages.length === 1 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {quickPrompts.map((prompt) => (
              <button
                key={prompt}
                onClick={() => send(prompt)}
                className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary text-secondary-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        )}

        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="px-5 pb-20 pt-2 border-t border-border bg-background">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            send(input);
          }}
          className="flex gap-2"
        >
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Describe what happened..."
            className="flex-1"
          />
          <Button type="submit" size="icon" className="gradient-primary text-primary-foreground" disabled={!input.trim()}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default ClaimChat;
