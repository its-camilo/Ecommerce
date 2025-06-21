import { View, Text } from 'react-native';
import { styles } from './WishlistList.styles';
import { map } from 'lodash';
import { Product } from './Product';

export function WishlistList(props) {
  const { title, products, onReload } = props;
  return (
    <View style={styles.container}>
      {title && <Text style={styles.title}>{title}</Text>}
      {map(products, product => (
        <Product key={product.id} product={product} onReload={onReload} />
      ))}
    </View>
  );
}
