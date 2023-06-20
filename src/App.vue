<template>
  <div
    id="app"
    style="width: 100%;  
  justify-content: center; dispaly: flex;"
  >
  <div class="navbarFlow">

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
  </div>
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
  display: flex;
  background-attachment: fixed;
  background-repeat: no-repeat;
  background-size: cover;
  margin: 0;
}

footer {
  text-align: center;
}

.container {
  margin-top: 100px; /* Adjust the margin value to create the desired space */
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
.navbarFlow{
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 9999;
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



.myTitle h2 {
  font-size:35px;text-align:left; line-height:1.5em; padding-bottom:45px; font-family:"Playfair Display", serif; text-transform:uppercase;letter-spacing: 2px; color:#111;
}



.myTitle h1 {
  position:relative;
  font-size:50px;text-align:center; line-height:1.5em; padding-bottom:45px; font-family:"Playfair Display", serif; text-transform:uppercase;letter-spacing: 2px; color:#111;
  margin-bottom: 30px;
}




.myTitle h1:before {
  position: absolute;
  left: 0;
  bottom: 20px;
  width: 60%;
  left:50%; margin-left:-30%;
  height: 1px;
  content: "";
  background-color: #777; z-index: 4;
}
.myTitle h1:after {
  position:absolute;
  width:40px; height:40px; left:50%; margin-left:-20px; bottom:0px;
  content: '\00a7'; font-size:50px; line-height:40px; color:#c50000;
  font-weight:400; z-index: 5;
  display:block;
  
}


/* CSS */
.button-74 {
  background-color: #fbeee0;
  border: 2px solid #422800;
  border-radius: 30px;
  box-shadow: #422800 4px 4px 0 0;
  color: #422800;
  cursor: pointer;
  display: inline-block;
  font-weight: 600;
  font-size: 18px;
  padding: 0 18px;
  line-height: 50px;
  text-align: center;
  text-decoration: none;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
}

.button-74:hover {
  background-color: #fff;
}

.button-74:active {
  box-shadow: #422800 2px 2px 0 0;
  transform: translate(2px, 2px);
}

@media (min-width: 768px) {
  .button-74 {
    min-width: 120px;
    padding: 0 25px;
  }
}

.modal {
  display: none;
  position: fixed;
  z-index: 1;
  padding-top: 100px;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  /* background-color: rgb(0, 0, 0); */
  background-color: rgba(0, 0, 0, 0.4);
}



/* CSS */
.submitbtn {
  background-color: #13aa52;
  border: 1px solid #13aa52;
  border-radius: 4px;
  box-shadow: rgba(0, 0, 0, .1) 0 2px 4px 0;
  box-sizing: border-box;
  color: #fff;
  cursor: pointer;
  font-family: "Akzidenz Grotesk BQ Medium", -apple-system, BlinkMacSystemFont, sans-serif;
  font-size: 16px;
  font-weight: 400;
  outline: none;
  outline: 0;
  padding: 10px 25px;
  text-align: center;
  transform: translateY(0);
  transition: transform 150ms, box-shadow 150ms;
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;
  width : 20%;
}

.submitbtn:hover {
  box-shadow: rgba(0, 0, 0, .15) 0 3px 9px 0;
  transform: translateY(-2px);
}

@media (min-width: 768px) {
  .submitbtn{
    padding: 10px 30px;
  }
}

.li_step{
  font-size: 20px;
  font-weight: bold;
  line-height: 1.5;
  
}

h3 {
  font-weight: bold;

  font-size:40px;text-align:center; line-height:1.5em; padding-bottom:45px; font-family:"Playfair Display", serif; text-transform:uppercase;letter-spacing: 2px; color:#111;
}

.card-image {
  position: relative;
}


.image-icons {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-icons li {
  margin: 0 5px;
}

/* Adjust the height and width of the icons as per your requirements */
.image-icons img {
  height: 50px;
  width: 50px;
}

</style>
