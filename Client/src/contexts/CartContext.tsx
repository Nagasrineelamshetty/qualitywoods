// import React, { createContext, useContext, useEffect, useReducer } from 'react';
// import axios from '../api/axios';
// import { useAuth } from './AuthContext';

// interface CartItem {
//   id: string;
//   name: string;
//   price: number;
//   image: string;
//   quantity: number;
//   customizations: {
//     wood?: string;
//     finish?: string;
//     dimensions?: string;
//   };
// }

// interface CartState {
//   items: CartItem[];
//   total: number;
// }

// type CartAction =
//   | { type: 'LOAD_CART'; payload: CartItem[] }
//   | { type: 'ADD_ITEM'; payload: CartItem }
//   | { type: 'REMOVE_ITEM'; payload: string }
//   | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
//   | { type: 'CLEAR_CART' };

// const cartReducer = (state: CartState, action: CartAction): CartState => {
//   let items: CartItem[];

//   switch (action.type) {
//     case 'LOAD_CART':
//       items = action.payload;
//       break;
//     case 'ADD_ITEM':
//       const existing = state.items.find(item => item.id === action.payload.id);
//       items = existing
//         ? state.items.map(item =>
//             item.id === action.payload.id
//               ? { ...item, quantity: item.quantity + action.payload.quantity }
//               : item
//           )
//         : [...state.items, action.payload];
//       break;
//     case 'REMOVE_ITEM':
//       items = state.items.filter(item => item.id !== action.payload);
//       break;
//     case 'UPDATE_QUANTITY':
//       items = state.items.map(item =>
//         item.id === action.payload.id
//           ? { ...item, quantity: action.payload.quantity }
//           : item
//       );
//       break;
//     case 'CLEAR_CART':
//       return { items: [], total: 0 };
//     default:
//       return state;
//   }

//   const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
//   return { items, total };
// };

// const CartContext = createContext<{
//   state: CartState;
//   addItem: (item: CartItem) => void;
//   removeItem: (id: string) => void;
//   updateQuantity: (id: string, quantity: number) => void;
//   clearCart: () => void;
// } | null>(null);

// export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
//   const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0 });
//   const { user } = useAuth();

//   // ⬇ Load cart on user login
//   useEffect(() => {
//     const timeout = setTimeout(() => {
//       const loadCart = async () => {
//         try {
//           if (user?._id) {
//             const res = await axios.get('/cart');
//             const dbItems = res.data?.items || [];

//             const loadedItems = dbItems.map((item: any) => ({
//               id: item.productId,
//               name: item.name,
//               price: item.price,
//               image: item.image,
//               quantity: item.quantity,
//               customizations: item.customizations,
//             }));

//             dispatch({ type: 'LOAD_CART', payload: loadedItems });
//             console.log('🔁 Loaded from DB:', loadedItems);
//           }
//         } catch (err) {
//           console.error('❌ Error loading cart from DB', err);
//         }
//       };
//       loadCart();
//     }, 100);

//     return () => clearTimeout(timeout);
//   }, [user?._id]);

//   // ⬇ Auto-save cart with debounce
//   useEffect(() => {
//     const debounceSave = setTimeout(() => {
//       const saveCart = async () => {
//         try {
//           if (user?._id) {
//             const payload = state.items.map(item => ({
//               productId: item.id,
//               name: item.name,
//               price: item.price,
//               image: item.image,
//               quantity: item.quantity,
//               customizations: item.customizations,
//             }));

//             await axios.post('/cart', { items: payload });
//             console.log('🛠 Cart auto-saved to DB:', payload);
//           }
//         } catch (err) {
//           console.error('❌ Auto-save failed:', err);
//         }
//       };
//       saveCart();
//     }, 400);

//     return () => clearTimeout(debounceSave);
//   }, [state.items]);

//   const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item });
//   const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id });
//   const updateQuantity = (id: string, quantity: number) =>
//     dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
//   const clearCart = () => dispatch({ type: 'CLEAR_CART' });

//   return (
//     <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
//       {children}
//     </CartContext.Provider>
//   );
// };

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) throw new Error('🛒 useCart must be used within a CartProvider');
//   return context;
// };
import React, { createContext, useContext, useEffect, useReducer } from 'react';
import axios from '../api/axios';
import { useAuth } from './AuthContext';

interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  customizations: {
    wood?: string;
    finish?: string;
    dimensions?: string;
  };
}

interface CartState {
  items: CartItem[];
  total: number;
  loading: boolean;
}

type CartAction =
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'ADD_ITEM'; payload: CartItem }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  let items: CartItem[];

  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, loading: action.payload };

    case 'LOAD_CART':
      items = action.payload;
      const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      return { items, total, loading: false };

    case 'ADD_ITEM':
      const existing = state.items.find(item => item.id === action.payload.id);
      items = existing
        ? state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          )
        : [...state.items, action.payload];
      break;

    case 'REMOVE_ITEM':
      items = state.items.filter(item => item.id !== action.payload);
      break;

    case 'UPDATE_QUANTITY':
      items = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      );
      break;

    case 'CLEAR_CART':
      return { items: [], total: 0, loading: false };

    default:
      return state;
  }

  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return { items, total, loading: false };
};

const CartContext = createContext<{
  state: CartState;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
} | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], total: 0, loading: true });
  const { user } = useAuth();

  // ⬇ Load cart on user login
  useEffect(() => {
    const timeout = setTimeout(() => {
      const loadCart = async () => {
        try {
          if (user?._id) {
            dispatch({ type: 'SET_LOADING', payload: true });
            const res = await axios.get('/cart');
            const dbItems = res.data?.items || [];

            const loadedItems = dbItems.map((item: any) => ({
              id: item.productId,
              name: item.name,
              price: item.price,
              image: item.image,
              quantity: item.quantity,
              customizations: item.customizations,
            }));

            dispatch({ type: 'LOAD_CART', payload: loadedItems });
            console.log('🔁 Loaded from DB:', loadedItems);
          }
        } catch (err) {
          console.error('❌ Error loading cart from DB', err);
          dispatch({ type: 'SET_LOADING', payload: false });
        }
      };
      loadCart();
    }, 100);

    return () => clearTimeout(timeout);
  }, [user?._id]);

  // ⬇ Auto-save cart with debounce
  useEffect(() => {
    const debounceSave = setTimeout(() => {
      const saveCart = async () => {
        try {
          if (user?._id) {
            const payload = state.items.map(item => ({
              productId: item.id,
              name: item.name,
              price: item.price,
              image: item.image,
              quantity: item.quantity,
              customizations: item.customizations,
            }));

            await axios.post('/cart', { items: payload });
            console.log('🛠 Cart auto-saved to DB:', payload);
          }
        } catch (err) {
          console.error('❌ Auto-save failed:', err);
        }
      };
      saveCart();
    }, 400);

    return () => clearTimeout(debounceSave);
  }, [state.items]);

  const addItem = (item: CartItem) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (id: string) => dispatch({ type: 'REMOVE_ITEM', payload: id });
  const updateQuantity = (id: string, quantity: number) =>
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{ state, addItem, removeItem, updateQuantity, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('🛒 useCart must be used within a CartProvider');
  return context;
};
