import { Shirt, FlaskConical, Globe } from "lucide-react";

const services = [
  {
    icon: Shirt,
    title: "Clothing",
    description:
      "Premium quality garments and textiles sourced from top manufacturers. From bulk orders to curated collections, we deliver style with reliability.",
    highlights: ["Bulk & Retail Supply", "Quality Assurance", "Custom Orders"],
  },
  {
    icon: FlaskConical,
    title: "Chemicals",
    description:
      "Industrial and specialty chemicals for diverse sectors. Strict compliance with safety standards and timely delivery across regions.",
    highlights: ["Industrial Grade", "Safety Certified", "Wide Catalogue"],
  },
  {
    icon: Globe,
    title: "EXIM (Export-Import)",
    description:
      "End-to-end international trade solutions. We handle documentation, logistics, and compliance so you can focus on growing your business.",
    highlights: ["Global Network", "Custom Clearance", "Logistics Support"],
  },
];

const ServicesSection = () => {
  return (
    <section id="services" className="py-24 bg-background">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-3">
            What We Do
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground">
            Our Core Services
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.title}
              className="group bg-card rounded-xl p-8 border border-border hover:border-secondary/40 transition-all duration-300"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <div className="w-14 h-14 rounded-lg bg-secondary/15 flex items-center justify-center mb-6 group-hover:bg-secondary/25 transition-colors">
                <service.icon className="w-7 h-7 text-secondary" />
              </div>
              <h3 className="text-xl font-heading font-semibold text-foreground mb-3">
                {service.title}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-5">
                {service.description}
              </p>
              <ul className="space-y-2">
                {service.highlights.map((h) => (
                  <li key={h} className="flex items-center gap-2 text-sm text-foreground/80">
                    <span className="w-1.5 h-1.5 rounded-full bg-secondary" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
