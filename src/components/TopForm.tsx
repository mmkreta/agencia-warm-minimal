import ContactForm from "./ContactForm";

const TopForm = () => (
  <section
    id="dohodnut"
    className="px-6 md:px-12 pt-6 pb-16 md:pt-8 md:pb-24"
    style={{ backgroundColor: "#0a0a0a", color: "hsl(0 0% 96%)" }}
  >
    <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-14 md:gap-24 items-start">
      <div className="reveal">
        <p className="uppercase text-[10px] tracking-[0.25em] text-white/55 mb-6">
          Kontakt
        </p>
        <h2
          className="font-semibold leading-[1.0] tracking-[-0.03em]"
          style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}
        >
          Začnime spolu.
        </h2>
        <p
          className="mt-6 text-white/65 max-w-[42ch]"
          style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
        >
          15 minút, zadarmo, bez záväzkov. Poviete čo potrebujete — my navrhneme riešenie.
        </p>
      </div>
      <ContactForm variant="dark-compact" buttonLabel="Dohodnúť stretnutie →" />
    </div>
  </section>
);

export default TopForm;
