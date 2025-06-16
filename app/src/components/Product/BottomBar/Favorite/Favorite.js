import { View, Text } from 'react-native';
import { styles } from './Favorite.styles';
import { IconButton } from 'react-native-paper';

export function Favorite(props) {
  const { productId } = props;
  return (
    <IconButton
      icon="heart"
      style={styles.iconButton}
      size={30}
      iconColor="#fff"
    />
  );
}
