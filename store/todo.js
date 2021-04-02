import { fetchTodos, create, edit, remove } from '@/api/todo/todo'

export const state = () => ({
  todo: [],
})

export const mutations = {
  GET_TODO(state, args) {
    state.todo = args.content.data.results
  },
  POST_TODO(state, args) {
    state.todo = [...state.todo, args.content.data]
  },
  EDIT_TODO(state, args) {
    const todos = [...state.todo]
    const todo = args.content.data
    for (let i = 0; i < todos.length; i += 1) {
      if (todos[i].id === todo.id) todos[i] = todo
    }
    state.todo = [...todos]
  },
  REMOVE_TODO(state, args) {
    state.todo = state.todo.filter((todo) => {
      return todo.id !== args.content.id
    })
  },
}

export const getters = {
  todo: (state) => state.todo,
}

export const actions = {
  fetchTodos({ commit }, args) {
    return fetchTodos(args.$axios)
      .then((result) => {
        commit('GET_TODO', { content: result })
        return Promise.resolve(result)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },

  create({ commit }, args) {
    return create(args.$axios, args.data)
      .then((result) => {
        commit('POST_TODO', { content: result })
        return Promise.resolve(result)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },

  edit({ commit }, args) {
    return edit(args.$axios, args.data)
      .then((result) => {
        commit('EDIT_TODO', { content: result })
        return Promise.resolve(result)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },

  remove({ commit }, args) {
    return remove(args.$axios, args.data)
      .then((result) => {
        commit('REMOVE_TODO', { content: result })
        return Promise.resolve(result)
      })
      .catch((error) => {
        return Promise.reject(error)
      })
  },
}
