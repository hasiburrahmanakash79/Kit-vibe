import { createContext, useContext } from "react";
import { useLocalStorage } from "../utils/useLocalStorage";
import { useNotification } from "./NotificationContext";

const WishlistContext = createContext(null);

export function WishlistProvider({ children }) {
  const [items, setItems] = useLocalStorage("kitvibe_wishlist", []);
  const notification = useNotification();

  const isWishlisted = (productId) => items.some((i) => i.id === productId);

  const toggleWishlist = (product) => {
    setItems((prev) => {
      const exists = prev.some((i) => i.id === product.id);
      if (exists) {
        notification?.info(`${product.name} removed from wishlist.`, { title: "Wishlist" });
        return prev.filter((i) => i.id !== product.id);
      }
      notification?.success(`${product.name} saved to wishlist.`, { title: "Added to wishlist" });
      return [...prev, { id: product.id, name: product.name, image: product.images[0], price: product.discountPrice || product.price, team: product.team }];
    });
  };

  const removeFromWishlist = (productId) => setItems((prev) => prev.filter((i) => i.id !== productId));
  const clearWishlist = () => setItems([]);

  return (
    <WishlistContext.Provider value={{ items, isWishlisted, toggleWishlist, removeFromWishlist, clearWishlist, count: items.length }}>
      {children}
    </WishlistContext.Provider>
  );
}

export const useWishlist = () => useContext(WishlistContext);
