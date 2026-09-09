import { defineComponent } from "vue";
import logo from "./assets/svg/logo-light.svg";
import ArticleCard from "./components/ArticleCard.jsx";
import CommentInput from "./components/CommentInput.jsx";
import { articles } from "./data/articles.js";

export default defineComponent({
  name: "App",
  setup() {
    return () => (
      <div class="app">
        <header class="header">
          <div class="header-inner">
            <img class="logo" src={logo} alt="Folio" />
            <p class="kicker">Редакционный блог</p>
          </div>
        </header>
        <main class="main">
          <section class="hero">
            <p class="kicker" style={{ color: "var(--brand-primary)" }}>
              Лента
            </p>
            <h1>Folio</h1>
            <p class="lead">
              Длинные тексты, реакции и обсуждение. Карточки и поле комментария
              собраны как функциональные Vue-компоненты на JSX.
            </p>
          </section>
          <section>
            <h2 class="section-title">Свежие материалы</h2>
            <div class="feed">
              {articles.map((article) => (
                <ArticleCard
                  key={article.id}
                  title={article.title}
                  excerpt={article.excerpt}
                  author={article.author}
                  date={article.date}
                  readTime={article.readTime}
                  image={article.image}
                  imageAlt={article.imageAlt}
                  likes={article.likes}
                  comments={article.comments}
                />
              ))}
            </div>
          </section>
          <section class="discussion">
            <h2 class="section-title">Обсуждение</h2>
            <p class="discussion-lead">
              Текст комментария хранится в локальном состоянии CommentInput.
            </p>
            <CommentInput />
          </section>
        </main>
        <footer class="footer">
          <div class="footer-inner">Folio · лабораторная работа по Vue</div>
        </footer>
      </div>
    );
  },
});
