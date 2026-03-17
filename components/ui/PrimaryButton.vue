<template>
  <component :is="to ? resolveComponent('NuxtLink') : href ? 'a' : 'button'" :to="to" :href="href" :target="href ? '_blank' : undefined" :rel="href ? 'noopener' : undefined" class="primary-btn">
    <span class="primary-btn__text"><slot /></span>
    <img :src="icon" alt="" class="primary-btn__icon" />
  </component>
</template>

<script setup lang="ts">
import { resolveComponent } from 'vue';

withDefaults(defineProps<{
  to?: string;
  href?: string;
  icon?: string;
}>(), {
  icon: '/images/icon.svg',
});
</script>

<style scoped>
.primary-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: 298px;
  height: 70px;
  padding: 20px 30px;
  border: 1.5px solid var(--color-accent);
  border-radius: 100px;
  background: transparent;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.primary-btn__text {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: 0;
  color: var(--color-accent);
  transition: color 0.3s ease;
}

.primary-btn__icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  transition: filter 0.3s ease;
}

.primary-btn:hover {
  background-color: var(--color-accent);
}

.primary-btn:hover .primary-btn__text {
  color: var(--color-dark);
}

.primary-btn:hover .primary-btn__icon {
  filter: brightness(0) saturate(100%) invert(15%) sepia(20%) saturate(1000%) hue-rotate(185deg) brightness(95%) contrast(95%);
}
</style>
