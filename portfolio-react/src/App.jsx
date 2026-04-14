import { useState, useEffect, useRef } from "react";

// ─── DATA ────────────────────────────────────────────────────────────────────

const NAV = ["About", "Skills", "Experience", "Projects", "Contact"];

const STATS = [
  { n: "5+", l: "Years exp." },
  { n: "40%", l: "Load time cut" },
  { n: "35%", l: "Faster MTTR" },
  { n: "50%", l: "Faster releases" },
];

const SKILLS = [
  {
    label: "Frontend",
    color: "lavender",
    items: ["React", "TypeScript", "Angular 14+", "JavaScript ES6+", "HTML5/CSS3", "RxJS / NgRx"],
  },
  {
    label: "Backend",
    color: "mint",
    items: [".NET Core / C#", "Python / FastAPI", "ASP.NET Core", "REST APIs", "Entity Framework"],
  },
  {
    label: "Experimentation",
    color: "peach",
    items: ["A/B Testing", "Feature Flags", "Statistical Significance", "OAuth2 / JWT", "CIAM (Ping Identity)"],
  },
  {
    label: "Cloud & DevOps",
    color: "sky",
    items: ["Azure (App Services, ADF)", "AWS (EC2, S3, Lambda)", "Docker / OpenShift", "Jenkins / Azure DevOps", "Git / SonarQube"],
  },
  {
    label: "Data & Observability",
    color: "rose",
    items: ["SQL Server / T-SQL", "SSIS / ETL Pipelines", "Dynatrace", "ELK Stack", "Azure App Insights"],
  },
  {
    label: "AI / ML",
    color: "butter",
    items: ["TensorFlow", "LLM Integration", "NLP Pipelines", "Random Forest", "Python ML Stack"],
  },
];

const EXPERIENCE = [
  {
    role: "Software Engineer",
    company: "Sentara Healthcare",
    location: "Remote, VA",
    date: "Mar 2025 – Present",
    color: "lavender",
    bullets: [
          "Rebuilt legacy monolith as Angular 14 + Python/FastAPI SPAs, cutting page load time by 40% across 10,000+ monthly users.",
          "Developed React/TypeScript patient-facing dashboards, improving task completion rates and time-to-value for new users.",
          "Architected CIAM-based REST APIs with Ping Identity, enabling secure auth across 5+ enterprise healthcare systems.",
          "Engineered JWT token-exchange workflows that reduced unauthorised access incidents by ~40% within 3 months.",
          "Designed FHIR-compliant EHR data exchange APIs, achieving full regulatory compliance across 3 platforms.",
          "Led production incident triage — reduced mean resolution time by 35% via Dynatrace dashboards and on-call runbooks.",
          "Integrated LLM-powered clinical summarisation using OpenAI API + LangChain, reducing clinician documentation time by 30%.",
          "Optimised SQL Server stored procedures, cutting average query response time by 25%.",
    ],
  },  
  {
    role: "System Engineer",
    company: "Tata Consultancy Services",
    location: "Remote, PA",
    date: "May 2019 – Aug 2022",
    color: "sky",
    bullets: [
          "Built enterprise-grade Angular + Python FastAPI SPAs serving 50,000+ concurrent users at 99.9% uptime.",
          "Developed modular REST APIs and reusable Angular component libraries, reducing feature dev time by 30% across 4 teams.",
          "Deployed and managed cloud infra on AWS (EC2, S3, Lambda) with auto-scaling for zero-downtime peak events.",
          "Implemented NUnit + Selenium test suites achieving 85%+ code coverage, significantly reducing regression defects.",
          "Established Jenkins + Git CI/CD pipelines enabling daily deployments, cutting release incidents by 60%.",
    ],
  },
  {
    role: "Application Developer",
    company: "Andhra Pradesh State Skill Development Center",
    location: "India",
    date: "May 2018 – Apr 2019",
    color: "peach",
    bullets: [
          "Delivered end-to-end Python/Django + Angular web applications, reducing customer-reported UI issues by 45%.",
          "Built RESTful APIs and data access layers with SQLAlchemy + psycopg2 powering real-time dashboards.",
          "Automated SSIS-based ETL pipelines for multi-system data integration, eliminating 8+ hours/week of manual processing.",
    ],
  },
];

