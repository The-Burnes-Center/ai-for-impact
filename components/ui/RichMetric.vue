<script setup lang="ts">
defineProps<{
  content: string;
}>();
</script>

<template>
  <div class="rich-metric" v-html="content" />
</template>

<style scoped>
.rich-metric {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 42px;
  line-height: 46px;
  letter-spacing: 0;
  color: var(--color-dark);
}

.rich-metric :deep(p) {
  margin: 0;
}

.rich-metric :deep(p) {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 42px;
  line-height: 46px;
  letter-spacing: 0;
  color: var(--color-dark);
  margin: 0;
}

.rich-metric :deep(em) {
  font-family: var(--font-text);
  font-weight: 600;
  font-style: italic;
  letter-spacing: 0;
  color: var(--color-primary);
}

@media (max-width: 768px) {
  .rich-metric :deep(p) {
    font-size: 25px;
    line-height: 30px;
  }
}
</style>
