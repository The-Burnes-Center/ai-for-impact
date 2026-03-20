<template>
  <div>
    <HeroBanner />
    <HeroHeader
      bg-color="var(--color-cream)"
      text-color="var(--color-dark)"
      hover-color="var(--color-primary)"
      :icon-filter="darkFilter"
      logo-field="logo_lighter"
    />
    <main>
      <slot />
    </main>
    <SiteFooter />
    <HeroBanner position="bottom" />
  </div>
</template>

<script setup>
const darkFilter = 'brightness(0) saturate(100%) invert(15%) sepia(20%) saturate(1000%) hue-rotate(185deg) brightness(95%) contrast(95%)';
</script>
