import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Search, Filter, ShoppingCart, Star, Store, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { shopCategories, shopProducts } from "@/data/shopProducts";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

type SortKey = "popular" | "price-asc" | "price-desc";

const Shop = () => {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState<string>("All");
  const [sort, setSort] = useState<SortKey>("popular");
  const { addItem, totalItems, setOpen } = useCart();

  const filtered = useMemo(() => {
    let list = shopProducts.filter((p) => {
      const matchSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.shortDescription.toLowerCase().includes(search.toLowerCase());
      const matchCategory = category === "All" || p.category === category;
      return matchSearch && matchCategory;
    });

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    if (sort === "popular") list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [search, category, sort]);

  const handleAdd = (id: string, name: string) => {
    addItem(id, 1);
    toast({ title: "Added to cart", description: name });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}

      <section className="pt-24 pb-12 bg-primary">
        <div className="container">
        <img
    src="/src/assets/ChemovrLogo.png"  // 👉 your logo path
    alt="Chemovr Clear Logo"
    className="w-40 md:w-50 mb-4 object-contain"
  />
          <div className="flex items-center justify-between gap-4 flex-wrap">
          <div>
         
              <h1 className="text-3xl md:text-5xl font-heading font-bold text-primary-foreground mb-2">
                Chemvour Clear
              </h1>
              <p className="text-primary-foreground/70 max-w-2xl text-lg">
                Order industrial, lab & agro chemicals online. Fast quotes, bulk pricing, pan-India delivery.
              </p>
            </div>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => setOpen(true)}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4" />
              View Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 border-b border-border bg-card sticky top-16 z-40">
        <div className="container flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="relative flex-1">
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
              <SelectTrigger className="w-[200px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {shopCategories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Select value={sort} onValueChange={(v) => setSort(v as SortKey)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="popular">Most popular</SelectItem>
              <SelectItem value="price-asc">Price: Low to High</SelectItem>
              <SelectItem value="price-desc">Price: High to Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </section>

      {/* Grid */}
      <section className="py-12">
        <div className="container">
          <p className="text-sm text-muted-foreground mb-6">
            Showing {filtered.length} of {shopProducts.length} products
          </p>

          {filtered.length === 0 ? (
            <div className="text-center py-20">
              <Store className="w-12 h-12 text-muted-foreground/40 mx-auto mb-4" />
              <p className="text-muted-foreground text-lg">No products found.</p>
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filtered.map((p) => (
                <div
                  key={p.id}
                  className="group bg-card rounded-xl border border-border overflow-hidden hover:border-secondary/40 transition-all"
                  style={{ boxShadow: "var(--shadow-card)" }}
                >
                  <Link to={`/shop/${p.id}`} className="block relative aspect-square bg-muted overflow-hidden">
                    <img
                      src={p.image}
                      alt={p.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    {!p.inStock && (
                      <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                        Out of stock
                      </Badge>
                    )}
                  </Link>
                  <div className="p-4">
                    <Badge variant="secondary" className="text-xs mb-2">
                      {p.category}
                    </Badge>
                    <Link to={`/shop/${p.id}`}>
                      <h3 className="font-heading font-semibold text-foreground line-clamp-2 mb-1 group-hover:text-secondary transition-colors">
                        {p.name}
                      </h3>
                    </Link>
                    <p className="text-xs text-muted-foreground mb-3">{p.packSize}</p>
                    <div className="flex items-center gap-1 mb-3">
                      <Star className="w-3.5 h-3.5 fill-secondary text-secondary" />
                      <span className="text-xs font-medium text-foreground">{p.rating}</span>
                      <span className="text-xs text-muted-foreground">/ 5</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold text-foreground">
                          ₹{p.price.toLocaleString("en-IN")}
                        </p>
                      </div>
                      <Button
                        size="sm"
                        disabled={!p.inStock}
                        onClick={() => handleAdd(p.id, p.name)}
                      >
                        <Plus className="w-4 h-4" />
                        Add
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default Shop;
