import { Text, SafeAreaView } from 'react-native'
import {useAuth} from "../../hooks"
import {Button} from "react-native-paper"
import {BasicLayout, Layout} from "../../layouts"

export function HomeScreen() {
  const {logout} = useAuth()
  return (
    <SafeAreaView>
      <Layout.Basic showBack={false} textTitleCenter="Inicio">
        <Text>HomeScreen</Text>
        <Button onPress={logout}>Cerrar sesión</Button>
      </Layout.Basic>
    </SafeAreaView>
  )
}