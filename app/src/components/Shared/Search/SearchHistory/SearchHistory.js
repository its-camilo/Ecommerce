import { View, Text } from 'react-native';
import { styles } from './SearchHistory.styles';

export function SearchHistory(props) {
  const { open, height, onSearch } = props;

  const containerStyles = { top: height };

  if (!open) return null;
  return (
    <View style={[containerStyles, styles.container]}>
      <Text>SearchHistory</Text>
    </View>
  );
}
