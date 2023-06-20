<template>
  <div
    id="app"
    style="width: 100%;  
  justify-content: center; dispaly: flex;"
  >
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <p
          class="navbar-brand"
          v-if="!$store.state.username"
          style="border-right: 5px solid rgb(0, 0, 0); padding-right: 10px;"
        >
          Hello Guest
        </p>
        <p
          class="navbar-brand"
          v-if="$store.state.username"
          style="border-right: 5px solid rgb(0, 0, 0); padding-right: 10px;"
        >
          Hello {{ $store.state.username }}
        </p>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" style="width: 100%;">
            <li class="nav-item">
              <router-link :to="{ name: 'main' }" class="nav-link active"
                >Home</router-link
              >
            </li>
            <li class="nav-item">
              <router-link :to="{ name: 'search' }" class="nav-link active"
                >Search</router-link
              >
            </li>
          </ul>
          <ul class="navbar-nav me-auto mb-2 mb-lg-0" id="navbarPersonal">
            <li
              class="nav-item dropdown"
              style="align-self: right; padding-right: 30px;"
              v-if="$store.state.username"
            >
              <a
                class="nav-link dropdown-toggle"
                id="navbarDropdownMenuLink"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Peresonal
              </a>
              <ul
                class="dropdown-menu"
                aria-labelledby="navbarDropdownMenuLink"
              >
                <li class="nav-item">
                  <router-link
                    :to="{ name: 'myRecipes' }"
                    class="nav-link active"
                    >My Recipes</router-link
                  >
                </li>
                <li class="nav-item">
                  <router-link
                    :to="{ name: 'favorite' }"
                    class="nav-link active"
                    >Favorite</router-link
                  >
                </li>
                <li class="nav-item">
                  <router-link :to="{ name: 'family' }" class="nav-link active"
                    >Family</router-link
                  >
                </li>
              </ul>
            </li>
            <li
              class="nav-item"
              v-if="$store.state.username"
              style="padding-right: 50px;"
            >
              <a class="nav-link active" @click="Logout">
                Logout
              </a>
            </li>

            <li class="nav-item" v-if="!$store.state.username">
              <router-link
                :to="{ name: 'login' }"
                class="nav-link active"
                style="padding-right: 20px;"
                >Login</router-link
              >
            </li>
            <li class="nav-item" v-if="!$store.state.username">
              <router-link :to="{ name: 'register' }" class="nav-link active"
                >Register</router-link
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      show: false,
    };
  },
  methods: {
    Logout() {
      this.$store.dispatch("logout", {});
      this.$root.toast("Logout", "User logged out successfully", "success");
      this.$router.push("/").catch(() => {
        this.$forceUpdate();
      });
    },
    openCreateRecipeModalbind() {
      console.log("openCreateRecipeModal");
      openCreateRecipeModal();
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
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  background-repeat: repeat-y;

  margin: 0;
}

footer {
  text-align: center;
}

.container {
  margin-top: 160px; /* Adjust the margin value to create the desired space */
}

ul li ul {
  visibility: hidden;
  opacity: 0;
  position: absolute;
  padding-left: 0;
  left: 0;
  display: none;
  background: white;
}

ul li:hover > ul,
ul li ul:hover {
  visibility: visible;
  opacity: 1;
  display: block;
  min-width: 250px;
  text-align: left;
  padding-top: 20px;
  box-shadow: 0px 3px 5px -1px #ccc;
}

ul li ul li {
  clear: both;
  width: 100%;
  text-align: left;
  margin-bottom: 20px;
  border-style: none;
}

ul li ul li a:hover {
  padding-left: 10px;
  border-left: 2px solid #3ca0e7;
  transition: all 0.3s ease;
}

a {
  text-decoration: none;

  &:hover {
    color: #3ca0e7;
  }
}

ul li ul li a {
  transition: all 0.5s ease;
}
</style>
