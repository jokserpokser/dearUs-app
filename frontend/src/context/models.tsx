export interface User {
  id: number;
  email: string;
  name: string;
  couple_id: number | null;
  created_at: string;
}

export interface Couple {
  id: number;
  invite_code: string;
  anniversary?: string | null;
  endearment?: string | null;
  created_at: string;
}
