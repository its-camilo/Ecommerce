import { View, Text } from 'react-native';
import { styles } from './Buy.styles';
import { Button } from 'react-native-paper';

export function Buy(props) {
  const { productId } = props;
  return (
    <Button
      mode="contained"
      contentStyle={styles.btnBuyContent}
      labelStyle={styles.btnLabel}
      style={styles.btn}
    >
      Añadir al carrito
    </Button>
  );
}
