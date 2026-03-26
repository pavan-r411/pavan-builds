"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const stats = [
  { label: "years_experience", value: "3+", comment: "# SAP + Oracle" },
  { label: "gpa", value: "4.0", comment: "# USC MS CS" },
  { label: "projects_built", value: "10+", comment: "# and counting" },
  { label: "llm_models_tuned", value: "3", comment: "# Llama, GPT-2, Deepseek" },
];

const education = [
  {
    school: "University of Southern California",
    degree: "Masters in Computer Science",
    period: "Dec 2026",
    gpa: "4.0 / 4.0",
    courses: ["Analysis of Algorithms", "Web Technologies", "Machine Learning", "Database Systems"],
  },
  {
    school: "University of Visvesvaraya College of Engineering",
    degree: "Bachelor of Engineering in Computer Science",
    period: "Aug 2017 – Jul 2021",
    gpa: null,
    courses: [],
  },
];

export function About() {
  return (
    <section id="about" className="section-padding bg-muted/20">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-mono text-sm text-muted-foreground mb-2">
            <span className="text-primary">$</span> cat about.txt
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            <span className="gradient-text font-mono">whoami</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl font-mono text-sm leading-relaxed">
            <span className="text-primary"># </span>
            Full-stack and ML engineer. Deep interest in distributed systems and applied AI.
            Currently pursuing MS at USC while building things that scale.
          </p>
        </motion.div>

        {/* Stats — terminal variable style */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-16 font-mono">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-primary/15 rounded-sm px-4 py-3 flex items-center gap-3 hover:border-primary/40 transition-colors"
            >
              <span className="text-primary/60">export</span>
              <span className="text-pink-300">{stat.label}</span>
              <span className="text-muted-foreground">=</span>
              <span className="text-primary font-bold text-lg">{stat.value}</span>
              <span className="text-muted-foreground/50 text-xs ml-auto">{stat.comment}</span>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <div className="font-mono text-sm text-muted-foreground mb-4">
            <span className="text-primary">$</span> cat education.log
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {education.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="terminal-card h-full hover:border-primary/40 transition-colors">
                  <CardContent className="p-5">
                    {/* Terminal chrome */}
                    <div className="flex items-center gap-1.5 mb-3 pb-2 border-b border-primary/10">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                      <span className="ml-2 text-xs text-muted-foreground">education.log</span>
                    </div>
                    <div className="space-y-1 text-sm">
                      <div className="text-primary/60 text-xs"># {edu.period}</div>
                      <div className="text-pink-300 font-semibold">{edu.school}</div>
                      <div className="text-muted-foreground">{edu.degree}</div>
                      {edu.gpa && (
                        <div className="text-xs mt-2">
                          <span className="text-primary/60">GPA </span>
                          <span className="text-primary font-bold">{edu.gpa}</span>
                        </div>
                      )}
                      {edu.courses.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 mt-3">
                          {edu.courses.map((c) => (
                            <span key={c} className="text-xs px-2 py-0.5 bg-primary/10 text-primary border border-primary/20 rounded-sm">
                              {c}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
