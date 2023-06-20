<template>
   

    <div >
       <div class="myTitle">
    <h2 style="text-align: center;">
      {{ title }}
    </h2>
  </div>
<div>
        <RecipePreview
        v-for="r in recipes"
        :key="r.id"
        class="recipePreview"
        :recipe="r"
        :UserRecipe="UserRecipe"
      />
</div>

    </div>
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
    if (this.isRandom === "MyRecipes") {
      this.UserRecipe = true;
      console.log("this.UserRecipe", this.UserRecipe);
    }
    this.updateRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        let response;
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
  width: 100vw;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
.container2 {
  width: 100vw;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}
</style>
