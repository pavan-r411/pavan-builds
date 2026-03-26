"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

type Project = {
  id: string;
  title: string;
  description: string;
  tags: string[];
  highlights: string[];
  category: string;
  startDate: string;
  endDate: string | null;
  featured: boolean;
  githubUrl: string | null;
};

const categoryFilters = [
  { label: "all", value: "all" },
  { label: "ml/ai", value: "ml" },
  { label: "distributed", value: "distributed" },
  { label: "systems", value: "systems" },
  { label: "fullstack", value: "fullstack" },
];

const categoryColors: Record<string, string> = {
  ml: "text-zinc-600 border-zinc-400/40 bg-zinc-100",
  distributed: "text-zinc-600 border-zinc-400/40 bg-zinc-100",
  systems: "text-zinc-600 border-zinc-400/40 bg-zinc-100",
  fullstack: "text-zinc-600 border-zinc-400/40 bg-zinc-100",
};

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card className="terminal-card h-full hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5 group">
      <CardContent className="p-0">
        {/* Terminal window chrome */}
        <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-primary/10 bg-muted/20">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
          <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
          <span className="ml-2 font-mono text-xs text-muted-foreground flex-1">
            ~/{project.category}/{project.title.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "")}
          </span>
          <span className={cn("text-xs px-1.5 py-0.5 rounded-sm border font-mono", categoryColors[project.category] ?? "text-muted-foreground border-border")}>
            {project.category}
          </span>
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
              className={cn(buttonVariants({ size: "icon", variant: "ghost" }), "h-6 w-6 ml-1")}>
              <FaGithub className="h-3 w-3" />
            </a>
          )}
        </div>

        <div className="p-4">
          {/* Title with prompt */}
          <div className="font-mono mb-3">
            <div className="text-xs text-muted-foreground/60 mb-1">
              <span className="text-primary/50">#</span> {project.startDate}{project.endDate ? ` – ${project.endDate}` : " – present"}
            </div>
            <h3 className="font-bold text-base text-pink-300 group-hover:text-primary transition-colors">
              {project.title}
            </h3>
          </div>

          <p className="text-sm text-muted-foreground font-mono leading-relaxed mb-4">
            {project.description}
          </p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <div className="font-mono text-xs text-primary/60 mb-2">$ ./highlights.sh</div>
                <ul className="space-y-1.5 font-mono text-sm">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-muted-foreground">
                      <span className="text-primary mt-0.5">▸</span>
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, expanded ? undefined : 4).map((tag) => (
              <span key={tag} className="font-mono text-xs px-2 py-0.5 bg-primary/5 text-primary/70 border border-primary/15 rounded-sm">
                {tag}
              </span>
            ))}
            {!expanded && project.tags.length > 4 && (
              <span className="font-mono text-xs px-2 py-0.5 text-muted-foreground/50">
                +{project.tags.length - 4} more
              </span>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="w-full font-mono text-xs text-muted-foreground hover:text-primary gap-1"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <>collapse <ChevronUp className="h-3 w-3" /></> : <>expand <ChevronDown className="h-3 w-3" /></>}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("all");
  const filtered = activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding bg-muted/10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="font-mono text-sm text-muted-foreground mb-2">
            <span className="text-primary">$</span> ls -la ~/projects/
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono gradient-text">projects</h2>
        </motion.div>

        {/* Filter tabs */}
        <div className="flex flex-wrap gap-2 mb-10 font-mono text-xs">
          {categoryFilters.map((f) => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={cn(
                "px-3 py-1.5 border rounded-sm transition-colors",
                activeFilter === f.value
                  ? "bg-primary/10 border-primary text-primary"
                  : "border-primary/20 text-muted-foreground hover:border-primary/40 hover:text-primary/70"
              )}
            >
              {activeFilter === f.value ? `[${f.label}]` : f.label}
            </button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.25 }}
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
