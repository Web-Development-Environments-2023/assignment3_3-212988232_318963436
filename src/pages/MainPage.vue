<template>
  <div class="container">
	<div class="myTitle">
	  <h1>Home</h1>
	</div>
    <RecipePreviewList
      title="Random Recipes"
      isRandom="random"
      class="RandomRecipes center"
      ref="RandomRecipePreview"
    />
   
    <router-link v-if="!$store.state.username" to="/login" tag="button" style="background: transparent; border: none; cursor: pointer;"
      > <button class="button-74">Login For More</button>
    </router-link
    >
        

    <RecipePreviewList
      v-if="$store.state.username"
      title="Last Viewed Recipes"
      isRandom="seen"
      :class="{
        RandomRecipes: true,
        blur: !$store.state.username,
        center: true,
      }"
      disabled
    ></RecipePreviewList>
    <!-- <div
      style="position: absolute;top: 70%;left: 50%;transform: translate(-50%, -50%);"
    >
      Centeredasdasdad
    </div>-->
  </div>
</template>

<script>
import RecipePreviewList from "../components/RecipePreviewList";
export default {
  components: {
    RecipePreviewList,
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
.RandomRecipes {
  margin: 10px 0 10px;
}
.blur {
  -webkit-filter: blur(5px); /* Safari 6.0 - 9.0 */
  filter: blur(2px);
}
::v-deep .blur .recipe-preview {
  pointer-events: none;
  cursor: default;
}

body {
  height: 100vh;
  margin: 0;
  display: flex;
  justify-content: center;
}

.menu-bar {
  border-radius: 25px;
  height: fit-content;
  display: inline-flex;
  background-color: rgba(0, 0, 0, 0.4);
  -webkit-backdrop-filter: blur(10px);
  backdrop-filter: blur(10px);
  align-items: center;
  padding: 0 10px;
  margin: 50px 0 0 0;
  li {
    list-style: none;
    color: white;
    font-family: sans-serif;
    font-weight: bold;
    padding: 12px 16px;
    margin: 0 8px;
    position: relative;
    cursor: pointer;
    white-space: nowrap;
    &::before {
      content: " ";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: -1;
      transition: 0.2s;
      border-radius: 25px;
    }
    &:hover {
      &::before {
        background: linear-gradient(to bottom, #e8edec, #d2d1d3);
        box-shadow: 0px 3px 20px 0px black;
        transform: scale(1.2);
      }
      color: black;
    }
  }
}
</style>
