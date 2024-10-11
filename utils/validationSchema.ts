import * as yup from 'yup'

export const validationSchema = yup.object().shape({
  username: yup.string().required(),
  password: yup.string().required().min(3, 'Password must be at least 3 characters'),
})
