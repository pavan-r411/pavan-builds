"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const titles = [
  "Software Engineer",
  "ML Researcher",
  "Distributed Systems Builder",
  "OS Kernel Hacker",
  "LLM Fine-tuner",
];

const bootLines = [
  "Booting pavan.sh ...",
  "Loading kernel modules ... [OK]",
  "Mounting /experience/sap-labs ... [OK]",
  "Mounting /experience/oracle ... [OK]",
  "Starting ML inference engine ... [OK]",
  "Connecting to distributed cluster ... [OK]",
  "All systems operational.",
];

function Typewriter({ text, speed = 50, onDone }: { text: string; speed?: number; onDone?: () => void }) {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    setDisplayed("");
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) {
        clearInterval(interval);
        onDone?.();
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, onDone]);
  return (
    <span>
      {displayed}
      <span className="cursor-blink text-primary">▋</span>
    </span>
  );
}

function BootSequence({ onDone }: { onDone: () => void }) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    let i = 0;
    const next = () => {
      if (i >= bootLines.length) { onDone(); return; }
      const line = bootLines[i];
      if (line) setLines((prev) => [...prev, line]);
      i++;
      setTimeout(next, i === bootLines.length ? 300 : 180);
    };
    setTimeout(next, 300);
  }, [onDone]);

  return (
    <div className="font-mono text-xs md:text-sm text-left max-w-lg mx-auto mb-10 space-y-1">
      {lines.filter(Boolean).map((line, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className={line.includes("[OK]") ? "text-primary" : "text-muted-foreground"}
        >
          {line.includes("[OK]") ? (
            <>
              <span className="text-muted-foreground">{line.replace(" [OK]", "")}</span>
              <span className="text-primary"> [OK]</span>
            </>
          ) : (
            line
          )}
        </motion.div>
      ))}
    </div>
  );
}

export function Hero() {
  const [booted, setBooted] = useState(false);
  const [titleIndex, setTitleIndex] = useState(0);
  const [titleDone, setTitleDone] = useState(false);

  useEffect(() => {
    if (!titleDone) return;
    const t = setTimeout(() => {
      setTitleDone(false);
      setTitleIndex((i) => (i + 1) % titles.length);
    }, 1800);
    return () => clearTimeout(t);
  }, [titleDone]);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Grid background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(0,0,0,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(0,0,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px]" />

      {/* Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-zinc-200/60 rounded-full blur-3xl" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        {!booted ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {/* Terminal window chrome */}
            <div className="inline-block w-full max-w-lg mb-8">
              <div className="bg-card border border-primary/20 rounded-sm overflow-hidden">
                <div className="flex items-center gap-2 px-4 py-2 border-b border-primary/20 bg-muted/30">
                  <span className="w-3 h-3 rounded-full bg-red-500/80" />
                  <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <span className="w-3 h-3 rounded-full bg-primary/80" />
                  <span className="ml-2 text-xs text-muted-foreground font-mono">pavan@usc ~ bash</span>
                </div>
                <div className="p-4 text-left">
                  <BootSequence onDone={() => setBooted(true)} />
                </div>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            {/* Prompt line */}
            <div className="font-mono text-sm text-muted-foreground mb-6 flex items-center justify-center gap-1">
              <span className="text-primary">pavan@usc</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-zinc-500">~</span>
              <span className="text-muted-foreground">$</span>
              <span className="ml-1">whoami</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4 font-mono">
              <span className="gradient-text">Pavan Kumar</span>
              <br />
              <span className="text-foreground/80">Ramesh</span>
            </h1>

            <div className="font-mono text-lg md:text-xl text-muted-foreground mb-6 h-8">
              <span className="text-primary">&gt; </span>
              <Typewriter
                key={titleIndex}
                text={titles[titleIndex]}
                speed={60}
                onDone={() => setTitleDone(true)}
              />
            </div>

            <div className="font-mono text-xs text-muted-foreground mb-8 space-y-1">
              <div><span className="text-primary">GPA</span>     <span className="text-primary/60">=</span> 4.0/4.0 <span className="text-muted-foreground/50"># USC MS CS</span></div>
              <div><span className="text-primary">EXP</span>     <span className="text-primary/60">=</span> 3+ years <span className="text-muted-foreground/50"># SAP Labs + Oracle</span></div>
              <div><span className="text-primary">STATUS</span>  <span className="text-primary/60">=</span> <span className="text-zinc-600">open_to_work</span> <span className="text-muted-foreground/50"># Dec 2026</span></div>
            </div>

            <div className="flex items-center justify-center gap-3 flex-wrap">
              <a href="#projects" className={cn(buttonVariants({ size: "lg" }), "font-mono")}>
                ./view-projects.sh
              </a>
              <a href="#contact" className={cn(buttonVariants({ size: "lg", variant: "outline" }), "font-mono")}>
                ./contact.sh
              </a>
              <a href="https://github.com/pavanramesh" target="_blank" rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}>
                <FaGithub className="h-4 w-4" />
              </a>
              <a href="https://linkedin.com/in/rameshpavan" target="_blank" rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}>
                <FaLinkedin className="h-4 w-4" />
              </a>
              <a href="mailto:pkumarr@usc.edu"
                className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}>
                <MdEmail className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <a href="#about"><ChevronDown className="h-6 w-6 text-primary/50" /></a>
      </motion.div>
    </section>
  );
}
