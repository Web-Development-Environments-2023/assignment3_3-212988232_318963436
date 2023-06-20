<template>
  <div>
    <div class="myTitle">
      <button
        style="margin-top: 10px;"
        v-if="recipes.length > 0 && isMyRecipe()"
        @click="openDeleteRecipeModal"
        class="button-74"
      >
        Delete Recipe
      </button>
      <div style="margin-top: -60px;" v-if="isMyRecipe()">
        <h2 style="text-align: center;">
          {{ title }}
        </h2>
      </div>
      <div v-if="!isMyRecipe()">
        <h2 style="text-align: center;">
          <img
            @click="ReRandomRecipes"
            src="../assets/refresh.png"
            style="cursor: pointer;"
            title="refresh"
            alt="refresh"
            v-if="isRandomfunc()"
          />
          {{ title }}
        </h2>
      </div>
    </div>
    <div>
      <div v-if="isMyRecipe()">
        <b-modal
          id="DeleteRecipe"
          v-model="showDeleteRecipeModal"
          title="Delete Recipe"
          hide-footer
          class="Modal"
        >
          <table class="table">
            <thead>
              <tr>
                <th>image</th>
                <th>Name</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="recipe in recipes" :key="recipe.id">
                <td>
                  <img :src="recipe.image" width="50" height="50" />
                </td>
                <td>{{ recipe.title }}</td>
                <td>
                  <b-button
                    variant="danger"
                    @click="ReamoveRecipe(recipe)"
                    type="submit"
                    >Remove</b-button
                  >
                </td>
              </tr>
            </tbody>
          </table>
        </b-modal>
      </div>
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
      showDeleteRecipeModal: false,
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
    async ReRandomRecipes() {
      await this.updateRecipes();
    },
    isRandomfunc() {
      return this.isRandom === "random";
    },
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
        this.recipes = [];
        const recipesGet = response;

        this.recipes.push(...recipesGet);
        // console.log(this.recipes);
      } catch (error) {
        console.log(error);
      }
    },

    isMyRecipe() {
      if (this.isRandom === "MyRecipes") {
        return true;
      } else {
        return false;
      }
    },
    openDeleteRecipeModal() {
      this.showDeleteRecipeModal = true;
    },
    async ReamoveRecipe(recipe) {
      try {
        let response = await this.$store.dispatch("deleteRecipe", {
          recipeId: recipe.id,
        });
        if (response.status == 200) {
          this.$root.toast(
            "Delete Recipe",
            "Recipe deleted successfuly",
            "success"
          );
          this.showDeleteRecipeModal = false;
          await this.updateRecipes();
        }
      } catch (error) {
        console.log(error);
        this.$root.toast("Delete Recipe", "Recipe deleted failed", "danger");
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
