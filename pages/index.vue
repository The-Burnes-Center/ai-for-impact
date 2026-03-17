<script setup lang="ts">
import Banner from '~/components/hero/Banner.vue';

const directus = useDirectus();
const directusUrl = useRuntimeConfig().public.directusUrl as string;

const { data: page } = await useAsyncData('ai-for-impact', () =>
  directus.request(
    readItem('ai_for_impact', 1, {
      fields: [
        'about',
        'about_team',
        'logo',
        'syllabus',
        'latest_report',
        { projects: [{ ai_for_impact_projects_id: ['*'] }] },
        { highlights: [{ ai_for_impact_highlights_id: ['*'] }] },
        { metrics: [{ ai_for_impact_metrics_id: ['*'] }] },
      ],
    })
  )
);

const projects = computed(() =>
  page.value?.projects
    ?.map((p: any) => p.ai_for_impact_projects_id)
    .filter((p: any) => p?.status === 'published') ?? []
);

const highlights = computed(() =>
  page.value?.highlights
    ?.map((h: any) => h.ai_for_impact_highlights_id)
    .filter((h: any) => h?.status === 'published') ?? []
);

const metrics = computed(() =>
  page.value?.metrics
    ?.map((m: any) => m.ai_for_impact_metrics_id)
    .filter((m: any) => m?.status === 'published') ?? []
);

const assetUrl = (id: string) => `${directusUrl}/assets/${id}`;
</script>

<template>
  <div v-if="page" class="page">

    <!-- <Banner /> -->
    <!-- Hero -->
    <!-- <section class="hero">
      <div class="container">
        <img
          v-if="page.logo"
          :src="assetUrl(page.logo)"
          alt="AI for Impact"
          class="hero__logo"
        />
      </div>
    </section> -->
  </div>
</template>
