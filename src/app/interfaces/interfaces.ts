
export interface PostsResponse {
  success: boolean;
  page: number;
  posts: Post[];
}

export interface Post {
  createdAt?: string;
  imgs?: any[];
  _id?: string;
  message?: string;
  coords?: string;
  user?: User;
}

export interface User {
  avatar?: string;
  _id?: string;
  name?: string;
  email?: string;
  password?: string;
}
