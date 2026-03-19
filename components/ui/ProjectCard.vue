<script setup lang="ts">
import type { Project } from '~/models';
import { assetUrl } from '~/utils/directus';

const props = defineProps<{
  project: Project;
}>();
</script>

<template>
  <div class="card">
    <img
      v-if="project.project_image"
      :src="assetUrl(project.project_image)"
      :alt="project.project_title"
      class="card__image"
    />

    <h3 class="card__title">{{ project.project_title }}</h3>

    <div v-if="project.subtitle" class="card__subtitle" v-html="project.subtitle" />

    <div v-if="project.project_description" class="card__desc" v-html="project.project_description" />

    <p v-if="project.authors" class="card__author">By {{ project.authors }}</p>

    <div class="card__actions">
      <NuxtLink :to="`/product/${project.id}`" class="card__link">
        Read more
        <img src="/images/arrow-right.svg" alt="" class="card__link-icon" />
      </NuxtLink>
      <a v-if="project.repo_link" :href="project.repo_link" target="_blank" rel="noopener" class="card__link">
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
  padding: 10px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 380px;
  min-height: 533px;
}

.card__image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
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
  -webkit-box-orient: vertical;
  overflow: hidden;
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
  margin: 0;
}

.card__actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: auto;
  padding-top: 16px;
}

.card__link {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: 0;
  color: var(--color-accent);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 8px;
  transition: opacity 0.3s ease;
}

.card__link:hover {
  opacity: 0.8;
}

.card__link-icon {
  width: 20px;
  height: 16px;
  filter: brightness(0) saturate(100%) invert(62%) sepia(52%) saturate(1041%) hue-rotate(193deg) brightness(102%) contrast(101%);
}

@media (max-width: 768px) {
  .card__image {
    height: 200px;
  }

  .card__actions {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;
  }
}
</style>
