import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import {
  ArrowRight,
  Download,
  Mail,
  Linkedin,
  Phone,
  MapPin,
  BarChart3,
  Database,
  LineChart,
  PieChart,
  FileSpreadsheet,
  Code2,
  Sparkles,
  GraduationCap,
  Award,
  Briefcase,
  Send,
  CheckCircle2,
  TrendingUp,
  Activity,
  Layers,
  Brain,
  Workflow,
  Github,
} from "lucide-react";
import profileImg from "@/assets/karthika-profile.jpg";
import { ChatWidget } from "@/components/ChatWidget";

export const Route = createFileRoute("/")({
  component: Portfolio,
});

const NAV = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "services", label: "Services" },
  { id: "contact", label: "Contact" },
];

function useCountUp(target: number, duration = 1600, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / duration);
      setValue(Math.floor(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, start]);
  return value;
}

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => e.isIntersecting && setInView(true),
      { threshold: 0.2 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
      const offsets = NAV.map((n) => {
        const el = document.getElementById(n.id);
        if (!el) return { id: n.id, top: Infinity };
        return { id: n.id, top: Math.abs(el.getBoundingClientRect().top - 120) };
      });
      offsets.sort((a, b) => a.top - b.top);
      setActive(offsets[0].id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Nav scrolled={scrolled} active={active} />
      <Hero />
      <About />
      <Education />
      <Skills />
      <Projects />
      <Certifications />
      <Tools />
      <Services />
      <Contact />
      <Footer />
    </div>
  );
}

