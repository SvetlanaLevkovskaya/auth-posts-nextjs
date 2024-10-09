import * as yup from 'yup'

export const createArticleValidationSchema = yup.object().shape({
  title: yup.string().required('Title is required').min(2, 'Title must be at least 2 characters'),
  content: yup.string().required('Content is required').min(2, 'Content must be at least 2 characters'),
})
