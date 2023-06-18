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
        <h5>ingredients</h5>
        <div class="card-group">
          <b-container>
            <div
              v-for="ingredient in this.ingredients"
              :key="ingredient.ingredient_id"
              class="card"
              width="50rem"
              height="50rem"
            >
              <!-- <img
                :src="getImageSrc(ingredient.imageURL)"
                class="card-img-top"
              /> -->
              <div class="card-body">
                <h5 class="card-title">{{ ingredient.name }}</h5>
                <p class="card-text">
                  <br />
                  amount : {{ ingredient.amount }} <br />
                  units : {{ ingredient.unit }}
                </p>
              </div>
            </div>
          </b-container>
          <h5>instructions</h5>

          <ol>
            <br />
            <li
              v-for="instruction in this.instructions"
              :key="instruction.step_id"
            >
              {{ instruction.description }}
            </li>
          </ol>
        </div>
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
      console.log("this.recipeId", recipeId);
      let response;
      response = await this.$store.dispatch("getRecipe", {
        recipeId: recipeId,
      });
      console.log("response herererer", response);
      let recipe = response.recipe;
      console.log("recipe", recipe);
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
      console.log("this.ingredients", this.ingredients);
      console.log("this.instructions", this.instructions);
      console.log("this.title", this.title);
    } catch (error) {
      console.log("error", error);
      this.$router.replace("/NotFound");
      return;
    }
  },
  methods: {
    getImageSrc(image) {
      if (this.UserRecipe) {
        return image;
      }
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

/* .recipe-header{
  
  } */
</style>
