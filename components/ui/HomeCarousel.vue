<script setup lang="ts">
import type { Project } from '~/models';


const props = defineProps<{
  projects: Project[];
}>();

const activeIndex = ref(0);

const next = () => {
  activeIndex.value = (activeIndex.value + 1) % props.projects.length;
};

const prev = () => {
  activeIndex.value =
    (activeIndex.value - 1 + props.projects.length) % props.projects.length;
};

function setSlide(index: number) {
  activeIndex.value = index;
}

</script>

<template>
    <div class = "carousel">
        <button class="carousel__arrow carousel__arrow--left" @click="prev" aria-label="Previous project">
            <img src="/images/arrow-left.svg" alt="" class="carousel__arrow-icon" />
      </button>

      <div class="carousel__stage">
        <div v-for="(project, index) in projects"
        :key="project.id"
        class="carousel__slide"
        :class="{ 'carousel__slide--active': index === activeIndex }"
        >
        <div class="carousel__image-wrapper">
            <UiDirectusImg
              v-if="project.project_image"
              :id="project.project_image"
              alt="Project Image"
              class="carousel__image"
            />
        </div>
        <div class="carousel__text">
            <h2 class="carousel__title">{{ project.project_title }}</h2>
            <div class="carousel__subtitle" v-html="project.subtitle" />
            <div class="carousel__desc" v-html="project.project_description" />
        </div>
    </div>

    <div class="carousel__dots">
        <button v-for="(_, index) in projects" 
        :key="index"
        class="carousel__dot"
        :class="{ 'carousel__dot--active': index === activeIndex }"
        @click="setSlide(index)"
        :aria-label="`Go to project ${index + 1}`"
        />
    </div>
      </div>
      <button class="carousel__arrow carousel__arrow--right" @click="next" aria-label="Next project">
  <img src="/images/arrow-right.svg" alt="" class="carousel__arrow-icon" />
</button>

    </div>

</template>

<style scoped>
.carousel {
  display: flex;
  align-items: flex-start;
  gap: 20px;
  width: 100%;
}

.carousel__arrow {
  background: none;
  border: none;
  cursor: pointer;
  padding: 10px;
  flex-shrink: 0;
  transition: filter 0.3s ease;
  margin-top: 150px;
}

.carousel__arrow:hover {
  filter: brightness(0) saturate(100%) invert(62%) sepia(52%) saturate(1041%) hue-rotate(193deg) brightness(102%) contrast(101%);
}

.carousel__arrow-icon {
  width: 24px;
  height: 24px;
}

.carousel__stage {
  flex: 1;
  border-radius: 8px;
  overflow: hidden;
}

.carousel__slide {
  display: none;
  grid-template-columns: 532px 1fr;
  gap: 40px;
  align-items: center;
  overflow: hidden;
}

.carousel__slide--active {
  display: grid;
  animation: fadeIn 0.4s ease;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

.carousel__image-wrapper {
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  border-radius: 10px;
  overflow: hidden;
  background-color: var(--color-dark);
}

.carousel__image-wrapper :deep(.carousel__image) {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  object-fit: cover;
  object-position: top center;
}

.carousel__text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 10px;
  width: 100%;
  min-width: 0;
  overflow: hidden;
}

.carousel__title {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 42px;
  line-height: 46px;
  letter-spacing: 0;
  color: var(--color-cream);
  margin: 0;
}

.carousel__subtitle {
  font-family: var(--font-text);
  font-weight: 400;
  font-style: italic;
  font-size: 30px;
  line-height: 32px;
  letter-spacing: 0;
  color: var(--color-accent);
}

.carousel__subtitle :deep(p) {
  margin: 0;
}

.carousel__desc {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 22px;
  line-height: 30px;
  letter-spacing: 0;
  color: var(--color-cream);
  overflow-wrap: break-word;
  word-break: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.carousel__desc :deep(p) {
  margin: 10px 0px;
}

.carousel__dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  padding: 50px 0px 20px 0px;
}

.carousel__dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: 1.5px solid var(--color-primary);
  background: var(--color-primary);
  cursor: pointer;
  padding: 0;
  transition: background-color 0.3s ease;
}

.carousel__dot--active {
  background-color: var(--color-cream);
}

.carousel__dot:hover {
  background-color: var(--color-accent);
  opacity: 0.7;
}

@media (max-width: 768px) {
  .carousel {
    gap: 10px;
  }

  .carousel__arrow {
    padding: 5px;
    margin-top: 200px;
  }

  .carousel__arrow-icon {
    width: 18px;
    height: 18px;
  }

  .carousel__slide {
    grid-template-columns: 1fr;
    gap: 20px 10px;
    height: auto;
    padding: 10px 2px;
  }

  .carousel__image-wrapper {
    aspect-ratio: 4 / 3;
    box-shadow: none;
  }

  .carousel__desc {
    line-height: 28px;
    -webkit-line-clamp: 8;
  }

  .carousel__dots {
    padding: 15px 0;
  }

  .carousel__dot {
    width: 8px;
    height: 8px;
  }
}
</style>