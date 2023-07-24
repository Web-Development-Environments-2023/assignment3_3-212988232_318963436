import Main from "./pages/MainPage";
import NotFound from "./pages/NotFoundPage";

const routes = [
  {
    path: "/",
    name: "main",
    component: Main,
  },
  {
    path: "/register",
    name: "register",
    component: () => import("./pages/RegisterPage"),
  },
  {
    path: "/login",
    name: "login",
    component: () => import("./pages/LoginPage"),
  },
  {
    path: "/search",
    name: "search",
    component: () => import("./pages/SearchPage"),
  },
  {
    path: "/favorite",
    name: "favorite",
    component: () => import("./pages/FavoritePage"),
  },
  {
    path: "/myRecipes",
    name: "myRecipes",
    component: () => import("./pages/RecipeMyRecipesPage"),
  },
  {
    path: "/recipeUser",
    name: "recipeUser",
    component: () => import("./pages/RecipeViewPageUser"),
  },
  {
    path: "/family",
    name: "family",
    component: () => import("./pages/FamilyPage"),
  },
  {
    path: "/familyRecipes",
    name: "familyRecipes",
    component: () => import("./pages/FamilyDetailPage"),
  },

  {
    path: "/recipe/:recipeId",
    name: "recipe",
    component: () => import("./pages/RecipeViewPage"),
  },
  {
    path: "/About",
    name: "AboutPage",
    component: () => import("./pages/AboutPage"),
  },

  {
    path: "*",
    name: "notFound",
    component: NotFound,
  },
];

export default routes;
