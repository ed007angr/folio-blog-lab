export default function ArticleCard({ article }) {
  return (
    <article className="card">
      <img className="card-image" src={article.imageUrl} alt={article.title} />
      <div className="card-body">
        <p className="card-tags">{article.tags.join(' · ')}</p>
        <h2>{article.title}</h2>
        <p className="preview">{article.previewText}</p>
        <p className="author">{article.author}</p>
      </div>
    </article>
  )
}
