<template>
  <div v-if="profile">
    <h1>Profile</h1>
    <div>
      <p>
        Username: <span>{{ profile.user.username }}</span>
      </p>
      <p>
        Email:<span>{{ profile.user.email }}</span>
      </p>
      <!-- Add more profile data here -->
    </div>
    <button @click="logOut">Log Out</button>
  </div>
  <div v-else>
    <p>Please, login first.</p>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const profile = ref(null);
    const router = useRouter();

    const fetchProfile = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/profile", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const data = await response.json();
        profile.value = data;
      } catch (error) {
        console.error(error);
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
