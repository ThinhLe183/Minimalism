import create from "zustand";
export const useUserStore = create((set) => ({
  user: undefined,
  setUser: (newUser) =>
    set({
      user: newUser,
    }),
}));

export const useCartStore = create((set) => ({
  cart: [],
  setCart: (newCart) => set({ cart: newCart }),
  removeProductFromCart: (productId) =>
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== productId),
    })),
  updateProductInCart: (id, { size, quantity }) =>
    set((state) => ({
      cart: state.cart.map((item) => {
        if (item.id === id) {
          item.quantity = quantity || item.quantity;
          item.size = size || item.size;
          return item;
        } else {
          return item;
        }
      }),
    })),
}));

export const useLoadingStore = create((set) => ({
  isLoading: false,
  setIsLoading: (newStatus) => set({ isLoading: newStatus }),
}));
