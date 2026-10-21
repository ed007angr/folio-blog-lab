<template>
  <article v-if="article" class="post">
    <p class="kicker">Статья · SSG</p>
    <h1>{{ article.title }}</h1>
    <p class="meta">{{ article.author }} · {{ article.date }} · {{ article.readTime }}</p>
    <p class="stamp">
      HTML собран при сборке: <time :datetime="builtAt">{{ builtAt }}</time>
    </p>
    <img class="cover" :src="article.image" :alt="article.imageAlt" />
    <p v-for="(paragraph, index) in article.body" :key="index" class="body">
      {{ paragraph }}
    </p>
    <p class="back">
      <NuxtLink to="/">← К ленте</NuxtLink>
    </p>
    <CommentSection :comments="comments" @add-comment="addComment" />
  </article>
</template>

<script setup>
const route = useRoute()

const { data } = await useAsyncData(`post-${route.params.slug}`, () => {
  const article = getArticle(String(route.params.slug))
  if (!article) {
    throw createError({ statusCode: 404, statusMessage: 'Статья не найдена' })
  }
  return {
    article,
    builtAt: new Date().toISOString(),
  }
})

const article = computed(() => data.value?.article ?? null)
const builtAt = computed(() => data.value?.builtAt ?? '')

const comments = ref([
  { id: 1, author: 'Кирилл Мороз', text: 'Короткий лид держит карточку — открыл материал сразу.' },
])
let nextCommentId = 2

function addComment(text) {
  comments.value.push({
    id: nextCommentId,
    author: 'Вы',
    text,
  })
  nextCommentId += 1
}

useSeoMeta({
  title: () => article.value?.title ?? 'Folio',
  description: () => article.value?.excerpt ?? '',
})
</script>

<style scoped>
.post {
  max-width: 720px;
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
  font-size: clamp(32px, 5vw, 44px);
  line-height: 1.15;
  margin: 8px 0 12px;
}

.meta,
.stamp,
.body {
  color: var(--ink-secondary);
  font-size: 16px;
  line-height: 26px;
}

.stamp {
  font-size: 14px;
}

time {
  color: var(--ink-primary);
  font-weight: 600;
}

.cover {
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-radius: var(--radius-card);
  margin: 20px 0;
}

.body {
  margin: 0 0 16px;
  color: var(--ink-primary);
}

.back {
  margin: 8px 0 0;
}

.back a {
  color: var(--brand-primary);
  font-weight: 600;
}
</style>
