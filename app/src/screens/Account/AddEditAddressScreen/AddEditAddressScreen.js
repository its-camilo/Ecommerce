import { Text, View } from 'react-native'
import { Layout } from "../../../layouts"
import { TextInput, Button } from 'react-native-paper'
import { styles } from '../ChangeEmailScreen/ChangeEmailScreen.styles'
import { globalStyles } from '@/src/styles'
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scrollview"
import {initialValues, validationSchema} from "./AddEditAddressScreen.form"
import { useFormik } from "formik"
import Toast from "react-native-root-toast"

export function AddEditAddressScreen() {
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: (formValue) => {
      try {
        console.log(formValue);
      } catch (error) {
        console.log(error);
        Toast.show("Error al crear la dirección", {
          position: Toast.positions.CENTER,
        });
      }
    }
  });

  return (
    <Layout.Basic textTitleCenter="Crear dirección" backButton>
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
            Crear dirección
          </Button>
        </View>
      </KeyboardAwareScrollView>
    </Layout.Basic>
  )
}