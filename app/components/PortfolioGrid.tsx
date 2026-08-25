"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon, GithubIcon, LinkedinIcon, MailIcon } from "./icons";

const projects = [
  {
    name: "MedSimAI",
    blurb: "Built an evaluation platform for LLM-based simulated-patient agents, helping dental schools assess and improve AI patient interactions.",
    role: "Software Engineer",
    date: "Summer 2026",
    bullets: [
      "Architected a full-stack evaluation platform with an editable rubric engine, LLM-as-judge grading pipeline, and dashboards covering 160+ rules and 15+ cases.",
      "Built a System Prompt Lab that analyzes failed evaluation evidence and generates AI-assisted prompt revisions, improving rule pass rates by 20–30% before deployment.",
      "Developed a context-injection pipeline that feeds previous patient activity into AI conversations through configurable system-prompt options and ElevenLabs dynamic variables.",
      "Refactored patient notes into an independent learning module, separating the API, UI, and grading logic.",
      "Worked directly with dental-school clients to translate educational requirements into product features.",
    ],
  },
  {
    name: "QuickFi",
    role: "AI Engineer",
    date: "Spring 2026",
    blurb: "Built AI agents for automated credit analysis, combining document processing, validation, and LLM-based risk assessment.",
    bullets: ["Developed an AI credit-analysis agent that processes financial documents and generates risk assessments using LLMs.",
      "Built a validation agent that compares application data against credit records using weighted scoring.",
      "Designed a document-ingestion pipeline to extract and normalize financial information for downstream AI analysis.",
    ],
  },
  {
    name: "Medlaunch Concepts",
    role: "Software QA Intern",
    date: "Spring 2026",
    blurb: "Built automated testing workflows for healthcare software and contributed to quality assurance for a nationwide hospital accreditation program.",
    bullets: ["Created automated Selenium test suites for web applications and REST APIs.",
      "Designed and executed test plans covering critical healthcare accreditation workflows.",
      "Collaborated with engineers in an agile environment to identify and resolve bugs."
    ],
  },
  {
    name: "Project Access",
    role: "Full Stack Developer",
    date: "Mar. 2025 - Mar. 2026",
    blurb: "Built and scaled an internal platform used by 1,000+ users across 40+ countries, supporting essay review, mentorship, networking, and college-application workflows.",
    bullets: ["Developed a React/TypeScript frontend with responsive Tailwind CSS and a Django REST backend.",
      "Built 10+ reusable React components and 20+ REST API endpoints supporting core platform workflows.",
      "Optimized backend queries and asset loading, resulting in 33% faster average platform load times.",
      "Built features for user profiles, submissions, deadlines, dynamic forms, mentorship matching, and internal networking."
    ],
  },
  {
    name: "RemNeuro",
    role: "Software Engineer",
    date: "Fall 2025",
    blurb: "Developed a clinician-facing monitoring platform for patient biometric data and real-time physiological monitoring.",
    bullets: ["Designed secure authentication and role-based access for sensitive patient data.",
      "Implemented real-time anomaly detection for physiological signals from wearable devices.",
      "Standardized data across 10+ monitoring modules for downstream AI pipelines."
    ],
  },
];

const tileTransition = { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const };
const EMAIL = "rxz4@cornell.edu";

