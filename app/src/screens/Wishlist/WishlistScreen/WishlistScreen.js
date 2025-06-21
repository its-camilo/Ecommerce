import { View, Text } from 'react-native';
import { Layout } from '../../../layouts';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import Toast from 'react-native-root-toast';
import { wishlistCtrl } from '@/src/api';
import { useAuth } from '@/src/hooks';
import { forEach, size } from 'lodash';
import { LoadingScreen } from '@/src/components/Shared';
import { styles } from './WishlistScreen.styles';
import { WishlistList } from '@/src/components/Wishlist';

export function WishlistScreen() {
  const [products, setProducts] = useState(null);
  const { user } = useAuth();
  const [reload, setReload] = useState(false);

  useFocusEffect(
    useCallback(() => {
      getProductsWishlist();
    }, [reload])
  );

  const onReload = () => {
    setReload(prev => !prev);
  };

  const getProductsWishlist = async () => {
    try {
      const response = await wishlistCtrl.getAllProducts(user.id);
      console.log('Productos de la wishlist:', response);
      const productTemp = [];

      // Access the actual data array, not the whole response object
      const wishlistItems = response.data || response;

      forEach(wishlistItems, item => {
        console.log('Item de wishlist:', item);
        if (item.product) {
          productTemp.push(item.product);
        }
      });

      setProducts(productTemp);
      console.log('Productos actualizados:', productTemp);
    } catch (error) {
      Toast.show('Error al obtener los productos de la lista de deseos', {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <Layout.Basic textTitleCenter="Lista de deseos" showBack={false}>
      {!products ? (
        <LoadingScreen text="Cargando productos de la lista de deseos..." />
      ) : size(products) === 0 ? (
        <View style={styles.container}>
          <Text style={styles.title}>Lista de deseos</Text>
          <Text>No tienes productos en tu lista de deseos.</Text>
        </View>
      ) : (
        <WishlistList
          title="Lista de deseos"
          products={products}
          onReload={onReload}
        />
      )}
    </Layout.Basic>
  );
}
