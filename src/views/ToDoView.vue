<template>
  <div class="home">
    <v-text-field v-model="newTaskTitle" @click:append="addTask" @keyup.enter="addTask" class="pa-3" outlined
      label="Add Task" append-icon="mdi-plus-box" hide-details clearable></v-text-field>

    <v-list class="pt=0" flat v-if="tasks.length > 0">
      <div v-for="task in tasks" :key="task.id">
        <v-list-item @click="doneTask(task.id)" :class="{ 'green lighten-4': task.done }">
          <template v-slot:default>
            <v-list-item-action>
              <v-checkbox :input-value="task.done"></v-checkbox>
            </v-list-item-action>

            <v-list-item-content>
              <v-list-item-title :class="{ 'text-decoration-line-through': task.done }">
                {{ task.title }}
              </v-list-item-title>
            </v-list-item-content>

            <v-list-item-action>
              <v-btn @click.stop="deleteTask(task.id)" icon>
                <v-icon color="primary lighten-1">mdi-delete-outline</v-icon>
              </v-btn>
            </v-list-item-action>

            <!-- New v-list-item-action for editing task -->
            <v-list-item-action>
              <v-btn @click.stop="editTask(task.id)" icon>
                <v-icon color="primary lighten-1">mdi-pencil</v-icon>
              </v-btn>
            </v-list-item-action>
          </template>
        </v-list-item>
        <v-divider></v-divider>
      </div>
    </v-list>

    <div v-else class="pa-6 text-center">
      <v-icon large color="grey">mdi-set-none</v-icon>
      <div class="grey--text">There is no task here.</div>
    </div>

    <!-- Snackbar for empty task title -->
    <!-- Snackbar for empty task title -->
  <v-snackbar
    v-model="snackbar.show"
    :timeout="snackbar.timeout"
    color="error"
    @input="saveSnackbarState"
  >
    {{ snackbar.message }}
  </v-snackbar>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data() {
    return {
      newTaskTitle: '',
      tasks: [],
      snackbar: {
        show: false,
        timeout: 3000,
        message: 'Unable to add empty task',
      },
    };
  },
  methods: {
    doneTask(id) {
      let task = this.tasks.find((task) => task.id === id);
      task.done = !task.done;
    },
    deleteTask(id) {
      this.tasks = this.tasks.filter((task) => task.id !== id);
    },
    editTask(id) {
      let task = this.tasks.find((task) => task.id === id);
      let newTitle = prompt('Enter new task title', task.title);
      if (newTitle !== null) {
        task.title = newTitle.trim();
      }
    },
    addTask() {
      if (this.newTaskTitle.trim() === '') {
        this.snackbar.show = true;
        return;
      }
      let newTask = {
        id: Date.now(),
        title: this.newTaskTitle,
        done: false,
      };
      this.tasks.push(newTask);
      this.newTaskTitle = '';
    },
    saveSnackbarState() {
      localStorage.setItem('snackbarState', JSON.stringify(this.snackbar.show));
    },
    retrieveSnackbarState() {
      const state = localStorage.getItem('snackbarState');
      if (state !== null) {
        this.snackbar.show = JSON.parse(state);
      }
    },
  },
  created() {
    this.retrieveSnackbarState();
  },
};
</script>
