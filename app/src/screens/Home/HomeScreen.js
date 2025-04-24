import { Text, SafeAreaView } from 'react-native'
import {useAuth} from "../../hooks"
import {Button} from "react-native-paper"

export function HomeScreen() {
  const {logout} = useAuth()
  return (
    <SafeAreaView>
      <Text>HomeScreen</Text>
      <Button onPress={logout}>Cerrar sesión</Button>
    </SafeAreaView>
  )
}