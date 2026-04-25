import { Phone, Rocket, FileText, Package, Headphones } from "lucide-react";

const steps = [
  { n: "01", title: "Videohovor", desc: "Spoznáme sa", Icon: Phone, dark: true },
  { n: "02", title: "MVP", desc: "Prvá funkčná verzia", Icon: Rocket, dark: true },
  { n: "03", title: "Kontrakt", desc: "Jasné podmienky", Icon: FileText, dark: false },
  { n: "04", title: "Odovzdanie", desc: "Spustenie naživo", Icon: Package, dark: false },
  { n: "05", title: "Support 24/7", desc: "Som tu pre teba", Icon: Headphones, dark: false },
];

const Process = () => (
  <section id="proces" className="px-6 md:px-12 py-32 md:py-48 bg-[hsl(0_0%_96%)] text-[hsl(0_0%_4%)]">
    <div className="max-w-[1400px] mx-auto">
      <p className="reveal uppercase text-xs tracking-[0.2em] text-[hsl(0_0%_4%/0.6)] mb-16">Proces</p>

      {/* Desktop horizontal timeline */}
      <div className="hidden md:block relative">
        <div className="absolute left-0 right-0 top-10 h-px bg-[hsl(0_0%_4%/0.15)]" />
        <div className="relative grid grid-cols-5 gap-6">
          {steps.map(({ n, title, desc, Icon, dark }, i) => (
            <div
              key={n}
              className="reveal flex flex-col items-start"
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div
                className={`w-20 h-20 rounded-full flex items-center justify-center ${
                  dark
                    ? "bg-[hsl(0_0%_4%)] text-[hsl(0_0%_96%)]"
                    : "bg-[hsl(0_0%_85%)] text-[hsl(0_0%_45%)]"
                }`}
              >
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <span className="mt-6 text-xs tracking-[0.2em] text-[hsl(0_0%_4%/0.5)]">{n}</span>
              <h3 className="mt-2 text-lg font-semibold">{title}</h3>
              <p className="mt-1 text-sm text-[hsl(0_0%_4%/0.65)]">{desc}</p>
              <a href="#kontakt" className="mt-4 text-[10px] uppercase tracking-[0.2em] border-b border-[hsl(0_0%_4%)] pb-0.5 hover:opacity-60 transition-opacity">
                Viac info →
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile vertical timeline */}
      <div className="md:hidden relative">
        <div className="absolute left-10 top-0 bottom-0 w-px bg-[hsl(0_0%_4%/0.15)]" />
        <div className="space-y-12">
          {steps.map(({ n, title, desc, Icon, dark }, i) => (
            <div
              key={n}
              className="reveal relative flex gap-6 items-start"
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div
                className={`relative z-10 w-20 h-20 shrink-0 rounded-full flex items-center justify-center ${
                  dark
                    ? "bg-[hsl(0_0%_4%)] text-[hsl(0_0%_96%)]"
                    : "bg-[hsl(0_0%_85%)] text-[hsl(0_0%_45%)]"
                }`}
              >
                <Icon size={26} strokeWidth={1.5} />
              </div>
              <div className="pt-2">
                <span className="text-xs tracking-[0.2em] text-[hsl(0_0%_4%/0.5)]">{n}</span>
                <h3 className="mt-1 text-lg font-semibold">{title}</h3>
                <p className="mt-1 text-sm text-[hsl(0_0%_4%/0.65)]">{desc}</p>
                <a href="#kontakt" className="inline-block mt-3 text-[10px] uppercase tracking-[0.2em] border-b border-[hsl(0_0%_4%)] pb-0.5">
                  Viac info →
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default Process;