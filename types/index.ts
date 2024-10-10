export interface User {
  id: number
  username: string
}

export type FormData = {
  username: string
  password: string
}

export type Params = {
  params: {
    id: number
  }
}

export interface Author {
  id: number;
  username: string;
  email: string;
}

export interface Article {
  id: number;
  author: Author;
  title: string;
  slug: string;
  content: string;
  created: string;
  updated: string;
  image: string;
}

export interface Comment {
  id: number;
  author: Author;
  content: string;
  created: string;
  updated: string;
  parent: number | null;
  children: Comment[];
}

export type CommentFormValues = {
  content: string
}

export interface EditArticleFormData {
  title: string
  content: string
  image?: FileList | null
}


