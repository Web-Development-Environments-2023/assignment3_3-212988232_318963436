<template>
  <div class="container">
    <h1 class="title">My Recipes</h1>

    <RecipePreviewList
      title="Personal recipes"
      isRandom="MyRecipes"
      :UserRecipe="true"
    ></RecipePreviewList>

    <div id="addRecipe">
      <b-button @click="openCreateRecipeModal">Create Recipe</b-button>

      <b-modal
        v-model="showCreateRecipeModal"
        size="lg"
        title="Create Recipe"
        hide-footer
      >
        <b-form @submit.prevent="addRecipe" @reset="resetForm">
          <b-form-group label="Title" label-for="title" label-cols-sm="3">
            <b-form-input
              id="title"
              v-model="newRecipe.title"
              type="text"
              required
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Image URL"
            label-for="imageURL"
            label-cols-sm="3"
          >
            <b-form-input
              id="imageURL"
              v-model="newRecipe.imageURL"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Servings" label-for="servings" label-cols-sm="3">
            <b-form-input
              id="servings"
              v-model="newRecipe.servings"
              type="number"
              min="1"
              required
              default="1"
            ></b-form-input>
          </b-form-group>

          <b-form-group
            label="Ready In Minutes"
            label-for="readyInMinutes"
            label-cols-sm="3"
          >
            <b-form-input
              id="readyInMinutes"
              v-model="newRecipe.readyInMinutes"
              type="number"
              min="1"
              required
              default="1"
            ></b-form-input>
          </b-form-group>

          <b-form-group label-for="vegetarian" label-cols-sm="3">
            <b-form-checkbox id="vegetarian" v-model="newRecipe.vegetarian"
              >Vegetarian</b-form-checkbox
            >
          </b-form-group>

          <b-form-group label-for="vegan" label-cols-sm="3">
            <b-form-checkbox id="vegan" v-model="newRecipe.vegan"
              >Vegan</b-form-checkbox
            >
          </b-form-group>

          <b-form-group label-for="glutenFree" label-cols-sm="3">
            <b-form-checkbox id="glutenFree" v-model="newRecipe.glutenFree"
              >Gluten-Free</b-form-checkbox
            >
          </b-form-group>
          <div v-if="newRecipe.instructions.length > 0">
            <h3>Instructions:</h3>
            <div
              v-for="(instruction, index) in newRecipe.instructions"
              :key="index"
            >
              <div class="instruction-item">
                <p>{{ index + 1 }}. {{ instruction }}</p>
                <b-button
                  @click="deleteInstruction(index)"
                  variant="outline-secondary"
                  size="sm"
                  >-</b-button
                >
              </div>
            </div>
          </div>
          <b-button type="submit" variant="primary">Create Recipe</b-button>
          <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
        <div class="modal-footer">
          <b-button variant="primary" @click="openAddIngredientsModal"
            >Add Ingredients</b-button
          >
          <b-button variant="primary" @click="openAddInstructionsModal"
            >Add Instructions</b-button
          >
        </div>
      </b-modal>
      <b-modal v-model="showAddIngredientsModal" title="Add Ingredients">
        <b-form @submit.prevent="searchIngredients">
          <b-form-group
            label="Search"
            label-for="searchString"
            label-cols-sm="3"
          >
            <b-form-input
              id="searchString"
              v-model="searchString"
              type="text"
              required
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" variant="primary">Search</b-button>
        </b-form>
        <div v-if="ingredientResults.length > 0">
          <h3>Search Results:</h3>
          <div
            v-for="ingredient in ingredientResults"
            :key="ingredient.id"
            class="ingredient-card"
          >
            <b-card
              :title="ingredient.name"
              @click="selectIngredient(ingredient)"
            >
              <!-- Display additional information about the ingredient if needed -->
            </b-card>
          </div>
        </div>
        <div v-else>
          <p>No results found.</p>
        </div>
      </b-modal>
      <b-modal v-model="showAddInstructionsModal" title="Add Instructions">
        <b-form @submit.prevent="addInstructions">
          <b-form-group
            label="Instructions"
            label-for="instructions"
            label-cols-sm="3"
          >
            <b-form-textarea
              id="instructions"
              v-model="newInstruction"
              type="text"
              required
            ></b-form-textarea>
          </b-form-group>
          <b-button @click="addInstruction" variant="primary">Add</b-button>
        </b-form>
      </b-modal>

      <!-- ... Other modals ... -->
    </div>
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";

