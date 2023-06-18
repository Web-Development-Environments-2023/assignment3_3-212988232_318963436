<template>
  <div class="container">
    <h1 class="title">Search Page</h1>
    <b-form @submit.prevent="search" @reset.prevent="onReset">
      <b-form-group
        id="input-group-query"
        label-cols-sm="3"
        label="query:"
        label-for="query"
      >
        <b-form-input id="query" type="text"></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-number"
        label-cols-sm="3"
        label="number:"
        label-for="number"
      >
        <b-form-input id="number" type="number"></b-form-input>
      </b-form-group>
      <b-form-group
        id="input-group-cousine"
        label-cols-sm="3"
        label="cousine:"
        label-for="cousine"
      >
        <b-form-select id="cousine" :options="cousines"></b-form-select>
      </b-form-group>
      <b-form-group
        id="input-group-diets"
        label-cols-sm="3"
        label="diet:"
        label-for="diet"
      >
        <b-form-select id="diet" :options="diets"></b-form-select>
      </b-form-group>
      <b-form-group
        id="input-group-intolernce"
        label-cols-sm="3"
        label="intolerance:"
        label-for="intolerance"
      >
        <b-form-select id="intolerance" :options="intolerances"></b-form-select>
        <b-form-invalid-feedback>
          Country is required
        </b-form-invalid-feedback>
      </b-form-group>
    </b-form>

    <b-button type="reset" variant="danger">Reset</b-button>
    <b-button type="submit" variant="success">Search</b-button>
    <b-container>
      <h3>
        results:
      </h3>
      <b-row>
        <b-col v-for="r in recipes" :key="r.id">
          <RecipePreview class="recipePreview" :recipe="r" />
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import {
  required,
  minLength,
  maxLength,
  alpha,
  sameAs,
  email,
} from "vuelidate/lib/validators";
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
        cousine: null,
        diet: null,
        intolerance: null,
        number: 3,
      },

      cuisines: [{ value: null, text: "", disabled: true }],
      diets: [{ value: null, text: "", disabled: true }],
      intolerances: [{ value: null, text: "", disabled: true }],
    };
  },
  mounted() {
    console.log("mounted");
    console.log("cuisines", cuisines);
    this.cuisines.push(...cuisines);
    this.diets.push(...diets);
    this.intolerances.push(...intolerances);
  },
  methods: {
    onReset() {
      this.form = {
        query: "",
        cousine: null,
        diet: null,
        intolerance: null,
        number: 3,
      };
      this.$nextTick(() => {
        this.$v.$reset();
      });
    },
    async search() {
      try {
        query, number, cuisine, diet, intolerances;
        let response = this.$store.dispatch(
          "search",
          this.form.query,
          this.form.number,
          this.form.cuisine,
          this.form.diet,
          this.form.intolerances
        );

        if (response.status == 200) {
          this.recipes = [];
          this.recipes.push(...response.data);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style></style>
