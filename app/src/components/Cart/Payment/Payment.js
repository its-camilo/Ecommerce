import { View, Text } from 'react-native';
import { styles } from './Payment.styles';
import { TextInput, Button } from 'react-native-paper';
import { globalStyles } from '@/src/styles';
import { fn, screensName } from '@/src/utils';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './Payment.form';
import Toast from 'react-native-root-toast';
import { useCart } from '@/src/hooks';
import { useNavigation } from '@react-navigation/native';

export function Payment(props) {
  const { totalPayment, selectedAddress, products } = props;
  const { emptyCart } = useCart();
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async formValue => {
      try {
        // Aqui iria la logica de wompi
        await emptyCart();
        navigation.navigate(screensName.account.root, {
          screen: screensName.account.orders,
        });
        console.log('Payment submitted:', values);
      } catch (error) {
        await emptyCart();
        navigation.navigate(screensName.account.root, {
          screen: screensName.account.orders,
        });
        Toast.show('Error al procesar el pago', {
          position: Toast.positions.CENTER,
        });
        console.error('Payment error:', error);
      }
    },
  });
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Forma de pago</Text>
      <TextInput
        label={`Nombre del titular`}
        style={globalStyles.form.input}
        onChangeText={text => formik.setFieldValue('name', text)}
        value={formik.values.name}
        error={formik.errors.name}
      />
      <TextInput
        label={`Numero de tarjeta`}
        style={globalStyles.form.input}
        onChangeText={text => formik.setFieldValue('number', text)}
        value={formik.values.number}
        error={formik.errors.number}
      />

      <View style={styles.inputGroup}>
        <View style={styles.viewMonthYearInputs}>
          <TextInput
            label={`Mes`}
            style={styles.inputDate}
            onChangeText={text => formik.setFieldValue('exp_month', text)}
            value={formik.values.exp_month}
            error={formik.errors.exp_month}
          />
          <TextInput
            label={`Año`}
            style={styles.inputDate}
            onChangeText={text => formik.setFieldValue('exp_year', text)}
            value={formik.values.exp_year}
            error={formik.errors.exp_year}
          />
        </View>
        <TextInput
          label={`CVV/CVC`}
          style={styles.inputCvc}
          onChangeText={text => formik.setFieldValue('cvc', text)}
          value={formik.values.cvc}
          error={formik.errors.cvc}
        />
      </View>

      <Button
        mode={`contained`}
        contentStyle={styles.btnContent}
        labelstyle={styles.btnText}
        onPress={formik.handleSubmit}
        loading={formik.isSubmitting}
      >
        Pagar {totalPayment && `(${fn.formatPrice(totalPayment)}$)`}
      </Button>
    </View>
  );
}
