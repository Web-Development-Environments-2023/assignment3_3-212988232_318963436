<template>
  <div class="container">
    <h1 class="title">My Recipes</h1>
    <b-button @click="openCreateRecipeModal">Create Recipe</b-button>
    <RecipePreviewList
      title="Personal recipes"
      isRandom="MyRecipes"
      :UserRecipe="true"
      ref="recipePreviewList"
    ></RecipePreviewList>

    <div id="addRecipe">
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

            <div>
              <div class="instruction-item">
                <ol style="width: 100%; ">
                  <li
                    v-for="(instruction, index) in newRecipe.instructions"
                    :key="index"
                  >
                    <div class="instruction-item">
                      <p>{{ instruction }}</p>
                      <b-button
                        @click="deleteInstruction(index)"
                        variant="outline-secondary"
                        size="sm"
                        >-</b-button
                      >
                    </div>
                  </li>
                </ol>
              </div>
            </div>
          </div>
          <div v-if="newRecipe.ingredients.length > 0">
            <h3>Ingredients:</h3>
            <div>
              <div class="instruction-item">
                <ul style="width: 100%; ">
                  <li
                    v-for="(ingredient, index) in newRecipe.ingredients"
                    :key="index"
                  >
                    <div class="instruction-item">
                      <p>
                        {{ ingredient.name }},{{ ingredient.amount }}
                        {{ ingredient.unit }}
                      </p>
                      <b-button
                        @click="deleteIngredient(index)"
                        variant="outline-secondary"
                        size="sm"
                        >-</b-button
                      >
                    </div>
                  </li>
                </ul>
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
      <b-modal
        v-model="showAddIngredientsModal"
        title="Add Ingredients"
        hide-footer
      >
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
          <table class="table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Units</th>
                <th>Add</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="ingredient in ingredientResults" :key="ingredient.id">
                <td>
                  <img
                    :src="getImageSrc(ingredient.image)"
                    :alt="ingredient.name"
                    width="50"
                    height="50"
                  />
                </td>
                <td>{{ ingredient.name }}</td>
                <td>
                  <b-form-input
                    v-model="ingredient.amountToAdd"
                    type="number"
                    min="1"
                    required
                  ></b-form-input>
                </td>
                <td>
                  <b-form-select
                    v-model="ingredient.unitToAdd"
                    :options="unitOfMeasureOptions"
                    required
                  ></b-form-select>
                </td>
                <td>
                  <b-button
                    variant="primary"
                    @click="addIngredient(ingredient)"
                    type="submit"
                    :disabled="!ingredient.amountToAdd || !ingredient.unitToAdd"
                    >Add</b-button
                  >
                </td>
              </tr>
            </tbody>
          </table>
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
      UserSelectIngredient: null,
      prefix: "https://spoonacular.com/cdn/ingredients_100x100/",
      unitOfMeasureOptions: [
        { value: "g", text: "g" },
        { value: "kg", text: "kg" },
        { value: "ml", text: "ml" },
        { value: "l", text: "l" },
        { value: "tsp", text: "tsp" },
        { value: "tbsp", text: "tbsp" },
        { value: "cup", text: "cup" },
        { value: "piece", text: "piece" },
      ],
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
          vegetarian: this.newRecipe.vegetarian,
          vegan: this.newRecipe.vegan,
          glutenFree: this.newRecipe.glutenFree,
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

        let response = await this.$store.dispatch("addRecipe", recipe);
        if (response.status == 200) {
          this.resetForm();
          this.$root.toast(
            "Create Recipe",
            "Recipe created successfuly",
            "success"
          );
          this.$refs.recipePreviewList.updateRecipes();
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
        console.log("this.searchString", this.searchString);
        let response = await this.$store.dispatch("getIngredients", {
          query: this.searchString,
        });
        console.log("response", response);
        if (response.status != 200) {
          this.ingredientResults = [];
        } else {
          this.ingredientResults = response.data;
        }
      } catch (error) {
        console.log(error);
        this.ingredientResults = [];
      }
    },
    addIngredient(ingredient) {
      // Check if the ingredient is already in the list
      const existingIngredient = this.newRecipe.ingredients.find(
        (e) => e.id === ingredient.id
      );
      if (existingIngredient) {
        // Ingredient already exists, update the amount and unit
        existingIngredient.amount =
          parseInt(existingIngredient.amount) +
          parseInt(ingredient.amountToAdd);
        existingIngredient.unit = ingredient.unitToAdd;
      } else {
        // Ingredient is new, add it to the list
        ingredient.amount = parseInt(ingredient.amountToAdd);
        ingredient.unit = ingredient.unitToAdd;
        this.newRecipe.ingredients.push(ingredient);
      }

      // Close the modal
      this.showAddIngredientsModal = false;
    },

    openAddInstructionsModal() {
      this.showAddInstructionsModal = true;
    },
    addInstructions() {
      // Add the new instruction to this.newRecipe.instructions array
      // and close the modal if needed
      this.newRecipe.instructions.push(this.newInstruction);
      this.newInstruction = "";
      this.showAddInstructionsModal = false;
    },
    addInstruction() {
      if (this.newInstruction !== "") {
        this.newRecipe.instructions.push(this.newInstruction);
        this.newInstruction = "";
      }
    },
    deleteInstruction(index) {
      this.newRecipe.instructions.splice(index, 1);
    },
    deleteIngredient(index) {
      this.newRecipe.ingredients.splice(index, 1);
    },
    getImageSrc(image) {
      return this.prefix + image;
    },
  },
};
</script>

<style scoped>
.container {
  padding: 20px;
}

.title {
  text-align: center;
}

#addRecipe {
  margin-top: 20px;
}

.instruction-item {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.instruction-item p {
  margin-bottom: 0;
  flex: 1;
}

.ingredient-card {
  margin-bottom: 20px;
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
</style>
