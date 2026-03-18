<script setup>
const isOpen = ref(false);
</script>

<template>
  <div class="banner">
    <!-- Desktop view -->
    <div class="banner__desktop">
      <span class="banner__label">This is a partner project of:</span>
      <a href="https://innovate-us.org" target="_blank" rel="noopener" class="banner__link">
        <img src="/images/arrow.svg" alt="" class="banner__icon" />
        InnovateUS
      </a>
      <a href="https://www.theburnescenter.org" target="_blank" rel="noopener" class="banner__link">
        <img src="/images/arrow.svg" alt="" class="banner__icon" />
        The Burnes Center for Social Change
      </a>
      <a href="https://rebootdemocracy.ai" target="_blank" rel="noopener" class="banner__link">
        <img src="/images/arrow.svg" alt="" class="banner__icon" />
        Reboot Democracy
      </a>
      <a href="https://thegovlab.org" target="_blank" rel="noopener" class="banner__link">
        <img src="/images/arrow.svg" alt="" class="banner__icon" />
        The Gov Lab
      </a>
    </div>

    <!-- Mobile view -->
    <div class="banner__mobile">
      <button class="banner__toggle" @click="isOpen = !isOpen">
        <span class="banner__label">This is a partner project of:</span>
        <img
          src="/images/arrow-down.svg"
          alt=""
          class="banner__arrow"
          :class="{ 'banner__arrow--open': isOpen }"
        />
      </button>
      <div v-if="isOpen" class="banner__dropdown">
        <a href="https://innovate-us.org" target="_blank" rel="noopener" class="banner__link">
          <img src="/images/arrow.svg" alt="" class="banner__icon" />
          InnovateUS
        </a>
        <a href="https://www.theburnescenter.org" target="_blank" rel="noopener" class="banner__link">
          <img src="/images/arrow.svg" alt="" class="banner__icon" />
          The Burnes Center
        </a>
        <a href="https://rebootdemocracy.ai" target="_blank" rel="noopener" class="banner__link">
          <img src="/images/arrow.svg" alt="" class="banner__icon" />
          Reboot Democracy
        </a>
        <a href="https://thegovlab.org" target="_blank" rel="noopener" class="banner__link">
          <img src="/images/arrow.svg" alt="" class="banner__icon" />
          The Gov Lab
        </a>
      </div>
    </div>
  </div>
</template>

<style scoped>
.banner {
  width: 100%;
  background-color: var(--color-primary);
  border-bottom: 1.5px solid rgba(255, 255, 255, 0.2);
}

.banner__desktop {
  height: 45px;
  padding: 0 80px;
  display: flex;
  align-items: center;
  gap: 40px;
}

.banner__mobile {
  display: none;
}

.banner__label {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  color: var(--color-white);
  white-space: nowrap;
}

.banner__link {
  font-family: var(--font-sans);
  font-weight: 400;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0;
  color: var(--color-cream);
  display: flex;
  align-items: center;
  gap: 12px;
  white-space: nowrap;
  text-decoration: none;
}

.banner__link:hover {
  opacity: 0.8;
  color: var(--color-white);
}

.banner__icon {
  width: 17.67px;
  height: auto;
  flex-shrink: 0;
}

.banner__toggle {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px 1.5rem;
  background: none;
  border: none;
  cursor: pointer;
}

.banner__arrow {
  width: 16px;
  height: 16px;
  filter: brightness(0) invert(1);
  transition: transform 0.3s ease;
}

.banner__arrow--open {
  transform: rotate(180deg);
}

.banner__dropdown {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 1.5rem 16px;
  animation: slideDown 0.3s ease;
}

@keyframes slideDown {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .banner__desktop {
    display: none;
  }

  .banner__mobile {
    display: block;
  }
}
</style>
