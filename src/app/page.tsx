import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Skills } from "@/components/skills";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { prisma } from "@/lib/prisma";

const fallbackExperiences = [
  {
    id: "exp-1",
    company: "University of Southern California",
    role: "Research Assistant",
    location: "Los Angeles, CA",
    startDate: "June 2025",
    endDate: "August 2025",
    current: false,
    order: 1,
    bullets: [
      "Built a Java 17 distributed query engine on Apache Pekko Typed + Pekko Cluster/Remote, incorporating supervision strategies and backpressure for production-ready, fault-tolerant inter-node messaging.",
      "Designed operator components integrated with Gremlin, JanusGraph, and FoundationDB enabling parallel query execution with throughput of ~1M records/query.",
      "Achieved 30% lower query latency through dynamic actor discovery, JSON serialization, and full observability via Micrometer, Prometheus, and GitHub Actions.",
    ],
  },
  {
    id: "exp-2",
    company: "SAP Labs",
    role: "Developer Associate (T1, Grade 2)",
    location: "Bengaluru, KA",
    startDate: "May 2022",
    endDate: "December 2024",
    current: false,
    order: 2,
    bullets: [
      "Led development of the Journey Page in SAP SuccessFactors Onboarding, integrating task workflows with personalized UI leveraging Java, Spring, SAP UI5 and RESTful API.",
      "Established scalable microservices-based backend for the Dynamic Snack Layer and contributed to Configurable New Hire release (2023 H1) using Java and Spring Boot.",
      "Implemented automated testing with JUnit, Mockito, Cucumber, and Azure Data Factory (ADFv2), reducing customer incidents by ~10% through stronger QA coverage.",
    ],
  },
  {
    id: "exp-3",
    company: "Oracle",
    role: "Technical Analyst",
    location: "Bengaluru, KA",
    startDate: "January 2021",
    endDate: "May 2022",
    current: false,
    order: 3,
    bullets: [
      "Devised internal financial tools using Oracle APEX, PL/SQL, JavaScript, jQuery, and HTML/CSS, enabling UI-driven workflows for cost center and project management.",
      "Developed RBAC-based access provisioning and improved financial compliance tracking by 30%.",
      "Led OCI migration of GBF applications, optimizing complex SQL queries and ETL pipelines for data warehouse integration, improving reporting performance and scalability.",
    ],
  },
];

const fallbackProjects = [
  {
    id: "proj-1",
    title: "Distributed Query Engine",
    description:
      "Built a production-ready distributed query engine on Apache Pekko Typed + Pekko Cluster with fault-tolerant inter-node messaging and graph database integration.",
    tags: ["Java", "Apache Pekko", "JanusGraph", "FoundationDB", "Prometheus", "Docker"],
    highlights: [
      "~1M records/query throughput",
      "30% lower query latency",
      "Custom partitioning: Round-Robin, Hash, Range",
      "Full observability with Micrometer + Prometheus",
    ],
    category: "distributed",
    startDate: "June 2025",
    endDate: "August 2025",
    featured: true,
    githubUrl: null,
    order: 1,
  },
  {
    id: "proj-2",
    title: "Insurance Chatbot — LLM Fine-tuning",
    description:
      "Fine-tuned GPT-2-1.5B, Llama-3.8B and DeepseekR1-Qwen-7B on the InsuranceQA dataset using LoRA and PEFT methods, deployed via vLLM and Flask.",
    tags: ["Python", "Llama-3", "GPT-2", "LoRA", "PEFT", "vLLM", "GGUF", "Flask"],
    highlights: [
      "Perplexity of 1.42 on Llama-3",
      "8-bit quantization via LoRA",
      "GGUF format conversion for efficient inference",
      "Streamlit frontend for chatbot UI",
    ],
    category: "ml",
    startDate: "August 2025",
    endDate: "October 2025",
    featured: true,
    githubUrl: null,
    order: 2,
  },
  {
    id: "proj-3",
    title: "Capital One Fraud Detection",
    description:
      "Built an end-to-end ML fraud detection pipeline using ensemble methods, MLOps tooling, and containerized FastAPI deployment.",
    tags: ["Python", "XGBoost", "GBM", "Random Forest", "DVC", "Docker", "FastAPI", "MLOps"],
    highlights: [
      "0.91 F-Beta Score with Gradient Boosting",
      "Bootstrapped iterative under-sampling for imbalance",
      "DVC for ML pipeline versioning",
      "FastAPI + Docker deployment",
    ],
    category: "ml",
    startDate: "January 2025",
    endDate: "June 2025",
    featured: true,
    githubUrl: null,
    order: 3,
  },
  {
    id: "proj-4",
    title: "Multithreaded OS Kernel — Weenix",
    description:
      "Implemented core OS subsystems in C including kernel threads, scheduling, VFS, and demand-paged virtual memory on a 32-bit Unix environment.",
    tags: ["C", "Operating Systems", "VFS", "Virtual Memory", "Kernel", "Threading"],
    highlights: [
      "Non-preemptive kernel thread scheduler",
      "Mutex locks and run/sleep queue synchronization",
      "VFS with vnode management and reference counting",
      "Copy-on-write shadow objects for fork()",
    ],
    category: "systems",
    startDate: "January 2026",
    endDate: null,
    featured: true,
    githubUrl: null,
    order: 4,
  },
];

