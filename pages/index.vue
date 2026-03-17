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
    <!-- Hero -->
    <section class="hero">
      <div class="hero__content">
        <div class="hero__about" v-html="page.about" />
        <div class="hero__actions">
          <UiPrimaryButton to="/products">Explore all projects</UiPrimaryButton>
          <UiPrimaryButton
            v-if="page.latest_report"
            :href="assetUrl(page.latest_report)"
            icon="/images/arrow-down.svg"
          >
            Download our latest report
          </UiPrimaryButton>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.hero {
  width: 100%;
  min-height: 650px;
  background-color: var(--color-dark);
  padding: 70px 40px;
  display: flex;
  align-items: center;
}

.hero__content {
  max-width: var(--max-width);
  margin: 0 auto;
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.hero__about {
  font-family: var(--font-text);
  font-size: 1.25rem;
  line-height: 1.8;
  color: var(--color-cream);
}

.hero__about :deep(p) {
  margin: 0 0 1rem;
}

.hero__actions {
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding: 40px 1.5rem;
  }
}
</style>
