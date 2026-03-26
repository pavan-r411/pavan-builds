"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Briefcase, Code2, Brain } from "lucide-react";

const stats = [
  { label: "Years Experience", value: "3+", icon: Briefcase },
  { label: "GPA at USC", value: "4.0", icon: GraduationCap },
  { label: "Projects Built", value: "10+", icon: Code2 },
  { label: "ML Models Fine-tuned", value: "3", icon: Brain },
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
    <section id="about" className="section-padding bg-muted/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <Badge variant="outline" className="mb-4">About Me</Badge>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Who I Am</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            A full-stack and ML engineer with a deep interest in distributed systems and applied
            AI — currently pursuing my Master&apos;s at USC while building things that scale.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
            >
              <Card className="glass-card text-center p-6 hover:border-primary/50 transition-colors">
                <CardContent className="p-0">
                  <stat.icon className="h-6 w-6 text-primary mx-auto mb-2" />
                  <div className="text-3xl font-bold gradient-text mb-1">{stat.value}</div>
                  <div className="text-xs text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Education */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <GraduationCap className="h-6 w-6 text-primary" />
            Education
          </h3>
          <div className="grid md:grid-cols-2 gap-4">
            {education.map((edu, i) => (
              <motion.div
                key={edu.school}
                initial={{ opacity: 0, x: i === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="glass-card h-full hover:border-primary/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-2 flex-wrap gap-2">
                      <h4 className="font-semibold text-sm leading-tight max-w-[70%]">{edu.school}</h4>
                      <Badge variant="secondary" className="text-xs shrink-0">{edu.period}</Badge>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3">{edu.degree}</p>
                    {edu.gpa && (
                      <div className="flex items-center gap-2 mb-3">
                        <span className="text-xs text-muted-foreground">GPA:</span>
                        <span className="text-sm font-bold gradient-text">{edu.gpa}</span>
                      </div>
                    )}
                    {edu.courses.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {edu.courses.map((c) => (
                          <Badge key={c} variant="outline" className="text-xs">{c}</Badge>
                        ))}
                      </div>
                    )}
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
