import { View, Text } from 'react-native';
import { Layout } from '../../../layouts';
import { styles } from './CartScreen.styles';
import { useCart } from '@/src/hooks';
import { useState, useEffect } from 'react';
import { productCtrl } from '@/src/api';
import { fn } from '@/src/utils';
import { LoadingScreen } from '@/src/components/Shared';
import { size, map } from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Cart } from '@/src/components/Cart';

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
        {!products ? (
          <LoadingScreen text="Cargando carrito" />
        ) : size(products) === 0 ? (
          <Text>Tu carrito está vacío</Text>
        ) : (
          <KeyboardAwareScrollView extraScrollHeight={25}>
            <View style={styles.container}>
              <Cart.ProductList products={products} />
              <Text>Direcciones</Text>
              <Text>Pago</Text>
            </View>
          </KeyboardAwareScrollView>
        )}
      </Layout.Cart>
    </Layout.Basic>
  );
}
