import { useState, useEffect, useRef } from "react";

const projects = [
  {
    id: 1,
    title: "Axiom Design System",
    category: "UI/UX",
    year: "2025",
    tags: ["Figma", "React", "Storybook"],
    color: "#E8D5B7",
    description: "A comprehensive design language for enterprise SaaS — 400+ components, dark/light modes, and full WCAG 2.1 compliance.",
    metrics: ["400+ Components", "3 Themes", "A11y AA"],
  },
  {
    id: 2,
    title: "Pulse Analytics",
    category: "Data Viz",
    year: "2024",
    tags: ["D3.js", "TypeScript", "Node"],
    color: "#B8D4E8",
    description: "Real-time analytics dashboard processing 2M events/day with custom charting library built atop D3.",
    metrics: ["2M Events/day", "12ms P99", "99.97% SLA"],
  },
  {
    id: 3,
    title: "Loom Commerce",
    category: "E-Commerce",
    year: "2024",
    tags: ["Next.js", "Shopify", "Framer"],
    color: "#D4E8B8",
    description: "Headless commerce platform for luxury fashion with editorial storytelling and 3D product previews.",
    metrics: ["+38% CR", "1.4s LCP", "96 Perf Score"],
  },
  {
    id: 4,
    title: "Meridian OS",
    category: "Mobile",
    year: "2023",
    tags: ["React Native", "Swift", "Kotlin"],
    color: "#E8B8D4",
    description: "Cross-platform productivity OS for power users — unified workspace with AI-assisted task management.",
    metrics: ["iOS + Android", "4.9★ Rating", "200k Users"],
  },
];

const skills = [
  { name: "React / Next.js", level: 97 },
  { name: "TypeScript", level: 93 },
  { name: "UI/UX Design", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "Figma / Prototyping", level: 92 },
  { name: "Data Visualization", level: 80 },
];

