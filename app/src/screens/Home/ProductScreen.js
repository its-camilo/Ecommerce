import { View, Text } from "react-native";
import { Layout } from "../../layouts";

export function ProductScreen(props) {
  const {
    route: { params },
  } = props;
  const productId = params?.productId;

  console.log("ProductScreen - Product ID:", productId);

  return (
    <Layout.Basic textTitleCenter="Producto">
      <View style={{ padding: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Pantalla de Producto
        </Text>
        <Text style={{ fontSize: 16 }}>
          ID del Producto: {productId || "No disponible"}
        </Text>
        <Text style={{ fontSize: 14, color: "#666", marginTop: 10 }}>
          Aquí se mostraría la información detallada del producto.
        </Text>
      </View>
    </Layout.Basic>
  );
}
