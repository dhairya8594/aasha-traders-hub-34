import { useState } from "react";
import { Link, useParams, Navigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, Minus, Plus, ShoppingCart, Star, Truck, ShieldCheck, Package } from "lucide-react";
import { shopProducts } from "@/data/shopProducts";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const product = shopProducts.find((p) => p.id === id);
  const [qty, setQty] = useState(1);
  const { addItem, setOpen, totalItems } = useCart();

  if (!product) return <Navigate to="/shop" replace />;

  const related = shopProducts
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 3);

  const handleAdd = () => {
    addItem(product.id, qty);
    toast({ title: "Added to cart", description: `${qty} × ${product.name}` });
  };

  const handleBuyNow = () => {
    addItem(product.id, qty);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <section className="pt-24 pb-12">
        <div className="container">
          <div className="flex items-center justify-between mb-6">
            <Link
              to="/shop"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-secondary transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
              Back to shop
            </Link>
            <Button variant="outline" size="sm" onClick={() => setOpen(true)} className="relative">
              <ShoppingCart className="w-4 h-4" />
              Cart
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Button>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            {/* Image */}
            <div
              className="bg-card rounded-2xl border border-border overflow-hidden aspect-square"
              style={{ boxShadow: "var(--shadow-card)" }}
            >
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Info */}
            <div>
              <Badge variant="secondary" className="mb-3">
                {product.category}
              </Badge>
              <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-3">
                {product.name}
              </h1>
              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  <Star className="w-4 h-4 fill-secondary text-secondary" />
                  <span className="text-sm font-medium">{product.rating}</span>
                  <span className="text-sm text-muted-foreground">/ 5</span>
                </div>
                <span className="text-muted-foreground">·</span>
                <span className={`text-sm font-medium ${product.inStock ? "text-green-600" : "text-destructive"}`}>
                  {product.inStock ? "In Stock" : "Out of stock"}
                </span>
              </div>

              <p className="text-muted-foreground leading-relaxed mb-6">{product.description}</p>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-bold text-foreground">
                  ₹{product.price.toLocaleString("en-IN")}
                </span>
                <span className="text-muted-foreground">/ {product.packSize}</span>
              </div>

              {/* Qty + actions */}
              <div className="flex items-center gap-3 mb-6">
                <div className="flex items-center border border-border rounded-md">
                  <button
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    className="p-3 hover:bg-muted transition-colors"
                    aria-label="Decrease"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="px-4 font-medium">{qty}</span>
                  <button
                    onClick={() => setQty(qty + 1)}
                    className="p-3 hover:bg-muted transition-colors"
                    aria-label="Increase"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <Button size="lg" onClick={handleAdd} disabled={!product.inStock} className="flex-1">
                  <ShoppingCart className="w-4 h-4" />
                  Add to Cart
                </Button>
                <Button
                  size="lg"
                  variant="secondary"
                  onClick={handleBuyNow}
                  disabled={!product.inStock}
                  className="flex-1"
                >
                  Buy Now
                </Button>
              </div>

              {/* Trust badges */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { icon: Truck, label: "Pan-India delivery" },
                  { icon: ShieldCheck, label: "Quality assured" },
                  { icon: Package, label: "Bulk discounts" },
                ].map(({ icon: Icon, label }) => (
                  <div
                    key={label}
                    className="flex flex-col items-center text-center gap-1 p-3 bg-card rounded-lg border border-border"
                  >
                    <Icon className="w-5 h-5 text-secondary" />
                    <span className="text-xs text-muted-foreground">{label}</span>
                  </div>
                ))}
              </div>

              {/* Specs */}
              <div className="bg-card border border-border rounded-lg p-5">
                <h3 className="font-heading font-semibold text-foreground mb-3">Specifications</h3>
                <dl className="space-y-2 text-sm">
                  {product.specs.map((s) => (
                    <div key={s.label} className="flex justify-between border-b border-border/50 pb-2 last:border-0">
                      <dt className="text-muted-foreground">{s.label}</dt>
                      <dd className="text-foreground font-medium">{s.value}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-heading font-bold text-foreground mb-6">Related products</h2>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((p) => (
                  <Link
                    key={p.id}
                    to={`/shop/${p.id}`}
                    className="group bg-card rounded-xl border border-border overflow-hidden hover:border-secondary/40 transition-all"
                    style={{ boxShadow: "var(--shadow-card)" }}
                  >
                    <div className="aspect-square bg-muted overflow-hidden">
                      <img
                        src={p.image}
                        alt={p.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-heading font-semibold text-foreground line-clamp-1 group-hover:text-secondary transition-colors">
                        {p.name}
                      </h3>
                      <p className="text-sm font-bold text-foreground mt-1">
                        ₹{p.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      <Footer />
      <CartDrawer />
    </div>
  );
};

export default ProductDetail;
