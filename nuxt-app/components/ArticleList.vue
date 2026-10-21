<template>
  <section>
    <h2 class="section-title">Свежие материалы</h2>
    <p v-if="lastReaction" class="reaction">Последняя реакция: «{{ lastReaction }}»</p>
    <p v-else class="reaction">Отметьте материал кнопкой Like</p>
    <div class="feed">
      <ArticleCard
        v-for="article in articles"
        :key="article.slug"
        :article="article"
        @like="onLike"
      />
    </div>
  </section>
</template>

<script>
import ArticleCard from './ArticleCard.vue'

export default {
  name: 'ArticleList',
  components: { ArticleCard },
  props: {
    articles: {
      type: Array,
      required: true,
    },
  },
  emits: ['like'],
  data() {
    return {
      lastReaction: '',
    }
  },
  methods: {
    onLike(slug) {
      const article = this.articles.find((item) => item.slug === slug)
      if (article) {
        this.lastReaction = article.title
      }
      this.$emit('like', slug)
    },
  },
}
</script>

<style scoped>
.section-title {
  font-family: var(--font-serif);
  font-size: 28px;
  line-height: 34px;
  font-weight: 600;
  margin: 0 0 12px;
}

.reaction {
  margin: 0 0 20px;
  color: var(--ink-secondary);
  font-size: 14px;
  line-height: 22px;
}

.feed {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 24px;
}
</style>
