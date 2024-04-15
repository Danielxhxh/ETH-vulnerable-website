<template>
  <div>
    <h1>Add Products</h1>
    <p>This page is reserved to the Admin.</p>
    <input type="file" @change="handleFileUpload" />

    <div v-if="uploadedFile">
      <h2>Uploaded File:</h2>

      <form>
        <label for="name">Name:</label>
        <br />
        <input type="text" id="name" v-model="uploadedFile.name" />
        <br />
        <label for="description">Description:</label>
        <br />
        <input
          type="text"
          id="description"
          v-model="uploadedFile.description"
        />
        <br />
        <label for="price">Price:</label>
        <br />
        <input type="number" id="price" v-model="uploadedFile.price" />
        <br />
      </form>
      <p>{{ uploadedFile.size }} bytes</p>

      <button @click="uploadFile">Upload</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      uploadedFile: null,
    };
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      this.uploadedFile = file;
    },
    uploadFile() {
      // Implement file upload logic here
      // You can use libraries like Axios or fetch API to send the file to the server
      // Remember to handle any error cases and update the UI accordingly
    },
  },
};
</script>

<style scoped>
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
