"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Send, CheckCircle, Loader2 } from "lucide-react";

const contactInfo = [
  { icon: MdEmail, label: "email", value: "pkumarr@usc.edu", href: "mailto:pkumarr@usc.edu" },
  { icon: FaLinkedin, label: "linkedin", value: "linkedin.com/in/rameshpavan", href: "https://linkedin.com/in/rameshpavan" },
  { icon: FaGithub, label: "github", value: "github.com/pavanramesh", href: "https://github.com" },
];

export function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      setForm({ name: "", email: "", subject: "", message: "" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="section-padding bg-muted/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-mono text-sm text-muted-foreground mb-2">
            <span className="text-primary">$</span> ssh pavan@usc.edu
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono gradient-text">contact</h2>
          <p className="text-muted-foreground font-mono text-sm mt-2">
            <span className="text-primary"># </span>open to roles, internships, and interesting collabs
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 space-y-3"
          >
            {contactInfo.map((info, i) => (
              <motion.div key={info.label} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <a href={info.href} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-3 p-3 bg-card border border-primary/15 rounded-sm hover:border-primary/40 transition-colors group font-mono">
                  <div className="h-8 w-8 flex items-center justify-center bg-primary/10 rounded-sm group-hover:bg-primary/20 transition-colors">
                    <info.icon className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <div className="text-xs text-primary/60">{info.label}</div>
                    <div className="text-sm text-muted-foreground group-hover:text-primary transition-colors">{info.value}</div>
                  </div>
                </a>
              </motion.div>
            ))}

            <div className="mt-4 p-4 bg-card border border-primary/15 rounded-sm font-mono text-sm">
              <div className="text-primary/60 text-xs mb-2"># availability</div>
              <div className="space-y-1 text-muted-foreground">
                <div><span className="text-primary">✓</span> Full-time SWE (Dec 2026)</div>
                <div><span className="text-primary">✓</span> Internships (Summer 2026)</div>
                <div><span className="text-primary">✓</span> Research collabs</div>
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="md:col-span-3"
          >
            <Card className="terminal-card">
              <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-primary/10 bg-muted/20">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                <span className="ml-2 font-mono text-xs text-muted-foreground">new-message.sh</span>
              </div>
              <CardContent className="p-5">
                {status === "success" ? (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-10 font-mono">
                    <CheckCircle className="h-10 w-10 text-primary mx-auto mb-3" />
                    <div className="text-primary text-lg mb-1">message sent!</div>
                    <div className="text-muted-foreground text-sm">exit code: 0 — I&apos;ll get back to you.</div>
                    <Button variant="outline" className="mt-4 font-mono text-xs" onClick={() => setStatus("idle")}>
                      ./send-another.sh
                    </Button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4 font-mono">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label htmlFor="name" className="text-xs text-primary/60">--name</Label>
                        <Input id="name" placeholder="your name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required className="font-mono text-sm bg-background/50 border-primary/20 focus:border-primary" />
                      </div>
                      <div className="space-y-1.5">
                        <Label htmlFor="email" className="text-xs text-primary/60">--email</Label>
                        <Input id="email" type="email" placeholder="your@email.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required className="font-mono text-sm bg-background/50 border-primary/20 focus:border-primary" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="subject" className="text-xs text-primary/60">--subject</Label>
                      <Input id="subject" placeholder="e.g. internship opportunity" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} required className="font-mono text-sm bg-background/50 border-primary/20 focus:border-primary" />
                    </div>
                    <div className="space-y-1.5">
                      <Label htmlFor="message" className="text-xs text-primary/60">--message</Label>
                      <Textarea id="message" placeholder="what's on your mind?" rows={5} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} required className="font-mono text-sm bg-background/50 border-primary/20 focus:border-primary resize-none" />
                    </div>
                    {status === "error" && <p className="text-xs text-destructive font-mono">error: message failed. try again.</p>}
                    <Button type="submit" className="w-full font-mono gap-2 text-sm" disabled={status === "loading"}>
                      {status === "loading" ? <><Loader2 className="h-4 w-4 animate-spin" /> executing...</> : <><Send className="h-4 w-4" /> ./send.sh</>}
                    </Button>
                  </form>
                )}
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
