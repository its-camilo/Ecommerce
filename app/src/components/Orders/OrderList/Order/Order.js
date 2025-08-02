import { View, Text, Pressable } from 'react-native';
import { styles } from './Order.styles';
import { IconButton } from 'react-native-paper';
import { formatPrice } from '../../../../utils/functions/formatPrice';
import { useNavigation } from '@react-navigation/native';
import { screensName } from '@/src/utils';
import { DateTime } from 'luxon';

export function Order(props) {
  const { order } = props;
  const navigation = useNavigation();

  const goToOrder = () => {
    navigation.navigate(screensName.account.order, {
      id: order.id,
    });
  };
  return (
    <Pressable onPress={goToOrder} style={styles.container}>
      <View>
        <Text>
          <Text style={styles.title}>ID de Pedido: </Text>
          {order.id}
        </Text>
        <Text>
          <Text style={styles.title}>Total: </Text>
          {formatPrice(Number(order.totalPayment).toFixed(2))}$
        </Text>
        <Text>
          <Text style={styles.title}>Fecha y hora de compra: </Text>
          {DateTime.fromISO(order.createdAt, {
            zone: 'America/Bogota',
          }).toFormat("dd/MM/yyyy 'a las' HH:mm")}
        </Text>
      </View>
      <IconButton icon="eye" />
    </Pressable>
  );
}
