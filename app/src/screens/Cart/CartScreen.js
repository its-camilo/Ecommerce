import { View, Text } from "react-native";
import { Layout } from "../../layouts";

export function CartScreen() {
  return (
    <Layout.Basic textTitleCenter="Carrito" showBack={false}>
      <Text>CartScreen</Text>
    </Layout.Basic>
  );
}
