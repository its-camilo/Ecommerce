import { View, Text } from 'react-native';
import { Layout } from '../../../layouts';
import { styles } from './CartScreen.styles';
import { useCart } from '@/src/hooks';
import { useState, useEffect } from 'react';
import { productCtrl } from '@/src/api';
import { fn } from '@/src/utils';

export function CartScreen() {
  const [products, setProducts] = useState(null);
  const { cart } = useCart();
  const [totalPayment, setTotalPayment] = useState(null);

  useEffect(() => {
    getProducts();
  }, [cart]);

  const getProducts = async () => {
    const productsTemp = [];
    let totalPaymentTemp = 0;

    for await (const item of cart) {
      const response = await productCtrl.getById(item.id);
      const data = response.data;
      productsTemp.push({
        ...data,
        ...item,
      });
      const priceProduct = fn.calcPrice(data.price, data.discount);
      totalPaymentTemp += priceProduct * item.quantity;
    }

    setProducts(productsTemp);
    setTotalPayment(totalPaymentTemp);
  };

  return (
    <Layout.Basic textTitleCenter="Carrito" showBack={false}>
      <Layout.Cart>
        <Text>CartScreen</Text>
      </Layout.Cart>
    </Layout.Basic>
  );
}
