// src/contexts/CartContext.js
import React, {
  createContext,
  useContext,
  useReducer,
  useEffect
} from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const item = {
        ...action.payload,
        price: Number(action.payload.price) || 0,
        quantity: 1,
        variantId: action.payload.variantId,
        stock: action.payload.stock ?? Infinity
      };

      const existing = state.find(
        i => i.variantId === item.variantId
      );

      if (existing) {
        // Respect stock limit
        if (existing.quantity >= existing.stock) {
          return state;
        }

        return state.map(i =>
          i.variantId === item.variantId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...state, item];
    }

    case 'REMOVE_FROM_CART':
      return state.filter(
        item => item.variantId !== action.payload
      );

    case 'UPDATE_QUANTITY': {
      const { variantId, quantity } = action.payload;

      if (quantity <= 0) {
        return state.filter(
          item => item.variantId !== variantId
        );
      }

      return state.map(item =>
        item.variantId === variantId
          ? {
              ...item,
              quantity: Math.min(quantity, item.stock)
            }
          : item
      );
    }

    case 'CLEAR_CART':
      return [];

    case 'LOAD_CART':
      return (action.payload || []).map(item => ({
        ...item,
        price: Number(item.price) || 0,
        quantity: item.quantity || 1,
        variantId: item.variantId,
        stock: item.stock ?? Infinity
      }));

    default:
      return state;
  }
};

export const CartProvider = ({ children }) => {
  const [cart, dispatch] = useReducer(cartReducer, []);

  // Load from localStorage
  useEffect(() => {
    const saved = localStorage.getItem('biologist-cart');
    if (saved) {
      try {
        dispatch({
          type: 'LOAD_CART',
          payload: JSON.parse(saved)
        });
      } catch {
        localStorage.removeItem('biologist-cart');
      }
    }
  }, []);

  // Persist to localStorage
  useEffect(() => {
    localStorage.setItem(
      'biologist-cart',
      JSON.stringify(cart)
    );
  }, [cart]);

  const addToCart = (variant) => {
    if (!variant?.variantId) {
      console.error(
        'addToCart: variantId is required',
        variant
      );
      return;
    }

    dispatch({
      type: 'ADD_TO_CART',
      payload: variant
    });
  };

  const removeFromCart = (variantId) =>
    dispatch({
      type: 'REMOVE_FROM_CART',
      payload: variantId
    });

  const updateQuantity = (variantId, quantity) =>
    dispatch({
      type: 'UPDATE_QUANTITY',
      payload: { variantId, quantity }
    });

  const clearCart = () =>
    dispatch({ type: 'CLEAR_CART' });

  const cartCount = cart.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const cartTotal = cart.reduce(
    (sum, item) =>
      sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        cartTotal: Number(cartTotal.toFixed(2))
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error(
      'useCart must be used within CartProvider'
    );
  }
  return context;
};
