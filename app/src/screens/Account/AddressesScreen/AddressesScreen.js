import { Text } from 'react-native'
import {Layout} from "../../../layouts"
import {addressCtrl} from "../../../api"
import { useState, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { useAuth } from '../../../hooks'

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
      <Text>AddressesScreen</Text>
    </Layout.Basic>
  )
}