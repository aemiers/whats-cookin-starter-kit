const newRepository = new RecipeRepository(recipeData)
newRepository.addRecipesToRepository();
// PAGES
const homePage = document.querySelector('#homePage');
const recipeDetailPage = document.querySelector('#recipeDetailPage');
const favoritesPage = document.querySelector('#favoritesPage');
const searchResultsPage = document.querySelector('#searchResultsPage');
const userPantryPage = document.querySelector('#userPantryPage');
const cookinQueuePage = document.querySelector('#cookinQueuePage');
// HEADER
const headerLogo = document.querySelector('#headerLogo');
const searchBar = document.querySelector('#searchBar');
const favoriteButtonInHeader = document.querySelector('#favoriteButton');
const queueButtonInHeader = document.querySelector('#queueButton');
const pantryButtonInHeader = document.querySelector('#pantryButton');
// BODY
const trendingDisplay = document.querySelector('#trendingDisplay');
const browseMealsGrid = document.querySelector('#allMeals');
const searchResultGrid = document.querySelector('#searchResultMeals');
const favoritesGrid = document.querySelector('#searchResultMeals');
const recipeTarget = document.querySelector('#recipeTarget');

const recipeDetailsName = document.querySelector('#recipeDetailsName');
const recipeDetailsImage = document.querySelector('#recipeDetailsImage');
const recipeDetailsTags = document.querySelector('#recipePageTags');
const ingredientRow = document.querySelector('#ingredientRow');

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
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
    browseMealsGrid.innerHTML += `
      <article class="mini-recipe">
        <section class="mini-recipe-image-container">
          <img class="mini-recipe-img" src="${recipe.image}" id="defaultId">
          <div class="heart-overlay">
            <img src="assets/grey-heart.png" alt="grey heart" class="heart mini-heart">
            <img src="assets/pink-heart.png" alt="pink heart" class="heart mini-heart hidden">
          </div>
          <button class="queue-button">Add to My Cookin' Queue</button>
        </section>
        <h4 class="mini-recipe-tag">${recipe.tags[getRandomIndex(recipe.tags)]}</h4>
        <h2 class="mini-recipe-title" id="recipeTarget">${recipe.name}</h2>
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

function showHidePages(page1, page2, page3, page4, page5, page6) {
  show([page1]);
  hide([page2, page3, page4, page5, page6]);
}

function goHome() {
  showHidePages(homePage, recipeDetailPage, favoritesPage, searchResultsPage, userPantryPage, cookinQueuePage)
}

function enlargeRecipe() {
  showHidePages(recipeDetailPage, homePage, favoritesPage, searchResultsPage, userPantryPage, cookinQueuePage)
}

function displayFavorites() {
  showHidePages(favoritesPage, homePage, searchResultsPage, recipeDetailPage, userPantryPage, cookinQueuePage)
}

function displayPantry() {
  showHidePages(userPantryPage, homePage, recipeDetailPage, favoritesPage, searchResultsPage, cookinQueuePage)
}

function displayQueue() {
  showHidePages(cookinQueuePage, homePage, recipeDetailPage, favoritesPage, searchResultsPage, userPantryPage)
}

function searchBarSearch() {
  showHidePages(searchResultsPage, homePage, recipeDetailPage, favoritesPage, userPantryPage, cookinQueuePage);
}

function favoriteRecipe() {
  console.log('Something has been favorited');
}

function addToCookinQueue() {
  //add popup if time saying recipe has been added
  console.log('Recipe has been added to your Cookin\' Queue!')
}

function recipeCardFunctionalityHandler(event) {
  if (event.target.closest('.mini-recipe-img')) {
    enlargeRecipe();
  } else if (event.target.closest('.mini-recipe-tag')) {
    enlargeRecipe();
  } else if (event.target.closest('.mini-recipe-title')) {
    enlargeRecipe();
  } else if (event.target.closest('.heart')) {
    //could also try .mini-heart or .heart-overlay
    favoriteRecipe();
  } else if (event.target.closest('.queue-button')) {
    addToCookinQueue();
  }
}

window.addEventListener('load', populateMain);
headerLogo.addEventListener('click', goHome);
favoriteButtonInHeader.addEventListener('click', displayFavorites);
queueButtonInHeader.addEventListener('click', displayQueue);
pantryButtonInHeader.addEventListener('click', displayPantry);
browseMealsGrid.addEventListener('click', recipeCardFunctionalityHandler);
searchResultGrid.addEventListener('click', recipeCardFunctionalityHandler);
favoritesGrid.addEventListener('click', recipeCardFunctionalityHandler);



searchBar.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    searchBarSearch();
  }
})
// recipeTarget.addEventListener('click', function(e) {
//   if (event.target.closest('.mini-recipe') === 'mini-recipe') {
//     hide([homePage])
//     show([])
//   }
// })
