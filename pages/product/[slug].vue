<script setup lang="ts">
import { fetchProject, assetUrl } from '~/utils/directus';

const route = useRoute();
const slug = route.params.slug as string;

const { data: project } = await useAsyncData(`project-${slug}`, () =>
  fetchProject(slug)
);

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' });
}
</script>

<template>
  <div class="product-page">
    <div v-if="project" class="product-hero">
      <div class="product-hero__image-wrap">
        <img
          v-if="project.project_image"
          :src="assetUrl(project.project_image)"
          :alt="project.project_title"
          class="product-hero__image"
        />
      </div>

      <div class="product-hero__content">
        <h1 class="product-hero__title">{{ project.project_title }}</h1>

        <div
          v-if="project.subtitle"
          class="product-hero__subtitle"
          v-html="project.subtitle"
        />

        <div
          v-if="project.project_description"
          class="product-hero__description"
          v-html="project.project_description"
        />

        <p v-if="project.authors" class="product-hero__authors">
          By {{ project.authors }}
        </p>
      </div>
    </div>

    <div
      v-if="project && (project.long_description || project.metric_quote)"
      class="product-detail"
    >
      <div
        v-if="project.long_description"
        class="product-detail__description"
        v-html="project.long_description"
      />

      <UiRichMetric
        v-if="project.metric_quote"
        :content="project.metric_quote"
        class="product-detail__metric"
      />
    </div>

    <div v-if="project" class="product-actions">
      <UiPrimaryButton
        v-if="project.slide_deck"
        :href="assetUrl(project.slide_deck)"
        variant="primary"
        icon="/images/arrow-down.svg"
      >
        Download the slide deck
      </UiPrimaryButton>

      <UiPrimaryButton
        v-if="project.repo_link"
        :href="project.repo_link"
        variant="primary"
        icon="/images/arrow.svg"
      >
        Go to repository
      </UiPrimaryButton>
    </div>
  </div>
</template>

<style scoped>
.product-page {
  background-color: var(--color-cream);
  min-height: 100vh;
}

.product-hero {
  max-width: 1440px;
  min-height: 618px;
  margin: 0 auto;
  padding: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 40px;
}

.product-hero__image-wrap {
  flex-shrink: 0;
  width: 620px;
  height: 438px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid var(--color-primary);
}

.product-hero__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.product-hero__content {
  flex: 1;
  max-width: 580px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.product-hero__title {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 42px;
  line-height: 46px;
  letter-spacing: 0%;
  color: var(--color-dark);
  margin: 0;
}

.product-hero__subtitle {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: 0%;
  color: var(--color-primary);
}

.product-hero__subtitle :deep(p) {
  margin: 0;
}

.product-hero__subtitle :deep(em) {
  font-style: normal;
}

.product-hero__description {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: 0%;
  color: var(--color-dark);
  padding-top: 50px;
  max-width: 500px;
}

.product-hero__description :deep(p) {
  margin: 0 0 12px;
}

.product-hero__description :deep(p:last-child) {
  margin-bottom: 0;
}

.product-hero__authors {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: 0%;
  color: var(--color-dark);
  margin: 50px 0 8px 0px;
}

.product-detail {
  max-width: 1440px;
  min-height: 500px;
  margin: 0 auto;
  padding: 80px 80px;
  display: flex;
  justify-content: space-between;
  gap: 80px;
}

.product-detail__description {
  flex: 1;
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: 0%;
  color: var(--color-dark);
  text-wrap: balance;
}

.product-detail__description :deep(p) {
  margin: 0 0 12px;
}

.product-detail__description :deep(p:last-child) {
  margin-bottom: 0;
}

.product-detail__metric {
  flex: 1;
}

.product-actions {
  max-width: 1440px;
  min-height: 270px;
  margin: 0 auto;
  padding: 10px 80px 140px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 40px;
  background: linear-gradient(180deg, #F8F6F1 60.58%, #CFDCF5 73.08%, #ABC5F9 82.69%, #6A9CFF 92.79%, #376BD1 100%);
}

@media (max-width: 1024px) {
  .product-actions {
    flex-direction: column;
    padding: 40px 24px 100px;
  }

  .product-detail {
    flex-direction: column;
    padding: 60px 24px;
    min-height: auto;
  }

  .product-hero {
    flex-direction: column;
    padding: 40px 24px;
    min-height: auto;
  }

  .product-hero__image-wrap {
    width: 100%;
    height: auto;
    aspect-ratio: 620 / 438;
  }
}

@media (max-width: 640px) {
  .product-hero__title {
    font-size: 28px;
  }
}
</style>
