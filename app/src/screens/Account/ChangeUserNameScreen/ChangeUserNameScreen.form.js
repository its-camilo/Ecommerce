import * as Yup from 'yup';

export function initialValues(username) {
  return {
    username,
  };
}

export function validationSchema() {
  return Yup.object({
    username: Yup.string().required(true).min(4, true),
  });
}
