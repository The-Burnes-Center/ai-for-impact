<script setup lang="ts">
import { assetUrl } from '~/utils/directus';

const props = defineProps<{
  member: {
    id: number;
    name: string;
    title: string;
    image: string | null;
    link: string | null;
  };
}>();
</script>

<template>
  <div class="team-card">
    <div class="team-card__image-wrapper">
      <img
        v-if="member.image"
        :src="assetUrl(member.image)"
        :alt="member.name"
        class="team-card__image"
      />
      <a v-if="member.link" :href="member.link" target="_blank" rel="noopener" class="team-card__arrow">
        <img src="/images/arrow-right.svg" alt="" class="team-card__arrow-icon" />
      </a>
    </div>
    <div class="team-card__info">
      <p class="team-card__name">{{ member.name }}</p>
      <p class="team-card__title">{{ member.title }}</p>
    </div>
  </div>
</template>

<style scoped>
.team-card {
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding-right: 40px;
}

.team-card__image-wrapper {
  position: relative;
  width: 250px;
  height: 292px;
  flex-shrink: 0;
}

.team-card__image {
  width: 250px;
  height: 292px;
  object-fit: cover;
  border-radius: 10px;
}

.team-card__arrow {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 48px;
  height: 48px;
  background-color: var(--color-primary);
  border-top-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s ease;
}

.team-card__arrow:hover {
  background-color: var(--color-accent);
}

.team-card__arrow-icon {
  width: 18px;
  height: 18px;
  filter: brightness(0) invert(1);
}

.team-card__info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.team-card__name {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: 0;
  color: var(--color-dark);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.team-card__title {
  font-family: var(--font-text);
  font-weight: 500;
  font-style: italic;
  font-size: 20px;
  line-height: 24px;
  letter-spacing: 0;
  color: var(--color-primary);
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

@media (max-width: 768px) {
  .team-card {
  
    padding-right: 0;
  }

  .team-card__image {
    width: 250px;
    height: 292px;
  }
}
</style>