function Nav({ scrolled, active }: { scrolled: boolean; active: string }) {
  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "py-3" : "py-5"
      }`}
    >
      <div
        className={`mx-auto max-w-7xl px-6 transition-all ${
          scrolled ? "" : ""
        }`}
      >
        <div
          className={`flex items-center justify-between rounded-2xl px-5 py-3 transition-all ${
            scrolled ? "glass shadow-soft" : ""
          }`}
        >
          <a href="#home" className="flex items-center gap-2 group">
            <span className="grid place-items-center h-9 w-9 rounded-xl bg-primary text-primary-foreground font-bold">
              K
            </span>
            <span className="font-semibold tracking-tight">Karthika<span className="text-accent">.</span></span>
          </a>
          <nav className="hidden md:flex items-center gap-1">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  active === n.id
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {n.label}
              </a>
            ))}
          </nav>
          <a
            href="#contact"
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-accent-foreground hover:opacity-90 transition shadow-soft"
          >
            Let's talk <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="home"
      className="relative pt-32 pb-24 lg:pt-40 lg:pb-32 bg-hero overflow-hidden"
    >
      <div className="absolute inset-0 grid-bg opacity-40 [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      <div className="relative mx-auto max-w-7xl px-6">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="animate-fade-up">
            <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs font-medium text-muted-foreground mb-6">
              <span className="h-2 w-2 rounded-full bg-emerald animate-pulse" />
              Available for opportunities
            </div>
            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.05] tracking-tight">
              Hi, I'm <span className="text-gradient">Karthika</span>
              <br />
              <span className="text-foreground">a Data Analyst</span>
            </h1>
            <p className="mt-6 text-lg text-muted-foreground max-w-xl leading-relaxed">
              Transforming data into actionable business insights through analytics,
              dashboards and visualization with Python, SQL & Power BI.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition shadow-soft"
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 text-sm font-medium text-accent-foreground hover:opacity-90 transition shadow-glow"
              >
                View Projects <ArrowRight className="h-4 w-4" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:shadow-soft transition"
              >
                Contact Me
              </a>
            </div>
            <div className="mt-8 flex items-center gap-3">
              <SocialIcon href="https://linkedin.com" label="LinkedIn">
                <Linkedin className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="mailto:karthika@example.com" label="Email">
                <Mail className="h-4 w-4" />
              </SocialIcon>
              <SocialIcon href="https://github.com" label="GitHub">
                <Github className="h-4 w-4" />
              </SocialIcon>
            </div>
          </div>

          <div className="relative animate-scale-in">
            <HeroVisual />
          </div>
        </div>

        <StatsRow />
      </div>
    </section>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      aria-label={label}
      className="grid place-items-center h-10 w-10 rounded-full glass text-foreground hover:text-accent hover:-translate-y-0.5 transition"
    >
      {children}
    </a>
  );
}

function HeroVisual() {
  return (
    <div className="relative aspect-square max-w-[520px] mx-auto">
      {/* gradient glow */}
      <div className="absolute -inset-8 bg-gradient-to-tr from-accent/30 via-violet/20 to-cyan/30 rounded-[3rem] blur-3xl opacity-60" />
      {/* main card */}
      <div className="relative h-full w-full rounded-[2.5rem] glass overflow-hidden shadow-glass">
        <img
          src={profileImg}
          alt="Karthika Selvam"
          width={1024}
          height={1024}
          className="absolute inset-0 h-full w-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
        <div className="absolute bottom-5 left-5 right-5 glass rounded-2xl p-4 flex items-center gap-3">
          <div className="grid place-items-center h-10 w-10 rounded-xl bg-accent text-accent-foreground">
            <Activity className="h-5 w-5" />
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Currently analysing</p>
            <p className="text-sm font-semibold">Customer churn dataset</p>
          </div>
        </div>
      </div>

      {/* floating widgets */}
      <FloatingCard className="-top-6 -left-6 animate-float-slow">
        <div className="flex items-center gap-3">
          <div className="grid place-items-center h-10 w-10 rounded-lg bg-emerald/15 text-emerald">
            <TrendingUp className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Revenue</p>
            <p className="text-lg font-bold">+24.8%</p>
          </div>
        </div>
        <MiniChart />
      </FloatingCard>

      <FloatingCard className="top-1/3 -right-8 animate-float-slow" style={{ animationDelay: "1.2s" }}>
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-muted-foreground">Active KPIs</p>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="relative h-12 w-12">
            <svg viewBox="0 0 36 36" className="h-12 w-12 -rotate-90">
              <circle cx="18" cy="18" r="15" fill="none" stroke="currentColor" strokeOpacity="0.1" strokeWidth="3" />
              <circle cx="18" cy="18" r="15" fill="none" stroke="oklch(0.55 0.18 265)" strokeWidth="3" strokeDasharray="94" strokeDashoffset="22" strokeLinecap="round" />
            </svg>
            <span className="absolute inset-0 grid place-items-center text-[10px] font-bold">76%</span>
          </div>
        </div>
      </FloatingCard>

      <FloatingCard className="-bottom-4 -left-4 animate-float-slow" style={{ animationDelay: "0.6s" }}>
        <p className="text-[10px] uppercase tracking-wider text-muted-foreground mb-2">Weekly insights</p>
        <div className="flex items-end gap-1.5 h-10">
          {[40, 65, 50, 80, 45, 90, 70].map((h, i) => (
            <div
              key={i}
              className="w-2 rounded-sm bg-gradient-to-t from-accent to-violet"
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </FloatingCard>
    </div>
  );
}

function FloatingCard({
  children,
  className = "",
  style,
}: {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={`absolute glass rounded-2xl p-3.5 shadow-glass min-w-[160px] ${className}`}
      style={style}
    >
      {children}
    </div>
  );
}

function MiniChart() {
  return (
    <svg viewBox="0 0 100 30" className="mt-2 w-full h-6">
      <defs>
        <linearGradient id="mcg" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.7 0.15 165)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="oklch(0.7 0.15 165)" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 22 L15 18 L30 20 L45 12 L60 14 L75 6 L100 8 L100 30 L0 30 Z" fill="url(#mcg)" />
      <path d="M0 22 L15 18 L30 20 L45 12 L60 14 L75 6 L100 8" fill="none" stroke="oklch(0.7 0.15 165)" strokeWidth="1.5" />
    </svg>
  );
}

function StatsRow() {
  const { ref, inView } = useInView<HTMLDivElement>();
  const stats = [
    { v: 50000, suffix: "+", label: "Records analysed" },
    { v: 3, suffix: "", label: "Major projects" },
    { v: 12, suffix: "+", label: "Tools mastered" },
    { v: 100, suffix: "%", label: "Data-driven" },
  ];
  return (
    <div ref={ref} className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4">
      {stats.map((s, i) => (
        <Stat key={i} target={s.v} suffix={s.suffix} label={s.label} start={inView} />
      ))}
    </div>
  );
}

function Stat({ target, suffix, label, start }: { target: number; suffix: string; label: string; start: boolean }) {
  const v = useCountUp(target, 1600, start);
  return (
    <div className="glass rounded-2xl p-5 text-center hover:-translate-y-1 transition">
      <p className="text-3xl font-bold text-gradient">{v.toLocaleString()}{suffix}</p>
      <p className="mt-1 text-xs text-muted-foreground">{label}</p>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  alt = false,
}: {
  id: string;
  eyebrow: string;
  title: React.ReactNode;
  subtitle?: string;
  children: React.ReactNode;
  alt?: boolean;
}) {
  return (
    <section id={id} className={`relative py-24 ${alt ? "bg-muted/40" : ""}`}>
      <div className="mx-auto max-w-7xl px-6">
        <div className="max-w-2xl mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent mb-3">{eyebrow}</p>
          <h2 className="text-4xl sm:text-5xl font-bold leading-tight">{title}</h2>
          {subtitle && <p className="mt-4 text-muted-foreground text-lg">{subtitle}</p>}
        </div>
        {children}
      </div>
    </section>
  );
}

function About() {
  const highlights = [
    { icon: Brain, label: "Analytical & problem-solving mindset" },
    { icon: Workflow, label: "End-to-end EDA & ETL pipelines" },
    { icon: LineChart, label: "Statistical modelling & reporting" },
    { icon: Layers, label: "Dashboards across BI tools" },
  ];
  return (
    <Section
      id="about"
      eyebrow="About me"
      title={<>From <span className="text-gradient">Agricultural Engineering</span> to data-driven decisions.</>}
    >
      <div className="grid lg:grid-cols-5 gap-10">
        <div className="lg:col-span-3 glass rounded-3xl p-8 space-y-4 text-muted-foreground leading-relaxed">
          <p>
            I'm a passionate and results-driven <span className="text-foreground font-medium">Data Analyst</span> with
            strong academic project experience in Python, SQL, Power BI, Excel and modern Business
            Intelligence tooling.
          </p>
          <p>
            My journey started in Agricultural Engineering, but a curiosity for patterns in data
            pulled me toward analytics. Through specialised training and hands-on academic projects,
            I now love turning messy datasets into clean dashboards, sharp insights and confident
            business decisions.
          </p>
          <p>
            I specialise in data cleaning, exploratory data analysis, dashboard creation,
            statistical modelling and analytics reporting — building work that's
            recruiter-friendly, stakeholder-ready and decision-grade.
          </p>
        </div>
        <div className="lg:col-span-2 grid sm:grid-cols-2 gap-4">
          {highlights.map((h, i) => (
            <div
              key={i}
              className="glass rounded-2xl p-5 hover:-translate-y-1 hover:shadow-glow transition"
            >
              <div className="grid place-items-center h-10 w-10 rounded-xl bg-accent/10 text-accent mb-3">
                <h.icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-medium">{h.label}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}

function Education() {
  const items = [
    {
      year: "2025",
      title: "Master Program in Data Analytics",
      org: "FITA Academy",
      points: ["Python", "SQL", "Excel", "Power BI", "Data Visualization"],
    },
    {
      year: "2024",
      title: "B.E. Agricultural Engineering",
      org: "Sir Isaac Newton College of Engineering & Technology",
      points: ["Tamil Nadu, India"],
    },
  ];
  return (
    <Section id="education" eyebrow="Education" title="Academic foundation." alt>
      <div className="grid md:grid-cols-2 gap-6">
        {items.map((it, i) => (
          <div key={i} className="glass rounded-3xl p-7 hover:-translate-y-1 transition shadow-soft">
            <div className="flex items-start justify-between mb-4">
              <div className="grid place-items-center h-12 w-12 rounded-xl bg-primary text-primary-foreground">
                <GraduationCap className="h-6 w-6" />
              </div>
              <span className="rounded-full bg-accent/10 text-accent px-3 py-1 text-xs font-semibold">
                {it.year}
              </span>
            </div>
            <h3 className="text-xl font-bold">{it.title}</h3>
            <p className="text-sm text-muted-foreground mt-1">{it.org}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {it.points.map((p) => (
                <span key={p} className="rounded-full bg-secondary text-secondary-foreground px-3 py-1 text-xs">
                  {p}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Skills() {
  const groups = [
    {
      icon: Code2,
      title: "Programming & Analytics",
      items: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn", "SciPy", "Scikit-learn"],
    },
    {
      icon: Database,
      title: "SQL",
      items: ["SQL Queries", "GROUP BY", "Joins", "Window Functions", "Aggregations", "Subqueries"],
    },
    {
      icon: BarChart3,
      title: "Business Intelligence",
      items: ["Power BI", "DAX", "Power Query", "KPI Dashboards", "BI Reporting"],
    },
    {
      icon: FileSpreadsheet,
      title: "Excel",
      items: ["PivotTables", "VLOOKUP", "Conditional Formatting", "Charts"],
    },
    {
      icon: Workflow,
      title: "Data Engineering",
      items: ["ETL", "Data Pipelines", "Data Cleaning", "Wrangling", "Validation"],
    },
    {
      icon: Sparkles,
      title: "Analytics",
      items: ["EDA", "Statistical Modelling", "Predictive Analytics", "Trend Analysis"],
    },
  ];
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title={<>A full stack for <span className="text-gradient">analytics work.</span></>}
      subtitle="From raw data wrangling to executive dashboards — here's the toolkit I work with day to day."
    >
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {groups.map((g, i) => (
          <div
            key={i}
            className="group glass rounded-3xl p-6 hover:-translate-y-1 hover:shadow-glow transition relative overflow-hidden"
          >
            <div className="absolute -top-12 -right-12 h-32 w-32 rounded-full bg-accent/10 blur-2xl group-hover:bg-accent/20 transition" />
            <div className="relative">
              <div className="grid place-items-center h-12 w-12 rounded-xl bg-primary text-primary-foreground mb-4">
                <g.icon className="h-6 w-6" />
              </div>
              <h3 className="text-lg font-bold">{g.title}</h3>
              <div className="mt-4 flex flex-wrap gap-2">
                {g.items.map((it) => (
                  <span
                    key={it}
                    className="rounded-lg bg-secondary/70 text-secondary-foreground px-2.5 py-1 text-xs font-medium hover:bg-accent hover:text-accent-foreground transition"
                  >
                    {it}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Projects() {
  const projects = [
    {
      tag: "Python · EDA",
      title: "E-Commerce Delivery Analytics",
      desc: "End-to-end data pipeline analysing 50,000+ logistics records to surface regional delivery-delay trends and operational insights.",
      tech: ["Python", "Pandas", "NumPy", "Matplotlib", "Seaborn"],
      visual: <ProjectChartA />,
    },
    {
      tag: "Power BI · Dashboard",
      title: "Netflix Customer Churn Dashboard",
      desc: "Interactive Power BI dashboard analysing 20,000+ user records to surface retention drivers and reduce churn-analysis time.",
      tech: ["Power BI", "Power Query", "DAX", "Data Modelling"],
      visual: <ProjectChartB />,
    },
    {
      tag: "SQL · Reporting",
      title: "Sales Data Analysis",
      desc: "Optimised SQL queries plus advanced Excel reporting to identify top-performing products and customer segments.",
      tech: ["SQL", "Advanced Excel", "BI Reporting"],
      visual: <ProjectChartC />,
    },
  ];
  return (
    <Section
      id="projects"
      eyebrow="Selected work"
      title={<>Academic <span className="text-gradient">projects.</span></>}
      subtitle="Hands-on data work — from raw CSVs to recruiter-ready dashboards and insights."
      alt
    >
      <div className="grid lg:grid-cols-3 gap-6">
        {projects.map((p, i) => (
          <article
            key={i}
            className="group glass rounded-3xl overflow-hidden hover:-translate-y-2 transition duration-300 shadow-soft"
          >
            <div className="relative h-48 bg-gradient-to-br from-primary to-accent overflow-hidden">
              <div className="absolute inset-0 grid-bg opacity-30" />
              <div className="absolute inset-0 p-5 flex items-end">
                {p.visual}
              </div>
              <span className="absolute top-4 left-4 rounded-full glass-dark text-primary-foreground px-3 py-1 text-[10px] font-semibold tracking-wide uppercase">
                {p.tag}
              </span>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold group-hover:text-accent transition">{p.title}</h3>
              <p className="mt-3 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
              <div className="mt-5 flex flex-wrap gap-1.5">
                {p.tech.map((t) => (
                  <span key={t} className="rounded-md bg-secondary text-secondary-foreground px-2 py-0.5 text-[11px]">
                    {t}
                  </span>
                ))}
              </div>
              <a href="#contact" className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-accent group-hover:gap-3 transition-all">
                Case study <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}

function ProjectChartA() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <defs>
        <linearGradient id="pa" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0.5" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M0 60 L25 50 L50 55 L75 35 L100 40 L125 20 L150 25 L175 10 L200 18 L200 80 L0 80 Z" fill="url(#pa)" />
      <path d="M0 60 L25 50 L50 55 L75 35 L100 40 L125 20 L150 25 L175 10 L200 18" fill="none" stroke="white" strokeWidth="2" />
    </svg>
  );
}
function ProjectChartB() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      {[12, 22, 18, 32, 26, 40, 36, 48, 30, 52, 44, 58].map((h, i) => (
        <rect key={i} x={i * 17 + 4} y={70 - h} width="10" height={h} rx="2" fill="white" opacity={0.5 + i * 0.04} />
      ))}
    </svg>
  );
}
function ProjectChartC() {
  return (
    <svg viewBox="0 0 200 80" className="w-full h-full">
      <g transform="translate(100,40)">
        <circle r="28" fill="none" stroke="white" strokeOpacity="0.25" strokeWidth="10" />
        <circle r="28" fill="none" stroke="white" strokeWidth="10" strokeDasharray="120 200" transform="rotate(-90)" strokeLinecap="round" />
      </g>
      <g transform="translate(0,0)" fill="white">
        <rect x="10" y="62" width="40" height="3" rx="1.5" opacity="0.7" />
        <rect x="10" y="70" width="60" height="3" rx="1.5" opacity="0.5" />
      </g>
    </svg>
  );
}

function Certifications() {
  const certs = [
    { title: "Data Analytics Certification", icon: BarChart3 },
    { title: "Power BI Certification", icon: PieChart },
    { title: "SQL Certification", icon: Database },
    { title: "Python for Data Analytics", icon: Code2 },
  ];
  return (
    <Section id="certifications" eyebrow="Credentials" title="Certifications.">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {certs.map((c, i) => (
          <div key={i} className="glass rounded-2xl p-6 hover:-translate-y-1 hover:shadow-glow transition text-center">
            <div className="mx-auto grid place-items-center h-14 w-14 rounded-2xl bg-gradient-to-br from-accent to-violet text-accent-foreground mb-4">
              <Award className="h-7 w-7" />
            </div>
            <p className="font-semibold">{c.title}</p>
            <p className="mt-1 text-xs text-muted-foreground">Verified</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Tools() {
  const tools = [
    "Python", "SQL", "Power BI", "Excel", "Pandas", "NumPy",
    "Matplotlib", "Seaborn", "Scikit-learn", "DAX", "Power Query", "ETL",
  ];
  return (
    <Section id="tools" eyebrow="Stack" title="Tools & technologies." alt>
      <div className="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-6 gap-4">
        {tools.map((t) => (
          <div
            key={t}
            className="glass rounded-2xl p-5 text-center hover:-translate-y-1 hover:shadow-glow transition cursor-default"
          >
            <div className="mx-auto h-10 w-10 grid place-items-center rounded-xl bg-primary/5 text-primary mb-2">
              <span className="font-bold text-sm">{t.slice(0, 2)}</span>
            </div>
            <p className="text-sm font-medium">{t}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Services() {
  const services = [
    { icon: BarChart3, title: "Data Analysis", desc: "Turn raw datasets into clear, structured insight." },
    { icon: LineChart, title: "Dashboard Development", desc: "Interactive Power BI & Excel dashboards." },
    { icon: PieChart, title: "BI Reporting", desc: "Stakeholder-ready business intelligence reporting." },
    { icon: Sparkles, title: "Data Visualization", desc: "Charts and visuals that tell a story." },
    { icon: Database, title: "SQL Reporting", desc: "Optimised queries & analytical reports." },
    { icon: TrendingUp, title: "KPI Reporting", desc: "Track what matters with clean KPI views." },
    { icon: CheckCircle2, title: "Data Cleaning & Validation", desc: "Trustworthy, decision-ready data." },
    { icon: Brain, title: "Exploratory Data Analysis", desc: "Find the patterns hiding in the noise." },
  ];
  return (
    <Section
      id="services"
      eyebrow="What I do"
      title={<>Services I offer.</>}
      subtitle="Bring me into your data workflow — from cleaning to dashboard delivery."
    >
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {services.map((s, i) => (
          <div key={i} className="group glass rounded-3xl p-6 hover:-translate-y-1 hover:shadow-glow transition">
            <div className="grid place-items-center h-12 w-12 rounded-xl bg-accent/10 text-accent group-hover:bg-accent group-hover:text-accent-foreground transition mb-4">
              <s.icon className="h-6 w-6" />
            </div>
            <h3 className="font-bold">{s.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  return (
    <Section
      id="contact"
      eyebrow="Get in touch"
      title={<>Let's build something with <span className="text-gradient">your data.</span></>}
      subtitle="I'm open to data analyst roles, internships and freelance dashboard projects."
      alt
    >
      <div className="grid lg:grid-cols-5 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {[
            { icon: Linkedin, label: "LinkedIn", value: "linkedin.com/in/karthika-selvam-490723333", href: "https://linkedin.com/in/karthika-selvam-490723333" },
            { icon: Phone, label: "Phone", value: "+91 98765 43210", href: "tel:+919876543210" },
            { icon: Mail, label: "Email", value: "karthika.selvam@gmail.com", href: "mailto:karthika.selvam@gmail.com" },
            { icon: MapPin, label: "Location", value: "Tamil Nadu, India" },
          ].map((c, i) => {
            const Inner = (
              <>
                <div className="grid place-items-center h-11 w-11 rounded-xl bg-primary text-primary-foreground">
                  <c.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{c.label}</p>
                  <p className="font-semibold">{c.value}</p>
                </div>
              </>
            );
            return c.href ? (
              <a key={i} href={c.href} className="flex items-center gap-4 glass rounded-2xl p-4 hover:-translate-y-0.5 hover:shadow-soft transition">{Inner}</a>
            ) : (
              <div key={i} className="flex items-center gap-4 glass rounded-2xl p-4">{Inner}</div>
            );
          })}
        </div>

        <form
          ref={formRef}
          onSubmit={async (e) => {
            e.preventDefault();
            if (!formRef.current) return;
            setSending(true);
            setError(null);
            try {
              const emailjs = (await import("@emailjs/browser")).default;
              await emailjs.sendForm(
                "service_f8djxoo",
                "template_6ka01xi",
                formRef.current,
                { publicKey: "Wi9qKyIFmdD7WRDG1" },
              );
              formRef.current.reset();
              setSent(true);
              setTimeout(() => setSent(false), 4000);
            } catch (err) {
              console.error(err);
              setError("Failed to send. Please try again or email directly.");
            } finally {
              setSending(false);
            }
          }}
          className="lg:col-span-3 glass rounded-3xl p-7 space-y-4"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Name" name="name" placeholder="Your name" />
            <Field label="Email" name="email" type="email" placeholder="you@email.com" />
          </div>
          <Field label="Subject" name="subject" placeholder="Let's talk about…" />
          <div>
            <label className="text-xs font-medium text-muted-foreground">Message</label>
            <textarea
              required
              rows={5}
              name="message"
              placeholder="Tell me about your project or role…"
              className="mt-1.5 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition resize-none"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={sending}
            className="inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-primary-foreground hover:opacity-90 transition shadow-soft disabled:opacity-60"
          >
            {sent ? (
              <><CheckCircle2 className="h-4 w-4" /> Message sent</>
            ) : sending ? (
              <>Sending…</>
            ) : (
              <>Send message <Send className="h-4 w-4" /></>
            )}
          </button>
        </form>
      </div>
    </Section>
  );
}

function Field({ label, name, type = "text", placeholder }: { label: string; name: string; type?: string; placeholder?: string }) {
  return (
    <div>
      <label htmlFor={name} className="text-xs font-medium text-muted-foreground">{label}</label>
      <input
        id={name}
        name={name}
        type={type}
        required
        placeholder={placeholder}
        className="mt-1.5 w-full rounded-xl border border-border bg-background/60 px-4 py-3 text-sm outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition"
      />
    </div>
  );
}

function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-6 py-12 grid md:grid-cols-3 gap-8 items-center">
        <div className="flex items-center gap-2">
          <span className="grid place-items-center h-9 w-9 rounded-xl bg-primary text-primary-foreground font-bold">K</span>
          <div>
            <p className="font-semibold">Karthika Selvam</p>
            <p className="text-xs text-muted-foreground">Data Analyst</p>
          </div>
        </div>
        <nav className="flex flex-wrap justify-center gap-5 text-sm text-muted-foreground">
          {NAV.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="hover:text-foreground transition">{n.label}</a>
          ))}
        </nav>
        <div className="flex md:justify-end items-center gap-2">
          <SocialIcon href="https://linkedin.com" label="LinkedIn"><Linkedin className="h-4 w-4" /></SocialIcon>
          <SocialIcon href="mailto:karthika@example.com" label="Email"><Mail className="h-4 w-4" /></SocialIcon>
          <SocialIcon href="https://github.com" label="GitHub"><Github className="h-4 w-4" /></SocialIcon>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto max-w-7xl px-6 py-5 flex flex-wrap items-center justify-between gap-3 text-xs text-muted-foreground">
          <p>© {new Date().getFullYear()} Karthika Selvam. All rights reserved.</p>
          <p className="flex items-center gap-1.5"><Briefcase className="h-3.5 w-3.5" /> Open to data analyst opportunities</p>
        </div>
      </div>
    </footer>
  );
}
