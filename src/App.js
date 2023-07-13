import { ref } from 'vue'
const drawer = ref(null)

export default {
  data: () => ({
    drawer: null,
    items: [
      { title: 'To Do', icon: 'mdi-list-box-outline', to: '/' },
      { title: 'About', icon: 'mdi-help-box', to: '/about' },
    ],
    liveTime: ""
  }),
  mounted() {
    this.updateDateTime();
    setInterval(this.updateDateTime, 1000); // Update every second
  },

  methods: {
    getCurrentDate() {
      const date = new Date();
      const day = String(date.getDate()).padStart(2, "0");
      const monthNames = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
      ];
      const month = monthNames[date.getMonth()];
      const year = date.getFullYear();
      return `${day} ${month} ${year}`;
    },
    updateDateTime() {
      const date = new Date();
      const hours = String(date.getHours()).padStart(2, "0");
      const minutes = String(date.getMinutes()).padStart(2, "0");
      const seconds = String(date.getSeconds()).padStart(2, "0");
      this.liveTime = `${hours}:${minutes}:${seconds}`;
    }

  }
}