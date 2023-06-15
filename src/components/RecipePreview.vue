<template>
  <div class="card" style="width: 18rem;">
    <img v-if="image_load" :src="recipe.image" class="recipe-image" />

    <div class="card-body">
      <h5 class="card-title">{{ this.title }}</h5>
      <p class="card-text">
        {{ this.readyInMinutes }} minutes {{ this.popularity }} likes
        {{ this.servings }} servings {{ this.vegan }} vegan
        {{ this.vegetarian }} vegetarian {{ this.glutenFree }} glutenFree
        {{ this.favorite }} favorite {{ this.seen }} seen
      </p>
    </div>

    <router-link
      :to="{ name: 'recipe', params: { recipeId: this.id } }"
      class="recipe-preview"
      type="button"
    >
      <a href="#" class="btn btn-primary">recipe page</a>
    </router-link>
  </div>
</template>

<script>
import Axios from "axios";

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
  },
};
</script>

<style scoped>
.recipe-preview {
  display: inline-block;
  width: 90%;
  height: 100%;
  position: relative;
  margin: 10px 10px;
}
.recipe-preview > .recipe-body {
  width: 100%;
  height: 200px;
  position: relative;
}

.recipe-preview .recipe-body .recipe-image {
  margin-left: auto;
  margin-right: auto;
  margin-top: auto;
  margin-bottom: auto;
  display: block;
  width: 98%;
  height: auto;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  background-size: cover;
}

.recipe-preview .recipe-footer {
  width: 100%;
  height: 50%;
  overflow: hidden;
}

.recipe-preview .recipe-footer .recipe-title {
  padding: 10px 10px;
  width: 100%;
  font-size: 12pt;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  -o-text-overflow: ellipsis;
  text-overflow: ellipsis;
}

.recipe-preview .recipe-footer ul.recipe-overview {
  padding: 5px 10px;
  width: 100%;
  display: -webkit-box;
  display: -moz-box;
  display: -webkit-flex;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  box-flex: 1;
  -webkit-flex: 1 auto;
  -ms-flex: 1 auto;
  flex: 1 auto;
  table-layout: fixed;
  margin-bottom: 0px;
}

.recipe-preview .recipe-footer ul.recipe-overview li {
  -webkit-box-flex: 1;
  -moz-box-flex: 1;
  -o-box-flex: 1;
  -ms-box-flex: 1;
  box-flex: 1;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  width: 90px;
  display: table-cell;
  text-align: center;
}
</style>
