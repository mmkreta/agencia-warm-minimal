import ContactForm from "./ContactForm";

const TopForm = () => (
  <section
    id="dohodnut"
    className="px-6 md:px-12 py-24 md:py-32"
    style={{ backgroundColor: "#F5F5F0", color: "hsl(0 0% 4%)" }}
  >
    <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-12 md:gap-20 items-start">
      <div className="reveal">
        <p className="uppercase text-[10px] tracking-[0.25em] text-[hsl(0_0%_4%/0.55)] mb-6">
          Kontakt
        </p>
        <h2
          className="font-semibold leading-[1.05] tracking-[-0.02em]"
          style={{ fontSize: "clamp(2.25rem, 5vw, 4rem)" }}
        >
          Začnime spolu.
        </h2>
        <p
          className="mt-6 text-[hsl(0_0%_4%/0.7)] max-w-[42ch]"
          style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)" }}
        >
          15 minút, zadarmo, bez záväzkov. Poviete čo potrebujete — my navrhneme riešenie.
        </p>
      </div>
      <ContactForm variant="warm-compact" buttonLabel="Dohodnúť stretnutie →" />
    </div>
  </section>
);

export default TopForm;
