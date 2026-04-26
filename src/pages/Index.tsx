import { useEffect, useRef } from "react";
import Process from "@/components/Process";
import Testimonial from "@/components/Testimonial";
import BigCta from "@/components/BigCta";
import TopForm from "@/components/TopForm";
import ContactForm from "@/components/ContactForm";
import ScrollRevealText from "@/components/ScrollRevealText";
import useScrambleOnClick from "@/hooks/useScrambleOnClick";

const projects = [
  {
    id: "A001",
    name: "Webové stránky & aplikácie",
    desc: "Moderný web, ktorý pracuje za vás. Od prvého dojmu po konverziu.",
    gradient: "from-zinc-800 via-zinc-900 to-black",
  },
  {
    id: "A002",
    name: "Inteligentné systémy",
    desc: "CRM, dashboardy a nástroje, ktoré vám dajú prehľad a ušetria čas.",
    gradient: "from-neutral-800 via-neutral-900 to-black",
  },
  {
    id: "A003",
    name: "Marketing s výsledkami",
    desc: "Kampane, kde viete presne, čo každé euro prinieslo.",
    gradient: "from-stone-800 via-stone-900 to-black",
  },
  {
    id: "A004",
    name: "AI pre váš biznis",
    desc: "Automatizácia, chatboty a nástroje, ktoré pracujú 24/7.",
    gradient: "from-zinc-700 via-zinc-900 to-black",
  },
  {
    id: "A005",
    name: "Značka, ktorú si pamätajú",
    desc: "Logo, vizuál a identita, ktorá vytvára dôveru od prvej sekundy.",
    gradient: "from-neutral-700 via-neutral-900 to-black",
  },
];

const services: { title: string; desc: string }[] = [
  { title: "Webové stránky & aplikácie", desc: "Od návrhu po nasadenie, optimalizované na konverzie." },
  { title: "Softvér na mieru", desc: "Systémy presne pre váš biznis, nie kompromisy." },
  { title: "Platené kampane", desc: "Meta, Google, SEO — transparentne a merateľne." },
  { title: "AI & automatizácia", desc: "Ušetrite hodiny denne, nech systém robí za vás." },
  { title: "Branding & dizajn", desc: "Prvý dojem, ktorý otvára dvere." },
  { title: "Obsah & kreatíva", desc: "Video, foto, copy — obsah čo zaujme aj konvertuje." },
];

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

const Nav = () => (
  <header className="absolute top-0 left-0 right-0 z-50">
    <nav className="px-6 md:px-10 h-9 flex items-center justify-between text-[11px] uppercase tracking-[0.18em]">
      <a href="#top" className="font-medium">AGENCIA</a>
      <ul className="hidden md:flex items-center gap-10 text-foreground/80">
        <li><a href="#projekty" className="hover:text-foreground transition-colors">Projekty</a></li>
        <li><a href="#sluzby" className="hover:text-foreground transition-colors">Služby</a></li>
      </ul>
      <ul className="hidden md:flex items-center gap-10 text-foreground/80">
        <li><a href="#proces" className="hover:text-foreground transition-colors">Proces</a></li>
        <li><a href="#dohodnut" className="hover:text-foreground transition-colors">Stretnutie</a></li>
      </ul>
      <a href="#kontakt" className="hover:text-foreground transition-colors">Kontakt</a>
    </nav>
  </header>
);

