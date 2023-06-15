import Vuex from "vuex";
import Vue from "vue";
import { auth, user } from "./apiMethods";

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    username: "",
  },
  actions: {
    async login({ commit }, { username, password }) {
      try {
        const res = await auth.login(username, password);
        if (res.success) {
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
