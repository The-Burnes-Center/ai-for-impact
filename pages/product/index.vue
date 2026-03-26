<script setup lang="ts">
import type { Project } from '~/models';
import { fetchAllProjects } from '~/utils/directus';

const { data: projects } = await useAsyncData('all-projects', fetchAllProjects);

const projectList = computed(() => (projects.value ?? []) as Project[]);

const searchQuery = ref('');
const productTypeFilter = ref<string>('');

const stripHtml = (s?: string | null) =>
  String(s ?? '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();

function productTypeLabel(p: Project): string {
  const t = p.product_type;
  if (t == null) return '';
  if (typeof t === 'string') return t;
  return (t.name ?? t.title ?? '').trim();
}

function searchableText(p: Project): string {
  return [
    productTypeLabel(p),
    p.project_title,
    stripHtml(p.project_description),
    stripHtml(p.subtitle),
    stripHtml(p.authors),
    p.repo_link ?? '',
  ]
    .join(' ')
    .toLowerCase();
}

const productTypes = computed(() => {
  const set = new Set<string>();
  for (const p of projectList.value) {
    const label = productTypeLabel(p);
    if (label) set.add(label);
  }
  return [...set].sort((a, b) => a.localeCompare(b));
});

const filteredProjects = computed(() => {
  const list = projectList.value;
  const q = searchQuery.value.trim().toLowerCase();
  const typeNeedle = productTypeFilter.value;

  return list.filter((p) => {
    if (typeNeedle && productTypeLabel(p) !== typeNeedle) return false;
    if (!q) return true;
    return searchableText(p).includes(q);
  });
});
</script>

<template>
  <section class="product-page">
    <div class="product-page__inner">
      <div v-if="projects?.length" class="product-page__toolbar">
        <label class="product-page__field">
          <span class="product-page__label">Search</span>
          <input
            v-model="searchQuery"
            type="search"
            class="product-page__input"
            placeholder="Title, description, authors, type, repo…"
            autocomplete="off"
            aria-label="Search projects"
          />
        </label>
        <label v-if="productTypes.length" class="product-page__field product-page__field--narrow">
          <span class="product-page__label">Type</span>
          <select v-model="productTypeFilter" class="product-page__select" aria-label="Filter by product type">
            <option value="">All types</option>
            <option v-for="t in productTypes" :key="t" :value="t">{{ t }}</option>
          </select>
        </label>
      </div>

      <p v-if="projects?.length && !filteredProjects.length" class="product-page__empty">
        No projects match your search.
      </p>

      <div v-if="filteredProjects.length" class="product-page__grid">
        <UiProjectCard
          v-for="project in filteredProjects"
          :key="project.id"
          :project="project as Project"
        />
      </div>
    </div>
  </section>

  <UiHighlightsSection :show-button="false" />
</template>

<style scoped>
.product-page {
  background-color: var(--color-dark);
}

.product-page__inner {
  container-type: inline-size;
  max-width: var(--max-width);
  margin: 0 auto;
  padding: 40px clamp(20px, 4vw, 80px) 80px;
  box-sizing: border-box;
}

.product-page__toolbar {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 2.5rem;
}

.product-page__field {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 0 0 38%;
  width: 38%;
  max-width: 38%;
  min-width: 0;
  box-sizing: border-box;
}

.product-page__field--narrow {
  flex: 0 0 57%;
  width: 57%;
  max-width: 57%;
}

.product-page__toolbar > .product-page__field:only-child {
  flex: 1 1 100%;
  width: 100%;
  max-width: 100%;
}

.product-page__label {
  font-family: var(--font-sans);
  font-size: 14px;
  line-height: 1.2;
  color: var(--color-cream);
  opacity: 0.85;
}

.product-page__input,
.product-page__select {
  font-family: var(--font-sans);
  font-size: 18px;
  line-height: 1.3;
  color: var(--color-dark);
  background: var(--color-cream);
  border: 1.5px solid rgba(255, 255, 255, 0.25);
  border-radius: 8px;
  padding: 12px 14px;
  width: 100%;
  box-sizing: border-box;
}

.product-page__input::placeholder {
  color: rgba(31, 45, 69, 0.45);
}

.product-page__select {
  cursor: pointer;
}

.product-page__empty {
  font-family: var(--font-sans);
  font-size: 18px;
  color: var(--color-cream);
  margin: 0 0 2rem;
  opacity: 0.9;
}

.product-page__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 380px));
  gap: 60px;
  justify-content: center;
}

@media (max-width: 1024px) {
  .product-page__grid {
    grid-template-columns: repeat(2, minmax(0, 380px));
    gap: 40px;
  }
}

@media (max-width: 768px) {
  .product-page__inner {
    padding-bottom: 40px;
  }

  .product-page__toolbar {
    flex-direction: column;
    align-items: stretch;
    gap: min(5rem, 5cqi);
  }

  .product-page__field,
  .product-page__field--narrow {
    flex: 1 1 100%;
    width: 100%;
    max-width: 100%;
  }

  .product-page__grid {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  :deep(.card) {
    width: 100%;
  }
}
</style>
