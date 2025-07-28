import { View, Text } from 'react-native';
import { styles } from './ProductList.styles';
import { map } from 'lodash';
import { Product } from './Product';

export function ProductList(props) {
  const { products } = props;

  return (
    <View>
      <Text style={styles.title}>Products:</Text>

      {map(products, product => (
        <Product key={product.id} product={product} />
      ))}
    </View>
  );
}
