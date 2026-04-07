# RecipePal – Recipe Finder & Meal Planner

A web application to search recipes, save favourites, plan weekly meals, and generate shopping lists.

## Features

- Search thousands of recipes using TheMealDB API
- Filter by cuisine and category
- Save favourite recipes (localStorage)
- 7-day meal planner (breakfast, lunch, dinner)
- Auto-generated shopping list from planned meals
- Add and save your own custom recipes
- Responsive design for mobile and desktop

## Pages

| Page | File | Description |
|------|------|-------------|
| Home / Search | `index.html` | Search recipes with filters |
| Recipe Detail | `recipe.html` | Full recipe with ingredients, steps, YouTube video |
| Meal Planner | `planner.html` | Weekly planner + shopping list |
| Favourites | `favourites.html` | Saved and custom recipes |
| Add Recipe | `add-recipe.html` | Form to add your own recipe |

## Forms (3 required)

1. **Search Form** (`index.html`) – keyword search with category and cuisine filters
2. **Add Recipe Form** (`add-recipe.html`) – add custom recipes with full validation
3. **Meal Planner Form** (`planner.html` modal + `recipe.html` modal) – assign recipes to days/slots

## Tech Stack

- HTML5, CSS3, Vanilla JavaScript
- [TheMealDB API](https://www.themealdb.com/api.php) (free, no key needed)
- localStorage for data persistence
- Google Fonts (Playfair Display + DM Sans)

## How to Run

1. Clone the repository:
   ```
   git clone https://github.com/YOUR_USERNAME/recipe-planner.git
   ```
2. Open `index.html` in your browser — no server or installation needed.

Or view the live demo: [GitHub Pages link here]

## File Structure

```
recipe-planner/
├── index.html         ← Home / Search page
├── recipe.html        ← Recipe detail page
├── planner.html       ← Meal planner page
├── favourites.html    ← Favourites page
├── add-recipe.html    ← Add custom recipe page
├── css/
│   └── style.css      ← All styles
├── js/
│   ├── api.js         ← TheMealDB API functions
│   ├── storage.js     ← localStorage helpers + toast
│   └── planner.js     ← Meal planner logic
└── README.md
```

## Team

- **Name:** [Your Name]
- **Course:** BCSE203E – Web Programming
- **Team Name:** [Your Team Name]
