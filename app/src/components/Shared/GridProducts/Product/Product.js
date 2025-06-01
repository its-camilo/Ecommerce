import { View, Text, TouchableWithoutFeedback, Image } from 'react-native'
import { styles } from './Product.styles'
import { useNavigation } from '@react-navigation/native'
import { screensName, ENV } from '@/src/utils'

export function Product(props) {
    const { product } = props
    const navigation = useNavigation();
    const urlImage = product.main_image.url;
    const fullImageUrl = urlImage.startsWith("/")
        ? `${ENV.API_URL.replace("/api", "")}${urlImage}`
        : urlImage;
    const goToProduct = () => {
        navigation.navigate(screensName.home.product, { productId: product.id });
    }
    return (
        <TouchableWithoutFeedback onPress={goToProduct}>
            <View style={styles.container}>
                <View style={styles.product}>
                    <Image source={{ uri: fullImageUrl }} style={styles.image}/>
                    <Text style={styles.name} numberOfLines={1} ellipsizeMode='tail'>{product.title}</Text>
                </View>
            </View>
        </TouchableWithoutFeedback>
    )
}