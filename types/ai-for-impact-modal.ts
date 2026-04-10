export interface AiForImpactModal {
  id: number;
  status: string;
  title: string;
  description: string;
  visibility: boolean | string | null;
  button_url: string | null;
  button_text: string | null;
  pill_text: string | null;
  pill_tags: Array<string | { tag_name?: string }> | string | null;
}
