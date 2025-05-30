import { View, Dimensions, Image, Pressable, ScrollView } from 'react-native'
import { useState, useEffect, useRef } from 'react'
import { styles } from './ProductBanners.styles'
import { ENV, screensName } from '../../../utils'
import { useNavigation } from '@react-navigation/native'

const width = Dimensions.get('window').width

export function ProductBanners(props) {
  const { banners, onProductPress } = props
  const navigation = useNavigation()
  const scrollViewRef = useRef(null)
  const [currentIndex, setCurrentIndex] = useState(0)
    const goToProduct = (id) => {
    if (onProductPress) {
      onProductPress(id);
    } else {
      navigation.navigate(screensName.home.product, { productId: id });
    }
  }

  // Auto-rotation effect
  useEffect(() => {
    if (!banners || banners.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % banners.length;
        
        // Scroll to the next banner
        if (scrollViewRef.current) {
          scrollViewRef.current.scrollTo({
            x: nextIndex * width,
            animated: true,
          });
        }
        
        return nextIndex;
      });
    }, 3000); // Change banner every 3 seconds

    return () => clearInterval(timer);
  }, [banners]);
  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={true}
        style={styles.scrollView}
        onMomentumScrollEnd={(event) => {
          // Update current index when user manually scrolls
          const newIndex = Math.round(event.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
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
          );        })}
      </ScrollView>
      
      {/* Pagination dots */}
      {banners && banners.length > 1 && (
        <View style={styles.paginationContainer}>
          {banners.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                { backgroundColor: index === currentIndex ? '#0098d3' : '#ccc' }
              ]}
            />
          ))}
        </View>
      )}
    </View>
  )
}