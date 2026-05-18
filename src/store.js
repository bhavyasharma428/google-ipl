import { create } from 'zustand';

export const useStore = create((set, get) => ({
  coins: 5000,
  addCoins: (amount) => set((state) => ({ coins: state.coins + amount })),
  spendCoins: (amount) => {
    if (get().coins >= amount) {
      set((state) => ({ coins: state.coins - amount }));
      return true;
    }
    return false;
  },

  cart: [],
  addToCart: (item) => set((state) => {
    const existing = state.cart.find(i => i.id === item.id);
    if (existing) {
      return { cart: state.cart.map(i => i.id === item.id ? { ...i, qty: i.qty + 1 } : i) };
    }
    return { cart: [...state.cart, { ...item, qty: 1 }] };
  }),
  removeFromCart: (id) => set((state) => ({ cart: state.cart.filter(i => i.id !== id) })),
  clearCart: () => set({ cart: [] }),
  getCartTotal: () => get().cart.reduce((total, item) => total + (item.price * item.qty), 0),

  portfolio: [],
  buyStock: (stock) => {
    if (get().spendCoins(stock.price)) {
      set((state) => ({ portfolio: [...state.portfolio, { ...stock, buyPrice: stock.price }] }));
      return true;
    }
    return false;
  },
  sellStock: (stockId, currentPrice) => set((state) => {
    const index = state.portfolio.findIndex(s => s.id === stockId);
    if (index === -1) return state;
    
    get().addCoins(currentPrice);
    
    const newPortfolio = [...state.portfolio];
    newPortfolio.splice(index, 1);
    return { portfolio: newPortfolio };
  }),

  userAura: 'Rookie Watcher',
  setUserAura: (aura) => set({ userAura: aura }),
  
  predictionHistory: [],
  addPrediction: (pred) => set((state) => ({ predictionHistory: [...state.predictionHistory, pred] }))
}));
