<template>
  <NuxtLink
    v-if="to"
    :to="to"
    class="btn"
    :class="`btn--${variant}`"
    :style="{ '--btn-min-width': props.minWidth }"
  >
    <img :src="icon" alt="" class="btn__icon" />
    <span class="btn__text"><slot /></span>
  </NuxtLink>
  <a
    v-else-if="href"
    :href="href"
    target="_blank"
    rel="noopener"
    class="btn"
    :class="`btn--${variant}`"
    :style="{ '--btn-min-width': props.minWidth }"
  >
    <img :src="icon" alt="" class="btn__icon" />
    <span class="btn__text"><slot /></span>
  </a>
  <button
    v-else
    class="btn"
    :class="`btn--${variant}`"
    :style="{ '--btn-min-width': props.minWidth }"
  >
    <img :src="icon" alt="" class="btn__icon" />
    <span class="btn__text"><slot /></span>
  </button>
</template>

<script setup lang="ts">

const props = withDefaults(defineProps<{
  to?: string;
  href?: string;
  icon?: string;
  minWidth?: string;
  variant?: 'accent' | 'cream' | 'primary';
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

.btn--cream .btn__icon {
  filter: brightness(0) invert(1);
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

/* Primary variant */
.btn--primary {
  border: 1.5px solid var(--color-primary);
}

.btn--primary .btn__text {
  color: var(--color-primary);
}

.btn--primary .btn__icon {
  filter: brightness(0) saturate(100%) invert(32%) sepia(93%) saturate(600%) hue-rotate(200deg) brightness(90%) contrast(90%);
}

.btn--primary:hover {
  background-color: var(--color-primary);
}

.btn--primary:hover .btn__text {
  color: var(--color-cream);
}

.btn--primary:hover .btn__icon {
  filter: brightness(0) saturate(100%) invert(97%) sepia(5%) saturate(500%) hue-rotate(340deg) brightness(104%) contrast(96%);
}

@media (max-width: 768px) {
  .btn {
    min-width: auto;
    height: auto;
    padding: 14px 20px;
    gap: 8px;
  }

  .btn__text {
    font-size: 16px;
    line-height: 22px;
  }

  .btn__icon {
    width: 20px;
    height: 20px;
  }
}
</style>
