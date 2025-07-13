import React, { createContext, useContext, useReducer, ReactNode } from 'react';

export interface Book {
  id: string;
  title: string;
  author: string;
  price: number;
  originalPrice?: number;
  image: string;
  genre: string;
  rating: number;
  reviews: number;
  description: string;
  availability: 'in-stock' | 'out-of-stock' | 'limited';
  isbn: string;
  pages: number;
  publisher: string;
  publishDate: string;
}

export interface CartItem {
  book: Book;
  quantity: number;
}

export interface AppState {
  cart: CartItem[];
  wishlist: Book[];
  cartCount: number;
  wishlistCount: number;
}

type AppAction =
  | { type: 'ADD_TO_CART'; payload: Book }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'ADD_TO_WISHLIST'; payload: Book }
  | { type: 'REMOVE_FROM_WISHLIST'; payload: string }
  | { type: 'MOVE_TO_CART'; payload: string }
  | { type: 'CLEAR_CART' };

const initialState: AppState = {
  cart: [],
  wishlist: [],
  cartCount: 0,
  wishlistCount: 0,
};

function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItem = state.cart.find(item => item.book.id === action.payload.id);
      
      if (existingItem) {
        const updatedCart = state.cart.map(item =>
          item.book.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return {
          ...state,
          cart: updatedCart,
          cartCount: updatedCart.reduce((sum, item) => sum + item.quantity, 0),
        };
      }
      
      const newCart = [...state.cart, { book: action.payload, quantity: 1 }];
      return {
        ...state,
        cart: newCart,
        cartCount: newCart.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    
    case 'REMOVE_FROM_CART': {
      const newCart = state.cart.filter(item => item.book.id !== action.payload);
      return {
        ...state,
        cart: newCart,
        cartCount: newCart.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    
    case 'UPDATE_QUANTITY': {
      const updatedCart = state.cart.map(item =>
        item.book.id === action.payload.id
          ? { ...item, quantity: Math.max(0, action.payload.quantity) }
          : item
      ).filter(item => item.quantity > 0);
      
      return {
        ...state,
        cart: updatedCart,
        cartCount: updatedCart.reduce((sum, item) => sum + item.quantity, 0),
      };
    }
    
    case 'ADD_TO_WISHLIST': {
      if (state.wishlist.find(book => book.id === action.payload.id)) {
        return state;
      }
      
      const newWishlist = [...state.wishlist, action.payload];
      return {
        ...state,
        wishlist: newWishlist,
        wishlistCount: newWishlist.length,
      };
    }
    
    case 'REMOVE_FROM_WISHLIST': {
      const newWishlist = state.wishlist.filter(book => book.id !== action.payload);
      return {
        ...state,
        wishlist: newWishlist,
        wishlistCount: newWishlist.length,
      };
    }
    
    case 'MOVE_TO_CART': {
      const book = state.wishlist.find(b => b.id === action.payload);
      if (!book) return state;
      
      const newWishlist = state.wishlist.filter(b => b.id !== action.payload);
      const existingCartItem = state.cart.find(item => item.book.id === action.payload);
      
      let newCart;
      if (existingCartItem) {
        newCart = state.cart.map(item =>
          item.book.id === action.payload
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newCart = [...state.cart, { book, quantity: 1 }];
      }
      
      return {
        ...state,
        cart: newCart,
        wishlist: newWishlist,
        cartCount: newCart.reduce((sum, item) => sum + item.quantity, 0),
        wishlistCount: newWishlist.length,
      };
    }
    
    case 'CLEAR_CART':
      return {
        ...state,
        cart: [],
        cartCount: 0,
      };
    
    default:
      return state;
  }
}

const AppContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<AppAction>;
} | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);
  
  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}