<script setup lang="ts">
import { imageUrl } from '~/utils/directus';

defineOptions({ inheritAttrs: false });

const props = withDefaults(
  defineProps<{
    id: string | { id?: string };
    alt: string;
    preset?: 'hero' | 'card';
    priority?: boolean;
    sizes?: string;
  }>(),
  { preset: 'card', priority: false }
);

const src = computed(() => imageUrl(props.id, props.preset));
</script>

<template>
  <img
    :src="src"
    :alt="alt"
    :loading="priority ? 'eager' : 'lazy'"
    decoding="async"
    :fetchpriority="priority ? 'high' : 'auto'"
    :sizes="sizes"
    v-bind="$attrs"
  />
</template>
