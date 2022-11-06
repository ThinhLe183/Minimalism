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
import products from "../dataUpload";

export const addProductsToDb = async () => {
  for (let i = 0; i < products.length; i++) {
    await setDoc(doc(db, "products", `${products[i].slug}`), products[i]);
  }

  console.log("success");
};
export const fetchAllProducts = async () => {
  const products = [];
  const productRef = collection(db, "products");
  const productSnapShot = await getDocs(productRef);
  productSnapShot.forEach((doc) => {
    const { name, price, slug, colors } = doc.data();
    products.unshift({ name, price, slug, colors });
  });
  return products;
};

export const getProduct = async (productSlug) => {
  const productRef = doc(db, `products/${productSlug}`);

  const productSnapShot = await getDoc(productRef);
  if (productSnapShot.exists()) {
    return productSnapShot.data();
  } else {
    throw Error("Product doesn't exist");
  }
};
