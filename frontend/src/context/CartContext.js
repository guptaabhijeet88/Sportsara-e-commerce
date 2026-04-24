import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import API from '../utils/api';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { token, user } = useAuth();
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem('cartItems');
    return saved ? JSON.parse(saved) : [];
  });
  const [loading, setLoading] = useState(false);

  const headers = token ? { Authorization: `Bearer ${token}` } : {};

  // Fetch cart from server when logged in
  useEffect(() => {
    if (token && user) {
      fetchCart();
    }
  }, [token, user]);

  // Save guest cart to localStorage
  useEffect(() => {
    if (!token) {
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }, [cartItems, token]);

  const fetchCart = async () => {
    if (!token) return;
    try {
      setLoading(true);
      const { data } = await axios.get(`${API}/cart`, { headers });
      setCartItems(data.map((item) => ({
        _id: item.product._id,
        name: item.product.name,
        image: item.product.image,
        price: item.product.price,
        stock: item.product.stock,
        brand: item.product.brand,
        qty: item.quantity,
        color: item.color,
        size: item.size,
      })));
    } catch (error) {
      console.error('Fetch cart error:', error);
    } finally {
      setLoading(false);
    }
  };

  const addToCart = async (product) => {
    const itemColor = product.selectedColor || product.color;
    const itemSize = product.selectedSize || product.size;

    if (token) {
      try {
        await axios.post(`${API}/cart/add`, { 
          productId: product._id, 
          quantity: 1,
          color: itemColor,
          size: itemSize
        }, { headers });
        await fetchCart();
        return true;
      } catch (error) {
        console.error('Add to cart error:', error);
        return false;
      }
    } else {
      // Guest cart (localStorage)
      setCartItems((prev) => {
        const exists = prev.find((item) => item._id === product._id && item.color === itemColor && item.size === itemSize);
        if (exists) {
          if (exists.qty >= (product.stock || product.countInStock)) return prev;
          return prev.map((item) => (item._id === product._id && item.color === itemColor && item.size === itemSize) ? { ...item, qty: item.qty + 1 } : item);
        }
        return [...prev, { ...product, qty: 1, color: itemColor, size: itemSize }];
      });
      return true;
    }
  };

  const removeFromCart = async (itemToRemove) => {
    if (token) {
      try {
        await axios.delete(`${API}/cart/remove/${itemToRemove._id}`, { 
          headers,
          data: { color: itemToRemove.color, size: itemToRemove.size } 
        });
        await fetchCart();
      } catch (error) {
        console.error('Remove from cart error:', error);
      }
    } else {
      setCartItems((prev) => prev.filter((item) => !(item._id === itemToRemove._id && item.color === itemToRemove.color && item.size === itemToRemove.size)));
    }
  };

  const decreaseQty = async (itemToDecrease) => {
    const item = cartItems.find((i) => i._id === itemToDecrease._id && i.color === itemToDecrease.color && i.size === itemToDecrease.size);
    if (!item) return;

    if (token) {
      try {
        const newQty = item.qty - 1;
        if (newQty <= 0) {
          await axios.delete(`${API}/cart/remove/${itemToDecrease._id}`, { 
            headers,
            data: { color: itemToDecrease.color, size: itemToDecrease.size }
          });
        } else {
          await axios.put(`${API}/cart/update`, { 
            productId: itemToDecrease._id, 
            quantity: newQty,
            color: itemToDecrease.color,
            size: itemToDecrease.size
          }, { headers });
        }
        await fetchCart();
      } catch (error) {
        console.error('Decrease qty error:', error);
      }
    } else {
      setCartItems((prev) => {
        if (item.qty === 1) return prev.filter((i) => !(i._id === itemToDecrease._id && i.color === itemToDecrease.color && i.size === itemToDecrease.size));
        return prev.map((i) => (i._id === itemToDecrease._id && i.color === itemToDecrease.color && i.size === itemToDecrease.size) ? { ...i, qty: i.qty - 1 } : i);
      });
    }
  };

  const clearCart = async () => {
    if (token) {
      try {
        await axios.delete(`${API}/cart/clear`, { headers });
        setCartItems([]);
      } catch (error) {
        console.error('Clear cart error:', error);
      }
    } else {
      setCartItems([]);
    }
  };

  const cartCount = cartItems.reduce((acc, item) => acc + item.qty, 0);
  const cartTotal = cartItems.reduce((acc, item) => acc + item.qty * item.price, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, decreaseQty, clearCart, fetchCart, loading, cartCount, cartTotal }}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
export default CartContext;