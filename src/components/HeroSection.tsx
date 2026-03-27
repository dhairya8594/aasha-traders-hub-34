import heroBg from "@/assets/hero-bg.png";

const HeroSection = () => {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />
      <div className="absolute inset-0 bg-primary/75" />
      <div className="relative z-10 container text-center py-32">
        <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-4 animate-fade-up">
          Clothing · Chemicals · EXIM
        </p>
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold text-primary-foreground leading-tight mb-6 animate-fade-up" style={{ animationDelay: "0.1s" }}>
          Your Trusted Partner in
          <br />
          <span className="text-secondary">Global Trade</span>
        </h1>
        <p className="text-primary-foreground/70 text-lg md:text-xl max-w-2xl mx-auto mb-10 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          Aasha Traders delivers excellence across clothing, industrial chemicals, and international import-export services.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up" style={{ animationDelay: "0.3s" }}>
          <a
            href="#services"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg bg-secondary text-secondary-foreground font-semibold hover:brightness-110 transition-all"
          >
            Explore Services
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center px-8 py-3.5 rounded-lg border border-primary-foreground/30 text-primary-foreground font-semibold hover:bg-primary-foreground/10 transition-all"
          >
            Get in Touch
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
