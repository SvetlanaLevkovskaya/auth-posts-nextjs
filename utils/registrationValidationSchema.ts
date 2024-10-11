import * as yup from 'yup'

export const registrationValidationSchema = yup.object().shape({
  username: yup
    .string()
    .required('Username is required.')
    .min(3, 'Username must be at least 3 characters.')
    .max(20, 'Username cannot be longer than 20 characters.'),
  password: yup
    .string()
    .required('Password is required.')
    .min(3, 'Password must be at least 3 characters.')
    .matches(/[a-zA-Z]/, 'Password can only contain Latin letters.'),
  email: yup
    .string()
    .required('Email is required.')
    .email('Enter a valid email address.')
    .matches(
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      'Enter a valid email address with a proper domain.'
    ),
  firstName: yup
    .string()
    .required('First name is required.')
    .min(1, 'First name must be at least 1 characters.')
    .max(20, 'First name cannot be longer than 20 characters.'),
  lastName: yup
    .string()
    .required('Last name is required.')
    .min(1, 'Last name must be at least 1 characters.')
    .max(20, 'Last name cannot be longer than 20 characters.'),
})
