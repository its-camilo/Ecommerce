import { map, forEach } from 'lodash';
import { ENV } from '../utils';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function getAllProducts() {
  const response = await AsyncStorage.getItem(ENV.STORAGE.CART);
  if (!response) {
    return [];
  } else {
    return JSON.parse(response);
  }
}

async function addCart(productId) {
  const products = await getAllProducts();
  const objIndex = products.findIndex(product => product.id === productId);

  if (objIndex < 0) {
    products.push({ id: productId, quantity: 1 });
  } else {
    const product = products[objIndex];
    products[objIndex].quantity = product.quantity + 1;
  }

  await AsyncStorage.setItem(ENV.STORAGE.CART, JSON.stringify(products));
}

async function count() {
  const products = await getAllProducts();
  let count = 0;
  forEach(products, product => {
    count += product.quantity;
  });
  return count;
}

async function deleteProduct(productId) {
  const products = await getAllProducts();
  const updateProducts = products.filter(product => product.id !== productId);
  await AsyncStorage.setItem(ENV.STORAGE.CART, JSON.stringify(updateProducts));
}

async function increaseProduct(productId) {
  try {
    const products = await getAllProducts();
    const updatedProducts = products.map(product => {
      if (product.id === productId) {
        return { ...product, quantity: product.quantity + 1 };
      }
      return product;
    });
    await AsyncStorage.setItem(
      ENV.STORAGE.CART,
      JSON.stringify(updatedProducts)
    );
  } catch (error) {
    throw error;
  }
}

async function decreaseProduct(productId) {
  try {
    const products = await getAllProducts();
    const targetProduct = products.find(product => product.id === productId);

    if (!targetProduct) return;

    if (targetProduct.quantity > 1) {
      const updatedProducts = products.map(product => {
        if (product.id === productId) {
          return { ...product, quantity: product.quantity - 1 };
        }
        return product;
      });
      await AsyncStorage.setItem(
        ENV.STORAGE.CART,
        JSON.stringify(updatedProducts)
      );
    } else {
      await deleteProduct(productId);
    }
  } catch (error) {
    throw error;
  }
}

async function deleteAll() {
  await AsyncStorage.removeItem(ENV.STORAGE.CART);
}

export const cartCtrl = {
  getAll: getAllProducts,
  add: addCart,
  count,
  delete: deleteProduct,
  increaseProduct,
  decreaseProduct,
  deleteAll,
};
