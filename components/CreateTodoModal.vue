<template>
  <v-dialog v-model="dialog" width="500">
    <template #activator="{ on, attrs }">
      <v-btn
        v-if="!edit"
        color="success"
        dark
        v-bind="attrs"
        v-on="on"
        @click="onOpen"
      >
        Create Todo
      </v-btn>
      <v-list-item v-if="edit" link v-bind="attrs" v-on="on" @click="onOpen">
        <v-list-item-title>Edit</v-list-item-title>
      </v-list-item>
    </template>

    <v-card>
      <v-card-title> Create new ToDo </v-card-title>

      <v-card-text>
        <v-form ref="form" v-model="valid" @submit="saveTodo">
          <v-row>
            <v-col>
              <v-text-field
                v-model="newTodo.title"
                label="Title"
                :rules="[rules.required]"
              ></v-text-field
            ></v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-menu
                v-model="dateMenu"
                :close-on-content-click="true"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
                light
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="newTodo.date"
                    prepend-icon="mdi-calendar"
                    label="Date"
                    readonly
                    :rules="[rules.required]"
                    class="input__date"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-date-picker
                  v-model="newTodo.date"
                  :first-day-of-week="1"
                  @input="dateMenu = false"
                ></v-date-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-menu
                v-model="startMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
                light
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="newTodo.start"
                    prepend-icon="mdi-calendar"
                    label="Start of Todo*"
                    readonly
                    :rules="newTodo.fullday ? [] : [rules.required]"
                    class="input__date"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="newTodo.start"
                  format="24hr"
                  light
                ></v-time-picker>
              </v-menu>
            </v-col>
            <v-col cols="6">
              <v-menu
                v-model="endMenu"
                :close-on-content-click="false"
                :nudge-right="40"
                transition="scale-transition"
                offset-y
                min-width="auto"
                light
              >
                <template #activator="{ on, attrs }">
                  <v-text-field
                    v-model="newTodo.end"
                    prepend-icon="mdi-calendar"
                    label="End of Todo*"
                    readonly
                    :rules="newTodo.fullday ? [] : [rules.required]"
                    class="input__date"
                    v-bind="attrs"
                    v-on="on"
                  ></v-text-field>
                </template>
                <v-time-picker
                  v-model="newTodo.end"
                  format="24hr"
                  light
                ></v-time-picker>
              </v-menu>
            </v-col>
          </v-row>
          <v-row>
            <v-col>
              <v-checkbox
                v-model="newTodo.fullday"
                label="Is full day"
              ></v-checkbox>
            </v-col>
          </v-row>
        </v-form>
        <h2 v-if="timeError" class="red--text">Date error!</h2>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" :disabled="loading" @click="dialog = false">
          Close
        </v-btn>
        <v-btn color="success" :loading="loading" @click="saveTodo">
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'CreateTodoModal',

  props: {
    edit: {
      type: Boolean,
      required: false,
      default: false,
    },
    todo: {
      type: Object,
      required: false,
      default: () => null,
    },
  },

  data() {
    return {
      dialog: false,
      loading: false,
      valid: true,
      newTodo: {
        title: '',
        date: null,
        start: null,
        end: null,
        fullday: false,
      },

      timeError: false,

      dateMenu: false,
      startMenu: false,
      endMenu: false,

      rules: {
        required: (value) => !!value || 'Required.',
      },
    }
  },
  methods: {
    onOpen() {
      if (this.edit && this.todo) {
        this.newTodo = { ...this.todo }
      }
    },
    saveTodo(event) {
      event.preventDefault()
      this.validate()
      if (this.valid) {
        const start = new Date(`${this.newTodo.date}T${this.newTodo.start}`)
        const end = new Date(`${this.newTodo.date}T${this.newTodo.end}`)
        if (start < end || this.newTodo.fullday) {
          this.loading = true
          this.timeError = false
          const todo = {
            ...this.newTodo,
          }
          this.$emit('saveTodo', todo, this.stopLoading)
        } else {
          this.timeError = true
        }
      }
    },
    stopLoading() {
      this.loading = false
      this.dialog = false
    },
    validate() {
      this.$refs.form.validate()
    },
  },
}
</script>
