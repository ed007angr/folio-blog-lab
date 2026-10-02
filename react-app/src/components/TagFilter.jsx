import { useDispatch, useSelector } from 'react-redux'
import { setTag } from '../store/filterSlice'

export default function TagFilter() {
  const dispatch = useDispatch()
  const activeTag = useSelector((state) => state.filter.activeTag)
  const articles = useSelector((state) => state.articles.items)
  const tags = [...new Set(articles.flatMap((article) => article.tags))]

  return (
    <div className="tag-filter" role="group" aria-label="Фильтр по тегам">
      <button
        type="button"
        className={activeTag === null ? 'chip chip-active' : 'chip'}
        aria-pressed={activeTag === null}
        onClick={() => dispatch(setTag(null))}
      >
        Все
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          type="button"
          className={activeTag === tag ? 'chip chip-active' : 'chip'}
          aria-pressed={activeTag === tag}
          onClick={() => dispatch(setTag(tag))}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
