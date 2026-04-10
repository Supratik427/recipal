function renderPlanner() {
  const planner = getPlanner();
  const today = new Date().toLocaleDateString('en-US', { weekday: 'long' });

  DAYS.forEach(day => {
    const dayData = planner[day] || {};
    SLOTS.forEach(slot => {
      const cell = document.getElementById(`cell-${day}-${slot}`);
      if (!cell) return;
      const meal = dayData[slot];
      if (meal) {
        cell.innerHTML = `
          <div class="meal-slot-content">${meal.strMeal}</div>
          <div class="remove-meal" onclick="removeMeal('${day}','${slot}')">✕ remove</div>
        `;
      } else {
        cell.innerHTML = `<div class="meal-slot-empty" onclick="openAddMealModal('${day}','${slot}')">+ Add</div>`;
      }
    });

    const header = document.getElementById(`header-${day}`);
    if (header && day === today) header.classList.add('today');
  });
}

function removeMeal(day, slot) {
  removePlannerMeal(day, slot);
  renderPlanner();
  showToast('Meal removed');
}

let currentDay = '', currentSlot = '';

function openAddMealModal(day, slot) {
  currentDay = day;
  currentSlot = slot;
  document.getElementById('modal-title').textContent = `Add ${slot} for ${day}`;
  document.getElementById('add-meal-modal').classList.add('open');
  document.getElementById('meal-search-input').value = '';
  document.getElementById('meal-search-results').innerHTML = '';
}

function closeModal() {
  document.getElementById('add-meal-modal').classList.remove('open');
}

async function searchMealsForPlanner() {
  const q = document.getElementById('meal-search-input').value.trim();
  const resultsEl = document.getElementById('meal-search-results');
  if (q.length < 2) { resultsEl.innerHTML = '<p style="color:var(--text3);font-size:0.85rem;">Type at least 2 characters</p>'; return; }

  resultsEl.innerHTML = '<div class="loading"><div class="spinner"></div></div>';
  const meals = await searchRecipes(q);

  if (!meals.length) { resultsEl.innerHTML = '<p style="color:var(--text3);font-size:0.85rem;">No results found</p>'; return; }

  resultsEl.innerHTML = meals.slice(0, 6).map(m => `
    <div onclick="selectMeal('${m.idMeal}','${m.strMeal.replace(/'/g,"\\'")}','${m.strMealThumb}')"
      style="display:flex;align-items:center;gap:10px;padding:8px;border-radius:8px;cursor:pointer;border:1px solid var(--border);margin-bottom:6px;background:var(--bg);">
      <img src="${m.strMealThumb}/preview" style="width:44px;height:44px;border-radius:6px;object-fit:cover;">
      <span style="font-size:0.88rem;">${m.strMeal}</span>
    </div>
  `).join('');
}

function selectMeal(id, name, thumb) {
  setPlannerMeal(currentDay, currentSlot, { idMeal: id, strMeal: name, strMealThumb: thumb });
  closeModal();
  renderPlanner();
  generateShoppingList();
  showToast(`${name} added to ${currentSlot} on ${currentDay}`);
}

async function generateShoppingList() {
  const planner = getPlanner();
  const listEl = document.getElementById('shopping-list');
  if (!listEl) return;

  const allIds = [];

  // ✅ Allow duplicates (FIXED)
  Object.values(planner).forEach(day => {
    Object.values(day).forEach(meal => { 
      allIds.push(meal.idMeal);
    });
  });

  if (!allIds.length) {
    listEl.innerHTML = '<p style="color:var(--text3);font-size:0.9rem;">Add meals to your planner to generate a shopping list.</p>';
    return;
  }

  listEl.innerHTML = '<div class="spinner" style="margin:1rem auto;"></div>';

  const allIngredients = {};

  for (const id of allIds) {
    try {
      const meal = await getRecipeById(id);
      if (!meal) continue;

      const ings = getIngredients(meal);

      ings.forEach(ing => {
        const key = ing.name.toLowerCase();

        // ✅ Initialize with count
        if (!allIngredients[key]) {
          allIngredients[key] = { 
            name: ing.name, 
            count: 0, 
            measures: [] 
          };
        }

        // ✅ Count duplicates
        allIngredients[key].count++;

        if (ing.measure) {
          allIngredients[key].measures.push(ing.measure);
        }
      });

    } catch(e) {}
  }

  const sorted = Object.values(allIngredients)
    .sort((a, b) => a.name.localeCompare(b.name));

  if (!sorted.length) {
    listEl.innerHTML = '<p style="color:var(--text3);">No ingredients found.</p>';
    return;
  }

  // ✅ Improved UI with count
  listEl.innerHTML = sorted.map((ing, i) => `
    <div class="shopping-item" id="si-${i}">
      <input type="checkbox" id="chk-${i}" onchange="toggleItem(${i})">
      <label for="chk-${i}" style="flex:1;">
        ${ing.name} ${ing.count > 1 ? `(x${ing.count})` : ''}
      </label>
      <span style="font-size:0.8rem;color:var(--text3);">
        ${ing.measures.join(', ')}
      </span>
    </div>
  `).join('');
}
function toggleItem(i) {
  document.getElementById(`si-${i}`).classList.toggle('checked', document.getElementById(`chk-${i}`).checked);
}
