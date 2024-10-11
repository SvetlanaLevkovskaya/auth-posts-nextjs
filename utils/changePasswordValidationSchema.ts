import * as yup from 'yup'

export const changePasswordValidationSchema = yup.object().shape({
  old_password: yup.string().required('Old password is required.'),
  password: yup
    .string()
    .required('New password is required.')
    .min(3, 'Password must be at least 3 characters long.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  confirmed_password: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match.')
    .required('Confirm your new password.'),
})
