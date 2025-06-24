import { createContext, useEffect, useState } from 'react';
import { cartCtrl } from '../api';

export const CartContext = createContext();

export function CartProvider(props) {
  const { children } = props;
  const [cart, setCart] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);

  const addCart = async (productId) => {
    try {
      await cartCtrl.addCart(productId);
    } catch (error) {
      throw error;
    }
  };

  const retrieveCart = () => {
    //
  };

  const countTotalProducts = () => {
    //
  };

  const increaseProduct = () => {
    //
  };

  const decreaseProduct = () => {
    //
  };

  const deleteProduct = () => {
    //
  };

  const emptyCart = () => {
    //
  };

  const data = {
    cart,
    totalProducts,
    addCart,
    deleteProduct,
    increaseProduct,
    decreaseProduct,
    emptyCart,
  };

  return <CartContext.Provider value={data}>{children}</CartContext.Provider>;
}
