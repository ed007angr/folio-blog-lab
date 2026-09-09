import morning from "../assets/raster/article-morning.jpg";
import writing from "../assets/raster/article-writing.jpg";

export const articles = [
  {
    id: "morning-pages",
    title: "Утренние страницы: ритуал, который возвращает голос",
    excerpt:
      "Три страницы от руки до завтрака — не про продуктивность, а про то, чтобы услышать себя раньше ленты.",
    author: "Анна Волкова",
    date: "4 сентября",
    readTime: "8 мин",
    image: morning,
    imageAlt: "Тетрадь и чашка кофе на письменном столе",
    likes: 128,
    comments: 24,
  },
  {
    id: "when-you-dont-want-to-write",
    title: "Как писать, когда не хочется писать",
    excerpt:
      "Короткий лид статьи: две–три строки, чтобы карточка оставалась сканируемой, а заголовок держал ритм ленты.",
    author: "Пётр Лебедев",
    date: "1 сентября",
    readTime: "6 мин",
    image: writing,
    imageAlt: "Раскрытая тетрадь и перьевая ручка",
    likes: 86,
    comments: 11,
  },
];
