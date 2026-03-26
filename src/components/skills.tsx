"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
};

const categoryMeta: Record<string, { label: string; icon: string; color: string }> = {
  language: { label: "languages", icon: "⌨", color: "bg-zinc-700" },
  database: { label: "databases", icon: "🗄", color: "bg-zinc-700" },
  web: { label: "web & devops", icon: "🌐", color: "bg-zinc-700" },
  ml: { label: "ml / ai", icon: "🧠", color: "bg-zinc-700" },
};

function AsciiBar({ level, color }: { level: number; color: string }) {
  const filled = Math.round(level / 5);
  const empty = 20 - filled;
  return (
    <span className="font-mono text-xs">
      <span className="text-zinc-400">[</span>
      <span className="text-zinc-600">{"█".repeat(filled)}</span>
      <span className="text-zinc-300">{"░".repeat(empty)}</span>
      <span className="text-zinc-400">]</span>
    </span>
  );
}

export function Skills({ skills }: { skills: Skill[] }) {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  const grouped = Object.entries(categoryMeta).map(([key, meta]) => ({
    key,
    meta,
    skills: skills.filter((s) => s.category === key).sort((a, b) => b.level - a.level),
  }));

  return (
    <section id="skills" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-mono text-sm text-muted-foreground mb-2">
            <span className="text-primary">$</span> dpkg --list | grep skills
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono gradient-text">skills</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {grouped.map((group, gi) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: gi * 0.1 }}
            >
              <Card className="terminal-card h-full hover:border-primary/40 transition-colors">
                <CardHeader className="pb-0 p-0">
                  <div className="flex items-center gap-1.5 px-4 py-2.5 border-b border-primary/10 bg-muted/20">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                    <span className="ml-2 font-mono text-xs text-muted-foreground">
                      {group.meta.icon} {group.meta.label}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="p-4 space-y-3">
                  {group.skills.map((skill, si) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0 }}
                      whileInView={{ opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.1 + si * 0.04 }}
                      onMouseEnter={() => setHoveredSkill(skill.id)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="font-mono text-sm"
                    >
                      <div className="flex items-center gap-3">
                        <span className={`w-28 shrink-0 transition-colors ${hoveredSkill === skill.id ? "text-primary" : "text-muted-foreground"}`}>
                          {skill.name}
                        </span>
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: "auto" }}
                          viewport={{ once: true }}
                        >
                          <AsciiBar level={skill.level} color={group.meta.color} />
                        </motion.div>
                        <span className="text-xs text-muted-foreground/40 ml-auto">{skill.level}%</span>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Also proficient */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <div className="font-mono text-xs text-muted-foreground mb-3">
            <span className="text-primary">#</span> also_installed:
          </div>
          <div className="flex flex-wrap gap-2">
            {[
              "Apache Kafka", "GCP", "Oracle Cloud", "Azure Data Factory",
              "Jetpack Compose", "Angular", "Ollama", "Cucumber", "JUnit",
              "Maven", "Gradle", "SLF4J", "Prometheus", "Micrometer",
            ].map((tag) => (
              <span key={tag} className="font-mono text-xs px-2 py-1 bg-primary/5 text-primary/60 border border-primary/10 rounded-sm hover:border-primary/30 hover:text-primary/80 transition-colors cursor-default">
                {tag}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
