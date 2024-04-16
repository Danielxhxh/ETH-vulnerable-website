<template>
  <div>
    <h1>Login</h1>
    <form @submit.prevent="login">
      <label for="email">Email:</label>
      <input
        type="text"
        id="email"
        v-model="email"
        autocomplete="email"
        required
      />
      <br />
      <label for="password">Password:</label>
      <input
        type="password"
        id="password"
        v-model="password"
        autocomplete="current-password"
        required
      />
      <br />
      <button type="submit">Login</button>
    </form>
  </div>

  <div>
    <p>
      Don't have an account?
      <router-link to="/register" class="link">Create profile.</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    async login() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL_BACKEND}/api/auth/login`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: this.email,
              password: this.password,
            }),
          }
        );

        if (response.ok) {
          const data = await response.json();
          const accessToken = data.accessToken;

          localStorage.setItem("accessToken", accessToken);
          this.$router.push("/profile");
        } else {
          // Handle error response
          console.error("Login failed");
        }
      } catch (error) {
        // Handle network or other errors
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
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
