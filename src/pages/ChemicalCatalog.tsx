import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import chemovrLogo from "@/assets/ChemovrLogo.png";
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

const API_URL = "https://aasha-traders-backend.onrender.com";
const PLACEHOLDER_IMG =
  "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?auto=format&fit=crop&w=600&q=80";

const SIZE_OPTIONS = ["200ml", "250ml", "500ml", "1L", "5L"] as const;

const SIZE_PACKAGING: Record<string, string> = {
  "200ml": "40 PCS BOX",
  "250ml": "78 PCS BOX",
  "500ml": "30 PCS BOX",
  "1L": "20 PCS BOX",
  "5L": "4 CAN BOX",
};

const categories = [
  "All",
  "Bathroom",
  "Floor & Surface",
  "Personal Care",
  "Kitchen",
  "Laundry",
  "Air Care",
  "Glass Care",
  "Car Care",
] as const;

type Product = {
  id: string;
  name: string;
  category: typeof categories[number];
  description: string;
  image?: string;
  sizes?: readonly string[];
  fragrances?: readonly string[];
};

const FLORAL_FRAGRANCES = ["Lavender", "Lemon", "Jasmine", "Rose"] as const;
const HANDWASH_FRAGRANCES = ["Rose", "Lemon", "Peach", "Lavender", "Green Apple"] as const;

const products: Product[] = [
  {
    id: "toilet-cleaner",
    name: "Toilet Cleaner",
    category: "Bathroom",
    image: "/products/toilet-cleaner.png",
    description:
      "Powerful disinfectant that removes tough stains and kills 99.9% of germs, leaving your toilet sparkling clean.",
  },
  {
    id: "floor-cleaner",
    name: "Floor Cleaner",
    category: "Floor & Surface",
    image: "/products/floor-cleaner.png",
    description:
      "Long-lasting fragrance with deep cleaning action for all floor types. Cuts through dirt and grease effortlessly.",
    fragrances: FLORAL_FRAGRANCES,
  },
  {
    id: "gentle-liquid-soap",
    name: "Gentle Liquid Soap (Hand Wash)",
    category: "Personal Care",
    image: "/products/handwash.png",
    description:
      "Mild, moisturising hand wash that cleanses gently while keeping skin soft and fresh.",
    fragrances: HANDWASH_FRAGRANCES,
  },
  {
    id: "dish-wash",
    name: "Dish Wash Liquid",
    category: "Kitchen",
    image: "/products/dish-wash.png",
    description:
      "Tough on grease, gentle on hands. Cuts through stubborn oil for spotless, shiny utensils.",
  },
  {
    id: "fabric-detergent",
    name: "Fabric Detergent",
    category: "Laundry",
    image: "/products/fabric-detergent.png",
    description:
      "High-performance liquid detergent that removes tough stains while caring for fabric colours and fibres.",
  },
  {
    id: "fabric-conditioner",
    name: "Fabric Conditioner",
    category: "Laundry",
    image: "/products/fabric-conditioner.png",
    description:
      "Softens fabrics, reduces wrinkles, and leaves clothes with a long-lasting fresh fragrance.",
  },
  {
    id: "multipurpose-cleaning-liquid",
    name: "Multipurpose Cleaning Liquid",
    category: "Floor & Surface",
    image: "/products/multipurpose-cleaner.png",
    description:
      "All-in-one cleaner for floors, tiles, kitchen surfaces, and more. Disinfects and refreshes any space.",
  },
  {
    id: "room-freshener",
    name: "Room Freshener",
    category: "Air Care",
    image: "/products/room-freshener.png",
    description:
      "Instantly neutralises odours and fills your space with a long-lasting refreshing fragrance.",
    fragrances: HANDWASH_FRAGRANCES,
  },
  {
    id: "glass-cleaner",
    name: "Glass Cleaner",
    category: "Glass Care",
    image: "/products/glass-cleaner.png",
    description:
      "Streak-free shine for glass, mirrors, and windows. Quick-drying formula with no residue.",
  },
  {
    id: "car-wash",
    name: "Car wash",
    category: "Car Care",
    image: "/products/car-cleaner.png",
    description:
      "Streak-free shine for glass, mirrors, and windows. Quick-drying formula with no residue.",
  },
];

type QuoteItem = {
  key: string;
  productId: string;
  name: string;
  size: string;
  fragrance?: string;
  quantity: number;
};

const makeKey = (id: string, size: string, fragrance?: string) =>
  `${id}__${size}__${fragrance ?? ""}`;

