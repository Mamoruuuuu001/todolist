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
      this.saveTasks(); // Save tasks after deletion
    },
    editTask(id) {
      let task = this.tasks.find((task) => task.id === id);
      let newTitle = prompt('Enter new task title', task.title);
      if (newTitle !== null) {
        task.title = newTitle.trim();
        this.saveTasks(); // Save tasks after editing
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
      this.saveTasks(); // Save tasks after adding
    },
    saveTasks() {
      localStorage.setItem('tasks', JSON.stringify(this.tasks));
    },
    retrieveTasks() {
      const savedTasks = localStorage.getItem('tasks');
      if (savedTasks !== null) {
        this.tasks = JSON.parse(savedTasks);
      }
    },
  },
  created() {
    this.retrieveTasks();
  },
};