<template>
  <div>
    <h1>Task List Page</h1>
    <p>Here is your List of Tasks.</p>

    <!-- Filter by priority -->
    <div v-if="filteredTasks.length > 0">
      Filter by Priority:
      <select v-model="selectedPriority">
        <option value="all">All</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>
    </div>

    <!-- Display the list of tasks for the user in a table -->
    <table v-if="filteredTasks.length > 0">
      <thead>
        <tr>
          <th>Sr. No</th>
          <th>Task Name</th>
          <th>Description</th>
          <th>Priority</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in filteredTasks" :key="task._id">
          <td>{{ index + 1 }}</td>
          <td>{{ task.taskName }}</td>
          <td>{{ task.description }}</td>
          <td>{{ task.priority }}</td>
        </tr>
      </tbody>
    </table>
    <p v-else>Oops..! You have not created any task yet.</p>
    <p>
      <router-link to="/">Back to Home</router-link>
    </p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ListPage',
  data() {
    return {
      tasks: [],
      selectedPriority: 'all',
    };
  },
  created() {
    // Fetch tasks for the user when the component is created
    this.fetchTasks();
  },
  computed: {
    filteredTasks() {
      // Filter tasks based on selected priority
      if (this.selectedPriority === 'all') {
        return this.tasks;
      } else {
        return this.tasks.filter(
          (task) => task.priority === this.selectedPriority,
        );
      }
    },
  },
  methods: {
    async fetchTasks() {
      try {
        // Extract JWT token from localStorage
        const token = localStorage.getItem('jwtToken');

        // Check if token is available
        if (!token) {
          console.error('JWT token not found in localStorage.');
          return;
        }

        // Decode the token to get the payload
        const decodedToken = JSON.parse(atob(token.split('.')[1]));

        // Extract user ID from the decoded token
        const userId = decodedToken.userId;

        // Make a GET request to fetch tasks for the user
        const response = await axios.get(
          `http://localhost:3000/tasks/${userId}`,
        );

        // Update the tasks data property with the fetched tasks
        this.tasks = response.data;
      } catch (error) {
        alert('Error fetching tasks', error);
      }
    },
  },
};
</script>

<style scoped>
h1,
p {
  text-align: center;
}
a {
  padding-top: 0.5rem;
  color: #3498db;
  font-size: 1rem;
  cursor: pointer;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
}

th,
td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

th {
  background-color: #3498db;
  color: white;
}

div {
  margin-bottom: 1rem;
}
</style>
