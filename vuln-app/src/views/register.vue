<template>
  <div>
    <h1>Register</h1>
    <form @submit="register">
      <label for="username">Username:</label>
      <input
        type="text"
        id="username"
        v-model="username"
        autocomplete="username"
        required
      />

      <label for="email">Email:</label>
      <input
        type="email"
        id="email"
        v-model="email"
        autocomplete="email"
        required
      />

      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        autocomplete="current-password"
        required
      />

      <button type="submit">Register</button>
    </form>
  </div>

  <div>
    <p>
      Already have an account?
      <router-link to="/login" class="link">Login.</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async register() {
      try {
        const response = await fetch(
          "http://localhost:3000/api/auth/register",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              username: this.username,
              email: this.email,
              password: this.password,
            }),
          }
        );

        // TODO
        // if (response.ok) {
        //   this.$router.push("/profile");
        // } else {
        //   this.$router.push("/login");
        // }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
div {
  background-color: #000000; /* black */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}

form {
  display: flex;
  flex-direction: column;
  align-items: center;
}

label {
  font-weight: bold;
  margin-bottom: 10px;
}

input {
  padding: 5px;
  margin-bottom: 10px;
  width: 200px;
}
</style>
