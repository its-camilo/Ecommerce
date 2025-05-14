import { View, Text } from 'react-native'
import { styles } from './Address.styles'
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { screensName } from '@/src/utils';

export function Address(props) {
    const { addressId, address } = props;
    const navigation = useNavigation();

    const goToUpdateAddress = () => {
        navigation.navigate(screensName.account.addEditAddress, {addressId});
    }
  return (
    <View style={styles.container}> 
      <Text style={styles.title}>{address.title}</Text>
      <Text>{address.name}</Text>
      <Text>{address.address}</Text>
      <Text>{address.state}, {address.city}, {address.postal_code}</Text>
      <Text>{address.country}</Text>
      <Text>Número de teléfono: {address.phone}</Text>

      <View style={styles.actions}>
        <Button mode="contained" onPress={goToUpdateAddress}>
          Editar
        </Button>
        <Button mode="contained">
          Eliminar
        </Button>
      </View>
    </View>
  )
}