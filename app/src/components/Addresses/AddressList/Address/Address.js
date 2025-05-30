import { View, Text, Alert } from "react-native";
import { styles } from "./Address.styles";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { screensName } from "@/src/utils";
import { addressCtrl } from "@/src/api";
import Toast from "react-native-root-toast";

export function Address(props) {
  const { addressId, address, onReload } = props;
  const navigation = useNavigation();

  const goToUpdateAddress = () => {
    navigation.navigate(screensName.account.addEditAddress, { addressId });
  };

  const deleteAddressAlert = () => {
    Alert.alert(
      "Eliminar dirección",
      `¿Estás seguro de que quieres eliminar la dirección (${address.title})?`,
      [
        {
          text: "No",
        },
        {
          text: "Si",
          onPress: () => deleteAddress(),
        },
      ],
      { cancelable: false },
    );
  };

  const deleteAddress = async () => {
    try {
      console.log("Eliminar dirección");
      await addressCtrl.delete(addressId);
      onReload();
      Toast.show("Dirección eliminada correctamente", {
        position: Toast.positions.CENTER,
      });
      //navigation.goBack();
    } catch (error) {
      console.log(error);
      Toast.show("Error al eliminar la dirección", {
        position: Toast.positions.CENTER,
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{address.title}</Text>
      <Text>{address.name}</Text>
      <Text>{address.address}</Text>
      <Text>
        {address.state}, {address.city}, {address.postal_code}
      </Text>
      <Text>{address.country}</Text>
      <Text>Número de teléfono: {address.phone}</Text>

      <View style={styles.actions}>
        <Button mode="contained" onPress={goToUpdateAddress}>
          Editar
        </Button>
        <Button mode="contained" onPress={deleteAddress}>
          Eliminar
        </Button>
      </View>
    </View>
  );
}
