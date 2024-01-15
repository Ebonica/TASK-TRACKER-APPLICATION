<template>
  <div class="signup-wrap">
    <h1>Signup Page</h1>
    <form @submit.prevent="signup">
      <label for="username">Username:</label>
      <input v-model="signupForm.username" type="text" id="username" required />

      <label for="password">Password:</label>
      <input
        v-model="signupForm.password"
        type="password"
        id="password"
        required
      />

      <label for="confirmPassword">Confirm Password:</label>
      <input
        v-model="signupForm.confirmPassword"
        type="password"
        id="confirmPassword"
        required
      />

      <button type="submit">Sign Up</button>
    </form>
    <router-link to="/">Back to Home</router-link>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "SignupPage",
  data() {
    return {
      signupForm: {
        username: "",
        password: "",
        confirmPassword: "",
      },
    };
  },
  methods: {
    signup() {
      if (this.signupForm.password !== this.signupForm.confirmPassword) {
        alert("Passwords do not match. Please confirm your password.");
        return;
      }
      const userData = {
        username: this.signupForm.username,
        password: this.signupForm.password,
      };

      axios
        .post("http://localhost:3000/users/create", userData)
        .then(() => {
          // Clear input fields
          this.signupForm.username = "";
          this.signupForm.password = "";
          this.signupForm.confirmPassword = "";

          // Show success alert
          alert("User registered successfully!");
        })
        .catch((error) => {
          alert("Error registering user", error);
          // Handle registration error, show an error message, etc.
        });
    },
  },
};
</script>

<style scoped>
.signup-wrap {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

form label {
  font-size: 1.1rem;
}

form input {
  display: flex;
  margin-bottom: 10px;
  padding: 0.5rem;
  text-align: start;
  font-size: 1.1rem;
}

form button {
  width: 100%;
  padding: 0.5rem 2rem;
  background-color: #3498db;
  color: white;
  font-size: 0.8rem;
  border: 0;
  cursor: pointer;
}

.signup-wrap a {
  padding-top: 0.5rem;
  color: #3498db;
  font-size: 1rem;
  cursor: pointer;
}
</style>
