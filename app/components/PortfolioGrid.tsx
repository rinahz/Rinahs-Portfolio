"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { CloseIcon, GithubIcon, LinkedinIcon, MailIcon } from "./icons";


const experience = [
  {
    name: "MedSimAI",
    blurb: "Built an evaluation platform for LLM-based simulated-patient agents, helping dental schools assess and improve AI patient interactions.",
    role: "Software Engineer",
    date: "Summer 2026",
    tech: "LLM eval · ElevenLabs",
    stack: ["Next.js", "TypeScript", "LLM-as-judge", "ElevenLabs", "OpenAI API"],
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
    tech: "AI agents · LLMs",
    stack: ["Python", "LLMs", "Document ingestion"],
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
    tech: "Selenium · REST",
    stack: ["Selenium", "REST APIs", "Agile"],
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
    tech: "React · Django",
    stack: ["React", "TypeScript", "Django REST", "Tailwind"],
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
    tech: "Real-time · Auth",
    stack: ["Auth / RBAC", "Anomaly detection", "Wearables"],
    blurb: "Developed a clinician-facing monitoring platform for patient biometric data and real-time physiological monitoring.",
    bullets: ["Designed secure authentication and role-based access for sensitive patient data.",
      "Implemented real-time anomaly detection for physiological signals from wearable devices.",
      "Standardized data across 10+ monitoring modules for downstream AI pipelines."
    ],
  },
];

const projects = [
  {
    name: "AI Credit Analysis Agent",
    date: "Spring 2026",
    tech: "Python · LLMs",
    stack: ["Python", "LLMs", "Document parsing"],
    blurb: "This project is an AI agent that automates the credit analysis process by processing financial documents and generating risk assessments using LLMs. The agent is designed to streamline the credit evaluation workflow, providing accurate and efficient assessments for financial institutions.",
    live: "#",
    code: "https://github.com/laurenp-2/quickfi-credit-analysis",
    screenshot: "/images/credit-analysis-agent.png",
  },
  {
    name: "CamlType",
    date: "Fall 2025",
    tech: "OCaml",
    stack: ["OCaml"],
    blurb: "CamlType is a typing game built in Ocaml, that allows users to practice and challenge their typing skills in multiple different modes. As users type out words as quickly and precisely as possible, they will receive real time feedback on thier accuracy as well as an overall accuracy and words per minute (WPM) score at the end of their trial.",
    live: "#",
    code: "https://github.com/rinahz/CamlType",
    screenshot: "/images/camltype.png",
  },
  {
    name: "Senior Care Dashboard",
    date: "Fall 2025",
    tech: "React · Firebase",
    stack: ["React", "Firebase"],
    blurb: "SeniorCare Dashboard is a web application that allows caregivers to monitor and manage the health and well-being of their senior patients. The dashboard provides real-time updates on vital signs, medication schedules, and appointment reminders, helping caregivers provide better care and support for their patients.",
    live: "#",
    code: "#",
    screenshot: "/images/senior-care-dashboard.png",
  },
  {
    name: "SavorStats",
    date: "Fall 2024",
    tech: "Full stack",
    stack: ["React", "Node.js", "PostgreSQL"],
    blurb: "SavorStats is a social media site for foodies! You can upload your latest cooking adventures, see what your friends are making, and discover great recipes for your next dish. Whether you're looking for inspiration to cook at home or want to brag about your latest soufflé, SavorStats provides a platform for all food-related interests.",
    live: "#",
    code: "https://github.com/laurenp-2/savorstats",
    screenshot: "/images/savorstats.png",
  },
];

const tileTransition = { duration: 0.5, ease: [0.4, 0, 0.2, 1] as const };
const EMAIL = "rxz4@cornell.edu";

type ExpandedKey = "experience" | "about" | "projects" | null;

const OTHER_ORDER: Exclude<ExpandedKey, null>[] = ["experience", "projects", "about"];

const DEFAULT_POSITION: Record<Exclude<ExpandedKey, null>, string> = {
  experience: "md:col-start-2 md:row-start-1",
  projects: "md:col-start-1 md:row-start-2",
  about: "md:col-start-2 md:row-start-2",
};

