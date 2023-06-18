<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <b-row>
      <b-col v-for="r in recipes" :key="r.id">
        <RecipePreview
          class="recipePreview"
          :recipe="r"
          :UserRecipe="UserRecipe"
        />
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import RecipePreview from "./RecipePreview.vue";
export default {
  name: "RecipePreviewList",
  components: {
    RecipePreview,
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    isRandom: {
      type: String,
      default: "random",
    },
  },
  data() {
    return {
      recipes: [],
      UserRecipe: false,
    };
  },
  mounted() {
    this.updateRecipes();
    if (this.isRandom === "MyRecipes") {
      this.UserRecipe = true;
    }
  },
  methods: {
    async updateRecipes() {
      try {
        let response;
        console.log("this.isRandom", this.isRandom);
        if (this.isRandom === "random") {
          response = await this.$store.dispatch("randomRecipes");
        } else if (this.isRandom === "seen") {
          response = await this.$store.dispatch("seen");
        } else if (this.isRandom === "favorites") {
          response = await this.$store.dispatch("getFavorite");
        } else if (this.isRandom === "MyRecipes") {
          response = await this.$store.dispatch("myRecipes");
          response.map((recipe) => {
            recipe.vegan = true ? recipe.vegan === 1 : false;
            recipe.vegetarian = true ? recipe.vegetarian === 1 : false;
            recipe.glutenFree = true ? recipe.glutenFree === 1 : false;
          });
        }

        // "https://test-for-3-2.herokuapp.com/recipes/random"
        // console.log(response);
        const recipes = response;
        this.recipes = [];
        this.recipes.push(...recipes);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  min-height: 400px;
}
</style>