export default {
  components: {
    RecipePreviewList,
  },
  data() {
    return {
      username: this.$store.state.username,
      recipes: [],
      showCreateRecipeModal: false,
      showAddIngredientsModal: false,
      showAddInstructionsModal: false,
      newRecipe: {
        title: "",
        imageURL: "",
        readyInMinutes: 0,
        servings: 1,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        instructions: [],
        ingredients: [],
      },
      searchString: "",
      ingredientResults: [],
      newInstruction: "",
    };
  },
  methods: {
    openCreateRecipeModal() {
      this.showCreateRecipeModal = true;
    },

    async addRecipe() {
      // Perform the logic to add the recipe using this.newRecipe data
      // You can access the form input values from this.newRecipe object
      // Also, add the selected ingredients from this.newRecipe.ingredients
      // Reset the form and close the modal if needed
      this.showCreateRecipeModal = false;
      try {
        let previewDetails = {
          title: this.newRecipe.title,
          image: this.newRecipe.imageURL,
          readyInMinutes: this.newRecipe.readyInMinutes,
          vegiterian: this.newRecipe.vegetarian,
          vegan: this.newRecipe.vegan,
          glutenfree: this.newRecipe.glutenFree,
        };
        let instructions = this.newRecipe.instructions.map((instruction) => {
          return {
            step_number: this.newRecipe.instructions.indexOf(instruction),
            description: instruction,
          };
        });
        let ingredients = this.newRecipe.ingredients.map((ingredient) => {
          return {
            ingredient_id: ingredient.id,
            name: ingredient.name,
            amount: ingredient.amount,
            unit: ingredient.unit,
            imageURL: ingredient.image,
          };
        });
        if (ingredients.length == 0) {
          ingredients = [];
        }
        let recipe = {
          recipe: {
            previewDetails: previewDetails,
            steps: instructions,
            ingredients: ingredients,
            servings: this.newRecipe.servings,
          },
        };
        console.log("this final recipe", recipe);
        let response = await this.$store.dispatch("addRecipe", recipe);
        console.log("response", response);
        if (response.status == 200) {
          this.resetForm();
          this.$root.toast(
            "Create Recipe",
            "Recipe created successfuly",
            "success"
          );
        }
      } catch (error) {
        console.log(error);
        this.$root.toast("Create Recipe", "Recipe created failed", "danger");
      }
    },
    resetForm() {
      this.newRecipe = {
        title: "",
        imageURL: "",
        readyInMinutes: 0,
        servings: 0,
        vegetarian: false,
        vegan: false,
        glutenFree: false,
        instructions: [],
        ingredients: [],
      };
    },
    openAddIngredientsModal() {
      this.showAddIngredientsModal = true;
    },
    async searchIngredients() {
      // Perform the logic to search for ingredients based on this.searchString
      // Populate this.ingredientResults with the search results
      // You can use an API call or any other method to get the results
      try {
        let response = await this.$store.dispatch("getIngredients", {
          query: this.searchString,
        });
        this.ingredientResults = response.data;
      } catch (error) {
        console.log(error);
        this.ingredientResults = [];
      }
    },
    selectIngredient(ingredient) {
      this.newRecipe.ingredients.push(ingredient);
      this.showAddIngredientsModal = false;
    },
    openAddInstructionsModal() {
      this.showAddInstructionsModal = true;
    },
    addInstruction() {
      if (this.newInstruction) {
        this.newRecipe.instructions.push(this.newInstruction);
        this.newInstruction = "";
      }
    },
    deleteInstruction(index) {
      this.newRecipe.instructions.splice(index, 1);
    },
    addInstructions() {
      // Perform the logic to add the instructions from this.newInstruction
      // to this.newRecipe.instructions
      this.newInstruction = "";
      this.showAddInstructionsModal = false;
    },
  },
};
</script>

<style>
.container {
  max-width: 800px;
  margin: 0 auto;
}

.title {
  margin-top: 30px;
  margin-bottom: 20px;
  text-align: center;
}

#addRecipe {
  margin-top: 20px;
}

.instruction-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.modal-footer {
  justify-content: flex-start;
}
</style>
