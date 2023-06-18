<template>
  <div class="card" >
    <div class="card-image">
    <img v-if="image_load" :src="recipe.image" class="recipe-image" onerror="this.src='https://media.istockphoto.com/id/1141639313/photo/contact-us-woman-hand-holding-icon-customer-support-concept-copy-space.jpg?s=2048x2048&w=is&k=20&c=MxSuJtElp1vpswR4y-xLMdcEwSbPp4quLGtAXdu-bvQ=';" />
    </div> 
    
    <div class="card-text">
      <div height="50px">
        <router-link
      :to="{ name: 'recipe', params: { recipeId: this.id } }"
      
      type="button"
    >
    
      <h2 class="card-title">{{ this.title }}</h2>
    </router-link>
    </div>
     

  </div>

  <ul class="card-text">
          <li>
            <img src="../assets/clock.png" height="25px" width="25px"> {{ this.readyInMinutes }}      
          </li>
          <li>
            <img src="../assets/like.png" height="25px" width="25px"> {{ this.popularity }}
          </li>
          <li>
            <img src="../assets/servings.png" height="25px" width="25px"> {{ this.servings }}
          </li>
        </ul>
          <ul>
          <li>
            <img src="../assets/vegan.png" height="50px" width="50px" v-if="this.vegan">
          </li>
          <li>
            <img src="../assets/vegetarian.png" height="50px"  width="50px" v-if="this.vegetarian">
          </li>
          <li>
            <img  src="../assets/glutenfree.png" height="50px" width="50px" v-if="this.glutenFree">
          </li>
        </ul>
<!-- <table class="card-text">
  <tr>
    <td style="width: 100px; height: 50px;">
      <img src="../assets/clock.png" height="25px" width="25px"> {{ this.readyInMinutes }}      
    </td>
    <td style="width: 100px; height: 50px;">
      <img src="../assets/like.png" height="25px" width="25px"> {{ this.popularity }}
    </td>
    <td style="width: 100px; height: 50px;">
      <img src="../assets/servings.png" height="25px" width="25px"> {{ this.servings }}
    </td>
  </tr>
  <tr>
    <td v-if="this.vegan" style="width: 100px; height: 50px;">
      <img src="../assets/vegan.png" height="50px" width="50px">
    </td>
    <td v-if="this.vegetarian" style="width: 100px; height: 50px;">
      <img src="../assets/vegetarian.png" height="50px"  width="50px">
    </td>
    <td v-if="this.glutenFree" style="width: 100px; height: 50px;">
      <img  src="../assets/glutenfree.png" height="50px" width="50px">
    </td>
  </tr>
</table> -->
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
/* .recipe-preview {
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
} */

@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,900;1,400;1,900&display=swap');
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
  font-family:'Playfair Display', serif;
}
body{ background:url(https://images.unsplash.com/photo-1495195129352-aeb325a55b65?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1776&q=80);
  background-size:cover;
  background-position:right;
  background-attachment:fixed;
}
#header{
  margin:20px;
}
#header>h1{
  text-align:center;
  font-size:3rem;
}
#header>p{
  text-align:center;
  font-size:1.5rem;
  font-style:italic;
}
.container{
  width:100vw;
  display:flex;
  justify-content:space-around;
  flex-wrap:wrap;
  padding:40px 20px;
}
.card{
  display:flex;
  flex-direction:column;
  width:300px;
  margin-bottom:60px;
  background: transparent;
  border : solid transparent;
}
.card>div{
  box-shadow:0 15px 20px 0 rgba(0,0,0,0.5);
}

.card-image>img{
  width:100%;
  height:100%;
  object-fit:cover;
  object-position:bottom;
}
.card-text{
  margin:-30px auto;
  margin-bottom:-50px;
  height:300px;
  width:300px;
  background-color:#38363d;
  color:#fff;
  padding:20px;
}
.card-meal-type{
  font-style:italic;
}
.card-title{
  font-size:1.6rem;
  margin-bottom:20px;
  margin-top:5px;
}
.card-body{
  font-size:1.25rem;
}
.card-price{
  width:100px;
  height:100px;
  background-color:#970C0A;
  color:#fff;
  margin-left:auto;
  font-size:2rem;
  display:flex;
  justify-content:center;
  align-items:center;
}
#table {
  border-collapse: collapse;
  border-spacing: 0;
}
#td{
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

li a:hover {
  
}
</style>
