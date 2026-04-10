<template>
  <Teleport to="body">
    <Transition name="modal">
      <div
        v-if="visible"
        class="modal-backdrop"
        @click.self="close"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div class="modal">
          <button class="modal__close" type="button" @click="close" aria-label="Close">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round" />
            </svg>
          </button>

          <!-- Content area: 40px padding sides, 40px gaps between sections -->
          <div class="modal__content">
            <div v-if="modal.pill_text" class="modal__pill-badge">
              {{ modal.pill_text }}
            </div>

            <div id="modal-title" class="modal__title" v-html="modal.title" />

            <div class="modal__description" v-html="modal.description" />

            <div v-if="parsedTags.length" class="modal__tags">
              <span v-for="tag in parsedTags" :key="tag" class="modal__tag">{{ tag }}</span>
            </div>
          </div>

          <!-- Footer: 20px padding top/bottom, button centered -->
          <div class="modal__footer">
            <a
              v-if="modal.button_url && modal.button_text"
              :href="modal.button_url"
              target="_blank"
              rel="noopener"
              class="modal__btn"
            >
              {{ modal.button_text }}
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M3.75 14.25L14.25 3.75M14.25 3.75H7.5M14.25 3.75V10.5"
                  stroke="currentColor"
                  stroke-width="1.75"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import type { AiForImpactModal } from '~/types/ai-for-impact-modal';

const props = defineProps<{ modal: AiForImpactModal }>();

const visible = ref(false);

function dismissStorageKey() {
  return `ai-for-impact-enroll-modal:${props.modal.id}`;
}

function visibilityMode() {
  const v = props.modal.visibility;
  if (v === true) return 'always';
  return String(v ?? '').trim().toLowerCase();
}

function readOnceDismissed(): boolean {
  if (!import.meta.client) return false;
  try {
    return Boolean(localStorage.getItem(dismissStorageKey()));
  } catch {
    return false;
  }
}

function writeOnceDismissed() {
  if (!import.meta.client) return;
  try {
    localStorage.setItem(dismissStorageKey(), '1');
  } catch {
  }
}

function close() {
  visible.value = false;
  if (visibilityMode() === 'once') writeOnceDismissed();
}

const parsedTags = computed<string[]>(() => {
  const raw = props.modal.pill_tags;
  if (!raw) return [];
  const normalize = (items: unknown[]): string[] =>
    items.map((item) => {
      if (typeof item === 'string') return item;
      if (item && typeof item === 'object' && 'tag_name' in item) {
        return String((item as { tag_name: string }).tag_name);
      }
      return String(item);
    });
  if (Array.isArray(raw)) return normalize(raw as unknown[]);
  try {
    const parsed = JSON.parse(raw as string) as unknown;
    return Array.isArray(parsed) ? normalize(parsed) : [];
  } catch {
    return [];
  }
});

function onKeydown(e: KeyboardEvent) {
  if (e.key === 'Escape') close();
}

onMounted(() => {
  const mode = visibilityMode();
  if (mode === 'once' && readOnceDismissed()) {
  } else if (mode === 'always' || mode === 'once') {
    visible.value = true;
  }
  window.addEventListener('keydown', onKeydown);
});

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown);
});
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  inset: 0;
  background: rgba(15, 25, 45, 0.6);
  z-index: 10050;
  overflow-x: hidden;
  overflow-y: auto;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.modal {
  position: relative;
  display: flex;
  width: min(800px, 100%);
  max-width: 100%;
  padding: 20px;
  flex-direction: column;
  align-items: flex-start;
  margin: auto;

  border-radius: 40px;
  background: var(--white, #F8F6F1);
  box-shadow: 0 8px 12px 6px rgba(0, 0, 0, 0.15), 0 4px 4px 0 rgba(0, 0, 0, 0.30);
}

.modal__close {
  position: absolute;
  top: 22px;
  right: 22px;
  background: none;
  border: none;
  color: var(--color-primary, #376bd1);
  cursor: pointer;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s;
}

.modal__close:hover {
  opacity: 0.7;
}

.modal__content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  align-self: stretch;
  padding: 0 40px;
  gap: 40px;
}

.modal__pill-badge {
  display: flex;
  padding: 10px 20px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  border: 1px solid var(--color-primary, #376bd1);
  width: fit-content;

  color: var(--color-primary, #376bd1);
  font-family: var(--font-sans);
  font-size: 16px;
  font-style: normal;
  font-weight: 600;
  line-height: 30px;
  letter-spacing: 0.32px;
  text-transform: uppercase;
}

.modal__title {
  margin: 0;
}

.modal__title :deep(h2:first-child) {
  color: var(--color-dark, #1f2d45);
  font-family: var(--font-sans);
  font-size: 32px;
  font-style: normal;
  font-weight: 400;
  line-height: 40px;
  margin: 0;
}

.modal__title :deep(h2:first-child em),
.modal__title :deep(h2:first-child i) {
  color: var(--color-primary, #376bd1);
  font-family: var(--font-macro);
  font-size: 32px;
  font-style: italic;
  font-weight: 500;
  line-height: 40px;
}

.modal__title :deep(h2:last-child) {
  color: var(--blue, #376BD1);
  font-family: "Public Sans";
  font-size: 20px;
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: 0.4px;
  text-transform: uppercase;
  margin: 4px 0 0;
}

.modal__description {
  color: var(--color-dark, #1f2d45);
  font-family: var(--font-sans);
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
  margin: 0;
}

.modal__description :deep(p) {
  margin: 0 0 12px;
}

.modal__description :deep(p:last-child) {
  margin-bottom: 0;
}

.modal__tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0;
}

.modal__tag {
  display: flex;
  padding: 10px 15px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 10px;
  background: rgba(157, 190, 255, 0.3);

  color: var(--color-primary, #376bd1);
  font-family: var(--font-sans);
  font-size: 17px;
  font-style: normal;
  font-weight: 400;
  line-height: 22px;
}

.modal__footer {
  display: flex;
  padding: 20px 0;
  justify-content: center;
  align-items: center;
  align-self: stretch;
}

.modal__btn {
  display: flex;
  padding: 20px 40px;
  align-items: center;
  gap: 10px;
  border-radius: 100px;
  background: var(--color-primary, #376bd1);
  text-decoration: none;
  transition: background-color 0.2s;

  color: var(--color-cream, #f8f6f1);
  font-family: var(--font-sans);
  font-size: 22px;
  font-style: normal;
  font-weight: 400;
  line-height: 30px;
}

.modal__btn:hover {
  background: #2a5ab8;
}

.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

@media (max-width: 600px) {
  .modal__content {
    padding: 0 20px;
    gap: 24px;
  }

  .modal__title :deep(h2:first-child) {
    font-size: 26px;
    line-height: 34px;
  }

  .modal__title :deep(h2:first-child em),
  .modal__title :deep(h2:first-child i) {
    font-size: 26px;
    line-height: 34px;
  }
}
</style>
