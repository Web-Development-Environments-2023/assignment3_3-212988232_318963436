<template>
  <div class="center">
    <div class="card" style="width: 50rem;">
      <h3 class="card-title">{{ this.title }}</h3>
      <img :src="this.image" class="card-img-top" />
      <div class="card-body">
        <p class="card-text">
          {{ this.readyInMinutes }} minutes <br />
          {{ this.servings }} servings <br />{{ this.vegan }} vegan <br />{{
            this.vegetarian
          }}
          vegetarian <br />{{ this.glutenFree }} glutenFree <br />{{
            this.favorite
          }}
          favorite <br />{{ this.seen }} seen <br />
          <input
            id="favorite"
            type="button"
            value="favorite"
            @click="setFavorite"
          />
          <input
            id="unfavorite"
            type="button"
            value="unfavorite"
            @click="setFavorite"
          />
        </p>
        <h5>ingredients</h5>
        <!-- <b-container>
          <b-row>
            <b-col v-for="ingredient in this.ingredients" :key="ingredient.id">
              <h3>{{ ingredient.name }}:</h3>
              <div class="card" style="width: 6rem;height: 6rem;">
                <img
                  :src="getImageSrc(ingredient.image)"
                  class="card-img-top"
                />
                <div class="card-body">
                  <p class="card-text">
                    <br />
                    amount : {{ ingredient.amount.us.value }} <br />
                    units : {{ ingredient.amount.us.unit }}
                  </p>
                </div>
              </div>
            </b-col>
          </b-row>
        </b-container> -->
        <b-container>
          <div class="card-group">
            <div
              v-for="ingredient in this.ingredients"
              :key="ingredient.id"
              class="card"
              width="7rem"
              height="7rem"
            >
              <img :src="getImageSrc(ingredient.image)" class="card-img-top" />
              <div class="card-body">
                <h5 class="card-title">{{ ingredient.name }}</h5>
                <p class="card-text">
                  <br />
                  amount : {{ ingredient.amount.us.value }} <br />
                  units : {{ ingredient.amount.us.unit }}
                </p>
                <p class="card-text">
                  <small class="text-body-secondary"
                    >Last updated 3 mins ago</small
                  >
                </p>
              </div>
            </div>
          </div>
        </b-container>
        <h5>instructions</h5>
        <ol>
          <li v-for="instruction in this.instructions" :key="instruction.id">
            {{ instruction.step }}
          </li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      id: "",
      title: "",
      readyInMinutes: "",
      image: "",
      vegan: "",
      vegetarian: "",
      glutenFree: "",
      servings: "",
      favorite: "",
      seen: "",
      instructions: "",
      ingredients: "",
      prefix: "https://spoonacular.com/cdn/ingredients_100x100/",
    };
  },
  async created() {
    try {
      let recipeId = parseInt(this.$route.params.recipeId);
      console.log("this.recipeId", recipeId);
      let response;
      response = await this.$store.dispatch("recipe", { recipeId: recipeId });
      console.log("response", response);
      if (!response.id === recipeId) {
        this.$router.replace("/NotFound");
        return;
      }

      const {
        id,
        title,
        readyInMinutes,
        image,
        vegan,
        vegetarian,
        glutenFree,
        servings,
        favorite,
        seen,
        instructions,
        ingredients,
      } = response; // Use destructuring to assign response properties

      // Assign the values to component data properties
      this.id = id;
      this.title = title;
      this.readyInMinutes = readyInMinutes;
      this.image = image;
      this.vegan = vegan;
      this.vegetarian = vegetarian;
      this.glutenFree = glutenFree;
      this.servings = servings;
      this.favorite = favorite;
      this.seen = seen;
      this.instructions = instructions;
      this.ingredients = ingredients;
    } catch (error) {
      console.log("error.response.status", error.response.status);
      this.$router.replace("/NotFound");
      return;
    }
  },
  methods: {
    getImageSrc(image) {
      return this.prefix + image;
    },
    async setFavorite() {
      try {
        let recipeId = this.id;
        let response = await this.$store.dispatch("setFavorite", {
          recipeId: recipeId,
          isFav: !this.favorite,
        });

        if (response.status === 200) {
          this.favorite = !this.favorite;
          await this.changeBTN();
        }
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
    },
    async changeBTN() {
      if (this.$store.state.username) {
        if (this.favorite) {
          document.getElementById("favorite").style.display = "none";
          document.getElementById("unfavorite").style.display = "block";
        } else {
          document.getElementById("favorite").style.display = "block";
          document.getElementById("unfavorite").style.display = "none";
        }
      } else {
        document.getElementById("favorite").style.display = "none";
        document.getElementById("unfavorite").style.display = "none";
      }
    },
  },
  async mounted() {
    await this.changeBTN();
  },
};
</script>

<style scoped>
.wrapper {
  display: flex;
}
.wrapped {
  width: 50%;
}
.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}

/* .recipe-header{

} */
</style>
