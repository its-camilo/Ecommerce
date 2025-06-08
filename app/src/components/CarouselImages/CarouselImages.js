import {
  View,
  Text,
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { useState, useEffect, useRef } from 'react';
import { styles } from './CarouselImages.styles';
import Icon from 'react-native-vector-icons/FontAwesome';

const width = Dimensions.get('window').width;

export function CarouselImages(props) {
  const { images = [] } = props;

  const scrollViewRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Navigation functions
  const goToPrevious = () => {
    const prevIndex = currentIndex === 0 ? images.length - 1 : currentIndex - 1;

    setCurrentIndex(prevIndex);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: prevIndex * width,
        animated: true,
      });
    }
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;

    setCurrentIndex(nextIndex);
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({
        x: nextIndex * width,
        animated: true,
      });
    }
  };

  if (!images || images.length === 0) {
    return (
      <View style={styles.containerEmpty}>
        <Text>No images available</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        onMomentumScrollEnd={event => {
          // Update current index when user manually scrolls
          const newIndex = Math.round(
            event.nativeEvent.contentOffset.x / width
          );
          setCurrentIndex(newIndex);
        }}
      >
        {images.map((imageUrl, index) => {
          return (
            <View key={index} style={styles.imageContainer}>
              <Image
                source={{ uri: imageUrl }}
                style={styles.image}
                resizeMode="contain"
              />
            </View>
          );
        })}
      </ScrollView>

      {/* Navigation arrows */}
      {images && images.length > 1 && (
        <>
          {/* Left arrow */}
          <TouchableOpacity
            style={[styles.arrowButton, styles.leftArrow]}
            onPress={goToPrevious}
            activeOpacity={0.7}
          >
            <Icon name="chevron-left" size={20} color="#fff" />
          </TouchableOpacity>

          {/* Right arrow */}
          <TouchableOpacity
            style={[styles.arrowButton, styles.rightArrow]}
            onPress={goToNext}
            activeOpacity={0.7}
          >
            <Icon name="chevron-right" size={20} color="#fff" />
          </TouchableOpacity>
        </>
      )}

      {/* Pagination dots */}
      {images && images.length > 1 && (
        <View style={styles.paginationContainer}>
          {images.map((_, index) => (
            <View
              key={index}
              style={[
                styles.paginationDot,
                {
                  backgroundColor: index === currentIndex ? '#0098d3' : '#ccc',
                },
              ]}
            />
          ))}
        </View>
      )}
    </View>
  );
}
