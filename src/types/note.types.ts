export interface Note {
  _id: string;
  title: string;
  content: string;
  completed?: boolean;
  priority?: string;
  tags?: string[];
  userId?: string;
  isDeleted?: boolean;
  createdAt: string;
  updatedAt: string;
  __v?: number;
}

export interface NotesMeta {
  total: number;
  page: number;
  limit: number;
}

export interface ApiResponse<T, M = undefined> {
  status: string;
  message: string;
  data: T;
  meta?: M;
}
