<template>
  <div class="card">
    <img :src="product.image" alt="Product Image" class="card-image" />
    <div class="card-content">
      <h3 class="card-title">{{ product.name }}</h3>
      <p class="card-description">{{ product.description }}</p>
      <p class="card-price">{{ product.price }}</p>
    </div>
  </div>
</template>

<script>
import { defineProps } from "vue";

export default {
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style>
.card {
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 20%;
  padding: 16px;
  margin-bottom: 16px;
  background-color: #f5f5f5;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease-in-out;
}

.card:hover {
  transform: translateY(-4px);
}

.card-image {
  width: 100%;
  height: auto;
  margin-bottom: 8px;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-title {
  font-size: 18px;
  margin-bottom: 8px;
  color: #333;
}

.card-description {
  margin-bottom: 8px;
  color: #666;
}

.card-price {
  font-weight: bold;
  color: #ff5722;
}
</style>
