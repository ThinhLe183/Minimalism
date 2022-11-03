import create from "zustand";
import { fetchAllProducts } from "../action/products";
import {
  fetchCart,
  deleteProduct,
  updateProduct,
  addProduct,
} from "../action/cart";
// export const useProductStore = create((set) => ({
//   products: [],
//   fetchProducts: async () => {
//     console.log("fetched");
//     const data = await fetchAllProducts();
//     set({ products: data });
//   },
// }));

// export const useUserStore = create((set) => ({
//   user: undefined,
//   setUser: (newUser) =>
//     set({
//       user: newUser,
//     }),
// }));

// export const useCartStore = create((set) => ({
//   cart: [],
//   setCart: (newCart) => set({ cart: newCart }),
//   removeProductFromCart: (productId) =>
//     set((state) => ({
//       cart: state.cart.filter((item) => item.id !== productId),
//     })),
//   updateProductInCart: (id, { size, quantity }) =>
//     set((state) => ({
//       cart: state.cart.map((item) => {
//         if (item.id === id) {
//           item.quantity = quantity || item.quantity;
//           item.size = size || item.size;
//           return item;
//         } else {
//           return item;
//         }
//       }),
//     })),
// }));

export const useLoadingStore = create((set) => ({
  isLoading: false,
  setIsLoading: (newStatus) => set({ isLoading: newStatus }),
}));

export const useStore = create((set, get) => ({
  user: undefined,
  products: [],
  cart: [],
  //User
  setUser: (newUser) =>
    set({
      user: newUser,
    }),
  //Product
  fetchProducts: async () => {
    const data = await fetchAllProducts();
    set({ products: data });
  },
  //Cart
  fetchCart: async () => {
    const user = get().user;
    if (user) {
      const data = await fetchCart(user.uid);
      set({ cart: data });
    } else {
      set({ cart: [] });
    }
  },
  addProductToCart: async (data) => {
    const user = get().user;
    const cart = get().cart;
    const addedProduct = await addProduct(user.uid, data);
    set({ cart: [...cart, addedProduct] });
  },
  removeProductFromCart: async (productId) => {
    const user = get().user;
    const cart = get().cart.filter((item) => item.id !== productId);
    await deleteProduct(user.uid, productId);
    set({
      cart: cart,
    });
  },
  updateProductInCart: async (productId, dataUpdate) => {
    const user = get().user;
    const cart = get().cart;
    await updateProduct(user.uid, productId, dataUpdate);
    set({
      cart: cart.map((item) => {
        if (item.id === productId) {
          item.quantity = dataUpdate.quantity || item.quantity;
          item.size = dataUpdate.size || item.size;
          return item;
        } else {
          return item;
        }
      }),
    });
  },
}));