const fallbackSkills = [
  { id: "sk-1", name: "Java", category: "language", level: 95 },
  { id: "sk-2", name: "Python", category: "language", level: 90 },
  { id: "sk-3", name: "JavaScript", category: "language", level: 88 },
  { id: "sk-4", name: "TypeScript", category: "language", level: 82 },
  { id: "sk-5", name: "C / C++", category: "language", level: 80 },
  { id: "sk-6", name: "PL/SQL", category: "language", level: 78 },
  { id: "sk-7", name: "PostgreSQL", category: "database", level: 85 },
  { id: "sk-8", name: "MongoDB", category: "database", level: 80 },
  { id: "sk-9", name: "MySQL", category: "database", level: 82 },
  { id: "sk-10", name: "FoundationDB", category: "database", level: 75 },
  { id: "sk-11", name: "Oracle DB 19c", category: "database", level: 80 },
  { id: "sk-12", name: "React / Next.js", category: "web", level: 85 },
  { id: "sk-13", name: "Node.js", category: "web", level: 83 },
  { id: "sk-14", name: "Spring Boot", category: "web", level: 90 },
  { id: "sk-15", name: "Docker", category: "web", level: 82 },
  { id: "sk-16", name: "REST APIs", category: "web", level: 92 },
  { id: "sk-17", name: "PyTorch", category: "ml", level: 85 },
  { id: "sk-18", name: "TensorFlow", category: "ml", level: 80 },
  { id: "sk-19", name: "Scikit-learn", category: "ml", level: 88 },
  { id: "sk-20", name: "LLM Fine-tuning", category: "ml", level: 82 },
  { id: "sk-21", name: "Pandas / NumPy", category: "ml", level: 88 },
];

async function getData() {
  try {
    const [experiences, projects, skills] = await Promise.all([
      prisma.experience.findMany({ orderBy: { order: "asc" } }),
      prisma.project.findMany({ orderBy: { order: "asc" } }),
      prisma.skill.findMany({ orderBy: { category: "asc" } }),
    ]);
    if (experiences.length === 0) throw new Error("empty");
    return { experiences, projects, skills };
  } catch {
    return {
      experiences: fallbackExperiences,
      projects: fallbackProjects,
      skills: fallbackSkills,
    };
  }
}

export default async function Home() {
  const { experiences, projects, skills } = await getData();

  return (
    <main className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <Skills skills={skills} />
      <Contact />
      <Footer />
    </main>
  );
}
