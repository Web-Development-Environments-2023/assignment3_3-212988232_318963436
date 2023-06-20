<template>
  <div class="container">
    <h1 class="title">My Family Recipes</h1>
    <button @click="openAddRecipeModal">Add Recipe</button>
    <b-modal
      id="addRecipeToFamily"
      v-model="AddRecipeModalFamily"
      title="Add Recipe"
    >
      <table class="table">
        <thead>
          <tr>
            <th>image</th>
            <th>Name</th>
            <th>About</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in user_recipes" :key="recipe.id">
            <td>
              <img :src="recipe.image" width="50" height="50" />
            </td>
            <td>{{ recipe.title }}</td>
            <td>
              <b-form-input
                v-model="recipe.about"
                type="text"
                required
              ></b-form-input>
            </td>
            <td>
              <b-button
                variant="primary"
                @click="addRecipe(recipe, true)"
                type="submit"
                :disabled="!recipe.about"
                >Add</b-button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </b-modal>

    <RecipePreviewFamily
      v-for="recipe in recipes"
      :key="recipe.id"
      :recipe="recipe"
      class="RandomRecipes center"
    ></RecipePreviewFamily>

    <div v-if="recipes.length <= 0">
      <h3><b>There are no family recipes to show</b> <br /></h3>
    </div>
  </div>
</template>

<script>
import RecipePreviewFamily from "../components/RecipePreviewFamily";

export default {
  components: {
    RecipePreviewFamily,
  },
  data() {
    return {
      recipes: [],
      user_recipes: [],
      AddRecipeModalFamily: false,
    };
  },
  mounted() {
    this.updateRecipes();
    this.getUserRecipes();
  },
  methods: {
    async updateRecipes() {
      try {
        const familyId = this.$route.params.id; // Access the id from route params
        if (!familyId) {
          this.$router.push("/");
          return;
        }
        let response = await this.$store.dispatch("getFamilyRecipes", {
          familyId: familyId,
        });
        if (response.status !== 200) {
          console.log("Error loading recipes");
          this.recipes = [];
          return;
        }
        if (response.data.length === 0) {
          console.log("No recipes to show");
          this.recipes = [];
          return;
        }

        this.recipes = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getUserRecipes() {
      try {
        let response = await this.$store.dispatch("myRecipes");
        if (response.length === 0) {
          this.user_recipes = [];
          return;
        }
        this.user_recipes.push(...response);
        console.log("user_recipes", this.user_recipes);
      } catch (error) {
        console.log(error);
      }
    },

    openAddRecipeModal() {
      this.AddRecipeModalFamily = !this.AddRecipeModalFamily;
    },
    async addRecipe(recipe, isAdd) {
      try {
        // Assuming you have a method in your store to add a recipe
        const response = await this.$store.dispatch("addRecipeToFamily", {
          recipeId: recipe.id,
          familyId: this.$route.params.id,
          about: recipe.about,
          isAdd: isAdd,
        });
        if (response.status !== 201) {
          this.AddRecipeModalFamily = false;
          this.$root.toast(
            "Error adding recipe",
            "recipe already exists",
            "danger",
            true
          );
        }
        recipe.about = "";
        this.updateRecipes();
      } catch (error) {
        this.$root.toast(
          "Error adding recipe",
          "recipe already exists",
          "danger",
          true
        );
        recipe.about = "";
        this.AddRecipeModalFamily = false;
        console.log(error);
      }
    },
  },
};
</script>
