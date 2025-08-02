import { Text } from 'react-native';
import { Layout } from '../../../layouts';
import { styles } from './OrderScreen.styles';
import { useState, useEffect } from 'react';
import Toast from 'react-native-root-toast';
import { orderCtrl } from '../../../api';

export function OrderScreen(props) {
  const {
    route: { params },
  } = props;
  const orderId = params.id;

  const [order, setOrder] = useState(null);

  useEffect(() => {
    getOrder();
  }, [orderId]);

  const getOrder = async () => {
    try {
      const response = await orderCtrl.getById(orderId);
      console.log('Order response:', response);
    } catch (error) {
      console.log('Error al obtener el pedido:', error);
      Toast.show('Error al obtener el pedido', {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <Layout.Basic textTitleCenter="Pedido">
      <Text>Pedido</Text>
    </Layout.Basic>
  );
}
