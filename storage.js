// FAVOURITES
function getFavourites() {
  return JSON.parse(localStorage.getItem('rp_favourites') || '[]');
}

function saveFavourite(meal) {
  const favs = getFavourites();
  const exists = favs.find(f => f.idMeal === meal.idMeal);
  if (!exists) {
    favs.push({
      idMeal: meal.idMeal,
      strMeal: meal.strMeal,
      strMealThumb: meal.strMealThumb,
      strCategory: meal.strCategory,
      strArea: meal.strArea
    });
    localStorage.setItem('rp_favourites', JSON.stringify(favs));
    return true;
  }
  return false;
}

function removeFavourite(id) {
  const favs = getFavourites().filter(f => f.idMeal !== id);
  localStorage.setItem('rp_favourites', JSON.stringify(favs));
}

function isFavourite(id) {
  return getFavourites().some(f => f.idMeal === id);
}

function toggleFavourite(meal) {
  if (isFavourite(meal.idMeal)) {
    removeFavourite(meal.idMeal);
    return false;
  } else {
    saveFavourite(meal);
    return true;
  }
}

// MEAL PLANNER
const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const SLOTS = ['Breakfast', 'Lunch', 'Dinner'];

function getPlanner() {
  return JSON.parse(localStorage.getItem('rp_planner') || '{}');
}

function setPlannerMeal(day, slot, meal) {
  const planner = getPlanner();
  if (!planner[day]) planner[day] = {};
  planner[day][slot] = {
    idMeal: meal.idMeal,
    strMeal: meal.strMeal,
    strMealThumb: meal.strMealThumb
  };
  localStorage.setItem('rp_planner', JSON.stringify(planner));
}

function removePlannerMeal(day, slot) {
  const planner = getPlanner();
  if (planner[day]) {
    delete planner[day][slot];
    if (Object.keys(planner[day]).length === 0) delete planner[day];
    localStorage.setItem('rp_planner', JSON.stringify(planner));
  }
}

function clearPlanner() {
  localStorage.removeItem('rp_planner');
}

// OWN RECIPES
function getOwnRecipes() {
  return JSON.parse(localStorage.getItem('rp_own_recipes') || '[]');
}

function saveOwnRecipe(recipe) {
  const recipes = getOwnRecipes();
  recipe.idMeal = 'own_' + Date.now();
  recipe.isOwn = true;
  recipes.push(recipe);
  localStorage.setItem('rp_own_recipes', JSON.stringify(recipes));
  return recipe;
}

// TOAST HELPER
function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2800);
}
