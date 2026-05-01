import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "@/hooks/use-toast";

/* ----------------------------- schema ----------------------------- */

const leadSchema = z.object({
  service: z.string().min(1, "Vyberte službu"),
  goal: z.string().trim().min(3, "Popíšte cieľ aspoň 3 znakmi").max(2000),
  company: z.string().trim().max(150).optional().or(z.literal("")),
  website: z.string().trim().max(255).optional().or(z.literal("")),
  instagram: z.string().trim().max(150).optional().or(z.literal("")),
  budget: z.string().min(1, "Vyberte rozpočet"),
  timeline: z.string().min(1, "Vyberte timing"),
  name: z.string().trim().min(2, "Zadajte meno").max(100),
  email: z.string().trim().email("Neplatný email").max(255),
  phone: z.string().trim().min(6, "Zadajte telefón").max(40),
});

type LeadForm = z.infer<typeof leadSchema>;

const SERVICES = [
  { v: "web", t: "Web / aplikácia" },
  { v: "software", t: "Softvér na mieru" },
  { v: "marketing", t: "Marketing & kampane" },
  { v: "ai", t: "AI & automatizácia" },
  { v: "branding", t: "Branding & dizajn" },
  { v: "ine", t: "Niečo iné" },
];

const BUDGETS = [
  { v: "<2000", t: "Do 2 000 €" },
  { v: "2000-5000", t: "2 000 – 5 000 €" },
  { v: "5000-15000", t: "5 000 – 15 000 €" },
  { v: "15000+", t: "15 000 € +" },
  { v: "neviem", t: "Ešte neviem" },
];

const TIMELINES = [
  { v: "asap", t: "Hneď ako sa dá" },
  { v: "1m", t: "Do 1 mesiaca" },
  { v: "3m", t: "Do 3 mesiacov" },
  { v: "flex", t: "Flexibilne" },
];

/* ----------------------------- ui bits ----------------------------- */

const stepTitles = ["Služba & cieľ", "Brand basics", "Rozpočet & timing", "Kontakt"];

const inputCls =
  "w-full bg-transparent border-b border-white/15 py-4 text-lg outline-none focus:border-white transition-colors text-white placeholder:text-white/30";

const labelCls = "uppercase text-[10px] tracking-[0.25em] text-white/55 block mb-3";

const ChoicePill = ({
  active,
  children,
  onClick,
}: {
  active: boolean;
  children: React.ReactNode;
  onClick: () => void;
}) => (
  <button
    type="button"
    onClick={onClick}
    className={`text-left px-5 py-4 rounded-md border transition-all ${
      active
        ? "border-white bg-white text-black"
        : "border-white/15 text-white/85 hover:border-white/40 hover:bg-white/[0.03]"
    }`}
  >
    {children}
  </button>
);

/* ----------------------------- page ----------------------------- */

