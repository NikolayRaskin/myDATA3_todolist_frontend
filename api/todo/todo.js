import { TODOS, TODO } from '@/api/endpoints'

export const fetchTodos = ($axios) => {
  return $axios
    .get(TODOS)
    .then((data) => {
      return Promise.resolve(data)
    })
    .catch((error) => {
      return Promise.reject(new Error('Failed to fetch TODOS: ' + error))
    })
}
export const create = ($axios, todo) => {
  return $axios
    .post(TODOS, todo)
    .then((data) => {
      return Promise.resolve(data)
    })
    .catch((error) => {
      return Promise.reject(new Error('Failed to post TODO: ' + error))
    })
}

export const edit = ($axios, todo) => {
  return $axios
    .patch(TODO(todo.id), todo)
    .then((data) => {
      return Promise.resolve(data)
    })
    .catch((error) => {
      return Promise.reject(new Error('Failed to patch TODOS: ' + error))
    })
}

export const remove = ($axios, todo) => {
  return $axios
    .delete(TODO(todo.id))
    .then(() => {
      return Promise.resolve(todo)
    })
    .catch((error) => {
      return Promise.reject(new Error('Failed to delete TODOS: ' + error))
    })
}
