import { Text, ScrollView, Pressable, ActivityIndicator } from 'react-native'
import {Layout} from "../../../layouts"
import {addressCtrl} from "../../../api"
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useAuth } from '../../../hooks'
import { IconButton } from 'react-native-paper'
import {size} from "lodash"
import { styles } from './AddressesScreen.styles'
import {AddressList} from "../../../components/Addresses"

export function AddressesScreen() {
  const [addresses, setAddresses] = useState(null)
  const { user } = useAuth()

  useFocusEffect(
    useCallback(() => {
      (async () => {
        retrieveAddresses()
      })()
    }, [])
  );

  const retrieveAddresses = async () => {
    const response = await addressCtrl.getAll(user.id)
    setAddresses(response?.data || [])
    console.log(response.data)
  }

  return (
    <Layout.Basic textTitleCenter="Direcciones de envío">
      <ScrollView style={styles.container}>

        {!addresses ? (
          <ActivityIndicator size="large" style={styles.loading} />
        ): size(addresses) === 0 ? (
          <Text style={styles.noAddressText}>
            Crea tu primera dirección
          </Text>
        ) : (
          <AddressList addresses={addresses}/>
        )}

      </ScrollView>
    </Layout.Basic>
  )
}