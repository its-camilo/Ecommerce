import { Text, SafeAreaView } from 'react-native'
import {useAuth} from "../../hooks"
import {Button} from "react-native-paper"
import {BasicLayout, Layout} from "../../layouts"
import {useState, useEffect} from "react"
import { homeBannerCtrl } from '@/src/api'
import Toast from 'react-native-root-toast'
import { ProductBanners } from '../../components/Shared'

export function HomeScreen() {
  const {logout} = useAuth()
  const [banners, setBanners] = useState([])

  useEffect(() => {
    getBanners()
  }, [])
  const getBanners = async () => {
    try {
      const response = await homeBannerCtrl.getAll()
      setBanners(response?.data || [])
    } catch (error) {
      Toast.show("Error al cargar los banners", {
        position: Toast.positions.CENTER,
      })
    }
  }
  return (
    <Layout.Basic showBack={false} textTitleCenter="Home">
      {banners.length > 0 && (
        <ProductBanners banners={banners} />
      )}
    </Layout.Basic>
  )
}