const PROJECTS = [
  {
    title: "AB-Platform",
    subtitle: "A/B Experimentation & Feature Flags",
    year: "2024",
    color: "lavender",
    emoji: "🧪",
    desc: "Full-stack experimentation platform mirroring systems like LaunchDarkly and Statsig. React + TypeScript frontend, Python/FastAPI backend, statistical significance engine.",
    highlights: [
      { label: "Welch's t-test", detail: "p-values, confidence intervals, MDE calculator" },
      { label: "Deterministic assignment", detail: "same user always gets same variant — no flicker" },
      { label: "Feature flag targeting", detail: "user attributes, gradual rollout, kill switch" },
    ],
    tags: ["React", "TypeScript", "Python", "FastAPI", "Statistics"],
    github: "https://github.com/Nandini-Jampani/AB-Platform",
  },
  {
    title: "Devonic",
    subtitle: "NLP Deal-Tracking Chatbot",
    year: "2023",
    color: "mint",
    emoji: "🤖",
    desc: "LLM-powered chatbot for real-time deal tracking on electronic gadgets. REST API integrations + NLP pipelines achieving 85% faster reporting.",
    highlights: [
      { label: "85% faster reporting", detail: "via real-time API integrations" },
      { label: "LLM-powered intent recognition", detail: "for deal queries and comparisons" },
    ],
    tags: ["LLMs", "NLP", "REST APIs", "Python"],
    github: "https://github.com/Nandini-Jampani/Devonic-NLP-Deal-Tracking-Chatbot",
  },
  {
    title: "Sign Language Recognition",
    subtitle: "AI Accessibility App",
    year: "2022",
    color: "peach",
    emoji: "🤟",
    desc: "TensorFlow-powered accessibility application for users with reading disabilities. Achieved 92% sign recognition accuracy on validation dataset.",
    highlights: [
      { label: "92% recognition accuracy", detail: "on validation dataset" },
      { label: "Real-time inference", detail: "with TensorFlow model optimisation" },
    ],
    tags: ["TensorFlow", "Python", "Computer Vision", "Accessibility"],
    github: "https://github.com/Nandini-Jampani/Sign-Language-Detection",
  },
  {
    title: "Fortune 1000 Financial Prediction",
    subtitle: "ML Profit/Loss Forecasting",
    year: "2022",
    color: "sky",
    emoji: "📈",
    desc: "Random Forest model predicting profit/loss for Fortune 1000 firms. ETL pipeline reduced data processing time by 60%.",
    highlights: [
      { label: "60% faster data processing", detail: "via optimised ETL pipeline" },
      { label: "Random Forest", detail: "with feature importance analysis" },
    ],
    tags: ["Random Forest", "Python", "ETL", "ML"],
    github: "https://github.com/Nandini-Jampani/Financial-Prediction-Fortune-1000",
  },
];

// ─── COLOUR MAP ──────────────────────────────────────────────────────────────

const PALETTE = {
  lavender: { bg: "#EDE9FF", border: "#C9BDFF", dot: "#9B8BF4", text: "#5B4FCF" },
  mint:     { bg: "#E4F7F0", border: "#A9E0CB", dot: "#4CBFA0", text: "#1E7A5E" },
  peach:    { bg: "#FFF0E8", border: "#FFCFB0", dot: "#F4845A", text: "#C05030" },
  sky:      { bg: "#E6F3FF", border: "#AACFEE", dot: "#5AABE0", text: "#1D6FA8" },
  rose:     { bg: "#FFE8F0", border: "#FFB8CE", dot: "#F45A86", text: "#B03060" },
  butter:   { bg: "#FFFBE6", border: "#FFE89A", dot: "#F4CC3A", text: "#8A7010" },
};

// ─── HOOKS ───────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ─── COMPONENTS ──────────────────────────────────────────────────────────────

function Tag({ children, color = "lavender" }) {
  const p = PALETTE[color];
  return (
    <span style={{
      fontSize: 11, padding: "3px 10px", borderRadius: 20,
      background: p.bg, border: `1px solid ${p.border}`,
      color: p.text, fontWeight: 500, letterSpacing: "0.03em",
      display: "inline-block",
    }}>
      {children}
    </span>
  );
}

