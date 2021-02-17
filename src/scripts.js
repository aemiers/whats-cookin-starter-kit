const newRepository = new RecipeRepository(recipeData);
const newUser = new User(usersData[getRandomIndex(usersData)]);
// const newUser = new User(fakeUserData[3])
const currentPantry = new UserPantry(newUser);
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
const homeButtonInHeader = document.querySelector('#homeButton');
const favoriteButtonInHeader = document.querySelector('#favoriteButton');
const queueButtonInHeader = document.querySelector('#queueButton');
const pantryButtonInHeader = document.querySelector('#pantryButton');
const welcomeUser = document.querySelector('#welcomeUser');
const homeButton = document.querySelector('#homeButton');
// BODY
const trendingDisplay = document.querySelector('#trendingDisplay');
const browseMealsGrid = document.querySelector('#allMeals');
const searchResultGrid = document.querySelector('#searchResultMeals');
const favoritesGrid = document.querySelector('#searchResultMeals');
const favoritesMealsGrid = document.querySelector('#favoritesMealsGrid');
const favoritesSearchBar = document.querySelector('#favoritesSearchBar');
const userFavorites = document.querySelector('#userFavorites');
const userPantry = document.querySelector('#userPantry');
const userQueue = document.querySelector('#userQueue');
const cookinQueueRecipe = document.querySelector('#cookinQueueRecipe');
const cookinQueueBlock = document.querySelector('#cookinQueueBlock');
const recipePageImageContainer = document.querySelector('#recipePageImageContainer');
const ingredientTotal = document.querySelector('#ingredientTotal');
// SEARCH BY TAG ICONS
const appetizerTagIcon = document.querySelector('#appetizer');
const breakfastTagIcon = document.querySelector('#breakfast');
const lunchTagIcon = document.querySelector('#lunch');
const dinnerTagIcon = document.querySelector('#dinner');
const dessertTagIcon = document.querySelector('#dessert');
const sidesTagIcon = document.querySelector('#side');


const recipeTarget = document.querySelector('#recipeTarget');

const recipeDetailsName = document.querySelector('#recipeDetailsName');
const recipeDetailsImage = document.querySelector('#recipeDetailsImage');
const recipeDetailsTags = document.querySelector('#recipePageTags');
const ingredientRow = document.querySelector('#ingredientRow');
const ingredientRowText = document.querySelector('#ingredientRowText');
const recipeInstructions = document.querySelector('#recipeInstructions');
const pantryIngredients = document.querySelector('#pantryIngredients');

function getRandomIndex(array) {
  return Math.floor(Math.random() * array.length);
}

function pageLoad() {
  newRepository.addRecipesToRepository();
  currentPantry.populatePantryIngredientIDs();
  populateMain();
  populateUserName();
  pantryLayout(currentPantry);
}

function populateMain() {
  const randomRecipe1 = newRepository.recipeList[getRandomIndex(newRepository.recipeList)];
  const randomRecipe2 = newRepository.recipeList[getRandomIndex(newRepository.recipeList)];
  const randomRecipe3 = newRepository.recipeList[getRandomIndex(newRepository.recipeList)];
  pushToTrendingDisplay(randomRecipe1, randomRecipe2, randomRecipe3);
  randomize(newRepository.recipeList);
  populateAll(newRepository.recipeList, browseMealsGrid);
}

function populateUserName() {
  welcomeUser.innerText = `${newUser.name}`;
  userFavorites.innerText = `${newUser.name}'s Favorite Recipes`;
  userPantry.innerText = `${newUser.name}'s Pantry`;
  userQueue.innerText = `${newUser.name}'s Cookin' Queue`;
}

function randomize(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * i)
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp;
  }
}

function resetInnerHTML(location) {
  location.innerHTML = ''
}

function pushToTrendingDisplay(recipe1, recipe2, recipe3) {
  trendingDisplay.innerHTML = `
    <section id="${recipe1.id}" class="large-image-section recipe-target">
      <div class="image-section-wrapper">
        <img src="${recipe1.image}" alt="Meal 1" class="large-image">
        <div class="heart-overlay">
          <img src="${recipe1.heartImage}"  class="heart large-image-heart">
        </div>
      </div>
      <button class="queue-button">Add to My Cookin' Queue</button>
      <h2  class="section-name-heading" id="recipeTarget">${recipe1.name}</h2>
    </section>
    <section class="side-images">
      <section id="${recipe2.id}" class="top-side-image recipe-target">
        <div class="image-section-wrapper">
          <img src="${recipe2.image}" alt="Meal2" class="side-image">
          <div class="heart-overlay">
            <img src="${recipe2.heartImage}" class="heart side-heart">
          </div>
        </div>
        <button class="queue-button">Add to My Cookin' Queue</button>
        <h2 class="section-name-heading" id="recipeTarget">${recipe2.name}</h2>
      </section>
      <section id="${recipe3.id}" class="bottom-side-image recipe-target">
        <div class="image-section-wrapper">
          <img src="${recipe3.image}" alt="Meal 3" class="side-image">
          <div class="heart-overlay">
            <img src="${recipe3.heartImage}"  class="heart side-heart">
          </div>
        </div>
        <button class="queue-button">Add to My Cookin' Queue</button>
        <h2 class="section-name-heading" id="recipeTarget">${recipe3.name}</h2>
      </section>
    </section>
  `
}

