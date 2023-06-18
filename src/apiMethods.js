import axios from "axios";

const server_domain = "http://localhost:3000";

///////////////////////////////////////////Auth///////////////////////////////////////////
// api call for login
const login = async (username, password) => {
  try {
    const res = await axios.post(
      `${server_domain}/login`,
      {
        username: username,
        password: password,
      },
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (err) {
    console.log(err);
    return { status: 401, message: "Wrong username or password" };
  }
};
//api call for register
const register = async (
  username,
  firstname,
  lastname,
  country,
  password,
  email
) => {
  try {
    const res = await axios.post(
      `${server_domain}/register`,
      {
        username: username,
        firstname: firstname,
        lastname: lastname,
        country: country,
        password: password,
        email: email,
      },
      {
        withCredentials: true,
      }
    );
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
//api call for logout
const logout = async () => {
  try {
    const res = await axios.post(`${server_domain}/logout`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
const auth = {
  login: login,
  register: register,
  logout: logout,
};

///////////////////////////////////////////User///////////////////////////////////////////

const randomRecipes = async (path) => {
  try {
    const res = await axios.get(`${server_domain}${path}/random`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const favoriteRecipes = async () => {
  try {
    const res = await axios.get(`${server_domain}/users/favorite`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
const seen = async () => {
  try {
    const res = await axios.get(`${server_domain}/users/seen`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};

const recipe = async (recipeId, path) => {
  try {
    const res = await axios.get(`${server_domain}${path}/${recipeId}`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
const setFavorite = async (recipeId, isfav) => {
  try {
    const res = await axios.post(
      `${server_domain}/users/favorite`,
      {
        recipeId: recipeId,
        isfav: isfav,
      },
      {
        withCredentials: true,
      }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};
const getFavorite = async () => {
  try {
    const res = await axios.get(`${server_domain}/users/favorite`, {
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
const search = async (path, query, number, cuisine, diet, intolerances) => {
  try {
    const res = await axios.get(`${server_domain}/${path}/search`, {
      params: {
        name: query,
        number: number,
        cuisine: cuisine,
        diet: diet,
        intolerances: intolerances,
      },
      withCredentials: true,
    });
    return res;
  } catch (err) {
    console.log(err);
  }
};
const myRecipes = async () => {
  try {
    const res = await axios.get(`${server_domain}/users/myRecipes`, {
      withCredentials: true,
    });
    console.log("API mathodes", res);
    return res.data;
  } catch (err) {
    console.log(err);
    console.log("API mathodes", res);
    return { status: 401, message: "Something goes wrong" };
  }
};
const getRecipe = async (recipeId) => {
  try {
    const res = await axios.get(`${server_domain}/users/recipe`, {
      params: {
        id: recipeId,
      },
      withCredentials: true,
    });

    return res.data;
  } catch (err) {
    console.log(err);
    return { status: 401, message: "Something goes wrong" };
  }
};
const getIngerdients = async (query) => {
  try {
    const res = await axios.get(`${server_domain}/users/ingredients`, {
      params: {
        name: query,
      },
      withCredentials: true,
    });
    return res.data;
  } catch (err) {
    console.log(err);
  }
};
const addRecipe = async (recipe) => {
  try {
    const res = await axios.post(
      `${server_domain}/users/myRecipes`,
      {
        recipe: recipe,
      },
      { withCredentials: true }
    );
    return res;
  } catch (err) {
    console.log(err);
  }
};

const user = {
  randomRecipes: randomRecipes,
  favoriteRecipes: favoriteRecipes,
  seen: seen,
  recipe: recipe,
  setFavorite: setFavorite,
  getFavorite: getFavorite,
  search: search,
  myRecipes: myRecipes,
  getRecipe: getRecipe,
  getIngerdients: getIngerdients,
  addRecipe: addRecipe,
};

///////////////////////////////////////////Export///////////////////////////////////////////
export { auth, user };
