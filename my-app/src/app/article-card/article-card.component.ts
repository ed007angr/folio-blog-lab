import { Component, Input } from '@angular/core';
import { Article } from '../services/articles.service';

@Component({
  selector: 'app-article-card',
  standalone: false,
  templateUrl: './article-card.component.html',
  styleUrl: './article-card.component.css',
})
export class ArticleCardComponent {
  @Input() article!: Article;
}
