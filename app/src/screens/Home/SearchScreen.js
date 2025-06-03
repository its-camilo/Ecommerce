import { View, Text } from 'react-native';
import { Layout } from '../../layouts';

export function SearchScreen() {
  return (
    <Layout.Basic textTitleCenter="Búsqueda">
      <View style={{ padding: 20 }}>
        <Text>Pantalla de Búsqueda</Text>
      </View>
    </Layout.Basic>
  );
}
