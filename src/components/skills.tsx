"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { useState } from "react";

type Skill = {
  id: string;
  name: string;
  category: string;
  level: number;
};

const categoryMeta: Record<string, { label: string; color: string; emoji: string }> = {
  language: { label: "Languages", color: "bg-blue-500", emoji: "⌨️" },
  database: { label: "Databases", color: "bg-green-500", emoji: "🗄️" },
  web: { label: "Web & DevOps", color: "bg-purple-500", emoji: "🌐" },
  ml: { label: "ML / AI", color: "bg-orange-500", emoji: "🧠" },
};

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
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">Toolkit</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            A broad, deep stack across backend, data engineering, and applied ML.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {grouped.map((group, gi) => (
            <motion.div
              key={group.key}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: gi * 0.1 }}
            >
              <Card className="glass-card h-full hover:border-primary/50 transition-colors">
                <CardHeader className="pb-4">
                  <CardTitle className="text-base flex items-center gap-2">
                    <span>{group.meta.emoji}</span>
                    {group.meta.label}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {group.skills.map((skill, si) => (
                    <motion.div
                      key={skill.id}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: gi * 0.1 + si * 0.05 }}
                      onMouseEnter={() => setHoveredSkill(skill.id)}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="cursor-default"
                    >
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium">{skill.name}</span>
                        <motion.span
                          className="text-xs text-muted-foreground tabular-nums"
                          animate={{ opacity: hoveredSkill === skill.id ? 1 : 0.5 }}
                        >
                          {skill.level}%
                        </motion.span>
                      </div>
                      <div className="relative h-1.5 bg-muted rounded-full overflow-hidden">
                        <motion.div
                          className={`absolute left-0 top-0 h-full rounded-full ${group.meta.color}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.8, delay: gi * 0.1 + si * 0.05, ease: "easeOut" }}
                        />
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* All skills tag cloud */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-10 text-center"
        >
          <p className="text-xs text-muted-foreground uppercase tracking-wide mb-4">Also proficient in</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "Apache Kafka", "GCP", "Oracle Cloud", "Azure Data Factory",
              "Jetpack Compose", "Angular", "Ollama", "Cucumber", "JUnit",
              "Maven", "Gradle", "SLF4J", "Prometheus", "Micrometer",
            ].map((tag) => (
              <Badge key={tag} variant="outline" className="text-xs hover:bg-accent transition-colors cursor-default">
                {tag}
              </Badge>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
