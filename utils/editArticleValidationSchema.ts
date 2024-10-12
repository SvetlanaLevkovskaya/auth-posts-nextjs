import * as yup from 'yup'

export const editArticleValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Title is required.')
    .max(100, 'Title must be less than 100 characters'),
  content: yup.string().required('Content is required.'),
})
