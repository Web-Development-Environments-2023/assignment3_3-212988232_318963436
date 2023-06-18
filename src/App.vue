<template>
  <div id="app">
    <div class="menu-bar" id="nav">
      <li v-if="!$store.state.username">
        Hello Guest
      </li>
      <li v-if="$store.state.username">
        Hello {{ $store.state.username }}
      </li>
      <li>
        <router-link :to="{ name: 'main' }" style="color:white;">Vue Recipes</router-link>
      </li>
      <li>
        <router-link :to="{ name: 'search' }" style="color:white;">Search</router-link>
      </li>
      <li v-if="!$store.state.username">
        <router-link :to="{ name: 'register' }" style="color:white;">Register</router-link>
      </li>
      <li v-if="!$store.state.username">
        <router-link :to="{ name: 'login' }" style="color:white;">Login</router-link>
      </li>
      <li v-if="$store.state.username" class="dropdown">
        <span style="color: white;">Personal</span>
        <ul class="dropdown-content">
          <li>
            <router-link :to="{ name: 'favorite' }" style="color:white;">Favorite</router-link>
          </li>
          <li>
            <router-link :to="{ name: 'myRecipes' }" style="color:white;">My Recipes</router-link>
          </li>
        </ul>
      </li>
      <li v-if="$store.state.username">
        <button @click="Logout" style="color:white; background-color:transparent; border:none; cursor:pointer; font-family: sans-serif; font-weight: bold;">Logout</button>
      </li>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  methods: {
    Logout() {
      this.$store.dispatch("logout", {});
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
  },
};
</script>

<style lang="scss">
@import "@/scss/form-style.scss";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
}

body {
  background: url(https://images.unsplash.com/photo-1495195129352-aeb325a55b65?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1776&q=80);
  height: 100vh;
  display: flex;

  margin: 0;
}

.menu-bar {
  border-radius: 25px;
  height: fit-content;
  display: inline-flex;
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  align-items: center;
  margin-top: 20px;
  margin-left: 20px;
}

.menu-bar li {
  list-style: none;
  color: white;
  font-family: sans-serif;
  font-weight: bold;
  padding: 12px 16px;
  margin: 0 8px;
  position: relative;
  cursor: pointer;
  white-space: nowrap;
}

.menu-bar li::before {
  content: " ";
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  z-index: -1;
  transition: 0.2s;
  border-radius: 25px;
}

.menu-bar li:hover::before {
  background: linear-gradient(to bottom, #e8edec, #d2d1d3);
  box-shadow: 0px 3px 20px 0px black;
  transform: scale(1.2);
}

.menu-bar .name:hover::before {
  background: none;
  box-shadow: none;
  transform: none;
}

.menu-bar .name:hover {
  color: white;
  cursor: auto;
}

.menu-bar li:hover {
  color: black;
}

.dropdown {
  position: relative;
}

.dropdown-content {
  display: none;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(10px);
  border-radius: 25px;
  padding: 10px;
}

.dropdown:hover .dropdown-content {
  display: block;
}

.dropdown-content li {
  margin: 8px 0;
}

.dropdown-content li:hover {
  color: black;
}

.dropdown-content li a {
  color: white;
}
</style>
