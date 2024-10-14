import * as yup from 'yup'

export const changePasswordValidationSchema = yup.object().shape({
  old_password: yup.string().required('Old password is required.'),
  password: yup
    .string()
    .required('New password is required.')
    .min(3, 'Password must be at least 3 characters long.')
    .matches(/^[a-zA-Z0-9]+$/, 'Password can only contain Latin letters and numbers.'),
  confirmed_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Password must be confirmed correctly.')
    .required('Confirm your new password.'),
})
