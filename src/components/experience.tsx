"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, CheckCircle2 } from "lucide-react";

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
  "University of Southern California": "from-yellow-500 to-orange-500",
  "SAP Labs": "from-blue-500 to-cyan-500",
  Oracle: "from-red-500 to-orange-500",
};

export function Experience({ experiences }: { experiences: Experience[] }) {
  return (
    <section id="experience" className="section-padding">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">Career</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Experience</h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            From enterprise SaaS at SAP to financial tools at Oracle to academic research at USC.
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border/60 md:-translate-x-px" />

          <div className="space-y-10">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className={`relative flex flex-col md:flex-row gap-4 ${
                  i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Timeline dot */}
                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary border-2 border-background -translate-x-1.5 md:-translate-x-1.5 mt-6 z-10" />

                {/* Spacer */}
                <div className="hidden md:block md:w-1/2" />

                {/* Card */}
                <div className="pl-10 md:pl-0 md:w-1/2 md:px-6">
                  <Card className="glass-card hover:border-primary/50 transition-all hover:shadow-lg hover:shadow-primary/5">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-3 gap-2 flex-wrap">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <Building2 className="h-4 w-4 text-primary shrink-0" />
                            <span
                              className={`font-bold text-sm bg-gradient-to-r ${
                                companyColors[exp.company] ?? "from-primary to-blue-400"
                              } bg-clip-text text-transparent`}
                            >
                              {exp.company}
                            </span>
                          </div>
                          <h3 className="font-semibold text-base">{exp.role}</h3>
                          <p className="text-xs text-muted-foreground">{exp.location}</p>
                        </div>
                        <div className="text-right shrink-0">
                          <Badge variant={exp.current ? "default" : "secondary"} className="text-xs">
                            {exp.current ? "Current" : exp.endDate}
                          </Badge>
                          <p className="text-xs text-muted-foreground mt-1">{exp.startDate}</p>
                        </div>
                      </div>

                      <ul className="space-y-2">
                        {exp.bullets.map((bullet, bi) => (
                          <li key={bi} className="flex gap-2 text-sm text-muted-foreground">
                            <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                            <span>{bullet}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
