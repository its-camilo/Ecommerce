import { View } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useFormik } from 'formik';
import Toast from 'react-native-root-toast';
import { globalStyles } from '../../../styles';
import { initialValues, validationSchema } from './LoginForm.form';
import { authCtrl } from '../../../api/auth';
import { useAuth } from '../../../hooks';

export function LoginForm(props) {
  const { showRegister } = props;

  const { login } = useAuth();
  //console.log("useAuthData", useAuthData)

  const formik = useFormik({
    initialValues: initialValues(),

    validationSchema: validationSchema(),

    validateOnChange: false,

    onSubmit: async formValue => {
      try {
        const { email, password } = formValue;

        const response = await authCtrl.login(email, password);

        login(response.jwt);
      } catch (error) {
        Toast.show('Usuario o contraseña incorrectos', {
          position: Toast.positions.CENTER,
        });
      }
    },
  });

  return (
    <View>
      <TextInput
        label="Correo electrónico"
        style={globalStyles.form.input}
        autoCapitalize="none"
        onChangeText={text => formik.setFieldValue('email', text)}
        value={formik.values.email}
        error={formik.errors.email}
      />

      <TextInput
        label="Contraseña"
        style={globalStyles.form.input}
        secureTextEntry
        onChangeText={text => formik.setFieldValue('password', text)}
        value={formik.values.password}
        error={formik.errors.password}
      />

      <Button
        mode="contained"
        style={globalStyles.form.btnSubmit}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        Entrar
      </Button>

      <Button
        mode="text"
        style={globalStyles.form.btnText}
        labelStyle={globalStyles.form.btnTextLabel}
        onPress={showRegister}
      >
        Registrarse
      </Button>
    </View>
  );
}