export default function PortfolioGrid() {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  function handleEmailClick() {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-3 md:grid md:grid-cols-2 md:gap-4">
      {/* Hi tile */}
      <motion.div
        layout
        transition={tileTransition}
        className={`bg-pink p-6 md:p-8 flex flex-col justify-center min-h-[220px] ${
          expanded ? "md:col-start-1 md:row-start-2" : "md:col-start-1 md:row-start-1"
        }`}
      >
        <p className="text-5xl md:text-5xl font-bold text-green leading-tight">Hi,</p>
        <p className="text-5xl md:text-5xl font-bold text-green leading-tight">
          I&apos;m Rinah!
        </p>
      </motion.div>

      {/* Experience tile */}
      <motion.div
        layout
        transition={tileTransition}
        onClick={() => !expanded && setExpanded(true)}
        className={`bg-green p-6 md:p-8 min-h-[220px] ${
          expanded
            ? "md:col-span-2 md:row-start-1"
            : "md:col-start-2 md:row-start-1 cursor-pointer hover:brightness-110 transition"
        }`}
      >
        <div className="flex items-start justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-on-green leading-snug text-pink">
            Experience and Projects
          </h2>
          {expanded && (
            <button
              type="button"
              aria-label="Collapse"
              onClick={(e) => {
                e.stopPropagation();
                setExpanded(false);
              }}
              className="shrink-0 rounded-full p-1.5 text-on-green hover:bg-white/10 text-pink"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {!expanded ? (
            <motion.ol
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-3 space-y-1 text-on-green text-pink"
            >
              {projects.map((p, i) => (
                <li key={p.name}>
                  {i + 1}) {p.name}
                </li>
              ))}
            </motion.ol>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="mt-4 grid gap-4 sm:grid-cols-2"
            >
              {projects.map((p) => (
                <div key={p.name} className="rounded-xl bg-white/10 p-4">
                  <h3 className="font-semibold text-on-green text-pink">{p.name}</h3>
                  <p className="mt-1 text-sm text-on-green/70 text-pink">{p.role} • {p.date}</p>
                  <p className="mt-1 text-sm text-on-green/70 text-pink">{p.blurb}</p>
                  <ul className="mt-2 space-y-1 text-sm italic text-on-green/70 text-pink list-disc pl-4">
                    {p.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {!expanded && (
          <p className="mt-4 text-sm text-on-green/70 text-pink">Click to see more →</p>
        )}
      </motion.div>

      {/* About tile */}
      <motion.div
        layout
        transition={tileTransition}
        className={`bg-pink p-6 md:p-8 min-h-[220px] flex flex-col md:flex-row md:items-center gap-5 ${
          expanded ? "md:col-start-2 md:row-start-2" : "md:col-start-1 md:row-start-2"
        }`}
      >
        <div className="flex-1">
          <h2 className="text-2xl md:text-3xl font-bold text-green">About me</h2>
          <p className="mt-2 text-sm md:text-base text-green/90 leading-relaxed">
            Hi, I&apos;m Rinah, a junior Computer Science and AI student at Cornell
            University! I enjoy building systems across software and AI, from data and
            models to the applications that put them to work. When I&apos;m not coding
            I&apos;m crafting, from jewelry to clay!
          </p>
        </div>
        <div className="relative h-40 w-full shrink-0 overflow-hidden md:h-40 md:w-32">
          <Image
            src="/images/rinah.jpg"
            alt="Rinah"
            fill
            sizes="(min-width: 768px) 128px, 100vw"
            className="object-cover"
          />
        </div>
      </motion.div>

      {/* Connect tile */}
      <motion.div
        layout
        transition={tileTransition}
        className={`bg-pink p-6 md:p-8 min-h-[220px] flex flex-col justify-center ${
          expanded ? "md:col-span-2 md:row-start-3" : "md:col-start-2 md:row-start-2"
        }`}
      >
        <h2 className="text-2xl md:text-3xl font-bold text-green">Let&apos;s Connect!</h2>
        <div className="mt-3 flex gap-4 text-green">
          <div className="relative">
            <a
              href={`mailto:${EMAIL}`}
              onClick={handleEmailClick}
              aria-label="Email"
              className="block rounded-full p-1 hover:bg-green/10 transition"
            >
              <MailIcon className="h-7 w-7" />
            </a>
            <AnimatePresence>
              {copied && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.15 }}
                  className="absolute left-1/2 -top-8 -translate-x-1/2 whitespace-nowrap rounded-md bg-green px-2 py-1 text-xs text-pink"
                >
                  Copied email!
                </motion.span>
              )}
            </AnimatePresence>
          </div>
          <a
            href="https://github.com/rinahz"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="rounded-full p-1 hover:bg-green/10 transition"
          >
            <GithubIcon className="h-7 w-7" />
          </a>
          <a
            href="https://www.linkedin.com/in/rinah-zhang"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="rounded-full p-1 hover:bg-green/10 transition"
          >
            <LinkedinIcon className="h-7 w-7" />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
