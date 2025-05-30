import { View, Dimensions, Image, Pressable, ScrollView } from 'react-native'
import { styles } from './ProductBanners.styles'
import { ENV, screensName } from '../../../utils'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('window').width

export function ProductBanners(props) {
  const { banners, onProductPress } = props
  const navigation = useNavigation()
  
  const goToProduct = (id) => {
    if (onProductPress) {
      onProductPress(id);
    } else {
      navigation.navigate(screensName.home.product, { productId: id });
    }
  }

  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        style={styles.scrollView}
      >
        {banners?.map((banner, index) => {
          const item = banner;
          const urlImage = item.banner.url;
          const fullImageUrl = urlImage.startsWith('/') 
            ? `${ENV.API_URL.replace('/api', '')}${urlImage}`
            : urlImage;
          
          return (
            <Pressable key={index} onPress={() => goToProduct(item.product.id)}>
              <Image
                source={{ uri: fullImageUrl }}
                style={styles.carousel}
              />
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  )
}