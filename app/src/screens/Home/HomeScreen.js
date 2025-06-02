import { Text, SafeAreaView, View } from "react-native";
import { useAuth } from "../../hooks";
import { Button } from "react-native-paper";
import { BasicLayout, Layout } from "../../layouts";
import { useState, useEffect } from "react";
import { homeBannerCtrl, productCtrl } from "@/src/api";
import Toast from "react-native-root-toast";
import { ProductBanners, Search, GridProducts } from "../../components/Shared";

export function HomeScreen() {
  const { logout } = useAuth();
  const [banners, setBanners] = useState([]);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    getBanners();
    getProducts();
  }, []);
  const getBanners = async () => {
    try {
      const response = await homeBannerCtrl.getAll();
      setBanners(response?.data || []);
    } catch (error) {
      Toast.show("Error al cargar los banners", {
        position: Toast.positions.CENTER,
      });
    }
  };
  const getProducts = async () => {
    try {
      const response = await productCtrl.getLatestPublished(20);
      console.log("Products:", response);
      setProducts(response?.data || []);
    } catch (error) {
      Toast.show("Error al cargar los productos", {
        position: Toast.positions.CENTER,
      });
    }
  };
  return (
    <Layout.Basic showBack={false} textTitleCenter="Inicio" hideSearch={false}>
      {/* SearchInput arriba de los banners */}
      <View style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#f5f5f5' }}>
        
      </View>
      
      {banners.length > 0 && <ProductBanners banners={banners} />}
      <GridProducts title="Nuevos productos" products={products}/>
    </Layout.Basic>
  );
}
