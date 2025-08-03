import { View, Text } from 'react-native';
import { styles } from './Favorite.styles';
import { IconButton } from 'react-native-paper';
import { wishlistCtrl } from '../../../../api';
import Toast from 'react-native-root-toast';
import { useState, useEffect } from 'react';
import { useAuth } from '../../../../hooks';

export function Favorite(props) {
  const { productId } = props;
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [hasWishlist, setHasWishlist] = useState(undefined);
  useEffect(() => {
    checkWishlist();
  }, [productId]);
  const checkWishlist = async () => {
    try {
      const response = await wishlistCtrl.check(user.id, productId);
      setHasWishlist(response);
    } catch (error) {
      setHasWishlist(false);
    }
  };
  const addToWishlist = async () => {
    try {
      setLoading(true);
      await wishlistCtrl.add(user.id, productId);
      setHasWishlist(true);
      Toast.show('Agregado a favoritos', {
        position: Toast.positions.CENTER,
      });
    } catch (error) {
      Toast.show('Error al agregar a favoritos', {
        position: Toast.positions.CENTER,
      });
    }
    setLoading(false);
  };
  const deleteWishlist = async () => {
    try {
      setLoading(true);
      await wishlistCtrl.delete(user.id, productId);
      setHasWishlist(false);
      Toast.show('Eliminado de favoritos', {
        position: Toast.positions.CENTER,
      });
    } catch (error) {
      Toast.show('Error al eliminar de favoritos', {
        position: Toast.positions.CENTER,
      });
    }
    setLoading(false);
  };
  if (hasWishlist === undefined) return null;
  return (
    <IconButton
      icon="heart"
      style={styles.iconButton}
      size={30}
      iconColor={hasWishlist ? '#16222b' : '#fff'}
      onPress={hasWishlist ? deleteWishlist : addToWishlist}
      disabled={loading}
    />
  );
}
