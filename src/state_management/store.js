import create from "zustand";
import { fetchAllProducts } from "../action/products";
import {
  fetchCart,
  deleteProduct,
  updateProduct,
  addProduct,
} from "../action/cart";
import { toastAdded, toastUpdated } from "../action/toastSnip";

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
    let productIndexUpdating = cart.findIndex(
      (item) =>
        item.name === data.name &&
        item.size === data.size &&
        item.color === data.color
    );

    if (productIndexUpdating >= 0) {
      const updatedProduct = await updateProduct(
        user.uid,
        cart[productIndexUpdating].id,
        {
          quantity: cart[productIndexUpdating].quantity + data.quantity,
        }
      );
      toastUpdated();
      set({
        cart: cart.map((item) => {
          if (item.id === cart[productIndexUpdating].id) {
            return updatedProduct;
          } else {
            return item;
          }
        }),
      });
    } else {
      const addedProduct = await addProduct(user.uid, data);
      set({ cart: [...cart, addedProduct] });
      toastAdded(addedProduct);
    }
  },
  removeProductFromCart: async (productId) => {
    const user = get().user;
    const cart = get().cart.filter((item) => item.id !== productId);
    await deleteProduct(user.uid, productId);
    set({
      cart: cart,
    });
  },
}));
