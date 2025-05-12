export interface Category {
  id: string;
  name: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  imageUrl: string;
  tags: string[]; // e.g., ['React', 'Node.js', 'UI/UX']
  categories: string[]; // e.g., ['Web Development', 'Mobile App']
  projectUrl?: string;
  repoUrl?: string;
  year: number;
  client?: string;
  role?: string;
}
