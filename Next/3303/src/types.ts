export interface book {
  id: number;
  title_kr: string;
  title: string;
  author_id: number;
  isbn: string;
  publisher: string;
  publisher_at: string;
  created_at: string;
  update_at: string;
}

export interface author {
  id: number;
  name_kr: string;
  name: string;
  description: string;
  created_at: string;
  updated_at: string;
  books: [];
}