import { Text, SafeAreaView, View } from "react-native";
import { useAuth } from "../../hooks";
import { Button } from "react-native-paper";
import { BasicLayout, Layout } from "../../layouts";
import { useState, useEffect } from "react";
import { homeBannerCtrl } from "@/src/api";
import Toast from "react-native-root-toast";
import { ProductBanners, Search } from "../../components/Shared";

export function HomeScreen() {
  const { logout } = useAuth();
  const [banners, setBanners] = useState([]);

  useEffect(() => {
    getBanners();
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
  return (
    <Layout.Basic showBack={false} textTitleCenter="Inicio">
      {/* SearchInput arriba de los banners */}
      <View style={{ paddingHorizontal: 15, paddingVertical: 10, backgroundColor: '#f5f5f5' }}>
        <Search.Input />
      </View>
      
      {banners.length > 0 && <ProductBanners banners={banners} />}
    </Layout.Basic>
  );
}
