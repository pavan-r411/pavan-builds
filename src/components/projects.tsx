"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FaGithub } from "react-icons/fa";
import { Zap, ChevronDown, ChevronUp } from "lucide-react";
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
  { label: "All", value: "all" },
  { label: "ML / AI", value: "ml" },
  { label: "Distributed", value: "distributed" },
  { label: "Systems", value: "systems" },
  { label: "Full Stack", value: "fullstack" },
];

const categoryColors: Record<string, string> = {
  ml: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  distributed: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  systems: "bg-orange-500/10 text-orange-500 border-orange-500/20",
  fullstack: "bg-green-500/10 text-green-500 border-green-500/20",
};

function ProjectCard({ project }: { project: Project }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div layout>
      <Card className="glass-card h-full hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5 group">
        <CardHeader className="pb-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <div className="flex items-center gap-2 mb-2 flex-wrap">
                <span
                  className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                    categoryColors[project.category] ?? "bg-muted text-muted-foreground border-border"
                  }`}
                >
                  {categoryFilters.find((c) => c.value === project.category)?.label ?? project.category}
                </span>
                {project.featured && (
                  <span className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium flex items-center gap-1">
                    <Zap className="h-3 w-3" /> Featured
                  </span>
                )}
              </div>
              <h3 className="font-bold text-base group-hover:text-primary transition-colors">
                {project.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-1">
                {project.startDate}{project.endDate ? ` – ${project.endDate}` : " – Present"}
              </p>
            </div>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(buttonVariants({ size: "icon", variant: "ghost" }), "shrink-0 h-8 w-8")}
              >
                <FaGithub className="h-4 w-4" />
              </a>
            )}
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{project.description}</p>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="mb-4"
              >
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
                  Key Highlights
                </p>
                <ul className="space-y-1.5">
                  {project.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm">
                      <span className="text-primary mt-1">▸</span>
                      <span className="text-muted-foreground">{h}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="flex flex-wrap gap-1.5 mb-3">
            {project.tags.slice(0, expanded ? undefined : 4).map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs">
                {tag}
              </Badge>
            ))}
            {!expanded && project.tags.length > 4 && (
              <Badge variant="outline" className="text-xs text-muted-foreground">
                +{project.tags.length - 4}
              </Badge>
            )}
          </div>

          <Button
            variant="ghost"
            size="sm"
            className="w-full text-xs text-muted-foreground hover:text-foreground gap-1"
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? (
              <>Less <ChevronUp className="h-3 w-3" /></>
            ) : (
              <>Details <ChevronDown className="h-3 w-3" /></>
            )}
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function Projects({ projects }: { projects: Project[] }) {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all" ? projects : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="projects" className="section-padding bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Badge variant="outline" className="mb-4">Work</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Projects</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From distributed query engines to LLM fine-tuning and OS kernel internals.
          </p>
        </motion.div>

        {/* Filters */}
        <div className="flex flex-wrap gap-2 justify-center mb-10">
          {categoryFilters.map((f) => (
            <Button
              key={f.value}
              variant={activeFilter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveFilter(f.value)}
              className="text-xs"
            >
              {f.label}
            </Button>
          ))}
        </div>

        <motion.div layout className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
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
