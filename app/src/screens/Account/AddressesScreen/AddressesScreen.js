import { Text, ScrollView, Pressable, ActivityIndicator, View } from 'react-native'
import {Layout} from "../../../layouts"
import {addressCtrl} from "../../../api"
import { useState, useCallback } from 'react'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { useAuth } from '../../../hooks'
import { IconButton } from 'react-native-paper'
import {size} from "lodash"
import { styles } from './AddressesScreen.styles'
import {AddressList} from "../../../components/Addresses"
import {screensName} from "../../../utils"

export function AddressesScreen() {
  const [addresses, setAddresses] = useState(null)
  const [reload, setReload] = useState(false)
  const { user } = useAuth()
  const navigation = useNavigation()

  const onReload = () => {
    setReload((prevState) => !prevState)
  }

  useFocusEffect(
    useCallback(() => {
      (async () => {
        retrieveAddresses()
      })()
    }, [reload])
  );

  const retrieveAddresses = async () => {
    const response = await addressCtrl.getAll(user.id)
    setAddresses(response?.data || [])
    console.log(response.data)
  }

  const goToAddAddress = () => {
    navigation.navigate(screensName.account.addEditAddress)
  }

  return (
    <Layout.Basic textTitleCenter="Direcciones de envío">
      <ScrollView style={styles.container}>

        <Pressable onPress={goToAddAddress}>
          <View style={styles.addAddress}>
            <Text style={styles.addAddressText}>Añadir una dirección</Text>
            <IconButton icon="arrow-right" color="#000" size={19}/>
          </View>
        </Pressable>

        {!addresses ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ): size(addresses) === 0 ? (
          <Text style={styles.noAddressText}>
            Crea tu primera dirección
          </Text>
        ) : (
          <AddressList addresses={addresses} onReload={onReload}/>
        )}

      </ScrollView>
    </Layout.Basic>
  )
}