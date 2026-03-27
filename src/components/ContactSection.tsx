import { Mail, Phone, MapPin } from "lucide-react";

const ContactSection = () => {
  return (
    <section id="contact" className="py-24 bg-primary">
      <div className="container">
        <div className="text-center mb-16">
          <p className="text-secondary font-medium tracking-widest uppercase text-sm mb-3">
            Get In Touch
          </p>
          <h2 className="text-3xl md:text-4xl font-heading font-bold text-primary-foreground">
            Let's Work Together
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { icon: Mail, label: "Email", value: "info@aashatraders.com" },
            { icon: Phone, label: "Phone", value: "+91 9270968565" },
            { icon: MapPin, label: "Location", value: "Pune , Maharashtra , India" },
          ].map((item) => (
            <div key={item.label} className="text-center">
              <div className="w-12 h-12 rounded-full bg-secondary/20 flex items-center justify-center mx-auto mb-4">
                <item.icon className="w-5 h-5 text-secondary" />
              </div>
              <p className="text-primary-foreground/60 text-sm mb-1">{item.label}</p>
              <p className="text-primary-foreground font-medium">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
