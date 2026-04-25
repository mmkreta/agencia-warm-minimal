import { useState } from "react";

type Variant = "warm" | "warm-compact" | "dark-compact";

interface ContactFormProps {
  variant?: Variant;
  buttonLabel?: string;
  helperText?: string;
  includeMessage?: boolean;
}

const ContactForm = ({
  variant = "warm",
  buttonLabel = "Dohodnúť stretnutie →",
  helperText = "Odpovieme do 24 hodín.",
  includeMessage = true,
}: ContactFormProps) => {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "err">("idle");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.phone.trim()) return;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "ok" : "err");
      if (res.ok) setForm({ name: "", phone: "", email: "", message: "" });
    } catch {
      setStatus("err");
    }
  };

  const isDark = variant === "dark-compact";

  const inputCls = isDark
    ? "w-full bg-[#1a1a1a] border border-white/10 rounded-md px-4 py-4 outline-none focus:border-white/40 transition-colors text-[hsl(0_0%_96%)] placeholder:text-white/30"
    : "w-full bg-transparent border-b border-[hsl(0_0%_4%/0.2)] py-3 outline-none focus:border-[hsl(0_0%_4%)] transition-colors text-[hsl(0_0%_4%)] placeholder:text-[hsl(0_0%_4%/0.4)]";

  const labelCls = isDark
    ? "uppercase text-[10px] tracking-[0.25em] text-white/55 block mb-3"
    : "uppercase text-[10px] tracking-[0.2em] text-[hsl(0_0%_4%/0.55)] block mb-2";

  const helperCls = isDark
    ? "text-xs text-white/50"
    : "text-xs text-[hsl(0_0%_4%/0.55)]";

  const compact = variant === "warm-compact" || variant === "dark-compact";
  const gridCls = compact
    ? "grid grid-cols-1 md:grid-cols-2 gap-5"
    : "flex flex-col gap-5";

  return (
    <form onSubmit={submit} className="reveal w-full">
      <div className={gridCls}>
        <div>
          <label className={labelCls}>Meno *</label>
          <input
            required
            maxLength={100}
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputCls}
          />
        </div>
        <div>
          <label className={labelCls}>Telefón *</label>
          <input
            required
            type="tel"
            maxLength={40}
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className={inputCls}
          />
        </div>
        <div className={compact ? "md:col-span-2" : ""}>
          <label className={labelCls}>Email</label>
          <input
            type="email"
            maxLength={255}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className={inputCls}
          />
        </div>
        {includeMessage && (
          <div className={compact ? "md:col-span-2" : ""}>
            <label className={labelCls}>Čo riešite?</label>
            <textarea
              maxLength={2000}
              rows={compact ? 2 : 4}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={inputCls + " resize-none"}
            />
          </div>
        )}
      </div>

      <div className={`${isDark ? "mt-10" : "mt-8"} flex flex-col gap-3 items-start`}>
        <button
          type="submit"
          disabled={status === "sending"}
          className={`inline-flex items-center gap-2 ${isDark ? "px-8 py-5 text-sm" : "px-6 py-4 text-xs"} uppercase tracking-[0.2em] font-medium text-[hsl(0_0%_96%)] hover:opacity-90 transition-opacity disabled:opacity-40 rounded-md`}
          style={{ backgroundColor: "hsl(var(--brand-accent))" }}
        >
          {status === "sending"
            ? "Odosielam…"
            : status === "ok"
            ? "Odoslané ✓"
            : buttonLabel}
        </button>
        <p className={helperCls}>{helperText}</p>
        {status === "err" && (
          <p className="text-xs text-destructive">Nepodarilo sa odoslať. Skúste to znova.</p>
        )}
      </div>
    </form>
  );
};

export default ContactForm;
