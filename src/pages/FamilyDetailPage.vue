<template>
  <div class="container">
    <div class="myTitle">
      <h1>{{ this.name }} Family Page</h1>
    </div>
    <div>
      <button @click="openAddRecipeModal" class="button-74">Add Recipe</button>
    </div>
    <div id="RecipePreviewFamily_DIV">
      <RecipePreviewFamily
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"
        class="RandomRecipes center"
      ></RecipePreviewFamily>
    </div>

    <b-modal
      id="addRecipeToFamily"
      v-model="AddRecipeModalFamily"
      title="Add Recipe"
      hide-footer
      class="Modal"
      hide-backdrop
    >
      <table class="table">
        <thead>
          <tr>
            <th>image</th>
            <th>Name</th>
            <th>About</th>
            <th>Add/Remove</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="recipe in user_recipes" :key="recipe.id">
            <td>
              <img
                :src="recipe.image"
                width="50"
                height="50"
                @error="handleImageError"
              />
            </td>
            <td>{{ recipe.title }}</td>
            <td>
              <b-form-input
                v-model="recipe.about"
                type="text"
                required
                :disabled="!checkAddRemovefunc(recipe)"
              ></b-form-input>
            </td>
            <td>
              <b-button
                v-if="checkAddRemovefunc(recipe)"
                variant="primary"
                @click="addRecipe(recipe, true)"
                type="submit"
                >Add</b-button
              >
              <b-button
                v-else
                variant="danger"
                @click="addRecipe(recipe, false)"
                type="submit"
                >Remove</b-button
              >
            </td>
          </tr>
        </tbody>
      </table>
    </b-modal>

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
      name: "",
    };
  },
  computed: {
    checkAddRemove(recipe) {
      return checkAddRemovefunc(recipe);
    },
  },

  mounted() {
    this.updateRecipes();
    this.getUserRecipes();
  },
  methods: {
    handleImageError(event) {
      event.target.src =
        "data:image/png;base64,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";
    },
    async updateRecipes() {
      try {
        const familyId = this.$route.params.id; // Access the id from route params
        this.name = this.$route.params.name;
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
        this.recipes = [];
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
        if (isAdd && !recipe.about) {
          this.$root.toast(
            "Error adding recipe",
            "please enter a description",
            "danger",
            true
          );
          return;
        }
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
    checkAddRemovefunc(recipe) {
      try {
        let flag = true;
        this.recipes.map((rec) => {
          if (rec.id === recipe.id) {
            flag = false;
            return;
          }
        });
        return flag;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>
