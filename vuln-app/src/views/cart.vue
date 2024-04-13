<template>
  <div v-if="isLoggedIn" class="cart-container">
    <div class="cart-container">
      <h1>Cart</h1>
      <div v-if="cartItems.length === 0" class="empty-cart-message">
        Your cart is empty.
      </div>
      <div v-else>
        <div v-for="item in cartItems" :key="item.id" class="cart-item">
          <div class="item-details">
            <img :src="item.image" alt="Product Image" class="item-image" />
            <div class="item-info">
              <p class="item-name">{{ item.name }}</p>
              <p class="item-quantity">Quantity: {{ item.quantity }}</p>
            </div>
          </div>
          <button @click="removeFromCart(item.id)" class="remove-button">
            Remove
          </button>
        </div>
        <div class="total-price">
          <h3>Total Price: ${{ totalPrice.toFixed(2) }}</h3>
        </div>
        <button @click="buyProducts">BUY PRODUCTS</button>
      </div>
    </div>
  </div>
  <div v-else>
    <p>Please log in to view your cart.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      cartItems: [],
      totalPrice: 0,
      isLoggedIn: false,
    };
  },
  mounted() {
    this.checkLoginStatus();
    if (this.isLoggedIn) {
      this.loadCartItems();
      this.calculateTotalPrice();
    }
  },
  methods: {
    checkLoginStatus() {
      const accessToken = localStorage.getItem("accessToken");
      this.isLoggedIn = !!accessToken; // Check if accessToken exists and set isLoggedIn accordingly
    },
    loadCartItems() {
      const cartData = localStorage.getItem("cart");
      if (cartData) {
        this.cartItems = JSON.parse(cartData);
      }
    },
    calculateTotalPrice() {
      this.totalPrice = this.cartItems.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
    removeFromCart(itemId) {
      this.cartItems = this.cartItems.filter((item) => item.id !== itemId);
      localStorage.setItem("cart", JSON.stringify(this.cartItems));
      this.calculateTotalPrice();
    },
    async buyProducts() {
      const response = await fetch(
        "http://localhost:3000/api/auth/checkToken",
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      );
      const data = await response.json();
      if (data.message === "Token is valid") {
        alert("Products bought successfully!!");
        localStorage.removeItem("cart");
        this.cartItems = [];
        this.totalPrice = 0;
      } else {
        alert("Please log in to buy products.");
      }
    },
  },
};
</script>

<style scoped>
.cart-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.empty-cart-message {
  font-size: 18px;
  text-align: center;
}

.cart-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0;
}

.item-details {
  display: flex;
  align-items: center;
}

.item-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  margin-right: 10px;
}

.item-info {
  flex: 1;
}

.item-name {
  font-weight: bold;
}

.remove-button {
  background-color: #ff5555;
  color: #fff;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
}

.total-price {
  margin-top: 20px;
  text-align: right;
}
</style>
