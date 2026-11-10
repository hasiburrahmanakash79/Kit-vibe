import { createContext, useContext, useMemo } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useNotification } from "./NotificationContext";

const CartContext = createContext(null);

const FREE_SHIPPING_THRESHOLD = 100;
const STANDARD_SHIPPING = 6.99;

export function CartProvider({ children }) {
  const [items, setItems] = useLocalStorage("kitvibe_cart", []);
  const [savedForLater, setSavedForLater] = useLocalStorage("kitvibe_saved", []);
  const notification = useNotification();

  const addToCart = (product, size, qty = 1) => {
    setItems((prev) => {
      const key = `${product.id}-${size}`;
      const existing = prev.find((i) => i.key === key);
      if (existing) {
        return prev.map((i) => (i.key === key ? { ...i, qty: i.qty + qty } : i));
      }
      return [
        ...prev,
        {
          key,
          productId: product.id,
          name: product.name,
          team: product.team,
          image: product.images[0],
          price: product.discountPrice || product.price,
          size,
          qty,
        },
      ];
    });
    notification?.success(`${product.name} (${size}) added to your bag.`, { title: "Added to cart" });
  };

  const removeFromCart = (key) => {
    setItems((prev) => prev.filter((i) => i.key !== key));
    notification?.info("Item removed from your bag.", { title: "Removed" });
  };

  const updateQty = (key, qty) => {
    if (qty < 1) return;
    setItems((prev) => prev.map((i) => (i.key === key ? { ...i, qty } : i)));
  };

  const saveForLater = (key) => {
    setItems((prev) => {
      const item = prev.find((i) => i.key === key);
      if (item) setSavedForLater((s) => [...s, item]);
      return prev.filter((i) => i.key !== key);
    });
  };

  const moveToCart = (key) => {
    setSavedForLater((prev) => {
      const item = prev.find((i) => i.key === key);
      if (item) setItems((c) => [...c, item]);
      return prev.filter((i) => i.key !== key);
    });
  };

  const clearCart = () => setItems([]);

  const count = useMemo(() => items.reduce((s, i) => s + i.qty, 0), [items]);
  const subtotal = useMemo(() => items.reduce((s, i) => s + i.price * i.qty, 0), [items]);
  const shipping = useMemo(() => (subtotal === 0 || subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : STANDARD_SHIPPING), [subtotal]);
  const amountToFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);

  const value = {
    items, savedForLater, addToCart, removeFromCart, updateQty, saveForLater, moveToCart, clearCart,
    count, subtotal, shipping, amountToFreeShipping, FREE_SHIPPING_THRESHOLD,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export const useCart = () => useContext(CartContext);
