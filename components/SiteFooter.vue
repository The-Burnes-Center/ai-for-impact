<script setup>
import { createDirectus, rest, readItem } from '@directus/sdk';

const API_URL = 'https://directus.theburnescenter.org';
const directus = createDirectus(API_URL).with(rest());

const { data: site } = useAsyncData('footer-data', () =>
  directus.request(
    readItem('ai_for_impact', 1, {
      fields: ['latest_report'],
    })
  )
);

const reportUrl = computed(() =>
  site.value?.latest_report ? `${API_URL}/assets/${site.value.latest_report}` : null
);
</script>

<template>
  <footer class="footer">
    <div class="footer__main">
      <div class="footer__left">
        <p class="footer__text">
          Interested in learning more or developing an AI for Impact
          product? Reach out to David Fields at
          <a href="mailto:d.fields@northeastern.edu" class="footer__email">d.fields@northeastern.edu</a>
        </p>
        <UiPrimaryButton
          v-if="reportUrl"
          :href="reportUrl"
          variant="cream"
          icon="/images/arrow-down.svg"
          min-width="auto"
        >
          Download our latest report
        </UiPrimaryButton>
      </div>

      <div class="footer__right">
        <span class="footer__label">This is a partner project of:</span>
        <div class="footer__logos">
          <a href="https://innovate-us.org" target="_blank" rel="noopener">
            <img src="/images/innovateus.svg" alt="InnovateUS" class="footer__logo" />
          </a>
          <a href="https://burnes.northeastern.edu/" target="_blank" rel="noopener">
            <img src="/images/burnes-logo-negative.svg" alt="Burnes Center for Social Change" class="footer__logo" />
          </a>
          <a href="https://rebootdemocracy.ai" target="_blank" rel="noopener">
            <img src="/images/reboot.svg" alt="Reboot Democracy" class="footer__logo" />
          </a>
          <a href="https://thegovlab.org" target="_blank" rel="noopener">
            <img src="/images/govlab-negative.svg" alt="The GovLab" class="footer__logo" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background-color: var(--color-dark);
}

.footer__main {
  max-width: var(--max-width);
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 80px;
  padding: 80px;
}

.footer__left {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 40px;
}

.footer__text {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 18px;
  line-height: 24px;
  letter-spacing: 0;
  color: var(--color-cream);
  margin: 0;
}

.footer__email {
  color: var(--color-cream);
  text-decoration: underline;
  text-underline-offset: 3px;
}

.footer__email:hover {
  color: var(--color-white);
}

.footer__right {
  display: flex;
  flex-direction: column;
  gap: 60px;
}

.footer__label {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 18px;
  line-height: 26px;
  color: var(--color-cream);
}

.footer__logos {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
  align-items: center;
}

.footer__logo {
  width: 197px;
  height: 50px;
  object-fit: contain;
}

@media (max-width: 768px) {
  .footer__main {
    grid-template-columns: 1fr;
    gap: 40px;
    padding: 40px 1.5rem;
  }

  .footer__logos {
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  .footer__logo {
    height: 40px;
  }
}
</style>
