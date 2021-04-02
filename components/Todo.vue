<template>
  <v-card
    elevation="3"
    outlined
    shaped
    min-width="270"
    max-width="370"
    :color="todo.completed ? 'success' : 'warning'"
    :loading="loading"
    :disabled="loading"
  >
    <template slot="progress">
      <v-progress-linear
        absolute
        color="primary"
        indeterminate
      ></v-progress-linear>
    </template>
    <v-card-title>
      {{ todo.title }}
      <v-spacer></v-spacer>
      <v-menu offset-y transition="slide-x-transition">
        <template #activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>
        <v-list>
          <v-list-item v-if="!todo.completed" link @click="completed(todo)">
            <v-list-item-title>Mark as completed</v-list-item-title>
          </v-list-item>

          <CreateTodoModal
            v-if="!todo.completed"
            edit
            :todo="todo"
            @saveTodo="edit"
          />
          <v-list-item link @click="remove(todo)">
            <v-list-item-title>Remove</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-card-title>
    <v-card-text>
      <span v-if="todo.date" class="d-block py-2"> Date: {{ todo.date }} </span>
      <span v-if="todo.start" class="d-block py-2">
        Start: {{ todo.start }}
      </span>
      <span v-if="todo.end" class="d-block py-2"> End: {{ todo.end }} </span>
    </v-card-text>
    <v-card-text v-if="todo.fullday">
      <span class="d-block py-2"> Full Day! </span>
    </v-card-text>
  </v-card>
</template>

<script>
import { formatDate } from '@/helpers'

export default {
  name: 'Todo',
  props: {
    todo: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      loading: false,
    }
  },
  methods: {
    formatDate,
    completed(todo) {
      this.loading = true
      this.$emit('completed', todo, this.callback)
    },
    edit(todo, callback) {
      this.$emit('edit', todo, callback)
    },
    remove(todo) {
      this.loading = true
      this.$emit('remove', todo, this.callback)
    },
    callback() {
      this.loading = false
    },
  },
}
</script>
