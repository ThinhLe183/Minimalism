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

export const addExampleProducts = async () => {
  const productsRef = collection(db, "products");
  await addDoc(productsRef, products[1]);
  await addDoc(productsRef, products[2]);
  await addDoc(productsRef, products[3]);

  console.log("success");
};
