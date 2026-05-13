import { useContext, useEffect, useMemo, useRef } from "react";
import { AuthContext } from "./AuthContext";
import { CartContext } from "./CartContext";

export default function CartSync() {
  const { user, loading: authLoading } = useContext(AuthContext);
  const cart = useContext(CartContext);

  const didHydrateRef = useRef(false);

  const currentUserId = useMemo(() => user?.uid ?? null, [user]);

  // 🔄 Charger le panier depuis localStorage
  useEffect(() => {
    if (authLoading) return;
    if (!currentUserId) {
      didHydrateRef.current = false;
      return;
    }

    if (didHydrateRef.current) return;
    didHydrateRef.current = true;

    const savedCart = localStorage.getItem(`cart_${currentUserId}`);

    if (savedCart) {
      const items = JSON.parse(savedCart);

      cart.clearCart?.();

      items.forEach((item) => {
        cart.addItem(item, item.qty);
      });
    }
  }, [authLoading, currentUserId, cart]);

  // 💾 Sauvegarder le panier dans localStorage
  useEffect(() => {
    if (authLoading) return;
    if (!currentUserId) return;

    const saveCart = () => {
      const items = cart.items ?? [];
      localStorage.setItem(
        `cart_${currentUserId}`,
        JSON.stringify(items)
      );
    };

    saveCart();
  }, [cart.items, authLoading, currentUserId]);

  return null;
}