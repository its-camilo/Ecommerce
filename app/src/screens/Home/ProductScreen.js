import { View } from 'react-native';
import { Layout } from '../../layouts';
import { useState, useEffect } from 'react';
import { productCtrl } from '@/src/api';
import { forEach } from 'lodash';
import { ENV } from '../../utils';
import { LoadingScreen, Separator } from '@/src/components/Shared';
import { Product } from '@/src/components/Product';

export function ProductScreen(props) {
  const {
    route: { params },
  } = props;

  const productId = params.productId;
  const [product, setProduct] = useState(null);
  const [images, setImages] = useState([]);

  useEffect(() => {
    getProduct();
  }, [productId]);

  const getProduct = async () => {
    try {
      const response = await productCtrl.getById(productId);
      console.log('Product fetched:', response);
      setProduct(response.data);
      const mainImage = response.data.main_image.url;
      const images = response.data.images;
      const arrayImages = [mainImage];
      forEach(images, image => {
        arrayImages.push(image.url);
      });

      const processedImages = arrayImages.map(imageUrl => {
        return imageUrl.startsWith('/')
          ? `${ENV.API_URL.replace('/api', '')}${imageUrl}`
          : imageUrl;
      });

      setImages(processedImages);
    } catch (error) {
      console.error('Error fetching product:', error);
    }
  };

  return (
    <Layout.Basic textTitleCenter="Producto">
      <View>
        {!product ? (
          <LoadingScreen text="Cargando producto" size="large" />
        ) : (
          <>
            <Product.Title text={product.title} />
            <Product.CarouselImages images={images} />

            <View>
              <Product.Price
                price={product.price}
                discount={product.discount}
              />
              <Separator height={30} />
              <Product.Characteristics text={product.characteristics} />
              <Separator height={70} />
            </View>
          </>
        )}
      </View>
    </Layout.Basic>
  );
}
