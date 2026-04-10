<script setup lang="ts">
import { fetchProject, assetUrl, imageUrl } from '~/utils/directus';
import { stripHtml, truncateMeta } from '~/utils/seo';

definePageMeta({ layout: 'light' });

const route = useRoute();
const slug = route.params.slug as string;

const { data: project } = await useAsyncData(`project-${slug}`, () =>
  fetchProject(slug)
);

if (!project.value) {
  throw createError({ statusCode: 404, statusMessage: 'Project not found' });
}

watch(
  project,
  (p) => {
    if (!p?.slug) return;
    const param = String(route.params.slug ?? '');
    if (param !== p.slug) {
      navigateTo(`/product/${p.slug}`, { replace: true });
    }
  },
  { immediate: true }
);

const projectTitle = computed(() => project.value?.project_title ?? 'Project');
const projectDesc = computed(() =>
  truncateMeta(stripHtml(project.value?.project_description ?? project.value?.subtitle ?? ''))
);
const { origin } = useRequestURL();
const projectImage = computed(() =>
  project.value?.project_image
    ? imageUrl(project.value.project_image, 'hero')
    : `${origin}/images/og-image.png`
);

useSeoMeta({
  title: () => projectTitle.value,
  ogTitle: () => `${projectTitle.value} | AI for Impact`,
  description: () => projectDesc.value,
  ogDescription: () => projectDesc.value,
  ogUrl: useRequestURL().href,
  ogImage: () => projectImage.value,
  ogImageAlt: () => projectTitle.value,
  ogType: 'article',
  twitterCard: 'summary_large_image',
  twitterTitle: () => `${projectTitle.value} | AI for Impact`,
  twitterDescription: () => projectDesc.value,
  twitterImage: () => projectImage.value,
});

const additionalProjectImages = computed(() =>
  project.value?.additional_project_images
    ?.map((image) => image.directus_files_id)
    .filter((image): image is string => Boolean(image)) ?? []
);
</script>

<template>
  <div class="product-page">
    <div v-if="project" class="product-hero">
      <div class="product-hero__image-wrap">
        <UiDirectusImg
          v-if="project.project_image"
          :id="project.project_image"
          :alt="project.project_title"
          class="product-hero__image"
          preset="hero"
          priority
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

    <section
      v-if="additionalProjectImages.length"
      class="product-gallery"
    >
      <div class="product-gallery__grid">
        <div
          v-for="(image, index) in additionalProjectImages"
          :key="`${image}-${index}`"
          class="product-gallery__item"
        >
          <UiDirectusImg
            :id="image"
            :alt="`${project?.project_title} additional image ${Number(index) + 1}`"
            class="product-gallery__image"
            sizes="(max-width: 768px) 100vw, 400px"
          />
        </div>
      </div>
    </section>

    <div v-if="project" class="product-actions">
      <div class="product-actions__buttons">
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

      <p class="product-actions__contact">
        <span class="product-actions__contact-body">For </span>
        <span class="product-actions__contact-emphasis">technical details</span>
        <span class="product-actions__contact-body">, contact David Fields at </span>
        <a
          class="product-actions__contact-link"
          href="mailto:d.fields@northeastern.edu"
        >d.fields@northeastern.edu</a>
      </p>
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
  position: relative;
  flex-shrink: 0;
  width: 710px;
  max-width: 100%;
  aspect-ratio: 620 / 438;
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--color-cream);
}

.product-hero__image-wrap :deep(.product-hero__image) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
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
  padding-top: 20px;
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
  margin: 20px 0 8px 0px;
}

.product-detail {
  max-width: 1440px;
  min-height: auto;
  margin: 0 auto;
  padding: 80px 80px 30px 80px;
  display: flex;
  justify-content: space-between;
  gap: 40px;
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
  padding-right: 40px;
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

.product-detail__metric :deep(p) {
  margin-bottom: 20px;
}

.product-gallery {
  max-width: 1440px;
  margin: 0 auto;
  padding: 0 80px 80px;
}

.product-gallery__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, 400px);
  gap: 30px;
  padding-top: 90px;
}

.product-gallery__item {
  position: relative;
  width: 400px;
  max-width: 100%;
  aspect-ratio: 4 / 3;
  overflow: hidden;
  border-radius: 10px;
  background-color: var(--color-cream);
}

.product-gallery__item :deep(.product-gallery__image) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  object-position: center;
  display: block;
}

.product-actions {
  min-height: 270px;
  padding: 10px 80px 140px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 50px;
  background: linear-gradient(180deg, #F8F6F1 60.58%, #CFDCF5 73.08%, #ABC5F9 82.69%, #6A9CFF 92.79%, #376BD1 100%);
}

.product-actions__buttons {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 40px;
}

.product-actions__contact {
  margin: 0 auto;
  max-width: 900px;
  text-align: center;
  text-wrap: balance;
}

.product-actions__contact-body {
  color: var(--black, #1f2d45);
  font-family: var(--font-sans);
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
}

.product-actions__contact-emphasis {
  color: var(--blue, #376bd1);
  font-family: var(--font-text);
  font-size: 30px;
  font-style: italic;
  font-weight: 400;
  line-height: 32px;
}

.product-actions__contact-link {
  color: var(--black, #1f2d45);
  font-family: var(--font-sans);
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
  text-decoration-line: underline;
  text-decoration-style: solid;
  text-decoration-skip-ink: auto;
  text-decoration-thickness: auto;
  text-underline-offset: auto;
  text-underline-position: from-font;
}

@media (max-width: 1024px) {
  .product-actions {
    padding: 40px 24px 100px;
  }

  .product-actions__buttons {
    flex-direction: column;
    gap: 24px;
  }

  .product-detail {
    flex-direction: column;
    padding: 60px 24px;
    min-height: auto;
    gap: 40px;
  }

  .product-gallery {
    padding: 0 24px 60px;
  }

  .product-gallery__grid {
    grid-template-columns: 1fr;
    justify-content: stretch;
  }

  .product-gallery__item {
    width: 100%;
    height: 300px;
  }

  .product-detail__description {
    padding-right: 0;
    border-right: none;
    padding-bottom: 40px;
  }

  .product-hero {
    flex-direction: column;
    padding: 40px 24px;
    min-height: auto;
  }

  .product-hero__image-wrap {
    width: 100%;
    aspect-ratio: 620 / 438;
  }
}

@media (max-width: 640px) {
  .product-hero__title {
    font-size: 28px;
  }
}
</style>
