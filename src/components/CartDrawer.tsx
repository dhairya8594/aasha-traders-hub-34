import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { toast } from "@/hooks/use-toast";

const CartDrawer = () => {
  const {
    isOpen,
    setOpen,
    detailedItems,
    updateQuantity,
    removeItem,
    totalPrice,
    clearCart,
  } = useCart();

  const handleCheckout = () => {
    toast({
      title: "Order request received",
      description: "Our team will contact you shortly to confirm your order.",
    });
    clearCart();
    setOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2 font-heading">
            <ShoppingBag className="w-5 h-5 text-secondary" />
            Your Cart
          </SheetTitle>
        </SheetHeader>

        {detailedItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center">
            <ShoppingBag className="w-12 h-12 text-muted-foreground/30 mb-3" />
            <p className="text-muted-foreground">Your cart is empty.</p>
            <p className="text-sm text-muted-foreground/70 mt-1">
              Browse the shop and add products to get started.
            </p>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto py-4 space-y-4">
              {detailedItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex gap-3 border border-border rounded-lg p-3 bg-card"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-16 h-16 rounded object-cover bg-muted"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm text-foreground line-clamp-2">
                      {item.product.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">
                      {item.product.packSize}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1 border border-border rounded">
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity - 1)
                          }
                          className="p-1 hover:bg-muted transition-colors"
                          aria-label="Decrease"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-2 text-sm font-medium">{item.quantity}</span>
                        <button
                          onClick={() =>
                            updateQuantity(item.productId, item.quantity + 1)
                          }
                          className="p-1 hover:bg-muted transition-colors"
                          aria-label="Increase"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <span className="text-sm font-semibold text-foreground">
                        ₹{item.lineTotal.toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.productId)}
                    className="text-muted-foreground hover:text-destructive transition-colors self-start"
                    aria-label="Remove"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="border-t border-border pt-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-semibold text-foreground">
                  ₹{totalPrice.toLocaleString("en-IN")}
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Taxes & shipping calculated at checkout.
              </p>
              <Button onClick={handleCheckout} className="w-full" size="lg">
                Request Order
              </Button>
              <Button
                variant="ghost"
                onClick={clearCart}
                className="w-full text-muted-foreground"
                size="sm"
              >
                Clear cart
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default CartDrawer;
