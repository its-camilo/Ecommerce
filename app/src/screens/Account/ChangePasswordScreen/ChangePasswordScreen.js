import { View } from 'react-native'
import {Layout} from "../../../layouts"  // Fix the import path here
import { TextInput, Button } from 'react-native-paper'
import { useNavigation } from '@react-navigation/native'
import {useFormik} from 'formik'
import Toast from 'react-native-root-toast'
import {userCtrl} from "../../../api"
import { useAuth } from '../../../hooks'
import { globalStyles } from '../../../styles'
import { initialValues, validationSchema } from './ChangePasswordScreen.form' 
import { styles } from './ChangePasswordScreen.styles'

export function ChangePasswordScreen() {
  const {user, logout} = useAuth()
  const navigation = useNavigation()
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async (formValue) => {
      const {email} = formValue
      try {
        await userCtrl.update(user.id, formValue)
        logout()
        Toast.show("Contraseña cambiada correctamente", {
          position: Toast.positions.CENTER,
        })
      }
      catch (error) {
        Toast.show("Error al cambiar la contraseña", {
          position: Toast.positions.CENTER,
        })
      }
    },
  })
  return (
    <Layout.Basic textTitleCenter="Cambiar contraseña">
      <View style={styles.container}>
        <TextInput
          label="Nueva contraseña"
          style={globalStyles.form.input}
          secureTextEntry
          onChangeText={(text) => formik.setFieldValue('password', text)}
          value={formik.values.password}
          error={formik.errors.password}
        />
        <TextInput
          label="Repetir nueva contraseña"
          style={globalStyles.form.input}
          secureTextEntry
          onChangeText={(text) => formik.setFieldValue('repeatPassword', text)}
          value={formik.values.repeatPassword}
          error={formik.errors.repeatPassword}
        />
        <Button 
          mode="contained" 
          style={globalStyles.form.btnSubmit}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
          Cambiar contraseña
        </Button>
      </View>
    </Layout.Basic>
  )
}