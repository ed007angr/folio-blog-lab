<template>
  <section>
    <h2 class="section-title">Свежие материалы</h2>
    <p v-if="lastReaction" class="reaction">
      Последняя реакция: «{{ lastReaction }}»
    </p>
    <p v-else class="reaction">Отметьте материал кнопкой Like</p>
    <div class="feed">
      <ArticleCard
        v-for="article in articles"
        :key="article.id"
        :article="article"
        @like="onLike"
      />
    </div>
  </section>
</template>

<script>
import ArticleCard from "./ArticleCard.vue";
import { articles as articleSeeds } from "../data/articles.js";
import morning from "../assets/raster/article-morning.jpg";
import writing from "../assets/raster/article-writing.jpg";
import editing from "../../assets/raster/article-preview-master.jpg";

const covers = {
  morning,
  writing,
  editing,
};

export default {
  name: "ArticleList",
  components: {
    ArticleCard,
  },
  data() {
    return {
      articles: articleSeeds.map((item) => ({
        ...item,
        image: covers[item.cover],
      })),
      lastReaction: "",
    };
  },
  methods: {
    onLike(articleId) {
      const article = this.articles.find((item) => item.id === articleId);
      if (article) {
        this.lastReaction = article.title;
      }
    },
  },
};
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 360px));
  gap: 24px;
  margin-bottom: 40px;
}
</style>
