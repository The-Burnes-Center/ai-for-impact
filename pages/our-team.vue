<script setup lang="ts">
import { readItems } from '@directus/sdk';
import { fetchAiForImpact, fetchTeamMembers, directus, imageUrl } from '~/utils/directus';

definePageMeta({ layout: 'light' });

const desc = 'Meet the faculty, co-ops, and fellows behind AI for Impact — a program at Northeastern University\'s Burnes Center for Social Change building AI tools for the public good.';

const { data: page } = await useAsyncData('our-team', fetchAiForImpact);

const ogImage = computed(() =>
  imageUrl(page.value?.team_image ?? page.value?.logo, 'hero') || '/images/og-image.png'
);

useSeoMeta({
  title: 'Meet the Team',
  ogTitle: 'Meet the Team | AI for Impact',
  description: desc,
  ogDescription: desc,
  ogUrl: useRequestURL().href,
  ogImage: () => ogImage.value,
  ogImageAlt: 'AI for Impact Team',
  twitterCard: 'summary_large_image',
  twitterTitle: 'Meet the Team | AI for Impact',
  twitterDescription: desc,
  twitterImage: () => ogImage.value,
});
const { data: team } = await useAsyncData('team-members', fetchTeamMembers);
const { data: newsData } = await useAsyncData(
  'bio-news',
  async () => {
    const res = await directus.request(
      readItems('team', {
        filter: { id: { _eq: 197 } },
        fields: ['bio_short_reboot'],
        limit: 1,
      })
    );

    return (res as any[])?.[0]?.bio_short_reboot || null;
  },
  { server: true }
);

const director = computed(() => team.value?.find((m: any) => m.id === 1));
const coops = computed(() =>
  team.value?.filter((m: any) => m.team_type?.includes('AI for Impact Coop')) ?? []
);
const faculty = computed(() =>
  team.value?.filter((m: any) => m.team_type?.includes('AI for Impact Team')) ?? []
);
const directorBio = computed(() => newsData.value || director.value?.description || '');
</script>

<template>
  <div v-if="page" class="our-team">
    <section class="our-team__hero">
      <div class="our-team__hero-content">
        <h1 class="our-team__title">
          <span class="our-team__title-our">Our</span>
          <br />
          <span class="our-team__title-team">Team</span>
        </h1>
        <div class="our-team__description" v-html="page.about_team" />
      </div>
    </section>

    <section v-if="director" class="director">
      <div class="director__content">
        <div class="director__image-wrapper">
          <UiDirectusImg
            v-if="director.image"
            :id="director.image"
            :alt="director.name"
            class="director__image"
            priority
          />
        </div>
        <div class="director__info">
          <h2 class="director__heading">About <em>our</em> director</h2>
          <div class="director__bio" v-html="directorBio" />
          <div class="director__button">
            <UiPrimaryButton
              href="https://rebootdemocracy.ai/bio#about-beth"
              variant="primary"
              icon="/images/arrow.svg"
            >
              Complete Bio
            </UiPrimaryButton>
          </div>
          <div class="director__socials">
            <a href="https://www.linkedin.com/in/bethnoveck" target="_blank" rel="noopener" class="director__social-link">
              <img src="/images/linkedin.svg" alt="LinkedIn" class="director__social-icon" />
              <span>@bethnoveck</span>
            </a>
            <a href="https://bsky.app/profile/bethnoveck.bsky.social" target="_blank" rel="noopener" class="director__social-link">
              <img src="/images/twitter.svg" alt="Bluesky" class="director__social-icon" />
              <span>@bethnoveck.bsky.social</span>
            </a>
            <a href="https://scholar.google.com/citations?user=3knFlCQAAAAJ&hl=en" target="_blank" rel="noopener" class="director__social-link">
              <img src="/images/gs.svg" alt="Google Scholar" class="director__social-icon" />
              <span>Google Scholar</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <section class="coops-section">
      <h2 class="coops-section__title">
        <span class="coops-section__co">Co</span><span class="coops-section__ops">-Ops</span>
      </h2>
      <div v-if="coops.length" class="coops-section__grid">
        <UiTeamCard v-for="member in coops" :key="member.id" :member="member" />
      </div>
    </section>

    <section class="faculty-section">
      <h2 class="faculty-section__title">
        <span class="faculty-section__faculty">Faculty</span> <span class="faculty-section__and">&</span> <span class="faculty-section__team">Team</span>
      </h2>
      <div v-if="faculty.length" class="faculty-section__grid">
        <UiTeamCard v-for="member in faculty" :key="member.id" :member="member" />
      </div>
    </section>
  </div>
</template>

<style scoped>
.our-team__hero {
  background-color: var(--color-cream);
  padding: 0 80px;
  height: 372px;
  display: flex;
  align-items: center;
}

