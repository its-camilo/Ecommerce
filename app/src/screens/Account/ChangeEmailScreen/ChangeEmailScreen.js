import { View } from 'react-native';
import { Layout } from '../../../layouts'; // Fix the import path here
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import Toast from 'react-native-root-toast';
import { userCtrl } from '../../../api';
import { useAuth } from '../../../hooks';
import { globalStyles } from '../../../styles';
import { initialValues, validationSchema } from './ChangeEmailScreen.form';
import { styles } from './ChangeEmailScreen.styles';

export function ChangeEmailScreen() {
  const { user, updateUser } = useAuth();

  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(user.email),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async formValue => {
      const { email } = formValue;

      try {
        await userCtrl.update(user.id, formValue);
        updateUser(email, formValue.email);
        Toast.show('Correo electrónico cambiado correctamente', {
          position: Toast.positions.CENTER,
        });
        navigation.goBack();
      } catch (error) {
        Toast.show('Error al cambiar el correo electrónico', {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  return (
    <Layout.Basic textTitleCenter="Cambiar correo electónico">
      <View style={styles.container}>
        <TextInput
          label="Correo electrónico"
          style={globalStyles.form.input}
          onChangeText={text => formik.setFieldValue('email', text)}
          value={formik.values.email}
          error={formik.errors.email}
        />
        <Button
          mode="contained"
          style={globalStyles.form.btnSubmit}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
          Cambiar email
        </Button>
      </View>
    </Layout.Basic>
  );
}
