import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Search, Filter, FlaskConical, Plus, Minus, Trash2, FileText, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { toast } from "@/hooks/use-toast";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
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

type QuoteItem = {
  cas: string;
  name: string;
  size: string;
  quantity: number;
};

const ChemicalCatalog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [quote, setQuote] = useState<QuoteItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contact, setContact] = useState({ name: "", email: "", phone: "", notes: "" });

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.cas.includes(search) ||
      p.description.toLowerCase().includes(search.toLowerCase());
    const matchCategory = category === "All" || p.category === category;
    return matchSearch && matchCategory;
  });

  const addToQuote = (product: Product, size: string) => {
    setQuote((prev) => {
      const existing = prev.find((i) => i.cas === product.cas && i.size === size);
      if (existing) {
        return prev.map((i) =>
          i.cas === product.cas && i.size === size ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { cas: product.cas, name: product.name, size, quantity: 1 }];
    });
    toast({ title: "Added to quote", description: `${product.name} (${size})` });
  };

  const updateQty = (cas: string, size: string, delta: number) => {
    setQuote((prev) =>
      prev
        .map((i) =>
          i.cas === cas && i.size === size ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (cas: string, size: string) => {
    setQuote((prev) => prev.filter((i) => !(i.cas === cas && i.size === size)));
  };

  const submitQuote = () => {
    if (!contact.name || !contact.email) {
      toast({ title: "Missing info", description: "Please enter your name and email.", variant: "destructive" });
      return;
    }
    toast({
      title: "Quote request sent",
      description: `We'll get back to you about ${quote.length} product${quote.length > 1 ? "s" : ""}.`,
    });
    setQuote([]);
    setContact({ name: "", email: "", phone: "", notes: "" });
    setDrawerOpen(false);
  };

  const totalQty = quote.reduce((sum, i) => sum + i.quantity, 0);

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
                      <Button
                        size="sm"
                        className="w-full"
                        onClick={() => addToQuote(product, selectedSize)}
                      >
                        <Plus className="w-4 h-4" />
                        Add to Quote ({selectedSize})
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Floating Quote Button */}
      {totalQty > 0 && (
        <Button
          onClick={() => setDrawerOpen(true)}
          size="lg"
          className="fixed bottom-6 right-6 z-50 shadow-lg rounded-full h-14 px-6"
        >
          <FileText className="w-5 h-5" />
          View Quote
          <span className="ml-1 bg-primary-foreground text-primary rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold">
            {totalQty}
          </span>
        </Button>
      )}

      {/* Quote Drawer */}
      <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
        <SheetContent className="w-full sm:max-w-md flex flex-col">
          <SheetHeader>
            <SheetTitle>Your Quote Request</SheetTitle>
          </SheetHeader>

          {quote.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <FileText className="w-12 h-12 text-muted-foreground/40 mb-3" />
              <p className="text-muted-foreground">No products added yet.</p>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto py-4 space-y-3">
                {quote.map((item) => (
                  <div
                    key={`${item.cas}-${item.size}`}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm line-clamp-2">{item.name}</p>
                      <p className="text-xs text-muted-foreground mt-0.5">Size: {item.size}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQty(item.cas, item.size, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQty(item.cas, item.size, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.cas, item.size)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                <div className="space-y-3 pt-4 border-t border-border">
                  <p className="text-sm font-medium text-foreground">Your details</p>
                  <Input
                    placeholder="Your name *"
                    value={contact.name}
                    onChange={(e) => setContact({ ...contact, name: e.target.value })}
                  />
                  <Input
                    type="email"
                    placeholder="Email *"
                    value={contact.email}
                    onChange={(e) => setContact({ ...contact, email: e.target.value })}
                  />
                  <Input
                    placeholder="Phone (optional)"
                    value={contact.phone}
                    onChange={(e) => setContact({ ...contact, phone: e.target.value })}
                  />
                  <Textarea
                    placeholder="Additional notes (optional)"
                    rows={3}
                    value={contact.notes}
                    onChange={(e) => setContact({ ...contact, notes: e.target.value })}
                  />
                </div>
              </div>

              <SheetFooter className="flex-col gap-2 sm:flex-col">
                <Button onClick={submitQuote} className="w-full" size="lg">
                  Submit Quote Request
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setQuote([])}
                  className="w-full"
                >
                  <X className="w-4 h-4" />
                  Clear All
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>

      <Footer />
    </div>
  );
};

export default ChemicalCatalog;
