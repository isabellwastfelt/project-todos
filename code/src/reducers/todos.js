import { createSlice } from '@reduxjs/toolkit'
import uniqid from 'uniqid'
import moment from 'moment'

const initialState = {
  items: [],
}

const todos = createSlice({
  name: 'todos',
  initialState: {
    items: [],
  },
  reducers: {
    addTodo: (store, action) => {
      const newTodo = {
        id: uniqid(),
        text: action.payload,
        isComplete: false,
        timePosted: moment().format('DD MMMM YYYY, HH:mm'),
      }
      store.items = [...store.items, newTodo]
    },

    deleteAll: () => {
      return initialState
    },

    toggleTodo: (store, action) => {
      const updatedItem = store.items.map((item) => {
        if (item.id === action.payload) {
          const updatedTodo = {
            ...item,
            isComplete: !item.isComplete,
          }
          return updatedTodo
        } else {
          return item
        }
      })
      store.items = updatedItem
    },

    clearAllTasks: (store) => {
      const clearAll = store.items.map((task) => {
        if (task.isComplete) {
          return { ...task }
        } else
          return {
            ...task,
            isComplete: !task.isComplete,
          }
      })
      store.items = clearAll
    },
    deleteTodo: (store, action) => {
      store.items.splice(action.payload, 1)
    },
  },
})

export default todos