const ChemicalCatalog = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [selectedSizes, setSelectedSizes] = useState<Record<string, string>>({});
  const [selectedFragrances, setSelectedFragrances] = useState<Record<string, string>>({});
  const [quote, setQuote] = useState<QuoteItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    notes: "",
  });
  const [submitting, setSubmitting] = useState(false);

  const filtered = products.filter((p) => {
    const matchSearch =
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.description.toLowerCase().includes(search.toLowerCase());

    const matchCategory = category === "All" || p.category === category;

    return matchSearch && matchCategory;
  });

  const addToQuote = (product: Product, size: string, fragrance?: string) => {
    const key = makeKey(product.id, size, fragrance);
    const displayName = fragrance ? `${product.name} – ${fragrance}` : product.name;

    setQuote((prev) => {
      const existing = prev.find((i) => i.key === key);

      if (existing) {
        return prev.map((i) =>
          i.key === key ? { ...i, quantity: i.quantity + 1 } : i
        );
      }

      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: displayName,
          size,
          fragrance,
          quantity: 1,
        },
      ];
    });

    toast({
      title: "Added to quote",
      description: `${displayName} (${size})`,
    });
  };

  const updateQty = (key: string, delta: number) => {
    setQuote((prev) =>
      prev
        .map((i) =>
          i.key === key ? { ...i, quantity: Math.max(0, i.quantity + delta) } : i
        )
        .filter((i) => i.quantity > 0)
    );
  };

  const removeItem = (key: string) => {
    setQuote((prev) => prev.filter((i) => i.key !== key));
  };

  const submitQuote = async () => {
    if (!contact.name || !contact.email) {
      toast({
        title: "Missing info",
        description: "Please enter your name and email.",
        variant: "destructive",
      });
      return;
    }

    if (quote.length === 0) {
      toast({
        title: "No products selected",
        description: "Please add at least one product.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSubmitting(true);

      const response = await fetch(`${API_URL}/api/quotes`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          customer: contact,
          items: quote,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to submit quote");
      }

      toast({
        title: "Quote request sent",
        description: "We'll get back to you soon.",
      });

      setQuote([]);
      setContact({
        name: "",
        email: "",
        phone: "",
        notes: "",
      });
      setDrawerOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Quote request failed. Please check backend is running.",
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  const totalQty = quote.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-16 bg-primary">
        <div className="container text-center">
          <img
            src={chemovrLogo}
            alt="Chemovr Clear Logo"
            className="w-40 md:w-56 mx-auto mb-6 object-contain"
          />

          <div className="inline-flex items-center gap-2 bg-secondary/20 text-secondary px-4 py-1.5 rounded-full text-sm font-medium mb-4">
            <FlaskConical className="w-4 h-4" />
            Chemical Division
          </div>

          <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-4">
            Chemovr Clear Product Catalog
          </h1>

          <p className="text-primary-foreground/70 max-w-2xl mx-auto text-lg">
            Browse our complete range of cleaning, hygiene, and home-care products.
            Choose your size and fragrance, then request a quote.
          </p>
        </div>
      </section>

      <section className="py-8 border-b border-border bg-card sticky top-16 z-40">
        <div className="container flex flex-col sm:flex-row gap-4 items-center">
          <div className="relative flex-1 w-full">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search products…"
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

      <section className="py-12">
        <div className="container">
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filtered.length} of {products.length} products
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <FlaskConical className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">
                No products match your search.
              </p>
              <p className="text-muted-foreground/60 text-sm mt-1">
                Try a different keyword or category.
              </p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((product) => {
                const sizes = product.sizes ?? SIZE_OPTIONS;
                const selectedSize = selectedSizes[product.id] ?? sizes[0];
                const fragrances = product.fragrances;

                const selectedFragrance = fragrances
                  ? selectedFragrances[product.id] ?? fragrances[0]
                  : undefined;

                return (
                  <div
                    key={product.id}
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

                      <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                        {product.description}
                      </p>

                      {fragrances && (
                        <div className="mb-4">
                          <p className="text-xs font-medium text-muted-foreground mb-1.5">
                            Available fragrances
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {fragrances.map((f) => (
                              <span
                                key={f}
                                className="inline-flex items-center px-2 py-0.5 rounded-full bg-secondary/15 text-secondary text-xs font-medium border border-secondary/20"
                              >
                                {f}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="space-y-2 text-sm mb-4">
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Packaging</span>
                          <span className="text-foreground">
                            {SIZE_PACKAGING[selectedSize] ?? selectedSize}
                          </span>
                        </div>
                      </div>

                      <div className="mt-auto space-y-3">
                        <div>
                          <label className="block text-xs font-medium text-muted-foreground mb-1.5">
                            Select Size
                          </label>

                          <Select
                            value={selectedSize}
                            onValueChange={(v) =>
                              setSelectedSizes((prev) => ({
                                ...prev,
                                [product.id]: v,
                              }))
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
                    key={item.key}
                    className="flex items-start gap-3 p-3 rounded-lg border border-border bg-card"
                  >
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-foreground text-sm line-clamp-2">
                        {item.name}
                      </p>

                      <p className="text-xs text-muted-foreground mt-0.5">
                        Size: {item.size}
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQty(item.key, -1)}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>

                        <span className="text-sm font-medium w-8 text-center">
                          {item.quantity}
                        </span>

                        <Button
                          variant="outline"
                          size="icon"
                          className="h-7 w-7"
                          onClick={() => updateQty(item.key, 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-muted-foreground hover:text-destructive"
                      onClick={() => removeItem(item.key)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                ))}

                <div className="space-y-3 pt-4 border-t border-border">
                  <p className="text-sm font-medium text-foreground">
                    Your details
                  </p>

                  <Input
                    placeholder="Your name *"
                    value={contact.name}
                    onChange={(e) =>
                      setContact({ ...contact, name: e.target.value })
                    }
                  />

                  <Input
                    type="email"
                    placeholder="Email *"
                    value={contact.email}
                    onChange={(e) =>
                      setContact({ ...contact, email: e.target.value })
                    }
                  />

                  <Input
                    placeholder="Phone (optional)"
                    value={contact.phone}
                    onChange={(e) =>
                      setContact({ ...contact, phone: e.target.value })
                    }
                  />

                  <Textarea
                    placeholder="Additional notes (optional)"
                    rows={3}
                    value={contact.notes}
                    onChange={(e) =>
                      setContact({ ...contact, notes: e.target.value })
                    }
                  />
                </div>
              </div>

              <SheetFooter className="flex-col gap-2 sm:flex-col">
                <Button
                  onClick={submitQuote}
                  className="w-full"
                  size="lg"
                  disabled={submitting}
                >
                  {submitting ? "Submitting..." : "Submit Quote Request"}
                </Button>

                <Button
                  variant="outline"
                  onClick={() => setQuote([])}
                  className="w-full"
                  disabled={submitting}
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