import { useSelector } from 'react-redux'
import ArticleCard from './ArticleCard'

export default function ArticleList() {
  const articles = useSelector((state) => state.articles.items)
  const activeTag = useSelector((state) => state.filter.activeTag)
  const visible = activeTag
    ? articles.filter((article) => article.tags.includes(activeTag))
    : articles

  return (
    <section className="feed" aria-live="polite">
      <p className="result-count">
        {activeTag ? `Тег «${activeTag}»` : 'Вся лента'}
        <span>
          {visible.length}{' '}
          {visible.length === 1 ? 'материал' : visible.length < 5 ? 'материала' : 'материалов'}
        </span>
      </p>
      {visible.length === 0 ? (
        <p className="empty">В этой рубрике пока нет материалов.</p>
      ) : (
        <ul className="article-list">
          {visible.map((article) => (
            <li key={article.id}>
              <ArticleCard article={article} />
            </li>
          ))}
        </ul>
      )}
    </section>
  )
}
