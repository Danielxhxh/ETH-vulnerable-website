<template>
  <div class="shop">
    <h2>Shop Section</h2>
    <div class="product-list">
      <Product
        v-for="(product, index) in products"
        :key="index"
        :product="product"
        @click="seeDetails(product.name)"
      />
    </div>
  </div>

  <router-link to="/" class="link">Homepage</router-link>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router"; // Import useRouter for navigation

import Product from "../components/product.vue";

export default {
  components: {
    Product,
  },
  setup() {
    const products = ref([]);
    const route = useRoute();
    const router = useRouter(); // Use useRouter for navigation

    // Fetch products from the API when component is mounted
    onMounted(() => {
      fetchProducts(); // Call function to fetch products
    });

    function fetchProducts() {
      fetch(`${import.meta.env.VITE_URL_BACKEND}/api/products/`)
        .then((response) => response.json())
        .then((data) => {
          products.value = data;
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }

    function seeDetails(name) {
      router.push(`/shop/${name}`);
    }

    return {
      products,
      seeDetails,
    };
  },
};
</script>

<style scoped>
.product-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  gap: 10px;
}
</style>
