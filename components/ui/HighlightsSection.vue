<script setup lang="ts">
import { fetchAiForImpact, filterPublished } from '~/utils/directus';

const props = withDefaults(defineProps<{
  showButton?: boolean;
}>(), { showButton: true });

const { data: page } = await useAsyncData('highlights-data', fetchAiForImpact);
const highlights = computed(() => filterPublished(page.value?.highlights, 'ai_for_impact_highlights_id'));
</script>

<template>
  <section v-if="highlights.length" class="highlights-section">
    <div class="highlights-section__content">
      <UiHighlightsCarousel :highlights="highlights" />
      <div v-if="props.showButton" class="highlights-section__action">
        <UiPrimaryButton to="/product" variant="primary" icon="/images/arrow-right.svg" min-width="298px">Explore all projects</UiPrimaryButton>
      </div>
    </div>
  </section>
</template>

<style scoped>
.highlights-section {
  background-color: var(--color-cream);
  margin-top: 80px;
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
  .highlights-section {
    padding: 40px 1.5rem;
  }
}
</style>
