import { createDirectus, rest, readItem, aggregate, readItems } from '@directus/sdk';

export const API_URL = 'https://directus.theburnescenter.org';

export const directus = createDirectus(API_URL).with(rest());

export const assetUrl = (id: string) => `${API_URL}/assets/${id}`;

export function assetDownloadUrl(id: string) {
  if (!id) return '';
  return `${API_URL}/assets/${id}?download`;
}

/** Directus file fields may be a UUID string or `{ id }` from the API */
export function assetFileId(
  value: string | { id?: string } | null | undefined
): string {
  if (value == null) return '';
  if (typeof value === 'string') return value;
  if (typeof value === 'object' && value.id) return String(value.id);
  return '';
}

export function imageUrl(
  id: string | { id?: string } | null | undefined,
  preset: 'hero' | 'card' = 'card'
) {
  const fileId = assetFileId(id);
  if (!fileId) return '';
  const width = preset === 'hero' ? 1600 : 800;
  return `${API_URL}/assets/${fileId}?width=${width}&quality=80`;
}

export async function fetchAiForImpact() {
  return directus.request(
    readItem('ai_for_impact', 1, {
      fields: [
        'about',
        'about_team',
        'logo',
        'syllabus',
        'latest_report',
        'team_image',
        { projects: [{ ai_for_impact_projects_id: ['*'] }] },
        { highlights: [{ ai_for_impact_highlights_id: ['*'] }] },
        { metrics: [{ ai_for_impact_metrics_id: ['*'] }] },
      ],
    })
  );
}

export async function fetchProjectCount() {
  const result = await directus.request(
    aggregate('ai_for_impact_projects', {
      aggregate: { count: ['id'] },
      query: { filter: { status: { _eq: 'published' } } },
    })
  );
  return result?.[0]?.count?.id ?? '0';
}

export function filterPublished(items: any[], junctionKey: string) {
  return items
    ?.map((item: any) => item[junctionKey])
    .filter((item: any) => item?.status === 'published') ?? [];
}

export async function fetchTeamMembers() {
  return directus.request(
    readItems('ai_for_impact_team', {
      fields: ['id', 'name', 'title', 'description', 'image', 'link', 'team_type'],
      filter: { status: { _eq: 'published' } },
      sort: ['id'],
    })
  );
}

export async function fetchProject(id: number | string) {
  return directus.request(
    readItem('ai_for_impact_projects', id, {
      fields: [
        'id',
        'project_image',
        'project_title',
        'project_description',
        'subtitle',
        'authors',
        'repo_link',
        'long_description',
        'metric_quote',
        'slide_deck',
        'additional_project_images.directus_files_id',
      ],
      filter: { status: { _eq: 'published' } },
    })
  );
}

export async function fetchAllProjects(){
  return directus.request(
    readItems(
      'ai_for_impact_projects', {
        fields: [
          'id',
          'project_image',
          'project_title',
          'project_description',
          'subtitle',
          'authors',
          'repo_link',
          'product_type',
        ],
        filter: { status: { _eq: 'published' } },
      })
  );
}

const AI_FOR_IMPACT_PRIMARY_TAG = 'AI for Impact';

export async function fetchRebootBlogAiForImpact(limit = 4) {
  return directus.request(
    readItems('reboot_democracy_blog', {
      fields: [
        'id',
        'title',
        'slug',
        'image',
        'fullURL',
        'external_link',
        'date',
        'one_line',
        'excerpt',
      ],
      filter: {
        _and: [
          { status: { _eq: 'published' } },
          { primary_tag: { _eq: AI_FOR_IMPACT_PRIMARY_TAG } },
        ],
      },
      sort: ['-date', '-date_created'],
      limit,
    })
  );
}

/** Public link for a Reboot blog row (Directus fields). */
export function rebootBlogPostUrl(post: {
  slug: string;
  fullURL?: string | null;
  external_link?: string | null;
}) {
  return (
    post.external_link?.trim() ||
    post.fullURL?.trim() ||
    `https://rebootdemocracy.ai/blog/${post.slug}`
  );
}