const Apply = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [form, setForm] = useState<LeadForm>({
    service: "",
    goal: "",
    company: "",
    website: "",
    instagram: "",
    budget: "",
    timeline: "",
    name: "",
    email: "",
    phone: "",
  });

  useEffect(() => {
    document.title = "Apply — AGENCIA";
    const meta =
      document.querySelector('meta[name="description"]') ||
      Object.assign(document.createElement("meta"), { name: "description" });
    meta.setAttribute(
      "content",
      "Pošlite nám prihlášku — odpovieme do 24 hodín. Web, softvér, marketing, AI a branding."
    );
    if (!meta.parentNode) document.head.appendChild(meta);
  }, []);

  const set = <K extends keyof LeadForm>(k: K, v: LeadForm[K]) =>
    setForm((f) => ({ ...f, [k]: v }));

  const stepValid = useMemo(() => {
    if (step === 0) return form.service.length > 0 && form.goal.trim().length >= 3;
    if (step === 1) return true; // brand basics optional
    if (step === 2) return form.budget.length > 0 && form.timeline.length > 0;
    if (step === 3)
      return (
        form.name.trim().length >= 2 &&
        form.phone.trim().length >= 6 &&
        /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())
      );
    return false;
  }, [step, form]);

  const next = () => {
    if (!stepValid) return;
    if (step < 3) setStep((s) => s + 1);
    else void submit();
  };

  const prev = () => setStep((s) => Math.max(0, s - 1));

  const submit = async () => {
    const parsed = leadSchema.safeParse(form);
    if (!parsed.success) {
      const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
      toast({ title: "Skontrolujte údaje", description: first ?? "Niektoré pole je neplatné." });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("leads").insert({
      name: parsed.data.name,
      email: parsed.data.email,
      phone: parsed.data.phone,
      company: parsed.data.company || null,
      website: parsed.data.website || null,
      instagram: parsed.data.instagram || null,
      service: parsed.data.service,
      goal: parsed.data.goal,
      budget: parsed.data.budget,
      timeline: parsed.data.timeline,
      source: "apply_form",
    });
    setSubmitting(false);
    if (error) {
      toast({ title: "Nepodarilo sa odoslať", description: error.message });
      return;
    }
    setDone(true);
  };

  /* ---- success screen ---- */
  if (done) {
    return (
      <main className="min-h-screen bg-[#0a0a0a] text-white flex items-center justify-center px-6">
        <div className="max-w-xl text-center">
          <div className="mx-auto w-14 h-14 rounded-full border border-white/20 flex items-center justify-center mb-8">
            <Check className="w-6 h-6" />
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">Prihláška odoslaná.</h1>
          <p className="mt-5 text-white/60 max-w-md mx-auto">
            Ďakujeme — ozveme sa do 24 hodín na <span className="text-white">{form.email}</span>{" "}
            alebo <span className="text-white">{form.phone}</span>.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-10 inline-flex items-center gap-2 px-6 py-4 text-xs uppercase tracking-[0.2em] border border-white/20 hover:bg-white hover:text-black transition-colors rounded-md"
          >
            <ArrowLeft className="w-4 h-4" /> Späť na hlavnú
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#0a0a0a] text-white">
      {/* nav */}
      <header className="fixed top-0 left-0 right-0 z-50">
        <div className="px-6 md:px-10 h-14 flex items-center justify-between text-[11px] uppercase tracking-[0.18em]">
          <Link to="/" className="font-medium">AGENCIA</Link>
          <Link to="/" className="text-white/60 hover:text-white transition-colors flex items-center gap-2">
            <ArrowLeft className="w-3 h-3" /> Zatvoriť
          </Link>
        </div>
        {/* progress */}
        <div className="h-[2px] bg-white/10">
          <div
            className="h-full bg-white transition-all duration-500"
            style={{ width: `${((step + 1) / 4) * 100}%` }}
          />
        </div>
      </header>

      {/* content */}
      <section className="pt-32 pb-32 px-6 md:px-12">
        <div className="max-w-2xl mx-auto">
          <p className={labelCls}>
            Krok {step + 1} / 4 — {stepTitles[step]}
          </p>

          {step === 0 && (
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
                  S čím vám máme pomôcť?
                </h2>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {SERVICES.map((s) => (
                    <ChoicePill
                      key={s.v}
                      active={form.service === s.v}
                      onClick={() => set("service", s.v)}
                    >
                      {s.t}
                    </ChoicePill>
                  ))}
                </div>
              </div>
              <div>
                <label className={labelCls}>Aký je cieľ projektu?</label>
                <textarea
                  rows={3}
                  value={form.goal}
                  onChange={(e) => set("goal", e.target.value)}
                  placeholder="Napr. spustiť eshop, zvýšiť leady o 30 %, automatizovať fakturáciu…"
                  className={inputCls + " resize-none"}
                />
              </div>
            </div>
          )}

          {step === 1 && (
            <div className="space-y-10">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
                Povedzte nám o značke.
              </h2>
              <div>
                <label className={labelCls}>Názov firmy</label>
                <input
                  value={form.company}
                  onChange={(e) => set("company", e.target.value)}
                  className={inputCls}
                  placeholder="ACME s.r.o."
                />
              </div>
              <div>
                <label className={labelCls}>Web</label>
                <input
                  value={form.website}
                  onChange={(e) => set("website", e.target.value)}
                  className={inputCls}
                  placeholder="https://…"
                />
              </div>
              <div>
                <label className={labelCls}>Instagram / sociálne siete</label>
                <input
                  value={form.instagram}
                  onChange={(e) => set("instagram", e.target.value)}
                  className={inputCls}
                  placeholder="@vasaznacka"
                />
              </div>
              <p className="text-xs text-white/40">Tento krok je voliteľný — preskočte, ak ešte nemáte.</p>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-12">
              <div>
                <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
                  Aký rozpočet zvažujete?
                </h2>
                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {BUDGETS.map((b) => (
                    <ChoicePill
                      key={b.v}
                      active={form.budget === b.v}
                      onClick={() => set("budget", b.v)}
                    >
                      {b.t}
                    </ChoicePill>
                  ))}
                </div>
              </div>
              <div>
                <p className={labelCls}>Kedy chcete začať?</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {TIMELINES.map((t) => (
                    <ChoicePill
                      key={t.v}
                      active={form.timeline === t.v}
                      onClick={() => set("timeline", t.v)}
                    >
                      {t.t}
                    </ChoicePill>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="space-y-10">
              <h2 className="text-3xl md:text-5xl font-semibold tracking-tight leading-[1.05]">
                Kam sa máme ozvať?
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-8">
                <div className="sm:col-span-2">
                  <label className={labelCls}>Meno a priezvisko *</label>
                  <input
                    value={form.name}
                    onChange={(e) => set("name", e.target.value)}
                    className={inputCls}
                    maxLength={100}
                  />
                </div>
                <div>
                  <label className={labelCls}>Email *</label>
                  <input
                    type="email"
                    value={form.email}
                    onChange={(e) => set("email", e.target.value)}
                    className={inputCls}
                    maxLength={255}
                  />
                </div>
                <div>
                  <label className={labelCls}>Telefón *</label>
                  <input
                    type="tel"
                    value={form.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    className={inputCls}
                    maxLength={40}
                  />
                </div>
              </div>
              <p className="text-xs text-white/45">
                Odoslaním súhlasíte so spracovaním údajov za účelom nadviazania spolupráce.
                Odpovedáme do 24 hodín.
              </p>
            </div>
          )}

          {/* nav buttons */}
          <div className="mt-16 flex items-center justify-between">
            <button
              type="button"
              onClick={prev}
              disabled={step === 0}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/55 hover:text-white transition-colors disabled:opacity-30 disabled:hover:text-white/55"
            >
              <ArrowLeft className="w-4 h-4" /> Späť
            </button>
            <button
              type="button"
              onClick={next}
              disabled={!stepValid || submitting}
              className="inline-flex items-center gap-2 px-7 py-4 text-xs uppercase tracking-[0.2em] font-medium rounded-md transition-all disabled:opacity-40 disabled:cursor-not-allowed"
              style={{ backgroundColor: "hsl(var(--brand-accent))", color: "hsl(0 0% 96%)" }}
            >
              {submitting ? "Odosielam…" : step === 3 ? "Odoslať prihlášku" : "Pokračovať"}
              {!submitting && <ArrowRight className="w-4 h-4" />}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Apply;