import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Filter, FlaskConical } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80";
const SIZE_OPTIONS = ["200ml", "250ml", "500ml", "1L", "5L"] as const;


const categories = ["All", "Industrial", "Specialty", "Laboratory", "Agricultural", "Pharmaceutical"] as const;

type Product = {
  name: string;
  cas: string;
  category: string;
  grade: string;
  packaging: string;
  description: string;
  image?: string;
  sizes?: readonly string[];
};

const products: Product[] = [
  {
    name: "Sulfuric Acid",
    cas: "7664-93-9",
    category: "Industrial",
    grade: "Technical Grade",
    packaging: "35 kg Carboys / Tanker",
    description: "Widely used in manufacturing, fertilizers, and chemical synthesis. Available in various concentrations.",
  },
  {
    name: "Sodium Hydroxide (Caustic Soda)",
    cas: "1310-73-2",
    category: "Industrial",
    grade: "Commercial Grade",
    packaging: "25 kg Bags / Flakes",
    description: "Essential for paper, textile, and soap industries. Available as flakes, pellets, or liquid.",
  },
  {
    name: "Hydrochloric Acid",
    cas: "7647-01-0",
    category: "Industrial",
    grade: "Technical Grade",
    packaging: "35 kg Carboys",
    description: "Used in steel pickling, pH regulation, and chemical production. Multiple concentration options.",
  },
  {
    name: "Citric Acid",
    cas: "77-92-9",
    category: "Pharmaceutical",
    grade: "Food / Pharma Grade",
    packaging: "25 kg Bags",
    description: "Natural preservative and flavoring agent for food, beverages, and pharmaceutical formulations.",
  },
  {
    name: "Isopropyl Alcohol (IPA)",
    cas: "67-63-0",
    category: "Laboratory",
    grade: "AR / LR Grade",
    packaging: "2.5 L / 25 L / 200 L",
    description: "High-purity solvent for laboratory, electronics cleaning, and pharmaceutical applications.",
  },
  {
    name: "Calcium Carbonate",
    cas: "471-34-1",
    category: "Industrial",
    grade: "Industrial Grade",
    packaging: "50 kg Bags",
    description: "Filler in paints, plastics, and paper. Also used in construction and agriculture.",
  },
  {
    name: "Urea",
    cas: "57-13-6",
    category: "Agricultural",
    grade: "Agricultural Grade",
    packaging: "50 kg Bags",
    description: "Primary nitrogen fertilizer for crops. Also used in industrial adhesives and resins.",
  },
  {
    name: "Potassium Permanganate",
    cas: "7722-64-7",
    category: "Specialty",
    grade: "Technical Grade",
    packaging: "25 kg Drums",
    description: "Powerful oxidizer used in water treatment, disinfection, and chemical synthesis.",
  },
  {
    name: "Ethanol (Denatured)",
    cas: "64-17-5",
    category: "Laboratory",
    grade: "IP Grade",
    packaging: "200 L Drums",
    description: "Solvent for extraction, cleaning, and chemical processes. Available in multiple purity grades.",
  },
  {
    name: "Zinc Sulfate",
    cas: "7733-02-0",
    category: "Agricultural",
    grade: "Agricultural / Technical",
    packaging: "25 kg Bags",
    description: "Micronutrient supplement for soil and crops. Also used in water treatment and textiles.",
  },
  {
    name: "Acetone",
    cas: "67-64-1",
    category: "Specialty",
    grade: "Commercial Grade",
    packaging: "200 L Drums / Tanker",
    description: "Versatile solvent for paints, coatings, and pharmaceutical manufacturing.",
  },
  {
    name: "Methylene Chloride (DCM)",
    cas: "75-09-2",
    category: "Specialty",
    grade: "Technical Grade",
    packaging: "250 kg Drums",
    description: "Effective solvent for paint stripping, metal degreasing, and extraction processes.",
  },
];

const ChemicalCatalog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.cas.includes(search) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || p.category === category;
    return matchSearch && matchCategory;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Banner */}
      <section className="pt-24 pb-16 bg-primary">
        <div className="container text-center">
          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <FlaskConical className="w-4 h-4" />
            Chemical Division
          </div>
          <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Chemical Product Catalog
          </h1>
          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            Browse our comprehensive range of industrial, specialty, and laboratory chemicals. All products meet strict quality and safety standards.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border bg-card sticky top-16 z-40">
        <div className="container flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by name, CAS number, or keyword…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="py-12">
        <div className="container">
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filtered.length} of {products.length} products
          </p>
          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <FlaskConical className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No products match your search.</p>
              <p className="text-muted-foreground/60 text-sm mt-1">Try a different keyword or category.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => {
                const sizes = product.sizes ?? SIZE_OPTIONS;
                const selectedSize = selectedSizes[product.cas] ?? sizes[0];
                return (
                  <div
                    key={product.cas}
                    className="group bg-card rounded-xl border border-border hover:border-secondary/40 transition-all duration-300 overflow-hidden flex flex-col"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <div className="aspect-square bg-muted overflow-hidden">
                      <img
                        src={product.image ?? PLACEHOLDER_IMG}
                        alt={product.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-start justify-between mb-3">
                        <h3 className="text-lg font-heading font-semibold text-foreground group-hover:text-secondary transition-colors">
                          {product.name}
                        </h3>
                        <Badge variant="secondary" className="shrink-0 ml-2 text-xs">
                          {product.category}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                        {product.description}
                      </p>
                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">CAS No.</span>
                          <span className="text-foreground font-mono">{product.cas}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Grade</span>
                          <span className="text-foreground">{product.grade}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Packaging</span>
                          <span className="text-foreground">{product.packaging}</span>
                        </div>
                      </div>
                      <div className="mt-auto">
                        <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                          Select Size
                        </label>
                        <Select
                          value={selectedSize}
                          onValueChange={(v) =>
                            setSelectedSizes((prev) => ({ ...prev, [product.cas]: v }))
                          }
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {sizes.map((s) => (
                              <SelectItem key={s} value={s}>
                                {s}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="border-t border-border px-6 py-3 bg-muted/30">
                      <a
                        href="#contact"
                        onClick={() => (window.location.href = "/#contact")}
                        className="text-secondary hover:text-secondary/80 text-sm font-medium transition-colors"
                      >
                        Request Quote ({selectedSize}) →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ChemicalCatalog;