function populateAll(recipes, location, startingNumber) {
  recipes.forEach((recipe, i) => {
    location.innerHTML += `
      <article id="${recipe.id}" class="mini-recipe recipe-target">
        <div class="mini-recipe-image-container">
          <img class="mini-recipe-img" src="${recipe.image}" id="defaultId">
          <div class="heart-overlay">
            <img src="${recipe.heartImage}" class="heart mini-heart">
          </div>
        </div>
          <button class="queue-button">Add to My Cookin' Queue</button>
          <ul id="miniRecipeTag${i + `${startingNumber}`}" class="mini-recipe-tag">
          </ul>
          <h2 class="mini-recipe-title" id="recipeTarget">${recipe.name}</h2>
      </article>
    `
    const miniRecipeTag = document.querySelector(`#miniRecipeTag${i + `${startingNumber}`}`);
    displayTags(recipe, miniRecipeTag);
  })
}

function recipeDetails(recipe) {
  recipeDetailsTags.innerHTML = '';
  recipePageImageContainer.id = `${recipe.id}`
  recipeDetailsName.innerText = `${recipe.name}`;
  recipeDetailsImage.src = `${recipe.image}`;
  displayTags(recipe, recipeDetailsTags);
  displayIngredients(recipe);
}

function displayTags(recipe, placement) {
  recipe.tags.forEach(tag => {
    placement.innerHTML += `
    <li class="recipe-tag">${tag}</li>
    `
  })
}

function displayIngredients(recipe) {
  ingredientRow.innerHTML = '';
  let total = 0;
  recipe.ingredients.forEach(ingredient => {
    const ingredientName = recipe.findIngredientName(ingredient.id);
    const ingredientPrice = recipe.findIngredientCost(ingredient.id);
    populateMeasurements(ingredient, ingredientName, ingredientPrice, recipe);
    total += (ingredient.quantity.amount * ingredientPrice) / 100
  })
  ingredientTotal.innerText = `$${total.toFixed(2)}`;
  displayInstructions(recipe)
}


function populateMeasurements(ingredient, name, price, recipe) {
  console.log('populateMeasurements:', recipe);
  console.log('measurementIngredientsNeeded', currentPantry.neededIngredients);

  ingredientRow.innerHTML += `
  <div class="ingredient-row-left-side">
    <div class="check-box">
      <img class="check-x" id="measureCheck${ingredient.id}" src="assets/check.png" alt="green check" >
      <img class="check-x " id="measureX${ingredient.id}" src="assets/x.png" alt="red x" >
    </div>
    <p class="ingredient-row-text">${ingredient.quantity.amount} ${ingredient.quantity.unit} ${name}</p>
    <p id="ingredientRowText"class="ingredient-row-price">$${((ingredient.quantity.amount * price) / 100).toFixed(2)}</p>
  </div>
  `
  const measureCheck = document.querySelector(`#measureCheck${ingredient.id}`);
  const measureX = document.querySelector(`#measureX${ingredient.id}`);
  ingredientCheckDisplay(recipe, measureX, measureCheck);
}

function displayInstructions(recipe) {
  recipeInstructions.innerHTML = ''
  recipe.instructions.forEach(step => {
    recipeInstructions.innerHTML += `
    <section class="numbered-recipe-chunk">
    <p class="recipe-number">${step.number}</p>
    <p>${step.instruction}</p>
    </section>
    `
  })
}

function cookinQueueCards() {
  cookinQueueBlock.innerHTML = '';
  newUser.recipesToCook.forEach((cookChoice, i) => {
    cookinQueueBlock.innerHTML += `
      <article id="${cookChoice.id}" class="queue-block recipe-target">
        <h1>${i + 1}</h1>
        <section class="queue-recipe-image-container">
          <img class="queue-recipe-img" src="${cookChoice.image}" id="defaultId">
        </section>
        <div class="queue-words-container">
          <ul id="cookinQueueTags${i + 1}" class="recipe-page-tags">
          </ul>
          <h2 id="cookinQueueRecipe">${cookChoice.name}</h2>
          <button class="az-button pantry-sort-button cook">Cook!</button>
          <img class="check-x" id="cookinCheck${i + 1}${cookChoice.id}" src="assets/check.png" alt="green check" >
          <img class="check-x" id="cookinX${i + 1}${cookChoice.id}" src="assets/x.png" alt="red x" >
        </div>
      </article>
    `
    const cookinQueueTags = document.querySelector(`#cookinQueueTags${i + 1}`)
    const cookinX = document.querySelector(`#cookinX${i + 1}${cookChoice.id}`);
    const cookinCheck = document.querySelector(`#cookinCheck${i + 1}${cookChoice.id}`);
    displayTags(cookChoice, cookinQueueTags);
    cookPossible(cookChoice, cookinX, cookinCheck);
    console.log('cookChoice', cookChoice);
  })
}

