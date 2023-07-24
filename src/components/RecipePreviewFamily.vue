<template>
  <div class="card">
    <div class="card-text">
      <div height="50px">
        <div class="card-image">
          <router-link
            :to="{
              name: 'recipeUser',
              params: { recipeId: this.id, familyId: this.familyId },
            }"
            type="button"
          >
            <img
              :src="this.image"
              class="card__img"
              @error="handleImageError"
            />
          </router-link>

          <ul class="image-icons">
            <li>
              <img
                src="../assets/vegan.png"
                height="50px"
                width="50px"
                v-if="this.vegan"
              />
            </li>
            <li>
              <img
                src="../assets/vegetarian.png"
                height="50px"
                width="50px"
                v-if="this.vegetarian"
              />
            </li>
            <li>
              <img
                src="../assets/glutenfree.png"
                height="50px"
                width="50px"
                v-if="this.glutenFree"
              />
            </li>
          </ul>
        </div>
      </div>
    </div>

    <ul class="card-text">
      <li style="color: white;">
        <img src="../assets/clock.png" height="25px" width="25px" />
        {{ this.readyInMinutes }}
      </li>
      <li style="color: white;">
        <img src="../assets/servings.png" height="25px" width="25px" />
        {{ this.servings }}
      </li>
    </ul>

    <div class="card-footer">
      <div class="card-footer-text">
        <p>Created by: {{ owner }}</p>
        <p>Created at: {{ date }}</p>
        <p>Summary: {{ this.data }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      title: "",
      readyInMinutes: "",
      image: "",
      vegan: false,
      vegetarian: false,
      glutenFree: false,
      servings: "",
      recipe_date: "",
      data: "",
      firstname: "",
      lastname: "",
    };
  },
  methods: {
    handleImageError(event) {
      event.target.src =
        "data:image/png;base64,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";
    },
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
  },
  created() {
    this.id = this.recipe.id;
    this.title = this.recipe.title;
    this.readyInMinutes = this.recipe.readyInMinutes;
    this.image = this.recipe.image;
    this.vegan = true ? this.recipe.vegan === 1 : false;
    this.vegetarian = true ? this.recipe.vegetarian === 1 : false;
    this.glutenFree = true ? this.recipe.glutenFree === 1 : false;
    this.servings = this.recipe.servings;
    this.recipe_date = this.recipe.recipe_date;
    this.data = this.recipe.data;
    this.firstname = this.recipe.firstname;
    this.lastname = this.recipe.lastname;
  },

  computed: {
    owner() {
      return this.firstname + " " + this.lastname;
    },
    date() {
      const dateObj = new Date(this.recipe_date);
      let day = dateObj.toLocaleDateString("en-GB", { day: "2-digit" });
      let month = dateObj.toLocaleDateString("en-GB", { month: "2-digit" });
      let year = dateObj.toLocaleDateString("en-GB", { year: "2-digit" });

      return `${day}/${month}/${year} `;
    },
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400;1,900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Playfair Display", serif;
}
body {
  background: url(https://images.unsplash.com/photo-1495195129352-aeb325a55b65?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1776&q=80);
  background-size: cover;
  background-position: right;
  background-attachment: fixed;
}
#header {
  margin: 20px;
}
#header > h1 {
  text-align: center;
  font-size: 3rem;
}
#header > p {
  text-align: center;
  font-size: 1.5rem;
  font-style: italic;
}
.container {
  width: 100vw;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 40px 20px;
}
.card {
  position: relative;
  width: calc(33.33% - 20px); /* Adjust the width as per your requirements */
  margin: 10px;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  background-color: rgb(21, 18, 18);
  padding-bottom: 30px;
}

.card-image {
  position: relative;
}

.card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(calc(1 + (var(--hover, 0) * 0.25)))
    rotate(calc(var(--hover, 0) * -5deg));
  transition: transform 0.2s;
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

#table {
  border-collapse: collapse;
  border-spacing: 0;
}
#td {
  width: 100px;
  height: 50px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 16px;
  text-decoration: none;
}

.card:is(:hover, :focus-visible) {
  --hover: 1;
}

p {
  color: white;
  font-style: italic;
  font-size: 1.2rem;
}
</style>
