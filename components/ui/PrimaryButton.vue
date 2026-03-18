<template>
  <component
    :is="to ? resolveComponent('NuxtLink') : href ? 'a' : 'button'"
    :to="to"
    :href="href"
    :target="href ? '_blank' : undefined"
    :rel="href ? 'noopener' : undefined"
    class="btn"
    :class="`btn--${variant}`"
    :style="{ '--btn-min-width': props.minWidth }"
  >
    <img :src="icon" alt="" class="btn__icon" />
    <span class="btn__text"><slot /></span>
  </component>
</template>

<script setup lang="ts">
import { resolveComponent } from 'vue';

const props = withDefaults(defineProps<{
  to?: string;
  href?: string;
  icon?: string;
  minWidth?: string;
  variant?: 'accent' | 'cream';
}>(), {
  icon: '/images/icon.svg',
  minWidth: '298px',
  variant: 'accent',
});
</script>

<style scoped>
.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-width: var(--btn-min-width, 298px);
  height: 70px;
  padding: 20px 30px;
  border-radius: 100px;
  background: transparent;
  cursor: pointer;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.btn__text {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: 0;
  transition: color 0.3s ease;
}

.btn__icon {
  width: 28px;
  height: 28px;
  flex-shrink: 0;
  transition: filter 0.3s ease;
}

/* Accent variant (default) */
.btn--accent {
  border: 1.5px solid var(--color-accent);
}

.btn--accent .btn__text {
  color: var(--color-accent);
}

.btn--accent:hover {
  background-color: var(--color-accent);
}

.btn--accent:hover .btn__text {
  color: var(--color-dark);
}

.btn--accent:hover .btn__icon {
  filter: brightness(0) saturate(100%) invert(15%) sepia(20%) saturate(1000%) hue-rotate(185deg) brightness(95%) contrast(95%);
}

/* Cream variant */
.btn--cream {
  border: 1.5px solid var(--color-cream);
}

.btn--cream .btn__text {
  color: var(--color-cream);
}

.btn--cream:hover {
  background-color: var(--color-cream);
}

.btn--cream:hover .btn__text {
  color: var(--color-dark);
}

.btn--cream:hover .btn__icon {
  filter: brightness(0) saturate(100%) invert(15%) sepia(20%) saturate(1000%) hue-rotate(185deg) brightness(95%) contrast(95%);
}
</style>
