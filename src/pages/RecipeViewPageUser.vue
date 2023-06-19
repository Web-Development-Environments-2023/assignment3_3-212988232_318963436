<template>
  <div class="center">
    <div class="card" style="width: 50rem;">
      <h3 class="card-title" style="text-align: center;">{{ this.title }}</h3>
      <img :src="this.image" class="card-img-top" />
      <div class="card-body">
        <p class="card-text">
          {{ this.readyInMinutes }} minutes <br />
          {{ this.servings }} servings <br />
          {{ this.vegan }} vegan <br />
          {{ this.vegetarian }} vegetarian <br />
          {{ this.glutenFree }} glutenFree <br />
        </p>

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
          <li
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

      let response;
      response = await this.$store.dispatch("getRecipe", {
        recipeId: recipeId,
      });

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
}

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
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 16px;
  text-decoration: none;
}
.card-text {
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
}
</style>
