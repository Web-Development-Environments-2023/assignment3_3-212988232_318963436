<template>
  <div class="center">
    <div class="card" style="width: 50rem;">
      <h3 class="card-title">{{ this.title }}</h3>
      <img :src="this.image" class="card-img-top" />
      <div class="card-body">
        <p class="card-text">
          {{ this.readyInMinutes }} minutes <br />
          {{ this.servings }} servings <br />{{ this.vegan }} vegan <br />{{
            this.vegetarian
          }}
          vegetarian <br />{{ this.glutenFree }} glutenFree <br />{{
            this.favorite
          }}
          favorite <br />{{ this.seen }} seen
        </p>
        <h5>ingredients</h5>
        <b-container>
          <b-row>
            <b-col v-for="ingredient in this.ingredients" :key="ingredient.id">
              <h3>{{ ingredient.name }}:</h3>
              <div class="card" style="width: 18rem;">
                <img
                  :src="getImageSrc(ingredient.image)"
                  class="card-img-top"
                />
                <div class="card-body">
                  <p class="card-text">
                    <br />
                    amount : {{ ingredient.amount.us.value }} <br />
                    units : {{ ingredient.amount.us.unit }}
                  </p>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container>

        <ul>
          <li v-for="ingredient in this.ingredients" :key="ingredient.id">
            {{ ingredient.name }} {{ ingredient.amount.us.value }}
            {{ ingredient.amount.us.unit }}
          </li>
        </ul>
        <h5>instructions</h5>
        <ol>
          <li v-for="instruction in this.instructions" :key="instruction.id">
            {{ instruction.step }}
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
      favorite: "",
      seen: "",
      instructions: "",
      ingredients: "",
      prefix: "https://spoonacular.com/cdn/ingredients_50x50/",
    };
  },
  async created() {
    try {
      let recipeId = parseInt(this.$route.params.recipeId);
      console.log("this.recipeId", recipeId);
      let response;
      response = await this.$store.dispatch("recipe", { recipeId: recipeId });
      console.log("response", response);
      if (!response.id === recipeId) {
        this.$router.replace("/NotFound");
        return;
      }

      const {
        id,
        title,
        readyInMinutes,
        image,
        vegan,
        vegetarian,
        glutenFree,
        servings,
        favorite,
        seen,
        instructions,
        ingredients,
      } = response; // Use destructuring to assign response properties

      // Assign the values to component data properties
      this.id = id;
      this.title = title;
      this.readyInMinutes = readyInMinutes;
      this.image = image;
      this.vegan = vegan;
      this.vegetarian = vegetarian;
      this.glutenFree = glutenFree;
      this.servings = servings;
      this.favorite = favorite;
      this.seen = seen;
      this.instructions = instructions;
      this.ingredients = ingredients;

      console.log("response", response);
      console.log(
        "title",
        title,
        "image",
        image,
        "id",
        id,
        "instructions",
        instructions,
        "ingredients",
        ingredients,
        "readyInMinutes",
        readyInMinutes,
        "vegan",
        vegan,
        "vegetarian",
        vegetarian,
        "glutenFree",
        glutenFree,
        "servings",
        servings,
        "favorite",
        favorite,
        "seen",
        seen
      );
    } catch (error) {
      console.log("error.response.status", error.response.status);
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
/* .recipe-header{

} */
</style>
