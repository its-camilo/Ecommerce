import { View, Text } from 'react-native';
import { BasicLayout, Layout } from '../../layouts';
import { useState, useEffect } from 'react';
import Toast from 'react-native-root-toast';
import { useSearch } from '@/src/hooks';
import { productCtrl } from '@/src/api';
import { LoadingScreen, Search, GridProducts } from '@/src/components/Shared';
import { size } from 'lodash';

export function SearchScreen() {
  const [products, setProducts] = useState(null);
  const { searchText } = useSearch();

  useEffect(() => {
    getProductSearch();
  }, [searchText]);

  const getProductSearch = async () => {
    try {
      const response = await productCtrl.search(searchText);
      setProducts(response.data);
    } catch (error) {
      Toast.show('🔍 Error al cargar los productos de la búsqueda', {
        position: Toast.positions.CENTER,
        backgroundColor: '#D7263D',
        textColor: '#fff',
      });
    }
  };

  return (
    <Layout.Basic textTitleCenter="Búsqueda">
      {!products ? (
        <LoadingScreen text="Buscando productos" />
      ) : size(products) === 0 ? (
        <Search.ResultNotFound searchText={searchText} />
      ) : (
        <GridProducts products={products} />
      )}
    </Layout.Basic>
  );
}
