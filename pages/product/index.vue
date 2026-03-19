<script setup lang="ts">
import type { Project } from '~/models';
import { fetchAllProjects, API_URL } from '~/utils/directus';

const { data: projects } = await useAsyncData('all-projects', fetchAllProjects);
</script>

<template>
  <section class="product-page">
    <div v-if="projects?.length" class="product-page__grid">
      <UiProjectCard
        v-for="project in projects"
        :key="project.id"
        :project="project as Project"
      />
    </div>
  </section>

  <UiHighlightsSection :show-button="false" />
</template>

<style scoped>
.product-page {
  background-color: var(--color-dark);
}

.product-page__grid {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 60px 80px 80px;
  display: grid;
  grid-template-columns: repeat(3, 380px);
  gap: 60px;
  justify-content: center;
}

@media (max-width: 1024px) {
  .product-page {
    padding: 40px;
  }

  .product-page__grid {
    grid-template-columns: repeat(2, 380px);
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .product-page {
    padding: 20px;
  }

  .product-page__grid {
    grid-template-columns: 1fr;
    gap: 30px;
    padding: 20px;
  }

  .card {
    width: 100%;
  }
}
</style>
