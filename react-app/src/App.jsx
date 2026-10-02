import logoLight from './assets/logo-light.svg'
import ArticleList from './components/ArticleList'
import TagFilter from './components/TagFilter'

export default function App() {
  return (
    <>
      <header className="header">
        <div className="header-inner">
          <img className="logo" src={logoLight} alt="Folio" />
          <p className="header-kicker">Редакционный блог</p>
        </div>
      </header>
      <main className="main">
        <section className="hero">
          <p className="kicker">Лента</p>
          <h1>Материалы редакции</h1>
          <p className="lead">
            Короткие тексты о письме, редактуре и утреннем ритуале. Тег в шапке ленты
            сужает подборку — список читает тот же срез хранилища, что и фильтр.
          </p>
        </section>
        <TagFilter />
        <ArticleList />
      </main>
      <footer className="footer">
        <div className="footer-inner">Folio · редакционный блог</div>
      </footer>
    </>
  )
}
