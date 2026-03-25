<script setup lang="ts">
import type { Highlight } from '~/models';

const props = defineProps<{
  highlights: Highlight[];
}>();

const activeIndex = ref(0);
const isMobile = ref(false);

if (import.meta.client) {
  const checkMobile = () => { isMobile.value = window.innerWidth <= 768; };
  checkMobile();
  window.addEventListener('resize', checkMobile);
}

const perPage = computed(() => isMobile.value ? 1 : 2);
const totalPages = computed(() => Math.ceil(props.highlights.length / perPage.value));

const visibleHighlights = computed(() =>
  props.highlights.slice(activeIndex.value * perPage.value, activeIndex.value * perPage.value + perPage.value)
);

watch(perPage, () => { activeIndex.value = 0; });

const next = () => {
  activeIndex.value = (activeIndex.value + 1) % totalPages.value;
};

const prev = () => {
  activeIndex.value = (activeIndex.value - 1 + totalPages.value) % totalPages.value;
};
</script>

<template>
  <div class="highlights">
    <button class="highlights__arrow highlights__arrow--left" @click="prev" aria-label="Previous highlights">
      <img src="/images/arrow-left.svg" alt="" class="highlights__arrow-icon" />
    </button>

    <div class="highlights__stage">
      <div class="highlights__slide">
        <div v-for="highlight in visibleHighlights" :key="highlight.id" class="highlights__item">
          <UiRichMetric :content="highlight.description" />
          <div class="highlights__org" v-html="highlight.organization" />
        </div>
      </div>
    </div>

    <button class="highlights__arrow highlights__arrow--right" @click="next" aria-label="Next highlights">
      <img src="/images/arrow-right.svg" alt="" class="highlights__arrow-icon" />
    </button>
  </div>
</template>

<style scoped>
.highlights {
  display: flex;
  align-items: flex-start;
  gap: 40px;
  width: 100%;
  position: relative;
}

.highlights__arrow {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  flex-shrink: 0;
  margin-top: 80px;
}

.highlights__arrow-icon {
  width: 24px;
  height: 24px;
  filter: brightness(0) saturate(100%) invert(15%) sepia(20%) saturate(1000%) hue-rotate(185deg) brightness(95%) contrast(95%);
  transition: filter 0.3s ease;
}

.highlights__arrow:hover .highlights__arrow-icon {
  filter: brightness(0) saturate(100%) invert(32%) sepia(93%) saturate(600%) hue-rotate(200deg) brightness(90%) contrast(90%);
}

.highlights__stage {
  flex: 1;
  overflow: hidden;
}

.highlights__slide {
  display: flex;
  justify-content: space-between;
  gap: 60px;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.highlights__item {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 40px;
}

@media (max-width: 768px) {
  .highlights__item {
    gap: 20px;
  }
}

.highlights__org {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: 0;
  color: var(--color-dark);
  margin-top: auto;
}

.highlights__org :deep(p) {
  margin: 0;
}

@media (max-width: 1024px) {
  .highlights__arrow {
    margin-top: 60px;
  }
}

@media (max-width: 768px) {
  .highlights {
    gap: 20px;
  }

  .highlights__arrow {
    margin-top: 40px;
  }

  .highlights__slide {
    flex-direction: column;
    gap: 30px;
  }

  .highlights__org {
    font-size: 16px;
    line-height: 22px;
  }
}
</style>
