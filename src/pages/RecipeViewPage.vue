<template>
  <div class="center">
    <div class="myTitle">
      <h1>{{ this.title }}</h1>
    </div>
    <div class="card" style="width: 50rem;">
      <div class="card-image">
        <img :src="this.image"   @error="handleImageError" class="card-img-top" style="margin-left: 5%; margin-top: 1%;width: 90%;"/>

        <ul class="image-icons">
          <li v-if="this.vegan">
            <img src="../assets/vegan.png" height="50px" width="50px" />
          </li>
          <li v-if="this.vegetarian">
            <img src="../assets/vegetarian.png" height="50px" width="50px" />
          </li>
          <li v-if="this.glutenFree">
            <img src="../assets/glutenfree.png" height="50px" width="50px" />
          </li>
        </ul>
      </div>

      <div class="card-body">
        <ul style="position: absolute;">
          <li>
            <img src="../assets/clock_black.png" height="25px" width="25px" />
            {{ this.readyInMinutes }}
          </li>

          <li>
            <img
              src="../assets/servings_black.png"
              height="25px"
              width="25px"
            />
            {{ this.servings }}
          </li>
        </ul>

        <p class="card-text"></p>
        <div v-if="this.ingredients.length>0">
          <h3>ingredients</h3>
        <table>
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Count</th>
            </tr>
          </thead>
          <tr v-for="ingredient in this.ingredients" :key="ingredient.id">
            <td>
              <img :src="getImageSrc(ingredient.image)" />
            </td>
            <td>
              <h5>{{ ingredient.name }}</h5>
            </td>
            <td>
              <h5>
                {{ ingredient.amount.us.value }} {{ ingredient.amount.us.unit }}
              </h5>
            </td>
          </tr>
        </table>
        </div>
        

        <h3 v-if="this.instructions.length>0" style="margin-top: 15px;">instructions</h3>
        <ol>
          <li
            v-for="instruction in this.instructions"
            :key="instruction.id"
            class="li_step"
            style="float: none;"
          >
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
      let response = await this.$store.dispatch("recipe", {
        recipeId: recipeId,
      });
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
      console.log("error", error);
      console.log("error.response.status", error.response.status);
      this.$router.replace("/NotFound");
      return;
    }
  },

  methods: { 
    handleImageError(event) {
      event.target.src = "data:image/png;base64,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"
    },
    getImageSrc(image) {
      if (this.UserRecipe) {
        return image;
      }
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
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: border-box;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
}
*,
*::before,
*::after {
  box-sizing: border-box;
}

.main {
  max-width: 1200px;
  margin: 0 auto;
}

.cards {
  display: grid;
  grid-template-columns:repeat(auto-fit,minmax(300px,1fr));
  list-style: none;
  margin: 0;
  padding: 0;
}

.cards_item {
  display: flex;
  padding: 1rem;
}

.card_image {
  height: calc(13*1.2rem);
  padding: 1.2rem 1.2rem 0;
  position:relative;
}
.card_image:before,
.card_image:after{
  content: "";
  position: absolute;
  width: 20px;
  left: 60%;
  top: 0;
  height: 45px;
  background: #e6e6e6b8;
  transform: rotate(45deg);
}
.card_image:after{
  transform: rotate(-45deg);
  top:auto;
  bottom:-22px;
  left:40%;
}
.card_image img {
  width:100%;
  height:100%;
  object-fit:cover;
}

.cards_item {
  filter:drop-shadow(0 0 5px rgba(0, 0, 0, 0.25));
}


.card {
  background-color: white;
  border-radius: 0.25rem;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-left: 30px;
  background: linear-gradient(red 0 0) 30px 0/2px 100% #fff;
  background-color: hsl(0, 10%, 94%);
  background-repeat: no-repeat;
  line-height: 1.2rem;
  -webkit-mask:radial-gradient(circle .8rem at 2px 50%,#0000 98%,#000)0 0/100% 2.4rem;
}

.card_content {
  padding: 1.2rem;
}

h2.card_title,p {
  margin: 1.2rem 0;
}
h2.card_title {
    font-size: 1.3em;
}
body {
  font-family:monospace;
  background:#eee;
}

html {
  font-size:15px;
}
body {
  font-family: monospace;
  background: #eee;
}

html {
  font-size: 15px;
}

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
  margin-top: 160px;
}

/* .recipe-header{

} */

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
  background-color: #fff;
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
  border: 3px solid #00bcd4;
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
.action_btn {
  display: flex;
  justify-content: center;
  gap: 10px;
}
.action_btn > a {
  text-decoration: none;
  color: #444;
  background: #fff;
  border: 1px solid;
  display: inline-block;
  padding: 7px 20px;
  font-weight: bold;
  border-radius: 3px;
  transition: 0.3s ease-in-out;
}
.action_btn > a:nth-child(1) {
  border-color: #26a69a;
}
.action_btn > a:nth-child(2) {
  border-color: orange;
}
.action_btn > a:hover {
  box-shadow: 0 3px 8px #0003;
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

ul {
  margin-top: 8px;
  list-style-type: none;
  padding: 0;
  overflow: hidden;
}

ul:first-child {
  padding: 0px;
}

li {
  padding: 30px;
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 16px;
  text-decoration: none;
}
</style>
