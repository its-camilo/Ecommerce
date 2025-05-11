import { View, Text } from 'react-native'
import { styles } from './Address.styles'
import { Button } from 'react-native-paper';

export function Address(props) {
    const { address } = props;
  return (
    <View style={styles.container}> 
      <Text style={styles.title}>{address.title}</Text>
      <Text>{address.name}</Text>
      <Text>{address.address}</Text>
      <Text>{address.state}, {address.city}, {address.postal_code}</Text>
      <Text>{address.country}</Text>
      <Text>Número de teléfono: {address.phone}</Text>

      <View style={styles.actions}>
        <Button mode="contained">
          Editar
        </Button>
        <Button mode="contained">
          Eliminar
        </Button>
      </View>
    </View>
  )
}