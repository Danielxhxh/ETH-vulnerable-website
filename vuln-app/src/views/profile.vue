<template>
  <div v-if="profile.user">
    <h1>Profile</h1>
    <div>
      <p>
        ID: <span>{{ profile.user.id }}</span>
      </p>
      <p>
        Username: <span>{{ profile.user.username }}</span>
      </p>
      <p>
        Email:<span>{{ profile.user.email }}</span>
      </p>
      <p>Password:<span>*******</span></p>
    </div>
    <h2 v-if="profile.user.id == 1">
      <router-link to="/monitor" class="link">Monitor logs</router-link>
    </h2>

    <button @click="logOut">Log Out</button>
  </div>

  <div v-else>
    <p>Please, login first.</p>
    <h2><router-link to="/login" class="link">Login</router-link></h2>
  </div>

  <h2><router-link to="/" class="link">Homepage</router-link></h2>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const profile = ref({ user: null });
    const router = useRouter();

    const fetchProfile = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL_BACKEND}/api/auth/profile`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await response.json();
        profile.value = data;
      } catch (error) {
        console.error(error);
        profile.value = null;
      }
    };

    const logOut = async () => {
      localStorage.removeItem("accessToken");
      await router.push("/login");
    };

    onMounted(fetchProfile);

    return {
      profile,
      fetchProfile,
      logOut,
    };
  },
};
</script>

<style scoped>
p {
  font-family: "Consolas", monospace;
  font-size: 16px;
  margin-bottom: 10px;
}

span {
  color: red;
}

div {
  background-color: #000000; /* black */
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
}
</style>
