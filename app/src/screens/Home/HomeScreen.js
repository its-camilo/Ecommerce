import { Text, SafeAreaView } from 'react-native'
import {useAuth} from "../../hooks"
import {Button} from "react-native-paper"
import {BasicLayout, Layout} from "../../layouts"
import {useState, useEffect} from "react"
import { homeBannerCtrl } from '@/src/api'
import Toast from 'react-native-root-toast'

export function HomeScreen() {
  const {logout} = useAuth()
  const [banners, setBanners] = useState(null)

  useEffect(() => {
    getBanners()
  }, [])

  const getBanners = async () => {
    try {
      const response = await homeBannerCtrl.getAll()
      setBanners("Banners:", response?.data || null)
    } catch (error) {
      Toast.show("Error al cargar los banners", {
        position: Toast.positions.CENTER,
      })
    }
  }

  return (
    <SafeAreaView>
      <Layout.Basic showBack={false} textTitleCenter="Inicio">
        <Text>HomeScreen</Text>
        <Button onPress={logout}>Cerrar sesión</Button>
      </Layout.Basic>
    </SafeAreaView>
  )
}