import { createDirectus, rest, readItem, aggregate, readItems } from '@directus/sdk';

export const API_URL = 'https://directus.theburnescenter.org';

export const directus = createDirectus(API_URL).with(rest());

export const assetUrl = (id: string) => `${API_URL}/assets/${id}`;

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
        ],
        filter:{ status : {
          _eq: 'published'
        }}
      })
  )
}