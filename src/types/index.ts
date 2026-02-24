export interface User {
  id: string;
  email: string;
  created_at: string;
}

export interface Child {
  id: string;
  user_id: string;
  name: string;
  date_of_birth: string;
  gender?: string;
  created_at: string;
}

export interface Assessment {
  id: string;
  child_id: string;
  type: 'mchat' | 'adhd' | 'milestone';
  score: number;
  risk_level: string;
  responses: Record<string, any>;
  completed_at: string;
  created_at: string;
}

export interface Resource {
  id: string;
  title: string;
  description: string;
  category: string;
  url?: string;
  content?: string;
  created_at: string;
}
