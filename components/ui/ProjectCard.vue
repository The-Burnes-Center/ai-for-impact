<script setup lang="ts">
import type { Project } from '~/models';

const props = withDefaults(
  defineProps<{
    project: Project;
    externalHref?: string;
    openInNewTab?: boolean;
    hideDescription?: boolean;
  }>(),
  { openInNewTab: false, hideDescription: false }
);

function goToProduct() {
  const url = props.externalHref?.trim();
  if (url) {
    if (props.openInNewTab && import.meta.client) {
      window.open(url, '_blank', 'noopener,noreferrer');
    } else {
      navigateTo(url, { external: true });
    }
    return;
  }
  navigateTo(`/product/${props.project.slug}`);
}

function onCardKeydown(e: KeyboardEvent) {
  if (e.key === 'Enter' || e.key === ' ') {
    e.preventDefault();
    goToProduct();
  }
}
</script>

<template>
  <div
    class="card"
    role="link"
    tabindex="0"
    :aria-label="
      externalHref ? `Open article: ${project.project_title}` : `View project: ${project.project_title}`
    "
    @click="goToProduct"
    @keydown="onCardKeydown"
  >
    <div v-if="project.project_image" class="card__media">
      <UiDirectusImg
        :id="project.project_image"
        :alt="project.project_title"
        class="card__image"
      />
    </div>

    <h3 class="card__title">{{ project.project_title }}</h3>

    <div v-if="project.subtitle" class="card__subtitle" v-html="project.subtitle" />

    <div
      v-if="!hideDescription && project.project_description"
      class="card__desc"
      v-html="project.project_description"
    />

    <p v-if="project.authors" class="card__author">By {{ project.authors }}</p>

    <div class="card__actions">
      <span class="card__link card__link--read">
        Read more
        <img src="/images/arrow-right.svg" alt="" class="card__link-icon" />
      </span>
      <a
        v-if="project.repo_link"
        :href="project.repo_link"
        target="_blank"
        rel="noopener"
        class="card__link"
        @click.stop
      >
        Go to repository
        <img src="/images/arrow-right.svg" alt="" class="card__link-icon" />
      </a>
    </div>
  </div>
</template>

<style scoped>
.card {
  background-color: var(--color-dark);
  border-radius: 10px;
  border: 1.5px solid transparent;
  box-sizing: border-box;
  padding: 20px 20px 30px 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 380px;
  min-height: 533px;
  cursor: pointer;
  transition: border-color 0.3s ease;
}

.card:hover {
  border-color: var(--color-accent);
}

.card:focus-visible {
  border-color: var(--color-accent);
  outline: 2px solid var(--color-accent);
  outline-offset: 2px;
}

.card:focus-visible .card__link--read::after {
  width: 100%;
}

.card__media {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  background-color: var(--color-dark);
  overflow: hidden;
}

.card__media :deep(.card__image) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
}

.card__title {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: 0;
  color: var(--color-cream);
  margin: 0;
}

.card__subtitle {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: 0;
  color: var(--color-accent);
}

.card__subtitle :deep(p) {
  margin: 0;
}

.card__subtitle :deep(em) {
  font-style: normal;
}

.card__desc {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: 0;
  color: var(--color-cream);
  display: -webkit-box;
  -webkit-line-clamp: 8;
  text-wrap: balance;
  -webkit-box-orient: vertical;
  overflow: hidden;
  margin-top: auto;
}

.card__desc :deep(p) {
  margin: 0 0 10px;
}

.card__desc :deep(p:last-child) {
  margin-bottom: 0;
}

.card__author {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--color-cream);
  margin-top: auto;
}

.card__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
}

.card__link {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: 0;
  color: var(--color-accent);
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}

.card__link--read {
  position: relative;
}

.card__link--read::after {
  content: '';
  position: absolute;
  bottom: -6px;
  left: 0;
  width: 0;
  height: 1.5px;
  background-color: var(--color-accent);
  transition: width 0.3s ease;
}

.card:hover .card__link--read::after,
.card__link--read:hover::after {
  width: 100%;
}

a.card__link:hover {
  opacity: 0.85;
}

.card__link-icon {
  width: 20px;
  height: 16px;
  filter: brightness(0) saturate(100%) invert(62%) sepia(52%) saturate(1041%) hue-rotate(193deg) brightness(102%) contrast(101%);
}

@media (max-width: 768px) {
  .card__actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>
