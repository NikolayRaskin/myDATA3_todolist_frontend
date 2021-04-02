<template>
  <v-container>
    <section class="d-flex justify-space-between align-center">
      <h1>Todo List</h1>
      <CreateTodoModal @saveTodo="saveTodo" />
    </section>
    <v-row v-if="!loading" class="d-flex flex-wrap mt-4">
      <v-col
        v-for="item in todo"
        :key="`todo-${item.id}`"
        cols="4"
        class="todo-wrapper"
      >
        <Todo
          :todo="item"
          @completed="completed"
          @edit="edit"
          @remove="remove"
        />
      </v-col>
    </v-row>
    <section v-else class="d-flex flex-column align-center">
      <span class="py-4">Loading...</span>
      <v-progress-circular indeterminate color="primary"></v-progress-circular>
    </section>
  </v-container>
</template>

<script>
import { mapGetters } from 'vuex'

import Todo from '@/components/Todo'
import CreateTodoModal from '@/components/CreateTodoModal'

export default {
  components: { Todo, CreateTodoModal },
  data() {
    return {
      loading: true,
    }
  },
  computed: {
    ...mapGetters({
      todo: 'todo/todo',
    }),
  },
  mounted() {
    this.fetchTodo()
  },
  methods: {
    fetchTodo() {
      this.loading = true
      this.$store
        .dispatch('todo/fetchTodos', {
          $axios: this.$axios,
        })
        .then((result) => {
          this.loading = false
        })
        .catch((error) => {
          console.log(error)
          this.loading = false
        })
    },

    saveTodo(todo, stopLoading) {
      this.$store
        .dispatch('todo/create', {
          $axios: this.$axios,
          data: todo,
        })
        .then((result) => {
          stopLoading()
        })
        .catch((error) => {
          console.log(error)
          stopLoading()
        })
    },

    completed(todo, stopLoading) {
      this.$store
        .dispatch('todo/edit', {
          $axios: this.$axios,
          data: {
            id: todo.id,
            completed: true,
          },
        })
        .then((result) => {
          stopLoading()
        })
        .catch((error) => {
          console.log(error)
          stopLoading()
        })
    },
    edit(todo, stopLoading) {
      this.$store
        .dispatch('todo/edit', {
          $axios: this.$axios,
          data: { ...todo },
        })
        .then((result) => {
          stopLoading()
        })
        .catch((error) => {
          console.log(error)
          stopLoading()
        })
    },
    remove(todo, stopLoading) {
      return this.$store
        .dispatch('todo/remove', {
          $axios: this.$axios,
          data: todo,
        })
        .then((result) => {
          stopLoading()
        })
        .catch((error) => {
          console.log(error)
          stopLoading()
        })
    },
  },
}
</script>
