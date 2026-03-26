"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

type Experience = {
  id: string;
  company: string;
  role: string;
  location: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  bullets: string[];
  order: number;
};

const companyColors: Record<string, string> = {
  "University of Southern California": "text-amber-600",
  "SAP Labs": "text-zinc-700",
  Oracle: "text-red-600",
};

export function Experience({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="font-mono text-sm text-muted-foreground mb-2">
            <span className="text-primary">$</span> cat /proc/experience
          </div>
          <h2 className="text-3xl md:text-4xl font-bold font-mono gradient-text">experience</h2>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-0 md:left-6 top-0 bottom-0 w-px bg-primary/20" />

          <div className="space-y-8 pl-6 md:pl-16">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="relative"
              >
                {/* Timeline dot */}
                <div className="absolute -left-[1.85rem] md:-left-[2.65rem] top-5 w-3 h-3 rounded-full bg-primary border-2 border-background shadow-[0_0_8px] shadow-primary/50" />

                <Card className="terminal-card hover:border-primary/40 transition-all hover:shadow-lg hover:shadow-primary/5">
                  <CardContent className="p-5">
                    {/* Terminal chrome */}
                    <div className="flex items-center gap-1.5 mb-4 pb-2 border-b border-primary/10">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/70" />
                      <span className="w-2.5 h-2.5 rounded-full bg-primary/70" />
                      <span className="ml-2 font-mono text-xs text-muted-foreground">
                        {exp.company.toLowerCase().replace(/\s+/g, "-")}.log
                      </span>
                      <span className="ml-auto font-mono text-xs text-primary/50">
                        {exp.startDate} → {exp.current ? "present" : exp.endDate}
                      </span>
                    </div>

                    <div className="font-mono mb-3">
                      <div className={`font-bold text-base ${companyColors[exp.company] ?? "text-primary"}`}>
                        {exp.company}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        <span className="text-primary/60">role: </span>{exp.role}
                      </div>
                      <div className="text-xs text-muted-foreground/60">
                        <span className="text-primary/40">loc:  </span>{exp.location}
                      </div>
                    </div>

                    <ul className="space-y-2 font-mono text-sm">
                      {exp.bullets.map((bullet, bi) => (
                        <li key={bi} className="flex gap-2 text-muted-foreground">
                          <span className="text-primary shrink-0 mt-0.5">▸</span>
                          <span>{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