function addToCookinQueue() {
  let found;
  // showHide(cookinQueuePage, homePage, favoritesPage, searchResultsPage, userPantryPage, recipeDetailPage)
  newRepository.recipeList.forEach(recipe => {
    if (parseInt(event.target.closest('.recipe-target').id) === recipe.id) {
      found = recipe
      return found;
    }
  })
  newUser.addToCookQueue(found);
  cookinQueueCards();
}

function cookPossible(recipe, cookinX, cookinCheck) {
    currentPantry.neededIngredients = [];
    currentPantry.compareIngredients(recipe);
    console.log('neededIngredients:', currentPantry.neededIngredients)
  if (currentPantry.neededIngredients.length > 0) {
    console.log("B:", cookinX);
    hide([cookinCheck]);
  } else {
    console.log('A:', cookinCheck)
    hide([cookinX]);
  }
}

function ingredientCheckDisplay(recipe, cookinX, cookinCheck) {
  currentPantry.neededIngredients = [];
  currentPantry.compareIngredients(recipe);
  currentPantry.neededIngredients.forEach(neededIngredient => {
    const foundIngredient = ingredientsData.find(ingredient => ingredient.id === neededIngredient.id);
  })
}

function pantryLayout(pantry) {
  ingredientRow.innerHTML = '';
  let total = 0;
  pantry.pantry.forEach(ingredient => {
    const ingredientName = pantry.findIngredientName(ingredient.ingredient);
    const ingredientPrice = pantry.findIngredientCost(ingredient.ingredient);
    populatePantryMeasurements(ingredient, ingredientName, ingredientPrice);
    total += (pantry.pantry.amount * ingredientPrice) / 100
  })
}

function populatePantryMeasurements(ingredient, name, price) {
  pantryIngredients.innerHTML += `
  <div class="ingredient-row-left-side">
    <div class="check-box">
      <img class="check-x" id="check" src="assets/check.png" alt="green check" >
      <img class="check-x hidden" id="x" src="assets/x.png" alt="red x" >
    </div>
    <p class="ingredient-row-text">${ingredient.amount} ${name}</p>
    <p id="ingredientRowText"class="ingredient-row-price">$${((ingredient.amount * price) / 100).toFixed(2)}</p>
  </div>
  `
}


function hide(elements) {
  elements.forEach(element => element.classList.add('hidden'));
}

function show(elements) {
  elements.forEach(element => element.classList.remove('hidden'));
}

function showHide(page1, page2, page3, page4, page5, page6) {
  show([page1]);
  hide([page2, page3, page4, page5, page6]);
}

function goHome() {
  showHide(homePage, recipeDetailPage, favoritesPage, searchResultsPage, userPantryPage, cookinQueuePage);
  // resetInnerHTML(browseMealsGrid);
  // populateMain();
}

// function enlargeRecipe() {
//   showHide(recipeDetailPage, homePage, favoritesPage, searchResultsPage, userPantryPage, cookinQueuePage)
//   newRepository.recipeList.forEach(recipe => {
//     if (parseInt(event.target.closest('.recipe-target').id) === recipe.id) {
//       recipeDetails(recipe)
//     }
//   })
// }

function enlargeRecipe() {
  showHide(recipeDetailPage, homePage, favoritesPage, searchResultsPage, userPantryPage, cookinQueuePage)
  const targetId = parseInt(event.target.closest('.recipe-target').id);
  const foundRecipe = newRepository.recipeList.find(recipe => targetId === recipe.id);
  recipeDetails(foundRecipe);
}

function displayPantry() {
  showHide(userPantryPage, homePage, recipeDetailPage, favoritesPage, searchResultsPage, cookinQueuePage)
}

function displayQueue() {
  showHide(cookinQueuePage, homePage, recipeDetailPage, favoritesPage, searchResultsPage, userPantryPage)
}

function searchBarSearch() {
  showHide(searchResultsPage, homePage, recipeDetailPage, favoritesPage, userPantryPage, cookinQueuePage);
  resetInnerHTML(searchResultGrid);
  newRepository.resetFilteredList();
  newRepository.filteredIngredientID = [];
  let searchBarInput = searchBar.value;
  newRepository.searchRecipes(searchBarInput, ingredientsData, recipeData,
    newRepository.filteredIngredientID, newRepository.filteredList, newRepository.recipeList);
  // console.log('SearchBarSearch:', newRepository.filteredList);
  populateAll(newRepository.filteredList, searchResultGrid, 100)
  searchBar.value = '';
}

