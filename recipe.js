const searchbtn = document.querySelector('.searchbtn');
const searchbar = document.querySelector('.searchbar');
const recipeContainer = document.querySelector('.recipe-container');
const recipeDetailsContent = document.querySelector('.recipe-details-content');
const recipeCloseBtn = document.querySelector('.recipe-close-btn'); 


const fetchRecipe= async (findRecipe)=>{
    recipeContainer.innerHTML="<h2>Loading recipes...</h2>";
    const searchedRecipe= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${findRecipe}`);
    const response = await searchedRecipe.json();

    recipeContainer.innerHTML="";
    response.meals.forEach(meal => {
        const recipeDiv = document.createElement(`div`);
        recipeDiv.classList.add("recipe");
        recipeDiv.innerHTML=`
        <img src="${meal.strMealThumb}">
        <h3>${meal.strMeal}</h3>
        <p>${meal.strArea} Dish</p>
        <p>${meal.strCategory} Category</p>
        `

        // view recipe button
        const button = document.createElement('button');
        button.textContent = 'View Recipe';
        recipeDiv.appendChild(button);

        // even liestener for button click of view recipe
        button.addEventListener('click', () => {
            openRecipePopUp(meal);
            
        });

        recipeContainer.appendChild(recipeDiv);      
    });   
};

//to fetch ingridients and quantity measure for particular meal
const fetchIngredients = (meal) => {
    let ingredientsList ="";
    for(let i = 1;i<=20;i++){
        const ingredient =meal[`strIngredient${i}`];
        if(ingredient){
            const measure =meal[`strMeasure${i}`];
            ingredientsList += `<li>${ingredient} ${measure} </li>`
        }
        else{
            break;
        }
        
    }

    return ingredientsList;
    
}

const openRecipePopUp = (meal) => {
    recipeDetailsContent.innerHTML=`
    <h2 class="recipe-name">${meal.strMeal}</h2>
    <h3 class="recipe-ingredients-title">Ingredients:</h3>
    <ul class="recipe-ingredients">${fetchIngredients(meal)}</ul>
    
    <div class="recipe-instructions" > 
        <h3>Instructions:</h3>
        <p >${meal.strInstructions}</p>
    </div>
    `
    
    recipeDetailsContent.parentElement.style.display="block";
}

recipeCloseBtn.addEventListener("click" ,()=>{
    recipeDetailsContent.parentElement.style.display="none";
});

//SEARCH BUTTON ON HEADER
searchbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    const searchInput = searchbar.value.trim();
    fetchRecipe(searchInput);
    
});