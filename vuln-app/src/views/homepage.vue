<template>
  <div class="homepage">
    <img src="/images/hacker.svg" style="margin-top: 10%" />
    <h1>Welcome to the ETH Shop!</h1>
    <h2>Shop your favourite hacking gadgets, and always be fashionable.</h2>

    <div class="links-div">
      <h2><router-link to="/shop" class="link">Shop</router-link></h2>
      <h2><router-link to="/cart" class="link">Cart</router-link></h2>
      <h2><router-link to="/login" class="link">Login</router-link></h2>
      <h2><router-link to="/profile" class="link">Profile</router-link></h2>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
</script>

<style scoped>
.homepage img {
  width: 200px; /* Adjust the width to your desired size */
  height: auto; /* Maintain aspect ratio */
}
.links-div {
  display: flex;
  justify-content: center;
  gap: 20px;
}

.links-div .link {
  font-size: 1.5rem;
  font-style: none;
  color: green;
  transition: all 1.3s;
}
.links-div .link:hover {
  font-size: 1.7rem;
  text-decoration: underline;
}
</style>
