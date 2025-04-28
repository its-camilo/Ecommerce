import { View, Text } from 'react-native'
import {Layout} from "../../layouts"

export function WishlistScreen() {
  return (
    <Layout.Basic textTitleCenter="Lista de deseos" showBack={false}>
      <Text>WishlistScreen</Text>
    </Layout.Basic>
  )
}