export default function Portfolio() {
  const [activeProject, setActiveProject] = useState(null);
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const [cursorHover, setCursorHover] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [visibleSections, setVisibleSections] = useState({});
  const sectionRefs = useRef({});

  useEffect(() => {
    const onMouseMove = (e) => setCursorPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", onMouseMove);
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setVisibleSections((prev) => ({ ...prev, [e.target.id]: true }));
          }
        });
      },
      { threshold: 0.15 }
    );
    Object.values(sectionRefs.current).forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  const registerRef = (id) => (el) => {
    sectionRefs.current[id] = el;
  };

  return (
    <div style={styles.root}>
      {/* Custom cursor */}
      <div
        style={{
          ...styles.cursor,
          left: cursorPos.x,
          top: cursorPos.y,
          transform: `translate(-50%, -50%) scale(${cursorHover ? 2.5 : 1})`,
          mixBlendMode: "difference",
        }}
      />

      {/* NAV */}
      <nav style={{ ...styles.nav, backdropFilter: scrollY > 40 ? "blur(20px)" : "none", background: scrollY > 40 ? "rgba(10,10,10,0.85)" : "transparent" }}>
        <span style={styles.navLogo}>JW.</span>
        <div style={styles.navLinks}>
          {["Work", "About", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              style={styles.navLink}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              {l}
            </a>
          ))}
          <button
            style={styles.navCta}
            onMouseEnter={() => setCursorHover(true)}
            onMouseLeave={() => setCursorHover(false)}
          >
            Hire Me
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section style={styles.hero}>
        <div style={styles.heroNoise} />
        <div style={styles.heroGrid} />
        <div style={{ ...styles.heroBlob, top: "10%", left: "60%", background: "radial-gradient(circle, rgba(200,160,255,0.18) 0%, transparent 70%)" }} />
        <div style={{ ...styles.heroBlob, top: "50%", left: "10%", background: "radial-gradient(circle, rgba(100,200,255,0.12) 0%, transparent 70%)" }} />
        <div style={styles.heroContent}>
          <div style={styles.heroBadge}>Available for Projects · 2026</div>
          <h1 style={styles.heroH1}>
            <span style={styles.heroH1Thin}>Jordan</span>
            <br />
            <span style={styles.heroH1Bold}>Williams</span>
          </h1>
          <p style={styles.heroCopy}>
            Full-Stack Designer & Developer crafting interfaces<br />
            where <em style={styles.heroEm}>precision meets delight</em>.
          </p>
          <div style={styles.heroActions}>
            <a
              href="#work"
              style={styles.heroBtnPrimary}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              View Work ↓
            </a>
            <a
              href="#about"
              style={styles.heroBtnGhost}
              onMouseEnter={() => setCursorHover(true)}
              onMouseLeave={() => setCursorHover(false)}
            >
              About Me
            </a>
          </div>
        </div>
        <div style={styles.heroScroll}>
          <div style={styles.heroScrollLine} />
          <span style={styles.heroScrollLabel}>Scroll</span>
        </div>
        <div style={styles.heroStat}>
          <div style={styles.heroStatRow}><span style={styles.heroStatNum}>8+</span><span style={styles.heroStatLabel}>Years Exp.</span></div>
          <div style={styles.heroStatDivider} />
          <div style={styles.heroStatRow}><span style={styles.heroStatNum}>60+</span><span style={styles.heroStatLabel}>Projects</span></div>
          <div style={styles.heroStatDivider} />
          <div style={styles.heroStatRow}><span style={styles.heroStatNum}>24</span><span style={styles.heroStatLabel}>Clients</span></div>
        </div>
      </section>

      {/* MARQUEE */}
      <div style={styles.marqueeWrap}>
        <div style={styles.marqueeTrack}>
          {Array(6).fill(["React", "TypeScript", "Figma", "Next.js", "Node", "D3.js", "GSAP", "Tailwind", "GraphQL", "PostgreSQL"]).flat().map((t, i) => (
            <span key={i} style={styles.marqueeItem}>
              {t} <span style={styles.marqueeDot}>✦</span>
            </span>
          ))}
        </div>
      </div>

      {/* WORK */}
      <section id="work" style={styles.section} ref={registerRef("work")}>
        <div style={{ ...styles.sectionInner, opacity: visibleSections.work ? 1 : 0, transform: visibleSections.work ? "none" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={styles.sectionHeader}>
            <span style={styles.sectionTag}>Selected Work</span>
            <h2 style={styles.sectionH2}>Projects that<br /><em style={styles.italic}>moved the needle.</em></h2>
          </div>
          <div style={styles.projectGrid}>
            {projects.map((p, i) => (
              <div
                key={p.id}
                style={{
                  ...styles.projectCard,
                  animationDelay: `${i * 0.12}s`,
                  borderColor: activeProject === p.id ? p.color : "rgba(255,255,255,0.07)",
                }}
                onMouseEnter={() => { setActiveProject(p.id); setCursorHover(true); }}
                onMouseLeave={() => { setActiveProject(null); setCursorHover(false); }}
              >
                <div style={{ ...styles.projectAccent, background: p.color }} />
                <div style={styles.projectTop}>
                  <span style={{ ...styles.projectCat, color: p.color }}>{p.category}</span>
                  <span style={styles.projectYear}>{p.year}</span>
                </div>
                <h3 style={styles.projectTitle}>{p.title}</h3>
                <p style={styles.projectDesc}>{p.description}</p>
                <div style={styles.projectMetrics}>
                  {p.metrics.map((m) => (
                    <span key={m} style={{ ...styles.projectMetric, borderColor: `${p.color}55`, color: p.color }}>{m}</span>
                  ))}
                </div>
                <div style={styles.projectTags}>
                  {p.tags.map((t) => (
                    <span key={t} style={styles.projectTag}>{t}</span>
                  ))}
                </div>
                <div style={{ ...styles.projectArrow, color: p.color }}>View Case →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ABOUT / SKILLS */}
      <section id="about" style={{ ...styles.section, background: "rgba(255,255,255,0.02)" }} ref={registerRef("about")}>
        <div style={{ ...styles.sectionInner, opacity: visibleSections.about ? 1 : 0, transform: visibleSections.about ? "none" : "translateY(40px)", transition: "all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={styles.aboutGrid}>
            <div style={styles.aboutLeft}>
              <span style={styles.sectionTag}>About</span>
              <h2 style={styles.sectionH2}>I build things<br />people <em style={styles.italic}>love to use.</em></h2>
              <p style={styles.aboutCopy}>
                Based in San Francisco. I work at the intersection of design and engineering — turning complex problems into elegant, performant products. Previously at Stripe, Notion, and a few early-stage startups.
              </p>
              <p style={styles.aboutCopy}>
                I believe the best interfaces are invisible — they get out of the way and let the work speak.
              </p>
              <div style={styles.aboutBadges}>
                {["San Francisco, CA", "Open to Remote", "Full-Time & Freelance"].map((b) => (
                  <span key={b} style={styles.aboutBadge}>{b}</span>
                ))}
              </div>
            </div>
            <div style={styles.aboutRight}>
              <div style={styles.skillsTitle}>Core Skills</div>
              {skills.map((s, i) => (
                <div key={s.name} style={{ ...styles.skillRow, animationDelay: `${i * 0.08}s` }}>
                  <div style={styles.skillMeta}>
                    <span style={styles.skillName}>{s.name}</span>
                    <span style={styles.skillPct}>{s.level}%</span>
                  </div>
                  <div style={styles.skillBar}>
                    <div
                      style={{
                        ...styles.skillFill,
                        width: visibleSections.about ? `${s.level}%` : "0%",
                        transition: `width 1.2s cubic-bezier(0.16,1,0.3,1) ${0.3 + i * 0.1}s`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="contact" style={styles.ctaSection} ref={registerRef("contact")}>
        <div style={{ ...styles.ctaInner, opacity: visibleSections.contact ? 1 : 0, transform: visibleSections.contact ? "none" : "translateY(40px)", transition: "all 0.9s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={styles.ctaNoise} />
          <span style={{ ...styles.sectionTag, color: "#C8AAFF" }}>Get In Touch</span>
          <h2 style={styles.ctaH2}>Let's build something<br /><em style={styles.ctaEm}>extraordinary.</em></h2>
          <p style={styles.ctaCopy}>Open to full-time roles and select freelance projects.</p>
          <a
            href="mailto:hello@jordanwilliams.dev"
            style={styles.ctaBtn}
            onMouseEnter={() => setCursorHover(true)}
            onMouseLeave={() => setCursorHover(false)}
          >
            hello@jordanwilliams.dev ↗
          </a>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={styles.footer}>
        <span style={styles.footerLogo}>JW.</span>
        <span style={styles.footerCopy}>© 2026 Jordan Williams · Designed & Built with care</span>
        <div style={styles.footerLinks}>
          {["GitHub", "LinkedIn", "Dribbble", "Twitter"].map((l) => (
            <a key={l} href="#" style={styles.footerLink}>{l}</a>
          ))}
        </div>
      </footer>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&family=DM+Sans:wght@300;400;500;600&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; cursor: none; }
        body { background: #090909; }
        a { text-decoration: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: #444; border-radius: 2px; }

        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
        @keyframes blobDrift {
          0%, 100% { transform: translate(0,0) scale(1); }
          33% { transform: translate(30px,-20px) scale(1.05); }
          66% { transform: translate(-20px,30px) scale(0.97); }
        }
      `}</style>
    </div>
  );
}

const styles = {
  root: {
    fontFamily: "'DM Sans', sans-serif",
    background: "#090909",
    color: "#F0EEE8",
    minHeight: "100vh",
    overflowX: "hidden",
  },
  cursor: {
    position: "fixed",
    width: 12,
    height: 12,
    borderRadius: "50%",
    background: "#fff",
    pointerEvents: "none",
    zIndex: 9999,
    transition: "transform 0.2s ease, opacity 0.2s ease",
  },

  // NAV
  nav: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 100,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "20px 48px",
    transition: "background 0.4s, backdrop-filter 0.4s",
    borderBottom: "1px solid transparent",
  },
  navLogo: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 26,
    color: "#fff",
    letterSpacing: "-0.5px",
  },
  navLinks: { display: "flex", alignItems: "center", gap: 36 },
  navLink: {
    color: "rgba(240,238,232,0.6)",
    fontSize: 14,
    fontWeight: 500,
    letterSpacing: "0.03em",
    transition: "color 0.2s",
  },
  navCta: {
    background: "#fff",
    color: "#090909",
    border: "none",
    borderRadius: 40,
    padding: "9px 22px",
    fontSize: 13,
    fontWeight: 600,
    cursor: "none",
    letterSpacing: "0.02em",
  },

  // HERO
  hero: {
    position: "relative",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    padding: "0 48px",
    overflow: "hidden",
  },
  heroNoise: {
    position: "absolute", inset: 0,
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)' opacity='0.04'/%3E%3C/svg%3E\")",
    pointerEvents: "none",
  },
  heroGrid: {
    position: "absolute", inset: 0,
    backgroundImage: "linear-gradient(rgba(255,255,255,0.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.025) 1px, transparent 1px)",
    backgroundSize: "80px 80px",
    pointerEvents: "none",
  },
  heroBlob: {
    position: "absolute",
    width: 600,
    height: 600,
    borderRadius: "50%",
    pointerEvents: "none",
    animation: "blobDrift 12s ease-in-out infinite",
  },
  heroContent: {
    position: "relative",
    zIndex: 2,
    maxWidth: 700,
    animation: "fadeUp 1s ease both",
  },
  heroBadge: {
    display: "inline-flex",
    alignItems: "center",
    gap: 8,
    padding: "6px 14px",
    borderRadius: 40,
    border: "1px solid rgba(255,255,255,0.15)",
    fontSize: 12,
    color: "rgba(240,238,232,0.7)",
    marginBottom: 32,
    letterSpacing: "0.05em",
  },
  heroH1: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(72px, 10vw, 130px)",
    lineHeight: 0.92,
    letterSpacing: "-3px",
    marginBottom: 28,
  },
  heroH1Thin: { fontWeight: 400, color: "rgba(240,238,232,0.45)" },
  heroH1Bold: { color: "#F0EEE8" },
  heroCopy: {
    fontSize: 18,
    color: "rgba(240,238,232,0.55)",
    lineHeight: 1.65,
    marginBottom: 40,
    fontWeight: 300,
  },
  heroEm: { fontStyle: "italic", color: "#C8AAFF" },
  heroActions: { display: "flex", gap: 16 },
  heroBtnPrimary: {
    display: "inline-block",
    background: "#fff",
    color: "#090909",
    borderRadius: 50,
    padding: "14px 32px",
    fontSize: 14,
    fontWeight: 600,
    letterSpacing: "0.03em",
  },
  heroBtnGhost: {
    display: "inline-block",
    border: "1px solid rgba(255,255,255,0.2)",
    color: "rgba(240,238,232,0.7)",
    borderRadius: 50,
    padding: "14px 32px",
    fontSize: 14,
    fontWeight: 400,
    letterSpacing: "0.03em",
  },
  heroScroll: {
    position: "absolute",
    bottom: 40,
    left: 48,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 8,
    zIndex: 2,
  },
  heroScrollLine: {
    width: 1,
    height: 60,
    background: "linear-gradient(to bottom, rgba(255,255,255,0.5), transparent)",
    animation: "pulse 2s ease-in-out infinite",
  },
  heroScrollLabel: { fontSize: 10, letterSpacing: "0.2em", color: "rgba(240,238,232,0.3)", writingMode: "vertical-rl" },
  heroStat: {
    position: "absolute",
    bottom: 40,
    right: 48,
    display: "flex",
    alignItems: "center",
    gap: 28,
    zIndex: 2,
  },
  heroStatRow: { display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 },
  heroStatNum: { fontFamily: "'DM Serif Display', serif", fontSize: 32, lineHeight: 1, color: "#F0EEE8" },
  heroStatLabel: { fontSize: 10, letterSpacing: "0.12em", color: "rgba(240,238,232,0.35)", textTransform: "uppercase" },
  heroStatDivider: { width: 1, height: 40, background: "rgba(255,255,255,0.12)" },

  // MARQUEE
  marqueeWrap: {
    borderTop: "1px solid rgba(255,255,255,0.06)",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    overflow: "hidden",
    padding: "14px 0",
    background: "rgba(255,255,255,0.01)",
  },
  marqueeTrack: {
    display: "flex",
    whiteSpace: "nowrap",
    animation: "marquee 24s linear infinite",
  },
  marqueeItem: {
    fontSize: 12,
    letterSpacing: "0.15em",
    color: "rgba(240,238,232,0.3)",
    textTransform: "uppercase",
    padding: "0 20px",
  },
  marqueeDot: { color: "rgba(200,170,255,0.5)" },

  // SECTIONS
  section: { padding: "120px 48px" },
  sectionInner: { maxWidth: 1200, margin: "0 auto" },
  sectionHeader: { marginBottom: 72 },
  sectionTag: {
    display: "inline-block",
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(240,238,232,0.35)",
    marginBottom: 16,
  },
  sectionH2: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(40px, 5vw, 64px)",
    lineHeight: 1.1,
    letterSpacing: "-1.5px",
    color: "#F0EEE8",
  },
  italic: { fontStyle: "italic", color: "rgba(200,170,255,0.9)" },

  // PROJECTS
  projectGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(480px, 1fr))",
    gap: 2,
  },
  projectCard: {
    position: "relative",
    padding: "44px 48px",
    border: "1px solid rgba(255,255,255,0.07)",
    background: "rgba(255,255,255,0.015)",
    cursor: "none",
    overflow: "hidden",
    transition: "border-color 0.3s, background 0.3s",
    animation: "fadeUp 0.7s ease both",
  },
  projectAccent: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: 2,
    opacity: 0.6,
  },
  projectTop: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 },
  projectCat: { fontSize: 11, letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600 },
  projectYear: { fontSize: 12, color: "rgba(240,238,232,0.3)" },
  projectTitle: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: 32,
    letterSpacing: "-0.5px",
    marginBottom: 16,
    color: "#F0EEE8",
  },
  projectDesc: { fontSize: 14, color: "rgba(240,238,232,0.5)", lineHeight: 1.7, marginBottom: 24, fontWeight: 300 },
  projectMetrics: { display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 20 },
  projectMetric: {
    fontSize: 11,
    padding: "4px 10px",
    border: "1px solid",
    borderRadius: 20,
    letterSpacing: "0.05em",
    fontWeight: 500,
  },
  projectTags: { display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 28 },
  projectTag: {
    fontSize: 11,
    padding: "3px 10px",
    background: "rgba(255,255,255,0.06)",
    borderRadius: 3,
    color: "rgba(240,238,232,0.4)",
    letterSpacing: "0.04em",
  },
  projectArrow: { fontSize: 13, fontWeight: 600, letterSpacing: "0.04em" },

  // ABOUT
  aboutGrid: { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "start" },
  aboutLeft: {},
  aboutCopy: { fontSize: 15, color: "rgba(240,238,232,0.55)", lineHeight: 1.8, marginBottom: 20, fontWeight: 300 },
  aboutBadges: { display: "flex", gap: 10, flexWrap: "wrap", marginTop: 32 },
  aboutBadge: {
    fontSize: 11,
    padding: "6px 14px",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: 30,
    color: "rgba(240,238,232,0.5)",
    letterSpacing: "0.04em",
  },
  aboutRight: {},
  skillsTitle: {
    fontSize: 11,
    letterSpacing: "0.18em",
    textTransform: "uppercase",
    color: "rgba(240,238,232,0.3)",
    marginBottom: 32,
  },
  skillRow: { marginBottom: 24 },
  skillMeta: { display: "flex", justifyContent: "space-between", marginBottom: 8 },
  skillName: { fontSize: 13, fontWeight: 500, color: "rgba(240,238,232,0.8)" },
  skillPct: { fontSize: 12, color: "rgba(240,238,232,0.3)" },
  skillBar: { height: 2, background: "rgba(255,255,255,0.07)", borderRadius: 2, overflow: "hidden" },
  skillFill: { height: "100%", background: "linear-gradient(90deg, #C8AAFF, #8AD4FF)", borderRadius: 2 },

  // CTA
  ctaSection: {
    position: "relative",
    padding: "140px 48px",
    background: "rgba(200,170,255,0.04)",
    borderTop: "1px solid rgba(200,170,255,0.1)",
    overflow: "hidden",
  },
  ctaInner: { maxWidth: 800, margin: "0 auto", textAlign: "center" },
  ctaNoise: {
    position: "absolute", inset: 0,
    backgroundImage: "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(200,170,255,0.06) 0%, transparent 70%)",
    pointerEvents: "none",
  },
  ctaH2: {
    fontFamily: "'DM Serif Display', serif",
    fontSize: "clamp(48px, 6vw, 80px)",
    lineHeight: 1.1,
    letterSpacing: "-2px",
    marginBottom: 20,
    color: "#F0EEE8",
  },
  ctaEm: { fontStyle: "italic", color: "#C8AAFF" },
  ctaCopy: { fontSize: 16, color: "rgba(240,238,232,0.45)", marginBottom: 48, fontWeight: 300 },
  ctaBtn: {
    display: "inline-block",
    border: "1px solid rgba(200,170,255,0.4)",
    color: "#C8AAFF",
    borderRadius: 50,
    padding: "16px 40px",
    fontSize: 15,
    fontWeight: 500,
    letterSpacing: "0.02em",
    transition: "background 0.3s, color 0.3s",
  },

  // FOOTER
  footer: {
    padding: "28px 48px",
    borderTop: "1px solid rgba(255,255,255,0.06)",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: 16,
  },
  footerLogo: { fontFamily: "'DM Serif Display', serif", fontSize: 20, color: "rgba(240,238,232,0.4)" },
  footerCopy: { fontSize: 12, color: "rgba(240,238,232,0.25)", letterSpacing: "0.03em" },
  footerLinks: { display: "flex", gap: 24 },
  footerLink: { fontSize: 12, color: "rgba(240,238,232,0.3)", letterSpacing: "0.04em" },
};
