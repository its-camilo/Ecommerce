import { View, Text, Image, ActivityIndicator } from 'react-native';
import { styles } from './Product.styles';
import { Button, IconButton } from 'react-native-paper';
import { ENV } from '../../../../utils';
import { fn, screensName } from '../../../../utils';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { wishlistCtrl } from '@/src/api';
import { useAuth } from '@/src/hooks';

export function Product(props) {
  const { product, onReload } = props;
  const productInfo = product;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const goToProduct = () => {
    navigation.navigate(screensName.home.root, {
      screen: screensName.home.product,
      params: { productId: product.documentId },
    });
  };

  const deleteFavorite = async () => {
    setLoading(true);
    await wishlistCtrl.delete(user.id, product.documentId);
    onReload();
    setLoading(false);
  };

  // Construir la URL de la imagen usando la misma lógica que ProductBanners
  const urlImage = productInfo?.main_image?.url;
  const fullImageUrl = urlImage?.startsWith('/')
    ? `${ENV.API_URL.replace('/api', '')}${urlImage}`
    : urlImage;

  return (
    <View style={styles.container}>
      <View style={styles.containerImage}>
        {fullImageUrl ? (
          <Image
            source={{ uri: fullImageUrl }}
            style={styles.image}
            resizeMode="contain"
          />
        ) : (
          <ActivityIndicator size="small" />
        )}
      </View>
      <View style={styles.info}>
        <View>
          <Text style={styles.name} numberOfLines={3} ellipsizeMode="tail">
            {productInfo?.title}
          </Text>
          <View style={styles.prices}>
            <Text style={styles.currentPrice}>
              {fn.formatPrice(
                fn.calcPrice(productInfo?.price, productInfo?.discount)
              )}
              $
            </Text>
            {productInfo?.discount > 0 && (
              <Text style={styles.oldPrice}>
                {fn.formatPrice(productInfo?.price)}$
              </Text>
            )}
          </View>
        </View>
        <View style={styles.actions}>
          <Button
            mode="contained"
            style={styles.btnGoToProduct}
            onPress={goToProduct}
          >
            Ver producto
          </Button>
          <IconButton
            icon="close"
            iconColor="#fff"
            style={styles.btnDelete}
            onPress={deleteFavorite}
          />
        </View>
      </View>
      {loading && (
        <View style={styles.loading}>
          <ActivityIndicator size="large" color="#fff" />
        </View>
      )}
    </View>
  );
}