function getTileClasses(tile: Exclude<ExpandedKey, null>, expandedKey: ExpandedKey) {
  if (!expandedKey) return DEFAULT_POSITION[tile];
  if (expandedKey === tile) return "md:col-span-2 md:row-start-1";

  const others = OTHER_ORDER.filter((t) => t !== expandedKey);
  const isFirstOther = others[0] === tile;
  return isFirstOther ? "md:col-start-2 md:row-start-2" : "md:col-span-2 md:row-start-3";
}

export default function PortfolioGrid() {
  const [expandedKey, setExpandedKey] = useState<ExpandedKey>(null);
  const [copied, setCopied] = useState(false);

  function handleEmailClick() {
    navigator.clipboard?.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  }

  function handleTileKeyDown(tile: Exclude<ExpandedKey, null>) {
    return (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        if (expandedKey !== tile) setExpandedKey(tile);
      }
      if (e.key === "Escape") setExpandedKey(null);
    };
  }

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-3 md:grid md:grid-cols-2 md:gap-4">
      {/* Hi tile */}
      <motion.div
        layout
        transition={tileTransition}
        className={`bg-pink p-6 md:p-8 flex flex-col justify-center min-h-[220px] ${
          expandedKey ? "md:col-start-1 md:row-start-2" : "md:col-start-1 md:row-start-1"
        }`}
      >
        <p className="text-5xl md:text-5xl font-bold text-green leading-tight">Hi,</p>
        <p className="text-5xl md:text-5xl font-bold text-green leading-tight">
          I&apos;m Rinah!
        </p>
        {/* <p className="mt-3.5 max-w-[34ch] text-base leading-relaxed text-green/90">
          Junior in Computer Science &amp; AI at Cornell. I build full-stack systems and
          the AI that runs inside them.
        </p> */}
        {/* <div className="mt-3.5 flex items-center gap-2 text-xs font-medium text-green">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-green" />
          <span>Now — Software Engineer at MedSimAI</span>
        </div> */}

        <div className="mt-7 flex flex-wrap items-center gap-4">
          <a
            href="https://drive.google.com/file/d/1kzi3x_4BsTC7ZpDqe4CsEBqJE0iIIWX6/view?usp=sharing"
            className="inline-flex items-center gap-2 bg-green px-5 py-2.5 text-sm font-semibold text-pink hover:bg-green-dark transition"
          >
            <span>Résumé</span>
          </a>
          <div className="flex gap-2 text-green">
            <div className="relative">
              <a
                href={`mailto:${EMAIL}`}
                onClick={handleEmailClick}
                aria-label="Email"
                className="block rounded-full p-1 hover:bg-green/10 transition"
              >
                <MailIcon className="h-6 w-6" />
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
              <GithubIcon className="h-6 w-6" />
            </a>
            <a
              href="https://www.linkedin.com/in/rinah-zhang"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="rounded-full p-1 hover:bg-green/10 transition"
            >
              <LinkedinIcon className="h-6 w-6" />
            </a>
          </div>
        </div>
      </motion.div>

      {/* Experience tile */}
      <motion.div
        layout
        transition={tileTransition}
        role="button"
        tabIndex={0}
        onClick={() => expandedKey !== "experience" && setExpandedKey("experience")}
        onKeyDown={handleTileKeyDown("experience")}
        className={`bg-green p-6 md:p-8 min-h-[220px] ${getTileClasses("experience", expandedKey)} ${
          expandedKey === "experience" ? "" : "cursor-pointer hover:brightness-110 transition"
        }`}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-on-green leading-snug text-pink">
            Experience
          </h2>
          {expandedKey !== "experience" && (
            <span className="text-xs font-medium uppercase tracking-wide text-pink">
              {experience.length} roles
            </span>
          )}
          {expandedKey === "experience" && (
            <button
              type="button"
              aria-label="Collapse"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedKey(null);
              }}
              className="shrink-0 rounded-full p-1.5 text-on-green hover:bg-white/10 text-pink"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {expandedKey !== "experience" ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 flex flex-col divide-y divide-pink/25"
            >
              {experience.map((p) => (
                <div
                  key={p.name}
                  className="grid grid-cols-[1fr_auto] gap-x-3.5 gap-y-0.5 py-2.5 hover:bg-white/5 transition"
                >
                  <span className="text-base font-semibold text-pink">{p.name}</span>
                  <span className="whitespace-nowrap text-right text-xs text-pink/90">{p.date}</span>
                  <span className="text-sm text-pink">{p.role}</span>
                  <span className="whitespace-nowrap text-right text-xs text-pink/90">{p.tech}</span>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="mt-4 grid gap-4 sm:grid-cols-2"
            >
              {experience.map((p) => (
                <div key={p.name} className="bg-white/10 p-4.5">
                  <div className="flex items-baseline justify-between gap-2.5">
                    <h3 className="font-semibold text-on-green text-pink">{p.name}</h3>
                    <span className="whitespace-nowrap text-xs text-pink/90">{p.date}</span>
                  </div>
                  <p className="mt-0.5 text-sm text-on-green/70 text-pink">{p.role}</p>
                  <p className="mt-2.5 text-sm leading-relaxed text-on-green/70 text-pink">{p.blurb}</p>
                  <ul className="mt-2.5 space-y-1 pl-4 text-sm leading-relaxed text-on-green/70 text-pink list-disc">
                    {p.bullets.map((bullet, i) => (
                      <li key={i}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((tag) => (
                      <span key={tag} className="bg-white/15 px-2 py-1 text-xs font-medium text-pink">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {expandedKey !== "experience" && (
          <p className="mt-4 text-sm font-medium text-pink">Open for what I actually built →</p>
        )}
      </motion.div>

      {/* About tile */}
      <motion.div
        layout
        transition={tileTransition}
        role="button"
        tabIndex={0}
        onClick={() => expandedKey !== "about" && setExpandedKey("about")}
        onKeyDown={handleTileKeyDown("about")}
        className={`bg-pink p-6 md:p-8 min-h-[220px] flex flex-col md:flex-row gap-5 ${
          expandedKey === "about" ? "md:items-start" : "md:items-center"
        } ${getTileClasses("about", expandedKey)} ${
          expandedKey === "about" ? "" : "cursor-pointer hover:brightness-110 transition"
        }`}
      >
        <div className="flex-1">
          <div className="flex items-start justify-between gap-4">
            <h2 className="text-2xl md:text-3xl font-bold text-green">About me</h2>
            {expandedKey === "about" && (
              <button
                type="button"
                aria-label="Collapse"
                onClick={(e) => {
                  e.stopPropagation();
                  setExpandedKey(null);
                }}
                className="shrink-0 rounded-full p-1.5 text-green hover:bg-green/10"
              >
                <CloseIcon className="h-5 w-5" />
              </button>
            )}
          </div>
          <p className="mt-2 text-sm md:text-base text-green/90 leading-relaxed">
            Hi, I&apos;m Rinah, a junior studying Computer Science at Cornell, focused on AI.
            I like working across the whole stack of a system: the data and models underneath,
            and the interfaces that put them in front of real people.
            Recently that&apos;s meant building LLM evaluation pipelines for simulated-patient training,
            an AI-driven credit risk agent, and full-stack platforms used by thousands of people across dozens of countries.
          </p>
          {expandedKey !== "about" && (
            <p className="mt-4 text-sm font-medium text-green">Open for skills and tools →</p>
          )}

          {expandedKey === "about" && (
            <div className="mt-5">
              <p className="text-sm md:text-base text-green/90 leading-relaxed">
                I&apos;m always looking for the next system to build or contribute too.
                Especially ones that use AI in meaningful ways to help people. If you have
                an opportunity, project, or just want to chat, feel free to reach out!
              </p>
              <h3 className="mt-5 text-lg md:text-xl font-semibold text-green">Skills</h3>
              <div className="mt-2 space-y-3 text-sm md:text-base">
                <div>
                  <p className="font-medium text-green">Programming Languages</p>
                  <p className="mt-1 text-green/80">
                    Python, Java, TypeScript, JavaScript, OCaml, C
                  </p>
                </div>
                <div>
                  <p className="font-medium text-green">Frameworks &amp; Technologies</p>
                  <p className="mt-1 text-green/80">
                    React.js, Next.js, Node.js, Django, Firebase, PostgreSQL, NumPy, Pandas, PyTorch, Tensorflow, ROS, Tailwind CSS, OpenAI API, Selenium, Git, Github
                  </p>
                </div>
              </div>
            </div>
          )}
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

      {/* Projects tile */}
      <motion.div
        layout
        transition={tileTransition}
        role="button"
        tabIndex={0}
        onClick={() => expandedKey !== "projects" && setExpandedKey("projects")}
        onKeyDown={handleTileKeyDown("projects")}
        className={`bg-pink p-6 md:p-8 min-h-[220px] ${getTileClasses("projects", expandedKey)} ${
          expandedKey === "projects" ? "" : "cursor-pointer hover:brightness-110 transition"
        }`}
      >
        <div className="flex items-baseline justify-between gap-4">
          <h2 className="text-2xl md:text-3xl font-bold text-on-pink leading-snug text-green">
            Projects
          </h2>
          {expandedKey !== "projects" && (
            <span className="text-xs font-medium uppercase tracking-wide text-green/90">
              {projects.length} builds
            </span>
          )}
          {expandedKey === "projects" && (
            <button
              type="button"
              aria-label="Collapse"
              onClick={(e) => {
                e.stopPropagation();
                setExpandedKey(null);
              }}
              className="shrink-0 rounded-full p-1.5 text-on-pink hover:bg-white/10 text-green"
            >
              <CloseIcon className="h-5 w-5" />
            </button>
          )}
        </div>

        <AnimatePresence mode="wait" initial={false}>
          {expandedKey !== "projects" ? (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="mt-4 flex flex-col divide-y divide-green/20"
            >
              {projects.map((p, i) => (
                <div
                  key={`${p.name}-${i}`}
                  className="flex items-center gap-3.5 py-2.5 hover:bg-white/25 transition"
                >
                  <div className="relative aspect-[16/9] w-[70px] shrink-0 overflow-hidden bg-[repeating-linear-gradient(135deg,rgba(56,134,89,0.16)_0_4px,rgba(56,134,89,0.06)_4px_8px)]">
                    {p.screenshot ? (
                      <Image src={p.screenshot} alt="" fill sizes="70px" className="object-cover" />
                    ) : (
                      <span className="flex h-full items-center justify-center font-mono text-[8px] tracking-wide text-green/75">
                        screenshot
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-baseline justify-between gap-3">
                      <span className="text-base font-semibold text-green">{p.name}</span>
                      <span className="whitespace-nowrap text-xs text-green/90">{p.date}</span>
                    </div>
                    <span className="mt-0.5 block text-xs text-green/90">{p.tech}</span>
                  </div>
                </div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              key="expanded"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25, delay: 0.1 }}
              className="mt-4 grid gap-4 sm:grid-cols-2"
            >
              {projects.map((p, i) => (
                <div key={`${p.name}-${i}`} className="bg-white/30 p-4.5">
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-[repeating-linear-gradient(135deg,rgba(56,134,89,0.16)_0_5px,rgba(56,134,89,0.05)_5px_10px)]">
                    {p.screenshot ? (
                      <Image
                        src={p.screenshot}
                        alt={`${p.name} screenshot`}
                        fill
                        sizes="(min-width: 768px) 480px, 100vw"
                        className="object-cover"
                      />
                    ) : (
                      <span className="flex h-full items-center justify-center font-mono text-[10.5px] tracking-wide text-green">
                        project screenshot
                      </span>
                    )}
                  </div>
                  <div className="mt-3.5 flex items-baseline justify-between gap-2.5">
                    <h3 className="font-semibold text-green">{p.name}</h3>
                    <span className="whitespace-nowrap text-xs text-green/90">{p.date}</span>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-green/90">{p.blurb}</p>
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.stack.map((tag) => (
                      <span key={tag} className="bg-green/10 px-2 py-1 text-xs font-medium text-green">
                        {tag}
                      </span>
                    ))}
                  </div>
                  {(p.live !== "#" || p.code !== "#") && (
                    <div className="mt-3.5 flex gap-4">
                      {p.live !== "#" && (
                        <a
                          href={p.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="border-b border-green/40 pb-px text-sm font-semibold text-green hover:border-green"
                        >
                          Live
                        </a>
                      )}
                      {p.code !== "#" && (
                        <a
                          href={p.code}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="border-b border-green/40 pb-px text-sm font-semibold text-green hover:border-green"
                        >
                          GitHub
                        </a>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {expandedKey !== "projects" && (
          <p className="mt-4 text-sm font-medium text-green">Open for write-ups and repos →</p>
        )}
      </motion.div>
    </div>
  );
}
