export interface Category {
  id: string;
  name: string;
}

export interface ProjectMetrics {
  users?: string;
  improvement?: string;
  engagement?: string;
  performance?: string;
  userExperience?: string;
  delivery?: string;
  efficiency?: string;
  revenue?: string;
  automation?: string;
  conversion?: string;
  accessibility?: string;
  insights?: string;
  retention?: string;
  completion?: string;
  satisfaction?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  tags: string[]; // e.g., ['React', 'Node.js', 'UI/UX', 'Product Strategy']
  categories: string[]; // e.g., ['Web Development', 'Product Management']
  projectUrl?: string;
  repoUrl?: string;
  year: number;
  client?: string;
  role?: string;
  metrics?: ProjectMetrics;
}
