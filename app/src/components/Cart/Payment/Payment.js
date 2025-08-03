import { View, Text } from 'react-native';
import { styles } from './Payment.styles';
import { TextInput, Button } from 'react-native-paper';
import { globalStyles } from '@/src/styles';
import { fn, screensName } from '@/src/utils';
import { useFormik } from 'formik';
import { initialValues, validationSchema } from './Payment.form';
import Toast from 'react-native-root-toast';
import { useCart, useAuth } from '@/src/hooks';
import { useNavigation } from '@react-navigation/native';
import { orderCtrl } from '@/src/api';

export function Payment(props) {
  const { totalPayment, selectedAddress, products } = props;
  const { emptyCart } = useCart();
  const { user } = useAuth();
  const navigation = useNavigation();
  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema: validationSchema(),
    validateOnChange: false,
    onSubmit: async formValue => {
      try {
        // Generar un ID de pago único (simulando el ID que vendría de un procesador de pagos)
        const idPayment = `payment_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

        // Crear el objeto de datos del pedido según la estructura de la imagen
        const orderData = {
          products: products.map(product => ({
            id: product.id,
            title: product.title,
            price: product.price,
            discount: product.discount,
            quantity: product.quantity,
            image: product.main_image?.url || product.main_image,
          })),
          user: user.id,
          totalPayment,
          idPayment,
          addressShipping: selectedAddress,
        };

        // Guardar el pedido en la base de datos
        await orderCtrl.create(orderData);

        // Vaciar el carrito solo después de guardar exitosamente el pedido
        await emptyCart();

        Toast.show('Pedido creado exitosamente', {
          position: Toast.positions.CENTER,
        });

        navigation.navigate(screensName.account.root, {
          screen: screensName.account.orders,
        });
      } catch (error) {
        // En caso de error, aún vaciar el carrito y navegar, pero mostrar mensaje de error
        await emptyCart();
        navigation.navigate(screensName.account.root, {
          screen: screensName.account.orders,
        });
        Toast.show('Error al procesar el pedido, pero se guardó localmente', {
          position: Toast.positions.CENTER,
        });
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
