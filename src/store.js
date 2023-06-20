import Vuex from "vuex";
import Vue from "vue";
import { auth, user, family } from "./apiMethods";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: "",
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const res = await auth.login(username, password);
        if (res.status == 200) {
          commit("setUsername", username);
        }
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async register(
      { commit },
      { username, firstname, lastname, country, password, email }
    ) {
      try {
        const res = await auth.register(
          username,
          firstname,
          lastname,
          country,
          password,
          email
        );
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async logout({ commit }) {
      try {
        const res = await auth.logout();
        if (res.success) {
          commit("setUsername", "");
        }
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async randomRecipes({ commit }) {
      try {
        if (this.state.username == "") {
          const res = await user.randomRecipes("/recipes");
          return res;
        } else {
          const res = await user.randomRecipes("/users");
          return res;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async favoriteRecipes({ commit }) {
      try {
        const res = await user.favoriteRecipes();
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async seen({ commit }) {
      try {
        const res = await user.seen();
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async recipe({ commit }, { recipeId }) {
      try {
        if (this.state.username == "") {
          const res = await user.recipe(recipeId, "/recipes");
          return res;
        } else {
          const res = await user.recipe(recipeId, "/users");
          return res;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async setFavorite({ commit }, { recipeId, isFav }) {
      try {
        const res = await user.setFavorite(recipeId, isFav);
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async getFavorite({ commit }) {
      try {
        const res = await user.getFavorite();
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async search({ commit }, { query, number, cuisine, diet, intolerances }) {
      try {
        if (this.state.username == "") {
          const res = await user.search(
            "recipes",
            query,
            number,
            cuisine,
            diet,
            intolerances
          );
          return res;
        } else {
          const res = await user.search(
            "users",
            query,
            number,
            cuisine,
            diet,
            intolerances
          );
          return res;
        }
      } catch (err) {
        console.log(err);
      }
    },
    async myRecipes({ commit }) {
      try {
        const res = await user.myRecipes();
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async getRecipe({ commit }, { recipeId }) {
      try {
        console.log(recipeId, "from store");
        const res = await user.getRecipe(recipeId);
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async getIngredients({ commit }, { query }) {
      try {
        const res = await user.getIngredients(query);
        return res;
      } catch (err) {
        console.log(err);
      }
    },

    async addRecipe({ commit }, { recipe }) {
      try {
        const res = await user.addRecipe(recipe);
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async myFamilies({ commit }) {
      try {
        const res = await family.myFamilies();
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async getFamilyMembers({ commit }, { familyId }) {
      try {
        const res = await family.getFamilyMembers(familyId);
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async searchFamily({ commit }, { query }) {
      try {
        const res = await family.searchFamily(query);
        return res;
      } catch (err) {
        console.log(err);
      }
    },

    async joinFamily({ commit }, { familyId, isAdd }) {
      try {
        const res = await family.joinFamily(familyId, isAdd);
        return res;
      } catch (err) {
        console.log(err);
      }
    },

    async createFamily({ commit }, { family_name }) {
      try {
        const res = await family.createFamily(family_name);
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async getFamilyRecipes({ commit }, { familyId }) {
      try {
        const res = await family.getFamilyRecipes(familyId);
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async addRecipeToFamily({ commit }, { familyId, recipeId, about, isAdd }) {
      try {
        console.log(familyId, recipeId, about, isAdd, "from store");
        const res = await family.addRecipeToFamily(
          familyId,
          recipeId,
          about,
          isAdd
        );
        return res;
      } catch (err) {
        console.log(err);
      }
    },
    async getFamilyFullDetailsRecipe({ commit }, { recipeId, familyId }) {
      try {
        const res = await family.getFamilyFullDetailsRecipe(recipeId, familyId);
        return res;
      } catch (err) {
        console.log(err);
      }
    },
  },

  getters: {
    username: (state) => state.username,
  },
  mutations: {
    setUsername(state, username) {
      state.username = username;
    },
  },
});

export default store;
