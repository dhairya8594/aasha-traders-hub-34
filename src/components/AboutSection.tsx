import { Award, Users, TrendingUp, MapPin } from "lucide-react";

const stats = [
  { icon: Award, value: "10+", label: "Years Experience" },
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: TrendingUp, value: "1000+", label: "Orders Delivered" },
  { icon: MapPin, value: "20+", label: "Countries Served" },
];

const AboutSection = () => {
  return (
    <section id="about" className="py-24 bg-muted/50">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-3">
              About Us
            </p>
            <h2 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-6">
              Building Trust Through
              <br />
              Quality & Commitment
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Aasha Traders is a multi-vertical trading company with deep expertise in clothing, industrial chemicals, and international trade. We pride ourselves on delivering reliable supply chain solutions with integrity.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Our experienced team ensures every transaction — from sourcing to delivery — meets the highest standards of quality and compliance, making us a trusted partner for businesses worldwide.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl p-6 text-center border border-border"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <stat.icon className="w-8 h-8 text-secondary mx-auto mb-3" />
                <div className="text-3xl font-heading font-bold text-foreground mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
