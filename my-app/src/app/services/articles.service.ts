import { Injectable } from '@angular/core';

export interface Article {
  id: number;
  title: string;
  author: string;
  previewText: string;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root',
})
export class ArticlesService {
  getData(): Article[] {
    return [
      {
        id: 1,
        title: 'Утренние страницы: ритуал, который возвращает голос',
        author: 'Анна Волкова',
        previewText:
          'Три страницы от руки до завтрака — не про продуктивность, а про то, чтобы услышать себя раньше ленты.',
        imageUrl: 'assets/raster/article-morning.jpg',
      },
      {
        id: 2,
        title: 'Как писать, когда не хочется писать',
        author: 'Пётр Лебедев',
        previewText:
          'Короткий лид статьи: две–три строки, чтобы карточка оставалась сканируемой, а заголовок держал ритм ленты.',
        imageUrl: 'assets/raster/article-writing.jpg',
      },
      {
        id: 3,
        title: 'Редактура как чтение вслух',
        author: 'Мария Соколова',
        previewText:
          'Один проход вслух снимает канцелярит лучше, чем три прохода глазами по экрану. Карточка держит только этот лид.',
        imageUrl: 'assets/raster/article-preview-master.jpg',
      },
    ];
  }
}
