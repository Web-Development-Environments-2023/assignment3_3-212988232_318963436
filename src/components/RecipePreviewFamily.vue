<template>
  <div class="card">
    <div class="card-image">
      <img
        :src="recipe.image"
        class="card__img"
        onerror="this.src='https://media.istockphoto.com/id/1141639313/photo/contact-us-woman-hand-holding-icon-customer-support-concept-copy-space.jpg?s=2048x2048&w=is&k=20&c=MxSuJtElp1vpswR4y-xLMdcEwSbPp4quLGtAXdu-bvQ=';"
      />
    </div>

    <div class="card-text">
      <div height="50px">
        <router-link
          :to="{
            name: 'recipeUser',
            params: { recipeId: recipe.id, familyId: recipe.family_id },
          }"
          type="button"
        >
  
          <h2 class="card-title">{{ recipe.title }}</h2>
        </router-link>
      </div>
    </div>

    <ul class="card-text">
      <li>
        <img src="../assets/clock.png" height="25px" width="25px" />
        {{ recipe.readyInMinutes }}
      </li>
      <li>
        <img src="../assets/servings.png" height="25px" width="25px" />
        {{ recipe.servings }}
      </li>
    </ul>
    <ul>
      <li>
        <img
          src="../assets/vegan.png"
          height="50px"
          width="50px"
          v-if="recipe.vegan"
        />
      </li>
      <li>
        <img
          src="../assets/vegetarian.png"
          height="50px"
          width="50px"
          v-if="recipe.vegetarian"
        />
      </li>
      <li>
        <img
          src="../assets/glutenfree.png"
          height="50px"
          width="50px"
          v-if="recipe.glutenFree"
        />
      </li>
    </ul>
    <div class="card-footer">
      <div class="card-footer-text">
        <p>Created by: {{ recipe.firstname }} {{ recipe.lastname }}</p>
        <p>Created at: {{ recipe.recipe_date }}</p>
        <p>About : {{ recipe.data }}</p>
        <p>family :{{ recipe.family_id }}</p>
      </div>
    </div>
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
      vegan: true ? recipe.vegan === 1 : false,
      vegetarian: true ? recipe.vegetarian === 1 : false,
      glutenFree: true ? recipe.glutenFree === 1 : false,
      servings: this.recipe.servings,
      recipe_date: this.recipe.recipe_date,
      data: this.recipe.data,
      owener: this.recipe.firstname + " " + this.recipe.lastname,
    };
  },
  props: {
    recipe: {
      type: Object,
      required: true,
    },
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
