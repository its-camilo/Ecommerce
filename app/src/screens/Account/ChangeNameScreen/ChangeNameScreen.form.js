import * as Yup from 'yup';

export function initialValues(firstName, lastName) {
  return {
    firstName: firstName || '',
    lastName: lastName || '',
  };
}

export function validationSchema() {
  return Yup.object().shape({
    firstName: Yup.string().required(true),
    lastName: Yup.string().required(true),
  });
}
