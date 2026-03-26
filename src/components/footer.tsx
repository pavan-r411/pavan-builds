"use client";

import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

export function Footer() {
  return (
    <footer className="border-t border-border/50 py-8 px-4">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} Pavan Kumar Ramesh. Built with Next.js + shadcn/ui.
          </p>
        </motion.div>
        <div className="flex items-center gap-2">
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
          >
            <FaGithub className="h-4 w-4" />
          </a>
          <a
            href="https://linkedin.com/in/rameshpavan"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
          >
            <FaLinkedin className="h-4 w-4" />
          </a>
          <a
            href="mailto:pkumarr@usc.edu"
            aria-label="Email"
            className={cn(buttonVariants({ size: "icon", variant: "ghost" }))}
          >
            <MdEmail className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
