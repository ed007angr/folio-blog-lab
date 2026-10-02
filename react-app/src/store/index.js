import { configureStore } from '@reduxjs/toolkit'
import articlesReducer from './articlesSlice'
import filterReducer from './filterSlice'

export const store = configureStore({
  reducer: {
    articles: articlesReducer,
    filter: filterReducer,
  },
})
