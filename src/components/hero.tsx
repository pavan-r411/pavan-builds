"use client";

import { motion } from "framer-motion";
import { ChevronDown, MapPin, GraduationCap } from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

const socialLinks = [
  { icon: FaGithub, label: "GitHub", href: "https://github.com/pavanramesh" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://linkedin.com/in/rameshpavan" },
  { icon: MdEmail, label: "Email", href: "mailto:pkumarr@usc.edu" },
];

const floatingTags = [
  { label: "Java", x: "8%", y: "22%" },
  { label: "Python", x: "78%", y: "16%" },
  { label: "React", x: "12%", y: "68%" },
  { label: "ML / AI", x: "74%", y: "64%" },
  { label: "Spring Boot", x: "4%", y: "45%" },
  { label: "Distributed Systems", x: "63%", y: "38%" },
];

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated background grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:64px_64px]" />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Floating tech tags */}
      {floatingTags.map((tag, i) => (
        <motion.div
          key={tag.label}
          className="absolute hidden lg:block"
          style={{ left: tag.x, top: tag.y }}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <Badge variant="outline" className="text-xs opacity-40 hover:opacity-70 transition-opacity glass-card">
            {tag.label}
          </Badge>
        </motion.div>
      ))}

      {/* Main content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-2 mb-6">
            <Badge className="gap-1.5 px-3 py-1">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
              </span>
              Open to opportunities
            </Badge>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            Pavan Kumar{" "}
            <span className="gradient-text">Ramesh</span>
          </h1>

          <p className="text-xl md:text-2xl text-muted-foreground mb-3 font-light">
            Software Engineer · ML Researcher · Systems Builder
          </p>

          <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground mb-8 flex-wrap">
            <span className="flex items-center gap-1.5">
              <GraduationCap className="h-4 w-4 text-primary" />
              MS CS @ USC · GPA 4.0
            </span>
            <span className="text-border">|</span>
            <span className="flex items-center gap-1.5">
              <MapPin className="h-4 w-4 text-primary" />
              Los Angeles, CA
            </span>
          </div>

          <p className="text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            3+ years of industry experience at <strong className="text-foreground">SAP Labs</strong> and{" "}
            <strong className="text-foreground">Oracle</strong>. Building distributed systems,
            fine-tuning LLMs, and implementing OS kernels. Passionate about high-performance
            backend engineering and applied ML.
          </p>

          <div className="flex items-center justify-center gap-3 flex-wrap">
            <a href="#projects" className={cn(buttonVariants({ size: "lg" }))}>
              View Projects
            </a>
            <a href="#contact" className={cn(buttonVariants({ size: "lg", variant: "outline" }))}>
              Get in Touch
            </a>
            {socialLinks.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <a href="#about" aria-label="Scroll down">
          <ChevronDown className="h-6 w-6 text-muted-foreground" />
        </a>
      </motion.div>
    </section>
  );
}
