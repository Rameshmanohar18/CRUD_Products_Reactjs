import { createSlice } from "@reduxjs/toolkit"
import { loadState, saveState } from "../../Utils/localStorage"

const initialState = loadState("categories")

const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {

    addCategory: (state, action) => {
      const newCategory = {
        id: Date.now().toString(),
        name: action.payload
      }

      state.push(newCategory)

      saveState("categories", state)
    },

    deleteCategory: (state, action) => {

      const updated = state.filter(c => c.id !== action.payload)

      saveState("categories", updated)

      return updated
    },

    updateCategory: (state, action) => {

      const { id, name } = action.payload

      const cat = state.find(c => c.id === id)

      if (cat) {
        cat.name = name
      }

      saveState("categories", state)
    }

  }
})

export const {
  addCategory,
  deleteCategory,
  updateCategory
} = categorySlice.actions

export default categorySlice.reducer