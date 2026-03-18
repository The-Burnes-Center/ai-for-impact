<script setup lang="ts">
import { createDirectus, rest, readItem } from '@directus/sdk';

const API_URL = 'https://directus.theburnescenter.org';
const directus = createDirectus(API_URL).with(rest());

const { data: site } = await useAsyncData('header-logo', () =>
  directus.request(
    readItem('ai_for_impact', 1, {
      fields: ['logo'],
    })
  )
);

const logoUrl = computed(() =>
  site.value?.logo ? `${API_URL}/assets/${site.value.logo}` : ''
);
</script>

<template>
  <header class="header">
    <div class="header__inner">
      <NuxtLink to="/" class="header__logo">
        <img v-if="logoUrl" :src="logoUrl" alt="AI for Impact" class="header__logo-img" />
      </NuxtLink>
      <nav class="header__nav">
        <NuxtLink to="/products" class="header__link">
          <img src="/images/arrow-right.svg" alt="" class="header__icon" />
          Products
        </NuxtLink>
        <NuxtLink to="/our-team" class="header__link">
          <img src="/images/arrow-right.svg" alt="" class="header__icon" />
          Our Team
        </NuxtLink>
        <a href="https://innovate-us.org/workshops" target="_blank" rel="noopener" class="header__link">
          <img src="/images/arrow.svg" alt="" class="header__icon header__icon--external" />
          Events
        </a>
        <a href="https://innovate-us.org/comms" target="_blank" rel="noopener" class="header__link">
          <img src="/images/arrow.svg" alt="" class="header__icon header__icon--external" />
          News
        </a>
      </nav>
    </div>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  background-color: var(--color-dark);
  padding: 20px 80px;
}

.header__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 70px;
}

.header__logo {
  text-decoration: none;
  display: flex;
  align-items: center;
}

.header__logo-img {
  height: 36px;
  width: auto;
}

.header__nav {
  display: flex;
  align-items: center;
  gap: 40px;
}

.header__link {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 22px;
  line-height: 28px;
  letter-spacing: 0;
  color: var(--color-cream);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  transition: color 0.3s ease;
}

.header__link::after {
  content: '';
  position: absolute;
  bottom: -11px;
  left: 0;
  width: 0;
  height: 1.5px;
  background-color: var(--color-accent);
  transition: width 0.3s ease;
}

.header__link:hover {
  color: var(--color-accent);
}

.header__link:hover .header__icon {
  filter: brightness(0) saturate(100%) invert(62%) sepia(52%) saturate(1041%) hue-rotate(193deg) brightness(102%) contrast(101%);
}

.header__link:hover::after {
  width: 100%;
}

.header__icon {
  width: 20px;
  height: 16px;
  transition: filter 0.3s ease;
  flex-shrink: 0;
}

.header__icon--external {
  width: 14px;
  height: 14px;
}

@media (max-width: 768px) {
  .header {
    padding: 0 1.5rem;
  }

  .header__nav {
    gap: 20px;
  }

  .header__link {
    font-size: 16px;
    line-height: 22px;
  }
}
</style>