const Hero = () => (
  <section id="top" className="relative min-h-screen flex flex-col px-6 md:px-10 pt-10 pb-10" style={{ backgroundColor: "hsl(40 20% 96%)" }}>
    <Nav />
    <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6 mt-0">
      <div className="md:col-span-5 relative aspect-[3/4] md:aspect-auto overflow-hidden animate-[fadeIn_1s_ease-out]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, #2a2a2a 0%, #161616 45%, #0a0a0a 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 4px)" }} />
      </div>
      <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto overflow-hidden animate-[fadeIn_1.3s_ease-out]">
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(135deg, #1f1f1f 0%, #141414 50%, #0a0a0a 100%)",
          }}
        />
        <div className="absolute inset-0 opacity-[0.05] mix-blend-overlay" style={{ backgroundImage: "radial-gradient(circle at 70% 60%, #fff 0%, transparent 60%)" }} />
      </div>
    </div>

    {/* Badge */}
    <div className="absolute left-6 md:left-10 bottom-8 flex items-center gap-3 animate-[fadeIn_1.6s_ease-out]">
      <span
        className="inline-flex items-center px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] font-medium text-background"
        style={{ backgroundColor: "hsl(var(--brand-accent))" }}
      >
        Voľná kapacita: 3 miesta
      </span>
    </div>
    <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(12px) } to { opacity: 1; transform: translateY(0) } }`}</style>
  </section>
);

const ProjectCard = ({ p }: { p: (typeof projects)[number] }) => (
  <article className="reveal group cursor-pointer">
    <div
      className={`relative aspect-[16/9] overflow-hidden transition-transform duration-[600ms] ease-out group-hover:scale-[1.02] bg-gradient-to-br ${p.gradient}`}
    >
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, #fff 0%, transparent 55%)" }} />
      <span className="absolute top-6 left-6 label-eyebrow">{p.id}</span>
      <div className="absolute bottom-6 left-6 right-6 flex flex-col gap-3 md:flex-row md:items-end md:justify-between md:gap-8">
        <h3 className="text-xl md:text-2xl font-semibold tracking-tight shrink-0">{p.name}</h3>
        <span className="text-xs md:text-sm text-foreground/60 max-w-[60ch] leading-relaxed">{p.desc}</span>
      </div>
    </div>
  </article>
);

const Projects = () => (
  <section id="projekty" className="px-6 md:px-12 py-16 md:py-24" style={{ backgroundColor: "hsl(40 20% 96%)", color: "hsl(0 0% 8%)" }}>
    <div className="max-w-[1400px] mx-auto">
      <div className="space-y-6 md:space-y-8">
        <ProjectCard p={projects[0]} />
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          <ProjectCard p={projects[1]} />
          <ProjectCard p={projects[2]} />
        </div>
        <ProjectCard p={projects[3]} />
        <ProjectCard p={projects[4]} />
      </div>
    </div>
  </section>
);

const Services = () => (
  <section id="sluzby" className="px-6 md:px-12 py-32 md:py-48" style={{ backgroundColor: "#F5F5F0", color: "hsl(0 0% 4%)" }}>
    <div className="max-w-[1400px] mx-auto">
      <p className="reveal uppercase text-[10px] tracking-[0.25em] text-[hsl(0_0%_4%/0.55)] mb-6">Služby</p>
      <h2 className="reveal font-light leading-[1.1] tracking-[-0.02em] mb-16" style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}>
        Kompletné riešenia pod jednou strechou
      </h2>
      <ul>
        {services.map((s, i) => (
          <li
            key={s.title}
            className="reveal group border-t border-[hsl(0_0%_4%/0.12)] last:border-b py-8 md:py-10 flex flex-col md:flex-row md:items-baseline gap-3 md:gap-8 cursor-pointer transition-transform duration-[600ms] ease-out hover:translate-x-2"
          >
            <span className="uppercase text-[10px] tracking-[0.25em] text-[hsl(0_0%_4%/0.55)] w-12 shrink-0">{String(i + 1).padStart(2, "0")}</span>
            <div className="flex-1 flex flex-col md:flex-row md:items-baseline md:justify-between gap-2 md:gap-8">
              <span className="font-normal" style={{ fontSize: "clamp(1.2rem, 2.5vw, 2rem)" }}>{s.title}</span>
              <span className="text-sm md:text-base text-[hsl(0_0%_4%/0.55)] md:text-right md:max-w-[44ch]">{s.desc}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  </section>
);

const Contact = () => (
  <section
    id="kontakt"
    className="px-6 md:px-12 py-32 md:py-48"
    style={{ backgroundColor: "#F5F5F0", color: "hsl(0 0% 4%)" }}
  >
    <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-16 md:gap-24">
      <div className="reveal">
        <p className="uppercase text-[10px] tracking-[0.25em] text-[hsl(0_0%_4%/0.55)] mb-6">
          Kontakt
        </p>
        <h2
          className="font-semibold leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2rem, 5vw, 4rem)" }}
        >
          Nový projekt na obzore?
        </h2>
        <p
          className="mt-6 text-[hsl(0_0%_4%/0.7)] max-w-[42ch]"
          style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
        >
          Napíšte nám pár slov. Ozveme sa do 24 hodín a navrhneme ďalšie kroky.
        </p>
        <div className="mt-12 space-y-4">
          <a
            href="mailto:info@agencia.sk"
            className="block font-medium underline-offset-8 hover:underline transition-all"
            style={{ fontSize: "clamp(1.25rem, 2.5vw, 2rem)" }}
          >
            info@agencia.sk
          </a>
          <p className="text-[hsl(0_0%_4%/0.7)]" style={{ fontSize: "clamp(1rem, 1.5vw, 1.25rem)" }}>
            +421 902 177 653
          </p>
          <p className="text-[hsl(0_0%_4%/0.6)]">Bratislava, Slovensko</p>
        </div>
        <p className="mt-12 uppercase text-[10px] tracking-[0.25em] text-[hsl(0_0%_4%/0.55)]">
          0€ vopred · Platíte po dodaní · Odpovieme do 24h
        </p>
      </div>
      <div className="self-center">
        <ContactForm variant="warm" buttonLabel="Dohodnúť stretnutie →" />
      </div>
    </div>
  </section>
);

const Footer = () => (
  <footer className="border-t border-border px-6 md:px-12 py-10">
    <div className="max-w-[1400px] mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-4 text-sm">
      <p className="font-medium tracking-[0.05em]">
        AGENCIA — <span className="text-foreground/60">Stratégia. Softvér. Rast.</span>
      </p>
      <p className="text-xs text-foreground/55">
        © 2026 Michalka Summit s.r.o. · Bratislava, Slovensko
      </p>
    </div>
  </footer>
);

const Index = () => {
  useReveal();
  useScrambleOnClick();
  const ref = useRef<HTMLDivElement>(null);
  return (
    <div ref={ref} className="bg-background text-foreground min-h-screen">
      <main>
        <Hero />
        <ScrollRevealText />
        <TopForm />
        <Projects />
        <Services />
        <Process />
        <Testimonial />
        <BigCta />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