function favoritesSearchBarSearch() {
  showHide(searchResultsPage, homePage, favoritesPage, recipeDetailPage, userPantryPage, cookinQueuePage);
  resetInnerHTML(favoritesGrid);
  newUser.resetRecipes();
  let searchBarInput = favoritesSearchBar.value;
  newUser.sortFavorites(searchBarInput, ingredientsData, recipeData,
    newUser.filteredIngredientID, newUser.filteredFavorites, newUser.favoriteRecipes);
  populateAll(newUser.filteredFavorites, favoritesGrid, 200)
  favoritesSearchBar.value = '';
}

function tagSearch(e) {
  showHide(searchResultsPage, homePage, recipeDetailPage, favoritesPage, userPantryPage, cookinQueuePage);
  resetInnerHTML(searchResultGrid);
  newRepository.resetFilteredList();
  let tagSearchInput = event.path[1].id;
  newRepository.filterRecipesByTags(tagSearchInput, newRepository.recipeList, newRepository.filteredList );
  populateAll(newRepository.filteredList, searchResultGrid, 700);
}

function favoriteRecipeHandler(event) {
  let clickedHeartRecipeID = parseInt(event.target.closest('.recipe-target').id);
  let clickedRecipe = newRepository.findRecipeByRecipeID(clickedHeartRecipeID);
  newRepository.updateFavoriteOnRecipe(clickedRecipe);
  if (clickedRecipe.favorited === false) {
    event.target.src = 'assets/grey-heart.png';
    newUser.removeFavorite(clickedRecipe);
    resetInnerHTML(favoritesMealsGrid);
    populateAll(newUser.favoriteRecipes, favoritesMealsGrid, 300);
  } else if (clickedRecipe.favorited) {
    event.target.src = 'assets/pink-heart.png';
    newUser.addFavorite(clickedRecipe);
  }
}

function displayFavorites() {
  showHide(favoritesPage, homePage, searchResultsPage, recipeDetailPage, userPantryPage, cookinQueuePage);
  resetInnerHTML(favoritesMealsGrid);
  populateAll(newUser.favoriteRecipes, favoritesMealsGrid, 400);
}

function recipeCardFunctionalityHandler(event) {
  if (event.target.closest('.heart')) {
    favoriteRecipeHandler(event);
  } else if (event.target.closest('.recipe-target') && !event.target.closest('.queue-button') && !event.target.closest('.az-button')) {
    enlargeRecipe();
  } else if (event.target.closest('.queue-block') && !event.target.closest('.az-button')) {
    console.log('enlarge')
    enlargeRecipe();
  } else if (event.target.closest('.cook')) {
      currentPantry.cookRecipe();
  } else if (event.target.closest('.queue-button')) {
    addToCookinQueue();
  }
}

window.addEventListener('load', pageLoad);
headerLogo.addEventListener('click', goHome);
homeButtonInHeader.addEventListener('click', goHome);
favoriteButtonInHeader.addEventListener('click', displayFavorites);
queueButtonInHeader.addEventListener('click', displayQueue);
pantryButtonInHeader.addEventListener('click', displayPantry);
browseMealsGrid.addEventListener('click', recipeCardFunctionalityHandler);
searchResultGrid.addEventListener('click', recipeCardFunctionalityHandler);
favoritesGrid.addEventListener('click', recipeCardFunctionalityHandler);
recipeDetailPage.addEventListener('click', recipeCardFunctionalityHandler);
trendingDisplay.addEventListener('click', recipeCardFunctionalityHandler);
favoritesMealsGrid.addEventListener('click', recipeCardFunctionalityHandler);
cookinQueueBlock.addEventListener('click', recipeCardFunctionalityHandler);

appetizerTagIcon.addEventListener('click', function (event) {
  tagSearch(event.target.id);
})
breakfastTagIcon.addEventListener('click', function (event) {
  tagSearch(event.target.id);
});
lunchTagIcon.addEventListener('click', function (event) {
  tagSearch(event.target.id);
});
dinnerTagIcon.addEventListener('click', function (event) {
  tagSearch(event.target.id);
});
dessertTagIcon.addEventListener('click', function (event) {
  tagSearch(event.target.id);
});
sidesTagIcon.addEventListener('click', function (event) {
  tagSearch(event.target.id);
});

searchBar.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    searchBarSearch();
  }
})

favoritesSearchBar.addEventListener('keydown', function (event) {
  if (event.keyCode === 13) {
    favoritesSearchBarSearch();
  }
})
