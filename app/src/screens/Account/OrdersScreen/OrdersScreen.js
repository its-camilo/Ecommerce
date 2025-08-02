import { View, Text } from 'react-native';
import { Layout } from '../../../layouts';
import { styles } from './OrdersScreen.styles';
import { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { size } from 'lodash'; // fixed quotes
import { useAuth } from '../../../hooks';
import Toast from 'react-native-root-toast';
import { orderCtrl } from '../../../api';
import { LoadingScreen } from '@/src/components/Shared';

export function OrdersScreen() {
  const [orders, setOrders] = useState(null);
  const { user } = useAuth();

  useFocusEffect(
    useCallback(() => {
      getOrders();
    }, [])
  );

  const getOrders = async () => {
    try {
      const response = await orderCtrl.getAll(user.id);
      setOrders(response.data);
    } catch (error) {
      console.log('Order fetch error:', error); // <-- Agrega esto
      Toast.show('Error al obtener los pedidos', {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <Layout.Basic textTitleCenter="Pedidos">
      {!orders ? (
        <LoadingScreen text="Cargando pedidos" />
      ) : size(orders) === 0 ? (
        <Text>No tienes pedidos</Text>
      ) : (
        <Text>Mis pedidos</Text>
      )}
    </Layout.Basic>
  );
}
