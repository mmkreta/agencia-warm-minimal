const steps = [
  { n: "01", title: "Videohovor", desc: "Spoznáme sa a prejdeme tvoju víziu." },
  { n: "02", title: "MVP", desc: "Prvá funkčná verzia v krátkom čase." },
  { n: "03", title: "Kontrakt", desc: "Jasné podmienky a transparentnosť." },
  { n: "04", title: "Odovzdanie", desc: "Spustenie naživo a školenie." },
  { n: "05", title: "Support 24/7", desc: "Som tu pre teba aj po launchi." },
];

const Process = () => (
  <section id="proces" className="px-6 md:px-10 py-32 md:py-48 bg-[hsl(0_0%_96%)] text-[hsl(0_0%_4%)]">
    <div className="max-w-[1200px] mx-auto">
      <div className="flex items-end justify-between mb-16">
        <p className="reveal uppercase text-xs tracking-[0.2em] text-[hsl(0_0%_4%/0.6)]">Proces</p>
        <p className="reveal hidden md:block uppercase text-xs tracking-[0.2em] text-[hsl(0_0%_4%/0.4)]">5 krokov</p>
      </div>

      {/* Cards row — horizontal scroll on mobile, equal flex on desktop */}
      <div className="flex gap-3 md:gap-2 items-stretch overflow-x-auto md:overflow-visible snap-x snap-mandatory md:snap-none -mx-6 px-6 md:mx-0 md:px-0 pb-4 md:pb-0 justify-center">
        {steps.flatMap((s, i) => [
          <article
            key={s.n}
            className="reveal group snap-center shrink-0 md:shrink-0 md:basis-0 md:flex-1 w-[78%] sm:w-[55%] bg-[#111] text-[hsl(0_0%_96%)] rounded-2xl p-5 md:p-6 flex flex-col justify-between min-h-[260px] md:min-h-[280px] border border-transparent transition-all duration-500 ease-out hover:scale-[1.02] hover:border-[hsl(0_0%_96%/0.25)] hover:shadow-[0_0_40px_-8px_hsl(0_0%_96%/0.15)]"
            style={{ transitionDelay: `${i * 100}ms` }}
          >
            <span
              className="font-light leading-none text-[hsl(0_0%_96%)]"
              style={{ fontSize: "44px", opacity: 0.2 }}
            >
              {s.n}
            </span>
            <div>
              <h3 className="text-base md:text-lg font-semibold tracking-tight whitespace-nowrap">{s.title}</h3>
              <p className="mt-2 text-xs md:text-[13px] leading-relaxed text-[hsl(0_0%_96%/0.55)] whitespace-normal">{s.desc}</p>
            </div>
          </article>,
          i < steps.length - 1 ? (
            <div
              key={`arrow-${i}`}
              className="hidden md:flex items-center justify-center shrink-0 w-4 text-lg text-[hsl(0_0%_4%/0.3)] select-none"
            >
              →
            </div>
          ) : null,
        ])}
      </div>
    </div>
  </section>
);

export default Process;