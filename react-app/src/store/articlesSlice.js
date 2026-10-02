import { createSlice } from '@reduxjs/toolkit'
import coverMorning from '../assets/covers/morning.svg?no-inline'
import coverLetter from '../assets/covers/letter.svg?no-inline'
import coverEditing from '../assets/covers/editing.svg?no-inline'
import coverNotes from '../assets/covers/notes.svg?no-inline'

const articlesSlice = createSlice({
  name: 'articles',
  initialState: {
    items: [
      {
        id: 'morning-pages',
        title: 'Утренние страницы: ритуал, который возвращает голос',
        author: 'Анна Волкова',
        previewText:
          'Три страницы от руки до завтрака — не про продуктивность, а про то, чтобы услышать себя раньше ленты.',
        imageUrl: coverMorning,
        tags: ['Ритуал', 'Письмо'],
      },
      {
        id: 'letter-to-the-draft',
        title: 'Письмо черновику: зачем оставлять первый абзац',
        author: 'Пётр Лебедев',
        previewText:
          'Первый абзац почти никогда не остаётся в номере. Он нужен автору, чтобы войти в текст, а не читателю.',
        imageUrl: coverLetter,
        tags: ['Письмо'],
      },
      {
        id: 'editing-aloud',
        title: 'Редактура как чтение вслух',
        author: 'Мария Соколова',
        previewText:
          'Один проход вслух снимает канцелярит лучше, чем три прохода глазами по экрану.',
        imageUrl: coverEditing,
        tags: ['Редактура', 'Письмо'],
      },
      {
        id: 'margin-notes',
        title: 'Заметки на полях: как не потерять мысль',
        author: 'Илья Кравцов',
        previewText:
          'Короткая помета карандашом держит нить лучше, чем закладка в браузере. Вечером эти поля и становятся следующим текстом.',
        imageUrl: coverNotes,
        tags: ['Ритуал', 'Редактура'],
      },
    ],
  },
  reducers: {},
})

export default articlesSlice.reducer
