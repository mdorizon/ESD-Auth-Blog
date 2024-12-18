export type PostType = {
  id: number,
  user_id: number,
  title: string,
  content: string,
  created_at: Date,
  image_path: string
  username: string
}

export type PostDTO = {
  title: string,
  content: string,
  image_path: string
}