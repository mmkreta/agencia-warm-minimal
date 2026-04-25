import ContactForm from "./ContactForm";

const TopForm = () => (
  <section
    id="dohodnut"
    className="px-6 md:px-12 pt-6 pb-16 md:pt-8 md:pb-24"
    style={{ backgroundColor: "#0a0a0a", color: "hsl(0 0% 96%)" }}
  >
    <div className="max-w-[1400px] mx-auto grid md:grid-cols-2 gap-14 md:gap-24 items-stretch">
      {/* Vizuál — rovnaký štýl ako v hero */}
      <div className="relative reveal aspect-[3/4] md:aspect-auto md:min-h-[520px] overflow-hidden">
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, #2a2a2a 0%, #161616 45%, #0a0a0a 100%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "repeating-linear-gradient(0deg, #fff 0 1px, transparent 1px 4px)",
          }}
        />
      </div>
      <ContactForm variant="dark-compact" buttonLabel="Dohodnúť stretnutie →" />
    </div>
  </section>
);

export default TopForm;
