import { createSlice } from '@reduxjs/toolkit'

const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    activeTag: null,
  },
  reducers: {
    setTag(state, action) {
      state.activeTag = action.payload
    },
  },
})

export const { setTag } = filterSlice.actions
export default filterSlice.reducer
