import * as Yup from 'yup';

export function initialValues() {
  return {
    name: 'Camilo',
    number: '4242424242424242',
    exp_month: '07',
    exp_year: '29',
    cvc: '123',
  };
}

export function validationSchema() {
  return Yup.object().shape({
    name: Yup.string()
      .required('El nombre del titular es requerido')
      .min(6, 'El nombre debe tener al menos 6 caracteres'),
    number: Yup.string()
      .required('El número de tarjeta es requerido')
      .matches(/^\d{16}$/, 'El número de tarjeta debe tener 16 dígitos'),
    exp_month: Yup.string()
      .required('El mes de expiración es requerido')
      .matches(/^(0[1-9]|1[0-2])$/, 'Mes inválido'),
    exp_year: Yup.string()
      .required('El año de expiración es requerido')
      .matches(/^\d{2}$/, 'Año inválido'),
    cvc: Yup.string()
      .required('El CVC/CVV es requerido')
      .matches(/^\d{3,4}$/, 'CVC/CVV inválido'),
  });
}