.our-team__hero-content {
  max-width: var(--max-width);
  margin: 0 auto;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.our-team__title {
  margin: 0;
}

.our-team__title-our {
  font-family: var(--font-macro);
  font-weight: 500;
  font-style: italic;
  font-size: 130px;
  line-height: 80px;
  letter-spacing: 0;
  color: var(--color-primary);
}

.our-team__title-team {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 120px;
  line-height: 110px;
  letter-spacing: 0;
  color: var(--color-dark);
}

.our-team__description {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: 0;
  color: var(--color-dark);
}

.our-team__description :deep(p) {
  margin: 0;
}

.our-team__description :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.our-team__description :deep(a:hover) {
  color: var(--color-accent);
}

.director {
  background-color: var(--color-cream);
  padding: 0px 80px 40px 80px;
}

.director__content {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(260px, 380px) 1fr;
  gap: 60px;
  align-items: center;
}

.director__image-wrapper {
  position: relative;
  width: 100%;
  min-width: 0;
  max-width: 380px;
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-radius: 10px;
}

.director__image-wrapper :deep(.director__image) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: 10px;
}

.director__info {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.director__heading {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 32px;
  line-height: 40px;
  letter-spacing: 0;
  color: var(--color-dark);
  margin: 0;
}

.director__heading em {
  font-family: var(--font-text);
  font-weight: 600;
  font-style: italic;
  font-size: 38px;
  line-height: 40px;
  color: var(--color-primary);
}

.director__bio {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  letter-spacing: 0;
  color: var(--color-dark);
  max-width: 720px;
}

.director__bio :deep(p) {
  margin: 0;
}

.director__bio :deep(a) {
  color: var(--color-primary);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.director__bio :deep(a:hover) {
  color: var(--color-accent);
}

.director__socials {
  display: flex;
  gap: 30px;
  flex-wrap: wrap;
}

.director__button {
  width: fit-content;
}

.director__button :deep(.btn) {
  min-width: auto;
  height: auto;
  padding: 14px 22px;
}

.director__button :deep(.btn__text) {
  font-size: 18px;
  line-height: 24px;
}

.director__button :deep(.btn__icon) {
  width: 22px;
  height: 22px;
}

.director__social-link {
  display: flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 17px;
  line-height: 22px;
  color: var(--color-primary);
  text-decoration: none;
  transition: color 0.2s ease;
}

.director__social-link:hover {
  color: var(--color-accent);
}

.director__social-icon {
  width: 25px;
  height: 25px;
}

.coops-section {
  background-color: var(--color-cream);
  padding: 60px 80px 50px;
  gap: 10px;
}

.coops-section__title {
  max-width: var(--max-width);
  margin: 0 auto;
}

.coops-section__co {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 42px;
  line-height: 46px;
  letter-spacing: 0;
  color: var(--color-dark);
}

.coops-section__ops {
  font-family: var(--font-text);
  font-weight: 600;
  font-style: italic;
  font-size: 49px;
  line-height: 46px;
  letter-spacing: 0;
  color: var(--color-primary);
}

.coops-section__grid {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  gap: 40px;
  padding: 50px 0px;
}

.faculty-section {
  background: linear-gradient(180deg, #F8F6F1 92.87%, #CFDCF5 95.13%, #ABC5F9 96.87%, #6A9CFF 98.7%, #376BD1 100%);
  padding: 7px 80px 50px;
}

.faculty-section__title {
  max-width: var(--max-width);
  margin: 0 auto;
}

.faculty-section__faculty {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 42px;
  line-height: 46px;
  letter-spacing: 0;
  color: var(--color-dark);
}

.faculty-section__and {
  font-family: var(--font-text);
  font-weight: 600;
  font-style: italic;
  font-size: 49px;
  line-height: 46px;
  letter-spacing: 0;
  color: var(--color-primary);
}

.faculty-section__team {
  font-family: var(--font-text);
  font-weight: 600;
  font-style: italic;
  font-size: 49px;
  line-height: 46px;
  letter-spacing: 0;
  color: var(--color-primary);
}

.faculty-section__grid {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  justify-content: space-between;
  gap: 40px;
  padding: 50px 0px;
}

@media (max-width: 768px) {
  .our-team__hero {
    padding: 40px 20px;
  }

  .our-team__hero-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .our-team__title {
    margin-top: 50px;
  }

  .our-team__title-our {
    font-size: 70px;
    line-height: 50px;
  }

  .our-team__title-team {
    font-size: 64px;
    line-height: 60px;
  }

  .director {
    padding: 40px 20px;
  }

  .director__content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .director__heading {
    font-size: 32px;
    line-height: 38px;
  }

  .director__heading em {
    font-size: 38px;
    line-height: 38px;
  }

  .coops-section {
    padding: 40px 20px 30px;
  }

  .coops-section__grid {
    grid-template-columns: 1fr;
    gap: 20px;
    justify-items: center;
  }

  .faculty-section {
    padding: 40px 20px 30px;
  }

  .faculty-section__grid {
    grid-template-columns: 1fr;
    gap: 20px;
    justify-items: center;
  }

  .director__socials {
    flex-direction: column;
    gap: 16px;
  }
}
</style>
