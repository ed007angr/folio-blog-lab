<template>
  <div class="app">
    <header class="folio-nav">
      <BContainer class="d-flex align-items-center justify-content-between py-3">
        <img class="folio-logo" :src="logoUrl" alt="Folio" />
        <p class="mb-0 text-uppercase small fw-semibold folio-kicker">Редакционный блог</p>
      </BContainer>
    </header>
    <main class="py-4 py-lg-5">
      <BContainer>
        <section class="mb-4 mb-lg-5">
          <p class="mb-2 text-uppercase small fw-semibold folio-kicker-brand">Лента</p>
          <h1 class="folio-serif display-5 mb-3">Folio</h1>
          <p class="lead fs-6 text-secondary mb-0 col-lg-8">
            Длинные тексты, реакции и обсуждение. Карточки и комментарии собраны
            как однофайловые компоненты Vue и оформлены Bootstrap.
          </p>
        </section>
      </BContainer>
      <ArticleList />
      <BContainer class="mt-4 mt-lg-5">
        <CommentSection :comments="comments" @add-comment="addComment" />
      </BContainer>
    </main>
    <footer class="border-top">
      <BContainer class="py-4 text-secondary small">Folio · лабораторная работа по Vue</BContainer>
    </footer>
  </div>
</template>

<script>
import { BContainer } from "bootstrap-vue-next";
import ArticleList from "./components/ArticleList.vue";
import CommentSection from "./components/CommentSection.vue";
import logoUrl from "./assets/svg/logo-light.svg";

export default {
  name: "App",
  components: {
    BContainer,
    ArticleList,
    CommentSection,
  },
  data() {
    return {
      logoUrl,
      nextCommentId: 3,
      comments: [
        {
          id: 1,
          author: "Кирилл Мороз",
          text: "Три страницы до завтрака звучат выполнимо — попробую с понедельника.",
        },
        {
          id: 2,
          author: "Елена Брик",
          text: "Лид карточки и правда держит ритм: две строки, и уже хочется открыть текст.",
        },
      ],
    };
  },
  methods: {
    addComment(text) {
      this.comments.push({
        id: this.nextCommentId,
        author: "Вы",
        text,
      });
      this.nextCommentId += 1;
    },
  },
};
</script>

<style scoped>
.folio-logo {
  display: block;
  height: 32px;
  width: auto;
}

.folio-kicker {
  letter-spacing: 0.14em;
  color: #d7e6e4;
}

.folio-kicker-brand {
  letter-spacing: 0.14em;
  color: var(--folio-green);
}
</style>
