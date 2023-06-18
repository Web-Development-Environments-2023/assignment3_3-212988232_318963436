<template>
  <b-container>
    <h3>
      {{ title }}:
      <slot></slot>
    </h3>
    <div class="container">
        <RecipePreview  v-for="r in recipes" :key="r.id" class="recipePreview" :recipe="r" />
  </div>
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
    };
  },
  mounted() {
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
.container{
  width:100vw;
  display:flex;
  justify-content:space-around;
  flex-wrap:wrap;
  padding:40px 20px;
}
</style>
