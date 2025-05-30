import { Text, View } from "react-native";
import { Layout } from "../../../layouts";
import { TextInput, Button } from "react-native-paper";
import { styles } from "../ChangeEmailScreen/ChangeEmailScreen.styles";
import { globalStyles } from "@/src/styles";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview";
import { initialValues, validationSchema } from "./AddEditAddressScreen.form";
import { useFormik } from "formik";
import Toast from "react-native-root-toast";
import { addressCtrl } from "@/src/api";
import { useAuth } from "@/src/hooks";
import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

export function AddEditAddressScreen(props) {
  const {
    route: { params },
  } = props;
  const navigation = useNavigation();
  const { user } = useAuth();
  const addressId = params?.addressId;
  //const addressId = addressid ? parseInt(addressid) - 1 : null;
  const [screenTitle, setScreenTitle] = useState("Crear dirección");

  useEffect(() => {
    const title = addressId ? "Editar dirección" : "Crear dirección";
    setScreenTitle(title);

    navigation.setOptions({
      headerTitle: title,
    });
  }, [navigation, addressId]);

  useEffect(() => {
    if (addressId) {
      retriveAddress();
    }
  }, [addressId]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        if (addressId) {
          await addressCtrl.update(addressId, formValue);
          Toast.show("Dirección actualizada correctamente", {
            position: Toast.positions.CENTER,
          });
        } else {
          await addressCtrl.create(user.id, formValue);
          Toast.show("Dirección creada correctamente", {
            position: Toast.positions.CENTER,
          });
        }
        navigation.goBack();
      } catch (error) {
        console.log(error);
        Toast.show("Error al crear la dirección", {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  const retriveAddress = async () => {
    const response = await addressCtrl.get(addressId);
    await formik.setFieldValue("title", response.title);
    await formik.setFieldValue("name", response.name);
    await formik.setFieldValue("address", response.address);
    await formik.setFieldValue("postal_code", response.postal_code);
    await formik.setFieldValue("city", response.city);
    await formik.setFieldValue("state", response.state);
    await formik.setFieldValue("country", response.country);
    await formik.setFieldValue("phone", response.phone);
  };

  return (
    <Layout.Basic textTitleCenter={screenTitle} backButton>
      <KeyboardAwareScrollView extraScrollHeight={25}>
        <View style={styles.container}>
          <TextInput
            label="Título"
            style={globalStyles.form.input}
            onChangeText={(text) => formik.setFieldValue("title", text)}
            value={formik.values.title}
            error={formik.errors.title}
          />
          <TextInput
            label="Nombre y apellidos"
            style={globalStyles.form.input}
            onChangeText={(text) => formik.setFieldValue("name", text)}
            value={formik.values.name}
            error={formik.errors.name}
          />
          <TextInput
            label="Dirección"
            style={globalStyles.form.input}
            onChangeText={(text) => formik.setFieldValue("address", text)}
            value={formik.values.address}
            error={formik.errors.address}
          />
          <TextInput
            label="Código postal"
            style={globalStyles.form.input}
            onChangeText={(text) => formik.setFieldValue("postal_code", text)}
            value={formik.values.postal_code}
            error={formik.errors.postal_code}
          />
          <TextInput
            label="Población"
            style={globalStyles.form.input}
            onChangeText={(text) => formik.setFieldValue("city", text)}
            value={formik.values.city}
            error={formik.errors.city}
          />
          <TextInput
            label="Estado"
            style={globalStyles.form.input}
            onChangeText={(text) => formik.setFieldValue("state", text)}
            value={formik.values.state}
            error={formik.errors.state}
          />
          <TextInput
            label="País"
            style={globalStyles.form.input}
            onChangeText={(text) => formik.setFieldValue("country", text)}
            value={formik.values.country}
            error={formik.errors.country}
          />
          <TextInput
            label="Teléfono"
            style={globalStyles.form.input}
            onChangeText={(text) => formik.setFieldValue("phone", text)}
            value={formik.values.phone}
            error={formik.errors.phone}
          />

          <Button
            mode="contained"
            style={[globalStyles.form.btnSubmit, styles.btnSubmit]}
            onPress={formik.handleSubmit}
            loading={formik.isSubmitting}
          >
            {addressId ? "Actualizar dirección" : "Crear dirección"}
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </Layout.Basic>
  );
}
