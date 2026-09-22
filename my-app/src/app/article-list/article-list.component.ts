import { Component, OnInit } from '@angular/core';
import { Article, ArticlesService } from '../services/articles.service';

@Component({
  selector: 'app-article-list',
  standalone: false,
  templateUrl: './article-list.component.html',
  styleUrl: './article-list.component.css',
})
export class ArticleListComponent implements OnInit {
  articles: Article[] = [];

  constructor(private articlesService: ArticlesService) {}

  ngOnInit(): void {
    this.articles = this.articlesService.getData();
  }
}
