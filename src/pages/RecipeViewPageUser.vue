<template>
  <div class="center">
    <div class="myTitle">
      <h1 style="text-align: center;">{{ this.title }}</h1>
    </div>
    <div class="card" style="width: 50rem;">
      
      <div class="card-image">

        <img :src="this.image" class="card-img-top" />
      <ul  class="image-icons">
          <li v-if="this.vegan">
            <img src="../assets/vegan.png" height="100px" width="100px" />
          </li>
          <li v-if="this.vegetarian">
            <img src="../assets/vegetarian.png" height="100px" width="100px" />
          </li>
          <li v-if="this.glutenFree">
            <img src="../assets/glutenfree.png" height="100px" width="100px" />
          </li>
        </ul>
      </div>
      
      <div class="card-body">
        
        <ul>
          <li class="my_li">
            <img src="../assets/clock_black.png" height="25px" width="25px" />
            {{ this.readyInMinutes }}
          </li>

          <li class="my_li">
            <img
              src="../assets/servings_black.png"
              height="25px"
              width="25px"
            />
            {{ this.servings }}
          </li>
        </ul>


        <h2>ingredients</h2>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Count</th>
            </tr>
          </thead>
          <tr
            v-for="ingredient in this.ingredients"
            :key="ingredient.ingredient_id"
          >
            <td>
              <img :src="getImageSrc(ingredient.imageURL)" />
            </td>
            <td>
              <h5>{{ ingredient.name }}</h5>
            </td>
            <td>
              <h5>{{ ingredient.amount }} {{ ingredient.unit }}</h5>
            </td>
          </tr>
        </table>

        <h2>instructions</h2>
        <ol>
          <li class="li_step"
            v-for="instruction in this.instructions"
            :key="instruction.step_number"
          >
            {{ instruction.description }}
          </li>
        </ol>
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
      vegan: "",
      vegetarian: "",
      glutenFree: "",
      servings: "",
      instructions: "",
      ingredients: "",
      prefix: "https://spoonacular.com/cdn/ingredients_100x100/",
    };
  },
  async created() {
    try {
      let recipeId = parseInt(this.$route.params.recipeId);
      let familyId = parseInt(this.$route.params.familyId);

      let response;
      if (familyId) {
        response = await this.$store.dispatch("getFamilyFullDetailsRecipe", {
          recipeId: recipeId,
          familyId: familyId,
        });
      } else {
        response = await this.$store.dispatch("getRecipe", {
          recipeId: recipeId,
        });
      }

      let recipe = response.recipe;

      let previewDetails = recipe.previewDetails[0];
      this.id = previewDetails.id;
      this.image = previewDetails.image;
      this.readyInMinutes = previewDetails.readyInMinutes;
      this.title = previewDetails.title;
      this.vegan = true ? previewDetails.vegan === 1 : false;
      this.vegetarian = true ? previewDetails.vegetarian === 1 : false;
      this.glutenFree = true ? previewDetails.glutenFree === 1 : false;
      this.servings = previewDetails.servings;
      this.instructions = recipe.steps;
      this.ingredients = recipe.ingredients;
    } catch (error) {
      console.log("error", error);
      this.$router.replace("/NotFound");
      return;
    }
  },
  methods: {
    getImageSrc(image) {
      return this.prefix + image;
    },
  },
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
}

.cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  list-style: none;
  margin: 0;
  padding: 0;
}

.cards_item {
  display: flex;
  padding: 1rem;
}

.card_image {
  height: calc(13 * 1.2rem);
  padding: 1.2rem 1.2rem 0;
  position: relative;
}
.card_image:before,
.card_image:after {
  content: "";
  position: absolute;
  width: 20px;
  left: 60%;
  top: 0;
  height: 45px;
  background: #e6e6e6b8;
  transform: rotate(45deg);
}
.card_image:after {
  transform: rotate(-45deg);
  top: auto;
  bottom: -22px;
  left: 40%;
}
.card_image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cards_item {
  filter: drop-shadow(0 0 5px rgba(0, 0, 0, 0.25));
}

.card {
  background-color: white;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-left: 30px;
  background: repeating-linear-gradient(
        #0000 0 calc(1.2rem - 1px),
        #66afe1 0 1.2rem
      )
      right bottom / 100% 100%,
    linear-gradient(red 0 0) 30px 0/2px 100% #fff;
  background-repeat: no-repeat;
  line-height: 1.2rem;
}

.card_content {
  padding: 1.2rem;
}

h2.card_title,
p {
  margin: 1.2rem 0;
}
h2.card_title {
  font-size: 1.3em;
}
body {
  font-family: monospace;
  background: #eee;
}

html {
  font-size: 15px;
}

.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
  margin-top: 160px;
}

/* .recipe-header{

} */

.table_responsive {
  max-width: 900px;
  border: 1px solid #00bcd4;
  background-color: #efefef33;
  padding: 15px;
  overflow: auto;
  margin: auto;
  border-radius: 4px;
}
table {
  width: 100%;
  font-size: 13px;
  color: #444;
  white-space: nowrap;
  border-collapse: collapse;
  background-color: #fff;
}
table > thead {
  background-color: #00bcd4;
  color: #fff;
}
table > thead th {
  padding: 15px;
}
table th,
table td {
  border: 1px solid #00000017;
  padding: 10px 15px;
}
table > tbody > tr > td > img {
  display: inline-block;
  width: 60px;
  height: 60px;
  object-fit: cover;
  border-radius: 50%;
  border: 4px solid #fff;
  box-shadow: 0 2px 6px #0003;
}
.action_btn {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.action_btn > a {
  text-decoration: none;
  color: #444;
  background: #fff;
  border: 1px solid;
  display: inline-block;
  padding: 7px 20px;
  font-weight: bold;
  border-radius: 3px;
  transition: 0.3s ease-in-out;
}
.action_btn > a:nth-child(1) {
  border-color: #26a69a;
}
.action_btn > a:nth-child(2) {
  border-color: orange;
}
.action_btn > a:hover {
  box-shadow: 0 3px 8px #0003;
}
table > tbody > tr {
  background-color: #fff;
  transition: 0.3s ease-in-out;
}
table > tbody > tr:nth-child(even) {
  background-color: rgb(238, 238, 238);
}
table > tbody > tr:hover {
  filter: drop-shadow(0px 2px 6px #0002);
}

ul {
  margin-top: 8px;
  list-style-type: none;
  padding: 0;
  overflow: hidden;
}

ul:first-child {
  padding: 0px;
}

li {
  padding: 30px;
}
.my_li{
  float: left;
}

/* }
.card {
  display: flex;
  flex-direction: column;
  width: 300px;
  margin-bottom: 60px;
  background-color: #ffffff;

  border: solid transparent;
}
.card > div {
  box-shadow: 0 15px 20px 0 rgba(0, 0, 0, 0.5);
} */

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 16px;
  text-decoration: none;
}
/* .card-text {
  margin: -30px auto;
  margin-bottom: -50px;
  height: 300px;
  width: 300px;
  color: #000000;
  padding: 20px;
}
.card-meal-type {
  font-style: italic;
}
.card-title {
  font-size: 1.6rem;
  margin-bottom: 20px;
  margin-top: 5px;
}
.card-body {
  font-size: 1.25rem;
} */
</style>
