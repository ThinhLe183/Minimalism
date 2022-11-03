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
} from "firebase/firestore";
import { db } from "../config/firebase";
import products from "../product";

export const addProducts = async () => {
  const productsRef = collection(db, "products");
  for (let i = 0; i < products.length; i++) {
    await addDoc(productsRef, products[i]);
  }

  console.log("success");
};
export const fetchAllProducts = async () => {
  const products = [];
  const productRef = collection(db, "products");
  const productSnapShot = await getDocs(productRef);
  productSnapShot.forEach((doc) => {
    products.unshift({ ...doc.data() });
  });
  
  return products;
};
