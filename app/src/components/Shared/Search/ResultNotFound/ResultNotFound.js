import { View, Text } from 'react-native';
import { styles } from './ResultNotFound.styles';

export function ResultNotFound(props) {
  const { searchText } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.searchText}>No hay resultados para {searchText}</Text>
      <Text style={styles.otherText}>Revisa la ortografía o usa términos más generales</Text>
    </View>
  );
}
