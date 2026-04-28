import { Award, Users, TrendingUp, MapPin } from "lucide-react";

const stats = [
  { icon: Award,  value: "Premium Products",label: "Quality Assured" },
  { icon: Users,  value: "Dedicated Support",lable: "Customer Focuseds" },
  { icon: TrendingUp, value: "Fast Delivery",lable: "Pan India Supply" },
  { icon: MapPin, value: "Serving Nationwide",label: "Based In Pune" },
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
            Aasha Traders is a growing multi-vertical trading company specializing in industrial chemicals, cleaning products, clothing, and export-import solutions.            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
            We are committed to delivering quality products, competitive pricing, and reliable service to businesses across industries. Our focus is on building long-term relationships through transparency, trust, and timely delivery.            </p>
            <p className="text-muted-foreground leading-relaxed ">
            As a new-age trading company, we combine innovation, dedication, and customer-first service to meet evolving market demands.</p>          </div>
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-card rounded-xl p-6 text-center border border-border"
                style={{ boxShadow: "var(--shadow-card)" }}
              >
                <stat.icon className="w-8 h-8 text-secondary mx-auto mb-3" />
                <div className="text-2xl font-heading font-bold text-foreground mb-1">
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