function FadeIn({ children, delay = 0, style = {} }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: `opacity 0.6s ${delay}s, transform 0.6s ${delay}s`,
      ...style,
    }}>
      {children}
    </div>
  );
}

function SectionLabel({ children, color = "lavender" }) {
  const p = PALETTE[color];
  return (
    <span style={{
      fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase",
      color: p.text, background: p.bg, border: `1px solid ${p.border}`,
      padding: "4px 12px", borderRadius: 20, fontWeight: 600,
    }}>
      {children}
    </span>
  );
}

// ─── SECTIONS ────────────────────────────────────────────────────────────────

function Nav({ active }) {
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      background: "rgba(253,250,247,0.88)", backdropFilter: "blur(16px)",
      borderBottom: "1px solid #EDE0D4",
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "0 2.5rem", height: 56,
    }}>
      <span style={{
        fontFamily: "'Playfair Display', Georgia, serif",
        fontSize: 18, fontWeight: 700, letterSpacing: "-0.01em",
        background: "linear-gradient(135deg, #9B8BF4, #F4845A)",
        WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
      }}>NJ</span>
      <div style={{ display: "flex", gap: "1.75rem" }}>
        {NAV.map(n => (
          <a key={n} href={`#${n.toLowerCase()}`} style={{
            color: active === n ? "#9B8BF4" : "#8A7A6E",
            textDecoration: "none", fontSize: 12,
            letterSpacing: "0.07em", textTransform: "uppercase",
            fontWeight: active === n ? 700 : 400,
            transition: "color 0.2s",
          }}>{n}</a>
        ))}
      </div>
    </nav>
  );
}

