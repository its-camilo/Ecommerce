import { View, Text } from 'react-native';
import { Layout } from '../../../layouts';
import { styles } from './CartScreen.styles';
import { useCart, useAuth } from '@/src/hooks';
import { useState, useEffect } from 'react';
import { productCtrl, addressCtrl } from '@/src/api';
import { fn } from '@/src/utils';
import { LoadingScreen } from '@/src/components/Shared';
import { size, map } from 'lodash';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';
import { Cart } from '@/src/components/Cart';

export function CartScreen() {
  const [products, setProducts] = useState(null);
  const { cart } = useCart();
  const [totalPayment, setTotalPayment] = useState(null);
  const { user } = useAuth();
  const [addresses, setAddresses] = useState(null);
  const [selectedAddress, setSelectedAddress] = useState(null);

  useEffect(() => {
    getProducts();
  }, [cart]);

  useEffect(() => {
    loadAddresses();
  }, []);

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

  const loadAddresses = async () => {
    const response = await addressCtrl.getAll(user.id);
    setAddresses(response.data);
  };

  return (
    <Layout.Basic textTitleCenter="Carrito" showBack={false}>
      <Layout.Cart>
        {!products ? (
          <LoadingScreen text="Cargando carrito" />
        ) : size(products) === 0 ? (
          <Cart.Empty />
        ) : (
          <KeyboardAwareScrollView extraScrollHeight={25}>
            <View style={styles.container}>
              <Cart.ProductList products={products} />
              <Cart.AddressList
                addresses={addresses}
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />
              {selectedAddress && <Text>Pago</Text>}
            </View>
          </KeyboardAwareScrollView>
        )}
      </Layout.Cart>
    </Layout.Basic>
  );
}
