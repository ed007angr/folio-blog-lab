<template>
  <div class="app">
    <header class="header">
      <div class="header-inner">
        <NuxtLink to="/" class="logo-link">
          <img class="logo" src="/icons/logo-light.svg" alt="Folio" />
        </NuxtLink>
        <p class="kicker">Редакционный блог</p>
      </div>
    </header>
    <main class="main">
      <slot />
    </main>
    <footer class="footer">
      <div class="footer-inner">Folio · Nuxt, главная на сервере, статьи статически</div>
    </footer>
  </div>
</template>

<style scoped>
.app {
  min-height: 100vh;
}

.header {
  background: var(--brand-primary);
  color: var(--paper);
}

.header-inner,
.main,
.footer-inner {
  width: min(1120px, calc(100% - 32px));
  margin: 0 auto;
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 0;
}

.logo {
  display: block;
  height: 32px;
  width: auto;
}

.kicker {
  margin: 0;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  color: #d7e6e4;
}

.main {
  padding: 40px 0 72px;
}

.footer {
  border-top: 1px solid var(--line);
  padding: 24px 0 40px;
  color: var(--ink-muted);
  font-size: 13px;
}
</style>