function Hero() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setTimeout(() => setMounted(true), 80); }, []);

  return (
    <section id="about" style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      justifyContent: "center", padding: "7rem 2.5rem 4rem",
      maxWidth: 920, margin: "0 auto", position: "relative",
    }}>
      {/* Decorative blobs */}
      <div style={{
        position: "absolute", top: "15%", right: "-5%", width: 340, height: 340,
        borderRadius: "50%", background: "radial-gradient(circle, #EDE9FF 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />
      <div style={{
        position: "absolute", bottom: "20%", left: "-8%", width: 260, height: 260,
        borderRadius: "50%", background: "radial-gradient(circle, #E4F7F0 0%, transparent 70%)",
        pointerEvents: "none", zIndex: 0,
      }} />

      <div style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(16px)",
          transition: "all 0.7s 0.1s",
          display: "flex", alignItems: "center", gap: 10,
          fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase",
          color: "#9B8BF4", marginBottom: "1.5rem",
        }}>
          <span style={{ width: 28, height: 1, background: "#9B8BF4", display: "block" }} />
          Software Engineer · Open to Work
        </div>

        <h1 style={{
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)",
          transition: "all 0.7s 0.2s",
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: "clamp(2.8rem, 6vw, 4.8rem)",
          lineHeight: 1.05, letterSpacing: "-0.02em", fontWeight: 700,
          color: "#2D1F14", marginBottom: "1.5rem",
        }}>
          Nandini <span style={{
            background: "linear-gradient(135deg, #9B8BF4 0%, #F4845A 100%)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
          }}>Jampani</span>
        </h1>

        <p style={{
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)",
          transition: "all 0.7s 0.3s",
          fontSize: 16, color: "#6B5A4E", maxWidth: 580,
          lineHeight: 1.75, marginBottom: "2.5rem",
        }}>
          5+ years building scalable web platforms across healthcare &amp; enterprise.
          Specialised in <strong style={{ color: "#9B8BF4" }}>A/B experimentation</strong>,{" "}
          <strong style={{ color: "#4CBFA0" }}>feature flags</strong>, and full-stack
          product engineering — React · Python · .NET · Azure.
        </p>

        <div style={{
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)",
          transition: "all 0.7s 0.4s",
          display: "flex", gap: 12, flexWrap: "wrap", marginBottom: "3.5rem",
        }}>
          <a href="mailto:jampaninandini72@gmail.com" style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "11px 22px", borderRadius: 50,
            background: "linear-gradient(135deg, #9B8BF4, #7B6AE0)",
            color: "#fff", fontWeight: 600, fontSize: 13,
            textDecoration: "none", boxShadow: "0 4px 20px rgba(155,139,244,0.35)",
          }}>✉ Contact Me</a>
          <a href="https://linkedin.com/in/nandini-jampani-73762ab7" target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "11px 22px", borderRadius: 50,
            background: "#fff", color: "#2D1F14", fontWeight: 600, fontSize: 13,
            textDecoration: "none", border: "1.5px solid #EDE0D4",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}>LinkedIn →</a>
          <a href="https://github.com/nandini-jampani" target="_blank" rel="noreferrer" style={{
            display: "inline-flex", alignItems: "center", gap: 7,
            padding: "11px 22px", borderRadius: 50,
            background: "#fff", color: "#2D1F14", fontWeight: 600, fontSize: 13,
            textDecoration: "none", border: "1.5px solid #EDE0D4",
            boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
          }}>GitHub →</a>
        </div>

        {/* Stats */}
        <div style={{
          opacity: mounted ? 1 : 0, transform: mounted ? "none" : "translateY(20px)",
          transition: "all 0.7s 0.5s",
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1, borderRadius: 16, overflow: "hidden",
          border: "1.5px solid #EDE0D4", maxWidth: 560,
          background: "#EDE0D4",
        }}>
          {STATS.map((s, i) => (
            <div key={i} style={{ padding: "1.2rem 1.4rem", background: "#FDFAF7" }}>
              <div style={{
                fontFamily: "'Playfair Display', Georgia, serif",
                fontSize: "1.9rem", fontWeight: 700,
                background: `linear-gradient(135deg, ${["#9B8BF4","#4CBFA0","#F4845A","#5AABE0"][i]}, ${["#7B6AE0","#2DA882","#D4622A","#3A88C0"][i]})`,
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                lineHeight: 1, marginBottom: 4,
              }}>{s.n}</div>
              <div style={{ fontSize: 10, textTransform: "uppercase", letterSpacing: "0.07em", color: "#9A8880" }}>{s.l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" style={{ padding: "5rem 2.5rem", maxWidth: 920, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "3rem" }}>
          <SectionLabel color="lavender">Skills</SectionLabel>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 700,
            letterSpacing: "-0.02em", color: "#2D1F14",
          }}>Technical Expertise</h2>
        </div>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))", gap: "1rem" }}>
        {SKILLS.map((s, i) => {
          const p = PALETTE[s.color];
          return (
            <FadeIn key={s.label} delay={i * 0.07}>
              <div style={{
                background: "#fff", border: `1.5px solid ${p.border}`,
                borderRadius: 16, padding: "1.4rem",
                borderTop: `4px solid ${p.dot}`,
                boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                transition: "transform 0.2s, box-shadow 0.2s",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-3px)"; e.currentTarget.style.boxShadow = `0 8px 24px ${p.bg}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 12px rgba(0,0,0,0.04)"; }}
              >
                <h4 style={{ fontSize: 11, textTransform: "uppercase", letterSpacing: "0.08em", color: p.text, marginBottom: "0.75rem", fontWeight: 700 }}>{s.label}</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {s.items.map(it => <Tag key={it} color={s.color}>{it}</Tag>)}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section id="experience" style={{ padding: "5rem 2.5rem", maxWidth: 920, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "3rem" }}>
          <SectionLabel color="mint">Experience</SectionLabel>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 700,
            letterSpacing: "-0.02em", color: "#2D1F14",
          }}>Work History</h2>
        </div>
      </FadeIn>

      <div style={{ position: "relative" }}>
        {/* Timeline line */}
        <div style={{
          position: "absolute", left: 19, top: 0, bottom: 0, width: 2,
          background: "linear-gradient(to bottom, #EDE9FF, #E4F7F0, #FFF0E8, #E6F3FF)",
        }} />

        {EXPERIENCE.map((exp, i) => {
          const p = PALETTE[exp.color];
          return (
            <FadeIn key={i} delay={i * 0.1}>
              <div style={{ display: "flex", gap: "1.5rem", marginBottom: "2rem", position: "relative" }}>
                <div style={{
                  width: 40, height: 40, borderRadius: "50%",
                  background: p.bg, border: `2.5px solid ${p.dot}`,
                  flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                  zIndex: 1, marginTop: 2,
                }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: p.dot }} />
                </div>
                <div style={{
                  flex: 1, background: "#fff", border: `1.5px solid ${p.border}`,
                  borderRadius: 16, padding: "1.4rem 1.75rem",
                  borderLeft: `4px solid ${p.dot}`,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                }}>
                  <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 4, marginBottom: "0.8rem" }}>
                    <div>
                      <div style={{ fontWeight: 700, color: "#2D1F14", fontSize: 15 }}>{exp.role}</div>
                      <div style={{ color: p.text, fontWeight: 600, fontSize: 13 }}>{exp.company} · {exp.location}</div>
                    </div>
                    <span style={{
                      fontSize: 11, color: "#9A8880", background: p.bg,
                      border: `1px solid ${p.border}`, borderRadius: 20,
                      padding: "3px 10px", height: "fit-content", alignSelf: "flex-start",
                    }}>{exp.date}</span>
                  </div>
                  <ul style={{ paddingLeft: 0, listStyle: "none", display: "flex", flexDirection: "column", gap: 5 }}>
                    {exp.bullets.map((b, j) => (
                      <li key={j} style={{ fontSize: 13, color: "#6B5A4E", display: "flex", alignItems: "baseline", gap: 8 }}>
                        <span style={{ color: p.dot, fontSize: 10, flexShrink: 0 }}>◆</span>
                        <span dangerouslySetInnerHTML={{ __html: b.replace(/\d+[%+,]?[\w\s]*(?=\s*(?:faster|cut|reduced|improvement|users|coverage|incidents|processing))/gi, m => `<strong style="color:#2D1F14">${m}</strong>`) }} />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

function Projects() {
  return (
    <section id="projects" style={{ padding: "5rem 2.5rem", maxWidth: 920, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: "3rem" }}>
          <SectionLabel color="peach">Projects</SectionLabel>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 3.5vw, 2.4rem)", fontWeight: 700,
            letterSpacing: "-0.02em", color: "#2D1F14",
          }}>Selected Work</h2>
        </div>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(400px, 1fr))", gap: "1.5rem" }}>
        {PROJECTS.map((proj, i) => {
          const p = PALETTE[proj.color];
          return (
            <FadeIn key={i} delay={i * 0.08}>
              <div style={{
                background: "#fff", border: `1.5px solid ${p.border}`,
                borderRadius: 20, padding: "1.75rem",
                borderTop: `4px solid ${p.dot}`,
                boxShadow: "0 2px 16px rgba(0,0,0,0.05)",
                transition: "transform 0.25s, box-shadow 0.25s",
                height: "100%", display: "flex", flexDirection: "column",
              }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = `0 12px 40px ${p.bg}`; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "none"; e.currentTarget.style.boxShadow = "0 2px 16px rgba(0,0,0,0.05)"; }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1rem" }}>
                  <div>
                    <div style={{ fontSize: 11, letterSpacing: "0.07em", textTransform: "uppercase", color: "#9A8880", marginBottom: 4 }}>{proj.year}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <span style={{ fontSize: "1.5rem" }}>{proj.emoji}</span>
                      <div>
                        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.2rem", fontWeight: 700, color: "#2D1F14", lineHeight: 1.2 }}>{proj.title}</div>
                        <div style={{ fontSize: 12, color: p.text, fontWeight: 500 }}>{proj.subtitle}</div>
                      </div>
                    </div>
                  </div>
                  {proj.github !== "#" && (
                    <a href={proj.github} target="_blank" rel="noreferrer" style={{
                      fontSize: 12, padding: "6px 14px", borderRadius: 8,
                      background: p.bg, color: p.text, fontWeight: 600,
                      textDecoration: "none", border: `1px solid ${p.border}`,
                      flexShrink: 0,
                    }}>GitHub →</a>
                  )}
                </div>

                <p style={{ fontSize: 13, color: "#6B5A4E", lineHeight: 1.7, marginBottom: "1rem" }}>{proj.desc}</p>

                <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: 5, marginBottom: "1.25rem", flex: 1 }}>
                  {proj.highlights.map((h, j) => (
                    <li key={j} style={{ fontSize: 12, color: "#6B5A4E", display: "flex", alignItems: "baseline", gap: 8 }}>
                      <span style={{ color: p.dot, fontSize: 9, flexShrink: 0 }}>◆</span>
                      <span><strong style={{ color: "#2D1F14" }}>{h.label}</strong> — {h.detail}</span>
                    </li>
                  ))}
                </ul>

                <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
                  {proj.tags.map(t => <Tag key={t} color={proj.color}>{t}</Tag>)}
                </div>
              </div>
            </FadeIn>
          );
        })}
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" style={{ padding: "5rem 2.5rem 7rem", maxWidth: 920, margin: "0 auto" }}>
      <FadeIn>
        <div style={{
          background: "linear-gradient(135deg, #EDE9FF 0%, #E4F7F0 50%, #FFF0E8 100%)",
          border: "1.5px solid #DDD0C8", borderRadius: 24,
          padding: "3.5rem", textAlign: "center",
        }}>
          <div style={{ fontSize: "3rem", marginBottom: "1rem" }}>👋</div>
          <h2 style={{
            fontFamily: "'Playfair Display', Georgia, serif",
            fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 700,
            color: "#2D1F14", marginBottom: "0.75rem",
          }}>Let's Work Together</h2>
          <p style={{ color: "#6B5A4E", fontSize: 15, maxWidth: 480, margin: "0 auto 2rem", lineHeight: 1.7 }}>
            Open to full-stack and growth engineering roles. Remote-friendly. M.S. Computer Science, Arkansas State University (2023).
          </p>
          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            {[
              { label: "✉ Email Me", href: "mailto:jampaninandini72@gmail.com", style: { background: "linear-gradient(135deg,#9B8BF4,#7B6AE0)", color: "#fff", boxShadow: "0 4px 20px rgba(155,139,244,0.4)" } },
              { label: "LinkedIn", href: "https://linkedin.com/in/nandini-jampani-73762ab7", style: { background: "#fff", color: "#2D1F14", border: "1.5px solid #DDD0C8" } },
              { label: "GitHub", href: "https://github.com/nandini-jampani", style: { background: "#fff", color: "#2D1F14", border: "1.5px solid #DDD0C8" } },
            ].map(btn => (
              <a key={btn.label} href={btn.href} target="_blank" rel="noreferrer" style={{
                display: "inline-flex", alignItems: "center", gap: 7,
                padding: "12px 26px", borderRadius: 50,
                fontWeight: 600, fontSize: 14,
                textDecoration: "none", transition: "all 0.2s",
                ...btn.style,
              }}>{btn.label}</a>
            ))}
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

// ─── APP ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeNav, setActiveNav] = useState("About");

  useEffect(() => {
    const handleScroll = () => {
      const sections = NAV.map(n => document.getElementById(n.toLowerCase()));
      const scrollY = window.scrollY + 80;
      for (let i = sections.length - 1; i >= 0; i--) {
        if (sections[i] && sections[i].offsetTop <= scrollY) {
          setActiveNav(NAV[i]);
          break;
        }
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div style={{ background: "#FDFAF7", minHeight: "100vh", fontFamily: "'DM Sans', system-ui, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;1,9..40,400&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #FDFAF7; }
        ::-webkit-scrollbar-thumb { background: #C9BDFF; border-radius: 3px; }
      `}</style>
      <Nav active={activeNav} />
      <Hero />
      <Skills />
      <Experience />
      <Projects />
      <Contact />
      <footer style={{
        background: "#2D1F14", color: "rgba(255,255,255,0.45)",
        textAlign: "center", padding: "1.5rem", fontSize: 12,
      }}>
        © 2025 Nandini Jampani · Built with React · Hosted on GitHub Pages
      </footer>
    </div>
  );
}
