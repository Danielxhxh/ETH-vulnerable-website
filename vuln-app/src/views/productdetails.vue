<template>
  <div v-if="product" class="product-detail">
    <h1>{{ product.name }}</h1>
    <p class="description">{{ product.description }}</p>
    <p class="price">Price: ${{ product.price }}</p>
    <img
      :src="product.image"
      alt="Product Image"
      class="product-image"
      style="width: 100%"
    />

    <button @click="addToCart(product)" class="action-button add-to-cart">
      Add to Cart
    </button>

    <router-link to="/cart" class="action-button view-cart"
      >View Cart</router-link
    >

    <button @click="goBack" class="action-button go-back">Go Back</button>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";

export default {
  setup() {
    const product = ref(null);
    const route = useRoute();

    onMounted(() => {
      const productName = route.params.product;
      fetchProduct(productName);
    });

    const fetchProduct = (productName) => {
      fetch(`http://localhost:3000/api/products/${productName}`)
        .then((response) => response.json())
        .then((data) => {
          product.value = data[0];
        })
        .catch((error) => {
          console.error("Error fetching product:", error);
        });
    };

    function goBack() {
      window.history.back();
    }

    function addToCart(product) {
      let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
      let existingItem = cartItems.find((item) => item.name === product.name);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        cartItems.push({ ...product, quantity: 1 });
      }

      localStorage.setItem("cart", JSON.stringify(cartItems));
    }

    function getCartItems() {
      console.log(JSON.parse(localStorage.getItem("cart")) || []);
    }

    return {
      product,
      goBack,
      addToCart,
      getCartItems,
    };
  },
};
</script>

<style scoped>
.product-detail {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.product-detail h1 {
  font-size: 2rem;
  margin-bottom: 10px;
}

.description {
  font-size: 1.2rem;
  margin-bottom: 20px;
}

.price {
  font-size: 1.2rem;
  font-weight: bold;
  color: #007bff; /* Blue color for price */
}

.product-image {
  max-width: 100%;
  height: auto;
  margin-top: 20px;
  border-radius: 5px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.action-button {
  display: inline-block;
  padding: 10px 20px;
  margin-top: 20px;
  font-size: 1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.add-to-cart {
  background-color: #28a745; /* Green color for Add to Cart button */
  color: #fff;
}

.view-cart {
  background-color: #007bff; /* Blue color for View Cart button */
  color: #fff;
}

.go-back {
  background-color: #6c757d; /* Gray color for Go Back button */
  color: #fff;
}

.action-button:hover {
  background-color: #343a40; /* Darker background color on hover */
}
</style>
