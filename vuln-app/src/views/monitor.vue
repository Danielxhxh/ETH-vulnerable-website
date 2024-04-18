<template>
  <div>
    <h1>Log Monitor</h1>
    <p>This page is reserved to the admin. If you are not admin, step back.</p>
    <p v-if="logNames.logFiles.length > 0">
      List of Nginx log files. Click on a log file to view its content.
    </p>
    <pre>{{ logContent }}</pre>
    <ul>
      <li
        v-for="(logName, index) in logNames.logFiles"
        :key="index"
        @click="fetchLogFile(logName)"
      >
        {{ logName }}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      logNames: { logFiles: [] },
      logContent: "",
    };
  },
  mounted() {
    this.fetchLogNames();
  },
  methods: {
    async fetchLogNames() {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL_BACKEND}/api/auth/monitor/logNames`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
          }
        );
        const data = await response.json();
        if (data.logFiles && data.logFiles.length > 0)
          this.logNames.logFiles = data.logFiles;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchLogFile(name) {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_URL_BACKEND}/api/auth/monitor/logFile`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
            },
            body: JSON.stringify({ logFile: name }),
          }
        );
        const data = await response.json();
        this.logContent = data.logContent;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style>
ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 10px;
  background-color: lightgray;
  padding: 10px;
}
</style>
