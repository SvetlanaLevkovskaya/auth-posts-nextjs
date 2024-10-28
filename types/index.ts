export interface RegistrationRequest {
  username: string
  password: string
  email: string
  first_name: string
  last_name: string
}

interface User {
  id: number
  lastName: string
  firstName: string
  username: string
  email: string
}

export interface RegistrationDto {
  user: User
}

export interface RegistrationFormData {
  username: string
  password: string
  email: string
  firstName: string
  lastName: string
}

export type Params = {
  params: {
    id: string | number
  }
}

export type LoginFormData = {
  username: string
  password: string
}

export interface LoginDto {
  refresh: string
  access: string
}

export interface ChangePasswordFormData {
  old_password: string
  password: string
  confirmed_password: string
}

export interface ChangePasswordDto {
  Success: boolean
}

export interface Author {
  id: number | null
  username: string | null
  email: string
}

export interface Article {
  id: number
  author: Author
  title: string
  slug: string
  content: string
  created: string
  updated: string
  image: string
}

export type CreateAndUpdateArticleDto = Pick<Article, 'title' | 'content' | 'image'>


export interface Comment {
  id: number
  author: Author
  content: string
  created: string
  updated: string
  parent: number | null
  children: Comment[]
}

export type CreateAndUpdateCommentDto = Pick<Comment, 'content' | 'parent'>

export type CommentFormData = {
  content: string
  parent?: number | null
}

export interface ArticleFormData {
  title: string
  content: string
  image?: string
}
