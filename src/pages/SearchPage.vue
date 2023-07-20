<template>
  <div class="container">
    <div class="myTitle">
      <h1>Search</h1>
    </div>
    <b-form @submit.prevent="search" @reset.prevent="onReset">
      <b-form-group
        id="input-group-query"
        label-cols-sm="3"
        label="query:"
        label-for="query"
      >
        <b-form-input
          id="query"
          type="text"
          v-model="$v.form.query.$model"
          :state="validateState('query')"
        ></b-form-input>
        <b-form-invalid-feedback v-if="!$v.form.query.required">
          query is required
        </b-form-invalid-feedback>
      </b-form-group>
      <b-form-group
        id="input-group-number"
        label-cols-sm="3"
        label="number:"
        label-for="number"
      >
        <b-form-input
          id="number"
          type="number"
          min="1"
          max="100"
          defualt="3"
          v-model="form.number"
        ></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-cuisine"
        label-cols-sm="3"
        label="cuisine:"
        label-for="cuisine"
      >
        <b-form-select
          id="cuisine"
          :options="cuisines"
          v-model="form.cuisine"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        id="input-group-diets"
        label-cols-sm="3"
        label="diet:"
        label-for="diet"
      >
        <b-form-select
          id="diet"
          :options="diets"
          v-model="form.diet"
        ></b-form-select>
      </b-form-group>
      <b-form-group
        id="input-group-intolernce"
        label-cols-sm="3"
        label="intolerance:"
        label-for="intolerance"
      >
        <b-form-select
          id="intolerance"
          :options="intolerances"
          v-model="form.intolerance"
        ></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>
      <div style="float: right;">
        <b-button type="reset" variant="danger" style="margin-right: 20px;"
          >Reset</b-button
        >
        <b-button type="submit" variant="success">Search</b-button>
      </div>
    </b-form>

    <b-container v-if="this.recipes.length > 0">
      <h3>
        results:
      </h3>
      <div class="container">
        <RecipePreview
          v-for="r in recipes"
          :key="r.id"
          class="recipePreview"
          :recipe="r"
        />
      </div>
    </b-container>
    <b-container v-else>
      <h3>
        there are no results
      </h3>
    </b-container>
  </div>
</template>

<script>
import { required, alpha } from "vuelidate/lib/validators";
import RecipePreview from "../components/RecipePreview";
import { cuisines, diets, intolerances } from "../assets/filters";
export default {
  components: {
    RecipePreview,
  },
  data() {
    return {
      recipes: [],
      form: {
        query: "",
        cuisine: null,
        diet: null,
        intolerance: null,
        number: 3,
      },
      errors: [],
      validated: false,
      cuisines: [{ value: null, text: "", disabled: true }],
      diets: [{ value: null, text: "", disabled: true }],
      intolerances: [{ value: null, text: "", disabled: true }],
    };
  },
  validations: {
    form: {
      query: {
        required,
      },
      number: {
        required,
        max: (value) => value <= 100,
        min: (value) => value >= 1,
      },
    },
  },
  mounted() {
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
  },

  methods: {
    validateState(param) {
      const { $dirty, $error } = this.$v.form[param];
      return $dirty ? !$error : null;
    },
    onReset() {
      this.form = {
        query: "",
        cuisine: null,
        diet: null,
        intolerance: null,
        number: 3,
      };
    },
    async search() {
      try {
        let response = await this.$store.dispatch("search", {
          query: this.form.query,
          cuisine: this.form.cuisine,
          diet: this.form.diet,
          intolerance: this.form.intolerance,
          number: this.form.number,
        });
        console.log("this is respose", response);
        if (response.status == 200) {
          this.recipes = [];
          this.recipes.push(...response.data);
        }
      } catch (error) {
        console.log(error);
        this.$router.replace("/NotFound");
      }
    },
  },
};
</script>

<style></style>
