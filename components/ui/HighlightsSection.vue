<script setup lang="ts">
import type { Project, RebootBlogPost } from '~/models';
import {
  fetchAiForImpact,
  fetchRebootBlogAiForImpact,
  filterPublished,
  rebootBlogPostUrl,
} from '~/utils/directus';

const props = withDefaults(defineProps<{
  showButton?: boolean;
}>(), { showButton: true });

const { data: page } = await useAsyncData('highlights-data', fetchAiForImpact);
const highlights = computed(() => filterPublished(page.value?.highlights, 'ai_for_impact_highlights_id'));

const REBOOT_BLOG_LIMIT = 3;

const rebootBlogPosts = ref<RebootBlogPost[]>([]);

onMounted(async () => {
  try {
    const rows = await fetchRebootBlogAiForImpact(REBOOT_BLOG_LIMIT);
    rebootBlogPosts.value = (rows ?? []).slice(0, REBOOT_BLOG_LIMIT) as RebootBlogPost[];
  } catch {
    rebootBlogPosts.value = [];
  }
});

function blogToProject(post: RebootBlogPost): Project {
  return {
    id: post.id,
    slug: post.slug,
    status: 'published',
    project_image: post.image,
    project_title: post.title,
    project_description: '',
    subtitle: post.one_line ? `<p>${post.one_line}</p>` : '',
    authors: '',
    repo_link: '',
  };
}
</script>

<template>
  <div v-if="highlights.length || rebootBlogPosts.length" class="highlights-block">
    <section v-if="highlights.length" class="highlights-section">
      <div class="highlights-section__content">
        <UiHighlightsCarousel :highlights="highlights" />
        <div v-if="props.showButton" class="highlights-section__action">
          <UiPrimaryButton to="/product" variant="primary" icon="/images/arrow-right.svg" min-width="298px">Explore all projects</UiPrimaryButton>
        </div>
      </div>
    </section>

    <section v-if="rebootBlogPosts.length" class="latest-news">
      <div class="latest-news__inner">
        <h2 class="latest-news__heading">Latest News</h2>
        <div class="latest-news__grid">
          <UiProjectCard
            v-for="post in rebootBlogPosts"
            :key="'blog-' + post.id"
            :project="blogToProject(post)"
            :external-href="rebootBlogPostUrl(post)"
            open-in-new-tab
            hide-description
          />
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
.highlights-block {
  margin-top: 80px;
  border-bottom: 1.5px solid rgba(31, 45, 69, 0.15);
}

.highlights-section {
  background-color: var(--color-cream);
  padding: 100px 80px 0;
}

.highlights-section__content {
  max-width: var(--max-width);
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 60px;
  padding-bottom: 60px;
}

.latest-news {
  background-color: var(--color-dark);
  width: 100%;
  margin: 0;
  padding: 60px clamp(20px, 4vw, 80px) 70px;
  box-sizing: border-box;
}

.latest-news__inner {
  container-type: inline-size;
  max-width: var(--max-width);
  margin: 0 auto;
}

.latest-news__heading {
  font-family: var(--font-sans);
  font-weight: 700;
  font-size: 32px;
  line-height: 1.2;
  color: var(--color-white);
  margin: 0 0 2rem;
}

.latest-news__grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 380px));
  gap: 1rem;
  justify-content: center;
  align-items: stretch;
}

.latest-news__grid :deep(.card) {
  width: 100%;
  max-width: 380px;
  justify-self: center;
}

@media (max-width: 1024px) {
  .latest-news__grid {
    grid-template-columns: repeat(2, minmax(0, 380px));
  }
}

@media (max-width: 768px) {
  .highlights-section {
    padding: 40px 1.5rem 0;
  }

  .latest-news {
    padding: 40px 1.5rem 48px;
  }

  .latest-news__grid {
    grid-template-columns: 1fr;
  }
}
</style>
