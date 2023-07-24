<template>
  <div class="container">
    <div class="myTitle">
      <h1>About</h1>
    </div>
    <p>
      Welcome to our recipe site! We created this website as part of the
      "Internet Development Environments" course. Our goal was to build a
      platform where users can share and discover delicious recipes.
    </p>
    <p>
      Our recipe site allows you to add your own recipes, search for existing
      recipes, build a family, join an existing family, and even add recipes to
      your family from your personal collection. It's a place where food
      enthusiasts can come together, connect, and share their culinary
      creations.
    </p>
    <p>
      When you visit our website, you'll be greeted with three random recipes
      that you can explore. Feel free to dive in and discover new flavors,
      cooking techniques, and inspiration for your next meal. All the recipes on
      our site are sourced from spoonacular's API, ensuring a wide variety of
      options for you to explore.
    </p>
    <p>
      We hope you enjoy using our recipe site as both a resource for finding
      great recipes and a social network for connecting with other food lovers.
      If you have any feedback or suggestions, we would love to hear from you.
    </p>
    <div class="container" style="margin-top: 0;">
      <div class="myTitle">
        <h2>About the Authors</h2>
      </div>
    </div>
    <p>
      This website was developed by <b>Yuval Gorodissky</b> and
      <b>Noam Azulay</b>, both third-year students pursuing degrees in
      information systems engineering. With a passion for web development and a
      love for food, we combined our skills to create this platform for food
      enthusiasts like yourself.
    </p>

    <footer class="footer">
      <p>Previous Assignments:</p>
      <a
        href="https://web-development-environments-2023.github.io/assignment2-318963436_212988232/"
        >Space-Ships Game</a
      >
      <p>Contact us:</p>
      <a href="mailto:yuvalgor@post.bgu.ac.il">yuvalgor@post.bgu.ac.il</a>
      <a href="mailto:noamaz@post.bgu.ac.il">noamaz@post.bgu.ac.il</a>
    </footer>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
};
</script>

<style scoped>
p {
  font-size: 16px;
  line-height: 1.5;
  margin-bottom: 20px;
}

.footer {
  margin-top: 40px;
}

.footer p {
  margin-bottom: 10px;
}

.footer a {
  display: block;
  margin-bottom: 5px;
}
p {
  font-size: 20px;
  font-weight: bold;
  cursor: text;
  line-height: 1.5;
}

a {
  color: #0035c7;
  font-size: 20px;
}
</style>
