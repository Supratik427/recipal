const API_BASE = 'https://www.themealdb.com/api/json/v1/1';

async function searchRecipes(query) {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`
    );

    const data = await res.json();
    return data.meals;

  } catch (error) {
    console.error(error);
    return null;
  }
}

async function filterByCategory(category) {
  const res = await fetch(`${API_BASE}/filter.php?c=${encodeURIComponent(category)}`);
  const data = await res.json();
  return data.meals || [];
}

async function filterByArea(area) {
  const res = await fetch(`${API_BASE}/filter.php?a=${encodeURIComponent(area)}`);
  const data = await res.json();
  return data.meals || [];
}

async function getRecipeById(id) {
  const res = await fetch(`${API_BASE}/lookup.php?i=${id}`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

async function getRandomRecipe() {
  const res = await fetch(`${API_BASE}/random.php`);
  const data = await res.json();
  return data.meals ? data.meals[0] : null;
}

async function getCategories() {
  const res = await fetch(`${API_BASE}/categories.php`);
  const data = await res.json();
  return data.categories || [];
}

function getIngredients(meal) {
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ing = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ing && ing.trim()) {
      ingredients.push({ name: ing.trim(), measure: measure ? measure.trim() : '' });
    }
  }
  return ingredients;
}
