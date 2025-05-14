import { View } from 'react-native'
import { styles } from './AddressList.styles'
import {map} from 'lodash'
import { Button } from 'react-native-paper';
import {Address} from "./Address"

export function AddressList(props) {
    const { addresses } = props;
  return (
    <View style={styles.container}>
      {map(addresses, (address) =>(
        <Address key={address.id} addressId={address.id} address={address}/> //antes era attributes pero la estructura cambio y ya no es asi v:
      ))}
    </View>
  )
}