const newRepository = new RecipeRepository(recipeData)
newRepository.addRecipesToRepository();
const trendingDisplay = document.querySelector('#trendingDisplay');
const browseMeals = document.querySelector('#allMeals');
const recipeTarget = document.querySelector('#recipeTarget');
// PAGES
const homePage = document.querySelector('#homePage');
const recipeDetailPage = document.querySelector('#recipeDetailPage');
const favoritesPage = document.querySelector('#favoritesPage');
const userPantryPage = document.querySelector('#userPantryPage');
const cookinQueuePage = document.querySelector('#cookinQueuePage');


const recipeDetailsName = document.querySelector('#recipeDetailsName');
const recipeDetailsImage = document.querySelector('#recipeDetailsImage');
const recipeDetailsTags = document.querySelector('#recipePageTags');
const ingredientRow = document.querySelector('#ingredientRow');
const headerLogo = document.querySelector('#header-logo')

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length)
}

function populateMain() {
  // let newRepository = new RecipeRepository(recipeData)
  const randomRecipe1 = newRepository.recipeList[getRandomIndex(newRepository.recipeList)];
  const randomRecipe2 = newRepository.recipeList[getRandomIndex(newRepository.recipeList)];
  const randomRecipe3 = newRepository.recipeList[getRandomIndex(newRepository.recipeList)];
  pushToTrendingDisplay(randomRecipe1, randomRecipe2, randomRecipe3)
  randomize(newRepository.recipeList)
  populateAll(newRepository.recipeList)

}

function randomize(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * i)
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp;
  }
}

function pushToTrendingDisplay(recipe1, recipe2, recipe3) {
  trendingDisplay.innerHTML = `
    <section class="large-image-section">
      <img src="${recipe1.image}" alt="Meal 1" class="large-image">
      <div class="heart-overlay">
        <img src="assets/grey-heart.png" alt="grey heart" class="heart large-image-heart">
        <img src="assets/pink-heart.png" alt="pink heart" class="heart large-image-heart hidden">
      </div>
      <button class="queue-button">Add to My Cookin' Queue</button>
      <h2 id="recipeTarget">${recipe1.name}</h2>
    </section>
    <section class="side-images">
      <section class="top-side-image">
        <img src="${recipe2.image}" alt="Meal2" class="side-image">
        <div class="heart-overlay">
          <img src="assets/grey-heart.png" alt="grey heart" class="heart side-heart">
          <img src="assets/pink-heart.png" alt="pink heart" class="heart side-heart">
        </div>
        <button class="queue-button">Add to My Cookin' Queue</button>
        <h2 id="recipeTarget">${recipe2.name}</h2>
      </section>
      <section class="bottom-side-image">
        <img src="${recipe3.image}" alt="Meal 3" class="side-image">
        <div class="heart-overlay">
          <img src="assets/grey-heart.png" alt="grey heart" class="heart side-heart">
          <img src="assets/pink-heart.png" alt="pink heart" class="heart side-heart hidden">
        </div>
        <button class="queue-button">Add to My Cookin' Queue</button>
        <h2 id="recipeTarget">${recipe3.name}</h2>
      </section>
    </section>
  `
}

function populateAll(recipes) {
  recipes.forEach(recipe => {
    browseMeals.innerHTML += `
      <article class="mini-recipe">
        <section class="mini-recipe-image-container">
          <img class="mini-recipe-img" src="${recipe.image}" id="defaultId">
          <div class="heart-overlay">
            <img src="assets/grey-heart.png" alt="grey heart" class="heart mini-heart">
            <img src="assets/pink-heart.png" alt="pink heart" class="heart mini-heart hidden">
          </div>
          <button class="queue-button">Add to My Cookin' Queue</button>
        </section>
        <h4>${recipe.tags[getRandomIndex(recipe.tags)]}</h4>
        <h2 id="recipeTarget">${recipe.name}</h2>
      </article>
    `
  })
}
console.log(newRepository.recipeList)
function displayIngredients(recipe) {
  recipe.ingredients.forEach(ingredient => {
    const ingredientName = recipe.findIngredientName(ingredient.id);
    console.log(ingredient);
    ingredientRow.innerHTML += `
      <img class="check-x" id="check" src="assets/check.png" alt="green check" >
      <img class="check-x hidden" id="x" src="assets/x.png" alt="red x" >
      <p class="ingredient-row-text">${ingredient.quantity.amount} ${ingredient.quantity.unit} ${ingredientName}</p>
    `
  })
}

function displayTags(recipe) {
  recipe.tags.forEach(tag => {
    recipeDetailsTags.innerHTML += `
      <li class="recipe-tag">${tag}</li>
    `
  })
}

function recipeDetails(recipe) {
  recipeDetailsName.innerText = `${recipe.name}`;
  recipeDetailsImage.src = `${recipe.image}`;
  displayTags(recipe);
  displayIngredients(recipe);
}

function hide(elements) {
  elements.forEach(element => element.classList.add('hidden'));
}

function show(elements) {
  elements.forEach(element => element.classList.remove('hidden'));
}

function showHomePage() {
  hide([recipeDetailPage, favoritesPage, userPantryPage, cookinQueuePage]);
  show([homePage])
}

function showRecipeDetailPage() {
  hide([homePage, favoritesPage, userPantryPage, cookinQueuePage]);
  show([recipeDetailPage]);
}

function showFavoritesPage() {
  hide([homePage, recipeDetailPage, userPantryPage, cookinQueuePage])
  show([favoritesPage]);
}

function showUserPantryPage() {
  hide([homePage, recipeDetailPage, favoritesPage, cookinQueuePage])
  show([userPantryPage]);
}

function showCookinQueuePage() {
  hide([homePage, recipeDetailPage, favoritesPage, userPantryPage])
  show([cookinQueuePage]);
}



window.addEventListener('load', populateMain)

// recipeTarget.addEventListener('click', function(e) {
//   if (event.target.closest('.mini-recipe') === 'mini-recipe') {
//     hide([homePage])
//     show([])
//   }
// })
