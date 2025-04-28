import { View, Text } from 'react-native'
import {Layout} from "../../../layouts"
import { TextInput, Button } from 'react-native-paper'
import {globalStyles} from "../../../styles"
//import { styles as externalStyles } from '../../Auth/AuthScreen/AuthScreen.styles'
import {styles} from "./ChangeNameScreen.styles"
import {useFormik} from "formik"
import { initialValues, validationSchema} from "./ChangeNameScreen.form"
import Toast from 'react-native-root-toast'
import { useAuth}  from "../../../hooks"
import { userCtrl } from '../../../api'
import { useNavigation } from '@react-navigation/native'

export function ChangeNameScreen() {
  const {user, updateUser} = useAuth()
  const navigation = useNavigation()
  const formik = useFormik({
    initialValues: initialValues(user.firstname, user.lastname),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      try {
        // Crear un objeto que coincida con lo que el servidor espera
        const userData = {
          firstname: formValue.firstName,
          lastname: formValue.lastName
        };
        
        await userCtrl.update(user.id, userData)
        Toast.show("Nombre y apellidos actualizados correctamente", {
          position: Toast.positions.CENTER
        });
        updateUser("firstname", formValue.firstName)
        updateUser("lastname", formValue.lastName)
        navigation.goBack()
      } catch (error) {
        Toast.show("Error al actualizar los datos", {
          position: Toast.positions.CENTER
        });
      }
    }
  })
  return (
    <Layout.Basic textTitleCenter="Cambiar nombre y apellidos">
    <View style={styles.container}>
      <TextInput
        label="Nombre"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("firstName", text)}
        value={formik.values.firstName}
        error={formik.errors.firstName}
      />

      <TextInput
        label="Apellidos"
        style={globalStyles.form.input}
        onChangeText={(text) => formik.setFieldValue("lastName", text)}
        value={formik.values.lastName}
        error={formik.errors.lastName}
      />

      <Button
        mode="contained"
        style={globalStyles.form.btnSubmit}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        Cambiar nombre y apellidos
      </Button>
    </View>
    </Layout.Basic>
  )
}