import React, { createContext, useContext, useState, useEffect } from "react";

// Define the shape of the cart item
type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

// Define the context type
type CartContextType = {
  cart: CartItem[];
  total: number;
  quantity: number;
  addToCart: (item: CartItem) => void;
  removeFromCart: (item: CartItem) => void;
  clearCart: () => void;
};

// Create the CartContext
const CartContext = createContext<CartContextType | undefined>(undefined);

// Custom hook to use the CartContext
export const useCartContext = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }
  return context;
};

// CartProvider component
export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(0);

  // Load cart from localStorage on initial render
  useEffect(() => {
    const storedItems = localStorage.getItem("cart");
    if (storedItems) setCart(JSON.parse(storedItems));
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
    // Update total and quantity whenever the cart changes
    const newTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const newQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    setTotal(newTotal);
    setQuantity(newQuantity);
  }, [cart]);

  // Add an item to the cart
  const addToCart = (item: CartItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      const updatedCart = cart.map((cartItem) =>
        cartItem.id === item.id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  };

  // Remove an item from the cart
  const removeFromCart = (item: CartItem) => {
    const existingItem = cart.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      if (existingItem.quantity === 1) {
        setCart(cart.filter((cartItem) => cartItem.id !== item.id));
      } else {
        const updatedCart = cart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity - 1 }
            : cartItem
        );
        setCart(updatedCart);
      }
    }
  };

  // Clear the entire cart
  const clearCart = () => {
    setCart([]);
    setTotal(0);
    setQuantity(0);
  };
};