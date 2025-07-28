import { View, Text, Image, TextInput } from 'react-native';
import { styles } from './Product.styles';
import { Button, IconButton } from 'react-native-paper';
import { ENV, fn } from '../../../../utils';
import { useCart } from '@/src/hooks';

export function Product(props) {
  const { product } = props;

  // Construir la URL de la imagen usando la misma lógica que en la wishlist
  const urlImage = product?.main_image?.url;
  const fullImageUrl = urlImage?.startsWith('/')
    ? `${ENV.API_URL.replace('/api', '')}${urlImage}`
    : urlImage;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {fullImageUrl ? (
          <Image source={{ uri: fullImageUrl }} style={styles.image} />
        ) : (
          <Text>No image</Text>
        )}
      </View>
      <View style={styles.infoContainer}>
        <View>
          <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
            {product.title}
          </Text>
          <View style={styles.prices}>
            <Text style={styles.currentPrice}>
              {fn.formatPrice(fn.calcPrice(product?.price, product?.discount))}$
              c/u
            </Text>
            {product?.discount > 0 && (
              <Text style={styles.oldPrice}>
                {fn.formatPrice(product?.price)}$
              </Text>
            )}
          </View>
        </View>

        <View style={styles.actions}>
          <View style={styles.selectQuantity}>
            <IconButton
              icon="minus"
              size={19}
              iconColor="#fff"
              style={styles.btnQuantity}
            />
            <TextInput
              value={product.quantity.toString()}
              style={styles.inputQuantity}
            />
            <IconButton
              icon="plus"
              size={19}
              iconColor="#fff"
              style={styles.btnQuantity}
            />
            <View />
          </View>

          <Button mode="contained" style={styles.btnDelete}>
            Eliminar
          </Button>
        </View>
      </View>
    </View>
  );
}
