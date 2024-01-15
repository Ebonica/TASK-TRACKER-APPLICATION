<template>
  <header>
    <span>To do Application</span>
    <nav>
      
      <router-link v-if="isAuthenticated" to="/list">TaskPage</router-link>
      <router-link v-if="!isAuthenticated" to="/signup">Signup</router-link>
       <router-link v-if="isAuthenticated" @click="logout" to="#" >Logout</router-link
      >

      
      <router-link v-else to="/login">Login</router-link>
    </nav>
  </header>

  <div class="center-wrap">
    <h1 v-if="!isAuthenticated">Welcome to the Task Tracker Application</h1>
    <p v-if="!isAuthenticated">
      To create a task, please sign up if you are a new user. If not, then log
    in to application.
    </p>
    <h1 v-if="isAuthenticated">Hey {{ getUserName }}, create your Task !</h1>

    <!-- Task creation form -->
    <form v-if="isAuthenticated" @submit.prevent="createTask">
      <label for="username">Enter your task:</label>
      <input type="text" v-model="taskText" required />
      <label for="username">Enter your description:</label>
      <div><textarea v-model="description" rows="4" required></textarea></div>
      <div class="select-input">
        <label for="priority">Task Priority:</label>
        <select v-model="priority">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>
      <button type="submit">Create</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomePage",
  data() {
    return {
      taskText: "",
      description: "",
      priority: "low",
    };
  },
  computed: {
    isAuthenticated() {
      // Check if the user is authenticated, e.g., by checking the presence of JWT token
      return localStorage.getItem("jwtToken") !== null;
    },
    getUserId() {
      // Extract user ID from the JWT token
      const token = localStorage.getItem("jwtToken");
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        return decodedToken.userId;
      }
      return null;
    },
    getUserName() {
      const token = localStorage.getItem("jwtToken");
      if (token) {
        const decodedToken = JSON.parse(atob(token.split(".")[1]));
        return decodedToken.username;
      }
      return null;
    },
  },
  methods: {
    logout() {
      // Clear session storage
      localStorage.removeItem("jwtToken");

      // Redirect to the login route
      this.$router.push({ name: "Login" });
    },
    createTask() {
      // Example using axios (make sure to install axios first: npm install axios)
      axios
        .post("http://localhost:3000/tasks/create", {
          taskName: this.taskText,
          description: this.description,
          priority: this.priority,
          userId: this.getUserId,
        })
        .then(() => {
          // Placeholder alert (remove this in your actual implementation)
          alert("Task created successfully");

          // Redirect to the login route
          this.$router.push({ name: "List" });
        })
        .catch((error) => {
          // Check if the error response contains a message
          if (
            error.response &&
            error.response.data &&
            error.response.data.message
          ) {
            // Display the error message as an alert
            alert(error.response.data.message);
          } else {
            // Default error message if no specific message is available
            alert(
              "Error logging in. Please check your credentials and try again."
            );
          }
        });

      // Clear the input field after creating the task
      this.taskText = "";
      this.description = "";
      this.priority = "";
    },
  },
};
</script>

<style scoped>
header {
  background-color: #3498db;
  display: flex;
  padding: 5px;
  justify-content: space-between;
  color: #fff;
  text-align: center;
}

header span {
  font-size: 1.2rem;
  text-transform: uppercase;
  font-weight: bold;
}
nav {
  display: flex;
}
nav a {
  float: right;
  margin-right: 15px;
  font-size: 1.2rem;
  color: #fff;
  text-decoration: none;
}
nav a:hover {
  text-decoration: underline;
}

.center-wrap {
  width: 100%;
  height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

h1 {
  font-size: 2.5rem;
  font-weight: bold;
}
p {
  margin: 0;
  padding: 0;
  font-size: 1.2rem;
}

form label {
  font-size: 1.1rem;
}

form input,
textarea {
  width: 100%;
  display: flex;
  margin-bottom: 10px;
  padding: 0.5rem;
  text-align: start;
  font-size: 1.1rem;
}

form select {
  position: relative;
  left: 74px;  /* Consider using margins or padding for positioning */
  width: 100%;  /* Corrected property from 'weight' to 'width' */
  padding: 5px;
  margin-bottom: 5px;
}

form button {
  width: 108%;
  padding: 0.5rem 2rem;
  background-color: #3498db;
  color: white;
  font-size: 0.8rem;
  border: 0;
  cursor: pointer;
}
</style>
