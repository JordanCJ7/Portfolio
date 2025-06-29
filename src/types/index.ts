export interface Category {
  id: string;
  name: string;
}

export interface ProjectMetrics {
  [key: string]: string | undefined;
  // Optionally, keep standard keys for autocomplete/documentation:
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
  complexity?: string;
  functionality?: string;
  learning?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string | React.ReactNode;
  longDescription?: string | React.ReactNode;
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
