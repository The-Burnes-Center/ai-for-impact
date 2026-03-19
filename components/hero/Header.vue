<script setup lang="ts">
import { directus, assetUrl } from '~/utils/directus';
import { readItem } from '@directus/sdk';

const { data: site } = await useAsyncData('header-logo', () =>
  directus.request(readItem('ai_for_impact', 1, { fields: ['logo'] }))
);

const logoUrl = computed(() =>
  site.value?.logo ? assetUrl(site.value.logo) : ''
);

const mobileMenuOpen = ref(false);
</script>

<template>
  <header class="header" :class="{ 'header--open': mobileMenuOpen }">
    <div class="header__inner">
      <NuxtLink v-if="!mobileMenuOpen" to="/" class="header__logo">
        <img v-if="logoUrl" :src="logoUrl" alt="AI for Impact" class="header__logo-img" />
      </NuxtLink>

      <!-- Desktop nav -->
      <nav class="header__nav">
        <NuxtLink to="#" class="header__link">
          <img src="/images/arrow-right.svg" alt="" class="header__icon" />
          Products
        </NuxtLink>
        <NuxtLink to="https://burnes.northeastern.edu/our-team/" class="header__link">
          <img src="/images/arrow-right.svg" alt="" class="header__icon" />
          Our Team
        </NuxtLink>
        <a href="https://burnes.northeastern.edu/upcoming-events/" target="_blank" rel="noopener" class="header__link">
          <img src="/images/arrow.svg" alt="" class="header__icon header__icon--external" />
          Events
        </a>
        <a href="https://burnes.northeastern.edu/news/" target="_blank" rel="noopener" class="header__link">
          <img src="/images/arrow.svg" alt="" class="header__icon header__icon--external" />
          News
        </a>
      </nav>

      <!-- Mobile hamburger -->
      <button class="header__hamburger" @click="mobileMenuOpen = !mobileMenuOpen" aria-label="Toggle menu">
        <img v-if="!mobileMenuOpen" src="/images/navlinks.svg" alt="" class="header__menu-icon" />
        <img v-else src="/images/cross.svg" alt="" class="header__menu-icon" />
      </button>
    </div>

    <!-- Mobile menu -->
    <Transition name="menu-slide">
    <nav v-if="mobileMenuOpen" class="header__mobile-nav">
      <NuxtLink to="#" class="header__mobile-link" @click="mobileMenuOpen = false">
        <img src="/images/arrow-right.svg" alt="" class="header__icon" />
        Products
      </NuxtLink>
      <NuxtLink to="https://burnes.northeastern.edu/our-team/" class="header__mobile-link" @click="mobileMenuOpen = false">
        <img src="/images/arrow-right.svg" alt="" class="header__icon" />
        Our Team
      </NuxtLink>
      <a href="https://burnes.northeastern.edu/upcoming-events/" target="_blank" rel="noopener" class="header__mobile-link">
        <img src="/images/arrow.svg" alt="" class="header__icon header__icon--external" />
        Events
      </a>
      <a href="https://burnes.northeastern.edu/news/" target="_blank" rel="noopener" class="header__mobile-link">
        <img src="/images/arrow.svg" alt="" class="header__icon header__icon--external" />
        News
      </a>
    </nav>
    </Transition>
  </header>
</template>

<style scoped>
.header {
  width: 100%;
  background-color: var(--color-dark);
  padding: 20px 80px;
}

.header--open {
  background-color: var(--color-dark);
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

.header__hamburger {
  display: none;
  background: none;
  border: none;
  cursor: pointer;
  padding: 8px;
  margin-left: auto;
}

.header__menu-icon {
  width: 24px;
  height: 24px;
}

.header__mobile-nav {
  display: none;
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



.header__mobile-link {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 22px;
  line-height: 28px;
  color: var(--color-cream);
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 16px 0;
  animation: slideFromRight 0.4s ease both;
}

.header__mobile-link:nth-child(1) { animation-delay: 0.05s; }
.header__mobile-link:nth-child(2) { animation-delay: 0.1s; }
.header__mobile-link:nth-child(3) { animation-delay: 0.15s; }
.header__mobile-link:nth-child(4) { animation-delay: 0.2s; }

@keyframes slideFromRight {
  from {
    opacity: 0;
    transform: translateX(40px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@media (max-width: 1024px) {
  .header {
    padding: 15px 1.5rem;
  }

  .header--open {
    position: fixed;
    top: 45px;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1000;
    overflow-y: auto;
  }

  .header__nav {
    display: none;
  }

  .header__hamburger {
    display: block;
    z-index: 1001;
  }

  .header__mobile-nav {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 20px;
    min-height: calc(100vh - 120px);
    gap: 50px;
  }

  .header__mobile-link {
    font-size: 42px;
    line-height: 46px;
    border-bottom: none;
    padding: 20px 0;
  }

  .header__mobile-link .header__icon,
  .header__mobile-link .header__icon--external {
    width: 41px;
    min-width: 41px;
    height: 40px;
    filter: brightness(0) saturate(100%) invert(62%) sepia(52%) saturate(1041%) hue-rotate(193deg) brightness(102%) contrast(101%);
  }
}

.menu-slide-enter-active {
  transition: all 0.4s ease;
}

.menu-slide-leave-active {
  transition: all 0.3s ease;
}

.menu-slide-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.menu-slide-leave-to {
  opacity: 0;
  transform: translateX(100%);
}
</style>
