<template>
  <div>
    <HeroBanner />
    <HeroHeader :sticky-shadow="false" />
    <main>
      <slot />
    </main>
    <SiteFooter />
    <HeroBanner position="bottom" />
  </div>
</template>
