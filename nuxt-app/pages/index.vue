<template>
  <div>
    <section class="hero">
      <p class="kicker">Лента · SSR</p>
      <h1>Folio</h1>
      <p class="lead">
        Главная страница собирается на сервере при каждом запросе, чтобы в ленте
        были самые свежие публикации.
      </p>
      <p class="stamp">
        Сгенерировано на сервере: <time :datetime="generatedAt">{{ generatedAt }}</time>
      </p>
    </section>
    <ArticleList :articles="articles" />
  </div>
</template>

<script setup>
const { data } = await useAsyncData('folio-home', () => {
  return {
    generatedAt: new Date().toISOString(),
    articles: getArticles(),
  }
})

const generatedAt = computed(() => data.value?.generatedAt ?? '')
const articles = computed(() => data.value?.articles ?? [])

useSeoMeta({
  title: 'Folio — свежие материалы',
  description: 'Главная страница редакционного блога Folio, собранная на сервере.',
})
</script>

<style scoped>
.hero {
  margin-bottom: 32px;
}

.kicker {
  margin: 0;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600;
  color: var(--brand-primary);
}

h1 {
  font-family: var(--font-serif);
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1.1;
  margin: 8px 0 12px;
}

.lead,
.stamp {
  margin: 0;
  max-width: 640px;
  color: var(--ink-secondary);
  font-size: 16px;
  line-height: 24px;
}

.stamp {
  margin-top: 12px;
  font-size: 14px;
}

time {
  color: var(--ink-primary);
  font-weight: 600;
}
</style>
