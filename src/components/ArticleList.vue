<template>
  <section>
    <BContainer>
      <h2 class="folio-serif h3 mb-2">Свежие материалы</h2>
      <p v-if="lastReaction" class="text-secondary mb-3">
        Последняя реакция: «{{ lastReaction }}»
      </p>
      <p v-else class="text-secondary mb-3">Отметьте материал кнопкой Like</p>
    </BContainer>
    <BContainer>
      <BRow class="g-4">
        <BCol
          v-for="article in articles"
          :key="article.id"
          cols="12"
          md="6"
          lg="4"
          class="d-flex"
        >
          <ArticleCard class="w-100" :article="article" @like="onLike" />
        </BCol>
      </BRow>
    </BContainer>
  </section>
</template>

<script>
import { BCol, BContainer, BRow } from "bootstrap-vue-next";
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
    BContainer,
    BRow,
    BCol,
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
