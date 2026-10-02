<template>
  <div class="app">
    <header class="header">
      <div class="header-inner">
        <img class="logo" :src="logoUrl" alt="Folio" />
        <p class="kicker">Редакционный блог</p>
      </div>
    </header>
    <main class="main">
      <section class="hero">
        <p class="kicker kicker-brand">Лента</p>
        <h1>Folio</h1>
        <p class="lead">
          Длинные тексты, реакции и обсуждение. Карточки и комментарии собраны
          как однофайловые компоненты Vue.
        </p>
      </section>
      <ArticleList />
      <CommentSection :comments="comments" @add-comment="addComment" />
    </main>
    <footer class="footer">
      <div class="footer-inner">Folio · лабораторная работа по Vue</div>
    </footer>
  </div>
</template>

<script>
import ArticleList from "./components/ArticleList.vue";
import CommentSection from "./components/CommentSection.vue";
import logoUrl from "./assets/svg/logo-light.svg";

export default {
  name: "App",
  components: {
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

.kicker-brand {
  color: var(--brand-primary);
}

.main {
  padding: 40px 0 72px;
}

.hero {
  margin-bottom: 32px;
}

.hero h1 {
  font-family: var(--font-serif);
  font-size: clamp(32px, 5vw, 48px);
  line-height: 1.1;
  margin: 8px 0 12px;
}

.lead {
  margin: 0;
  max-width: 640px;
  color: var(--ink-secondary);
  font-size: 16px;
  line-height: 24px;
}

.footer {
  border-top: 1px solid var(--line);
  padding: 24px 0 40px;
  color: var(--ink-muted);
  font-size: 13px;
}
</style>
