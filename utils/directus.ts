import { createDirectus, rest, readItem, readItems, aggregate } from '@directus/sdk';
import type { AiForImpactModal } from '~/types/ai-for-impact-modal';

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

const aiForImpactProjectFields = [
  'id',
  'slug',
  'status',
  'project_image',
  'project_title',
  'project_description',
  'subtitle',
  'authors',
  'repo_link',
  'product_type',
] as const;

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
        { projects: [{ ai_for_impact_projects_id: [...aiForImpactProjectFields] }] },
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

const projectDetailFields = [
  'id',
  'slug',
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
] as const;

/** Load a published project by URL slug. Numeric `param` still resolves (legacy /product/123 links). */
export async function fetchProject(param: string) {
  const published = { status: { _eq: 'published' } };
  const query = {
    fields: [...projectDetailFields],
    filter: { _and: [published, { slug: { _eq: param } }] },
    limit: 1,
  };

  const bySlug = await directus.request(readItems('ai_for_impact_projects', query));
  if (bySlug?.[0]) return bySlug[0];

  if (/^\d+$/.test(param)) {
    const byId = await directus.request(
      readItems('ai_for_impact_projects', {
        fields: [...projectDetailFields],
        filter: { _and: [published, { id: { _eq: Number(param) } }] },
        limit: 1,
      })
    );
    return byId?.[0] ?? null;
  }

  return null;
}

export async function fetchAllProjects() {
  return directus.request(
    readItems('ai_for_impact_projects', {
      fields: [
        'id',
        'slug',
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

export async function fetchRebootBlogAiForImpact(limit = 3) {
  const rows = await directus.request(
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
  return Array.isArray(rows) ? rows.slice(0, limit) : rows;
}

export async function fetchModal(): Promise<AiForImpactModal | null> {
  const rows = await directus.request(
    readItems('ai_for_impact_modal', {
      fields: [
        'id',
        'status',
        'title',
        'description',
        'visibility',
        'button_url',
        'button_text',
        'pill_text',
        'pill_tags',
      ],
      filter: { status: { _eq: 'published' } },
      limit: 1,
    })
  );
  /* Directus may return `data` as one object (singleton-style) or an array */
  const row = Array.isArray(rows) ? rows[0] : rows;
  if (!row || typeof row !== 'object') return null;
  return row as AiForImpactModal;
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