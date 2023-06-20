<template>
  <div class="card">
    <div class="card-image">
      <router-link
        v-if="!UserRecipe"
        :to="{ name: 'recipe', params: { recipeId: this.id } }"
        type="button"
      >
        <img
          v-if="image_load"
          :src="recipe.image"
          class="card__img"
          onerror="this.src='https://media.istockphoto.com/id/1141639313/photo/contact-us-woman-hand-holding-icon-customer-support-concept-copy-space.jpg?s=2048x2048&w=is&k=20&c=MxSuJtElp1vpswR4y-xLMdcEwSbPp4quLGtAXdu-bvQ=';"
        />
      </router-link>

      <router-link
          v-if="UserRecipe"
          :to="{ name: 'recipeUser', params: { recipeId: this.id } }"
          type="button"
        >
        <img  v-if="image_load" :src="recipe.image" class="card__img" >
        </router-link>

      <ul style="  margin-right: 10px;" class="image-icons">
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

    <div class="card-text">
      <div height="50px">
        <h2 class="card-title" style="color:white;">{{ this.title }}</h2>

      </div>
    </div>

    <ul
      style="  position: absolute;
        bottom: 0; "
    >
      <li >
        <img
          :id="'favorite' + this.id"
          type="button"
          value="favorite"
          @click="setFavorite(id, true)"
          src="../assets/unfavorite.png"  height="25px" width="25px" 
        />
        <img
          :id="'unfavorite' + this.id"
          type="button"
          value="unfavorite"
          @click="setFavorite(id, false)"
          src="../assets/favorite.png"  height="25px" width="25px"
        />
      </li>
      <li style="color:white; padding-left: 30px;">
        <img src="../assets/clock.png" height="25px" width="25px" />
        {{ this.readyInMinutes }}
      </li>
      <li v-if="!UserRecipe" style="color:white; padding-left: 30px;">
        <img src="../assets/like.png" height="25px" width="25px" />
        {{ this.popularity }}
      </li>
      <li style="color:white; padding-left: 30px;">
        <img src="../assets/servings.png" height="25px" width="25px" />
        {{ this.servings }}
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: this.recipe.id,
      title: this.recipe.title,
      readyInMinutes: this.recipe.readyInMinutes,
      image: this.recipe.image,
      popularity: this.recipe.popularity,
      vegan: this.recipe.vegan,
      vegetarian: this.recipe.vegetarian,
      glutenFree: this.recipe.glutenFree,
      servings: this.recipe.servings,
      favorite: this.recipe.favorite,
      seen: this.recipe.seen,
      image_load: true,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
    UserRecipe: {
      type: Boolean,
      required: true,
      default: false,
    },
  },

  methods: {
    async setFavorite(recipeId, isFav) {
      console.log("recipeId", recipeId);
      console.log("isFav", isFav);
      try {
        let response = await this.$store.dispatch("setFavorite", {
          recipeId: recipeId,
          isFav: isFav,
        });

        console.log("response", response);

        if (response.status === 200) {
          console.log("response.data", response.data);
          this.favorite = !this.favorite;
          console.log("response.data", response.data);
          console.log("this", this);
          await this.changeBTN(recipeId);
        }
      } catch (error) {
        console.log("error.response.status", error.response.status);
        this.$router.replace("/NotFound");
        return;
      }
    },
    async changeBTN(recipeId) {
      if (
        this.$store.state.username != null &&
        this.$route.name != "myRecipes"
      ) {
        if (this.favorite) {
          document.getElementById("favorite" + recipeId).style.display = "none";
          document.getElementById("unfavorite" + recipeId).style.display =
            "block";
        } else {
          document.getElementById("favorite" + recipeId).style.display =
            "block";
          document.getElementById("unfavorite" + recipeId).style.display =
            "none";
        }
      } else {
        document.getElementById("favorite" + recipeId).style.display = "none";
        document.getElementById("unfavorite" + recipeId).style.display = "none";
      }
    },
  },
  mounted() {
    this.changeBTN(this.id);
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400;1,900&display=swap");
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Playfair Display", serif;
}
body {
  background: url(https://images.unsplash.com/photo-1495195129352-aeb325a55b65?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1776&q=80);
  background-size: cover;
  background-position: right;
  background-attachment: fixed;
}
#header {
  margin: 20px;
}
#header > h1 {
  text-align: center;
  font-size: 3rem;
}
#header > p {
  text-align: center;
  font-size: 1.5rem;
  font-style: italic;
}
.container {
  width: 100vw;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 40px 20px;
}
.card {
  position: relative;
  width: calc(33.33% - 20px); /* Adjust the width as per your requirements */
  margin: 10px;
  display: inline-block;
  vertical-align: top;
  box-sizing: border-box;
  background-color: rgb(21, 18, 18);
  padding-bottom: 30px;
}

.card-image {
  position: relative;
}

.card__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transform: scale(calc(1 + (var(--hover, 0) * 0.25)))
    rotate(calc(var(--hover, 0) * -5deg));
  transition: transform 0.2s;
}

.image-icons {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-icons li {
  margin: 0 5px;
}

/* Adjust the height and width of the icons as per your requirements */
.image-icons img {
  height: 50px;
  width: 50px;
}

#table {
  border-collapse: collapse;
  border-spacing: 0;
}
#td {
  width: 100px;
  height: 50px;
}

ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  overflow: hidden;
}

li {
  float: left;
}

li a {
  display: block;
  color: white;
  text-align: center;
  padding: 16px;
  text-decoration: none;
}

.card:is(:hover, :focus-visible) {
  --hover: 1;
}
</style>
