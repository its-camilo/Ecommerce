import { View } from 'react-native';
import { Layout } from '../../../layouts';
import { TextInput, Button } from 'react-native-paper';
import { styles } from './ChangeUserNameScreen.styles';
import { globalStyles } from '../../../styles';
import { initialValues, validationSchema } from './ChangeUserNameScreen.form';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import Toast from 'react-native-root-toast';
import { userCtrl } from '../../../api';
import { useAuth } from '../../../hooks';

export function ChangeUserNameScreen() {
  const { user, updateUser } = useAuth();

  const navigation = useNavigation();

  const formik = useFormik({
    initialValues: initialValues(user.username),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async formvalue => {
      try {
        await userCtrl.update(user.id, formvalue);
        updateUser('username', formvalue.username);
        Toast.show('👤 ¡Usuario actualizado!', {
          position: Toast.positions.CENTER,
          backgroundColor: '#2ecc40',
          textColor: '#fff',
        });
        navigation.goBack();
      } catch (error) {
        Toast.show('❌ Error al actualizar el usuario', {
          position: Toast.positions.CENTER,
          backgroundColor: '#D7263D',
          textColor: '#fff',
        });
      }
    },
  });

  return (
    <Layout.Basic textTitleCenter="Cambiar nombre de usuario">
      <View style={styles.container}>
        <TextInput
          label="Nombre de usuario"
          style={globalStyles.form.input}
          onChangeText={text => formik.setFieldValue('username', text)}
          value={formik.values.username}
          error={formik.errors.username}
        />
        <Button
          mode="contained"
          style={globalStyles.form.btnSubmit}
          onPress={formik.handleSubmit}
          loading={formik.isSubmitting}
        >
          Cambiar nombre de usuario
        </Button>
      </View>
    </Layout.Basic>
  );
}
