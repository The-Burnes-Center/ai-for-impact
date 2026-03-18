<script setup lang="ts">
import { createDirectus, rest, readItem } from '@directus/sdk';

const API_URL = 'https://directus.theburnescenter.org';
const directus = createDirectus(API_URL).with(rest());

const { data: page } = await useAsyncData('ai-for-impact', () =>
  directus.request(
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

const assetUrl = (id: string) => `${API_URL}/assets/${id}`;

const aboutParagraphs = computed(() => {
  const html = page.value?.about || '';
  return html.split('</p>').filter(s => s.trim()).map(s => s.trim() + '</p>');
});
</script>

<template>
  <div v-if="page" class="page">
    <!-- Hero -->
    <section class="hero">
      <div class="hero__content">

        <!-- Project Carousel -->
        <UiHomeCarousel
          v-if="projects.length"
          :projects="projects"
          :directus-url="API_URL"
        />

        <div class="hero__actions">
          <UiPrimaryButton to="#">Explore all projects</UiPrimaryButton>
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

    <!-- About -->
    <section class="about">
      <div class="about__content">
        <h2 class="about__title">About AI <span class="about_italics">for</span> Impact</h2>
        <div class="about__columns">
          <div
            v-for="(para, i) in aboutParagraphs"
            :key="i"
            class="about__col"
            v-html="para"
          />
        </div>
      </div>

      <div class="team">
        <div class="team__image-wrapper">
          <img
            v-if="page.team_image"
            :src="assetUrl(page.team_image)"
            alt="AI for Impact team"
            class="team__image"
          />
        </div>
        <div class="team__text">
          <div class="team__description" v-html="page.about_team" />
          <UiPrimaryButton href="https://burnes.northeastern.edu/our-team/" variant="cream" icon="/images/arrow-right.svg" min-width="249px">Meet the team</UiPrimaryButton>
        </div>
      </div>

    </section>

    <!-- Metrics -->
    <section v-if="metrics.length" class="metrics">
      <div class="metrics__grid">
        <div v-for="metric in metrics" :key="metric.id" class="metrics__item">
          <span class="metrics__value">{{ metric.value }}</span>
          <div class="metrics__label" v-html="metric.label" />
        </div>
      </div>
    </section>

    <!-- Highlights -->
    <section v-if="highlights.length" class="highlights-section">
      <div class="highlights-section__content">
        <UiHighlightsCarousel :highlights="highlights" />
        <div class="highlights-section__action">
          <UiPrimaryButton to="#" variant="primary" icon="/images/arrow-right.svg" min-width="298px">Explore all projects</UiPrimaryButton>
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
  padding: 40px;
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
  padding: 0 10px;
}

.hero__actions {
  display: flex;
  justify-content: center;
  gap: 20px;
  flex-wrap: wrap;
  margin-top: 20px;
}

.about {
  background-color: var(--color-cream);
  margin-top: 80px;
}

.about__content {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 70px 40px;
}

.about__title {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 42px;
  line-height: 46px;
  letter-spacing: 0;
  color: var(--color-dark);
  margin: 0 0 40px;
}

.about_italics {
  font-family: var(--font-text);
  font-weight: 600;
  font-style: italic;
  font-size: 49px;
  line-height: 46px;
  letter-spacing: 0;
  color: var(--color-primary);
}

.about__columns {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
}

.about__col :deep(p) {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: 0;
  color: var(--color-dark);
  margin: 0;
}

.team {
  display: grid;
  grid-template-columns: 1fr 1fr;
  width: 100%;
  margin-top: 30px;
  overflow: hidden;
}

.team__image-wrapper {
  overflow: hidden;
}

.team__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.team__text {
  background-color: var(--color-primary);
  padding: 60px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  gap: 30px;
}

.team__description {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: 0;
  color: var(--color-cream);
}

.team__description :deep(p) {
  margin: 0;
}

.team__description :deep(a) {
  color: var(--color-cream);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.team__description :deep(a:hover) {
  color: var(--color-white);
}

.metrics {
  background: linear-gradient(0deg, rgba(31, 45, 69, 0.5), rgba(31, 45, 69, 0.5)),
    linear-gradient(0deg, #376BD1, #376BD1);
  border-top: 1.5px solid rgba(255, 255, 255, 0.2);
  padding: 100px 80px;
}

.metrics__grid {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 50px;
  text-align: center;
}

.metrics__item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.metrics__value {
  font-family: "freight-macro-pro", var(--font-text);
  font-weight: 500;
  font-size: 96px;
  line-height: 90px;
  letter-spacing: 0;
  text-align: center;
  color: var(--color-cream);
}

.metrics__label {
  text-align: center;
  color: var(--color-cream);
}

.metrics__label :deep(h3) {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 42px;
  line-height: 46px;
  letter-spacing: 0;
  margin: 0;
}

.metrics__label :deep(h3 em) {
  font-family: var(--font-text);
  font-weight: 600;
  font-style: italic;
  font-size: 49px;
  line-height: 46px;
  letter-spacing: 0;
}

.metrics__label :deep(p) {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: 0;
  margin: 30px 0 0;
}

.highlights-section {
  background-color: var(--color-cream);
  padding: 100px 80px 60px;
  border-bottom: 1.5px solid rgba(31, 45, 69, 0.15);
}

.highlights-section__content {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
}

@media (max-width: 768px) {
  .hero {
    min-height: auto;
    padding: 40px 1.5rem;
  }

  .about__content {
    padding: 40px 1.5rem;
  }

  .about__columns {
    grid-template-columns: 1fr;
    gap: 24px;
  }

  .team {
    grid-template-columns: 1fr;
  }

  .team__text {
    padding: 40px 1.5rem;
  }

  .metrics {
    padding: 40px 1.5rem;
  }

  .metrics__grid {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .highlights-section {
    padding: 40px 1.5rem;
  }
}
</style>
