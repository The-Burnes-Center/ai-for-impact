<template>
  <div>
    <HeroBanner />
    <HeroHeader />
    <main>
      <slot />
    </main>
    <SiteFooter />
    <HeroBanner position="bottom" />
  </div>
</template>
