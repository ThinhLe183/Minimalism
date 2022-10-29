import { async } from "@firebase/util";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  Timestamp,
  orderBy,
  setDoc,
  updateDoc,
} from "firebase/firestore";

import { db } from "../config/firebase";

export const addProduct = async (uid, product) => {
  try {
    const data = {
      ...product,
      created_at: Timestamp.fromMillis(Date.now()).seconds,
    };
    const res = await addDoc(collection(db, `users/${uid}/cart`), data);
    //document id will be random generated, product.id will be kept to ref to the product
    return { ...data, id: res.id };
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (uid, product, dataUpdate) => {
  try {
    const productRef = doc(db, `users/${uid}/cart/${product.id}`);
    await updateDoc(productRef, {
      ...dataUpdate,
      created_at: Timestamp.fromMillis(Date.now()).seconds,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteProduct = async (uid, productId) => {
  try {
    const productRef = doc(db, `users/${uid}/cart/${productId}`);
    await deleteDoc(productRef);
  } catch (error) {
    console.log(error);
  }
};

export const fetchCart = async (uid) => {
  const cart = [];
  const q = query(collection(db, `users/${uid}/cart`), orderBy("created_at"));
  const cartSnapshot = await getDocs(q);
  cartSnapshot.forEach((doc) => {
    cart.unshift({ ...doc.data(), id: doc.id });
  });
  return cart;
};
