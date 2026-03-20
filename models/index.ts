export interface Project {
  id: number;
  status: string;
  project_image: string | null;
  project_title: string;
  project_description: string;
  subtitle: string;
  authors: string;
  repo_link: string;
  long_description?: string;
  metric_quote?: string;
  slide_deck?: string | null;
  additional_project_images?: { directus_files_id: string }[];
}

export interface Highlight {
  id: number;
  status: string;
  description: string;
  organization: string;
}

export interface Metric {
  id: number;
  status: string;
  value: string;
  label: string;
}

export interface AiForImpact {
  id: number;
  status: string;
  logo: string | null;
  about: string;
  about_team: string;
  syllabus: string | null;
  latest_report: string | null;
  projects: { ai_for_impact_projects_id: Project }[];
  highlights: { ai_for_impact_highlights_id: Highlight }[];
  metrics: { ai_for_impact_metrics_id: Metric }[];
}
