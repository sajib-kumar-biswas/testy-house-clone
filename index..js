document.location.reload

function showHomeResults(cates) {
    /* console.log(cates); */

    const resultContainer = document.getElementById("results");
    resultContainer.textContent = "";

    const div = document.createElement("div");
    div.classList.add("row");

    cates.map((cat) => {
        /* console.log(cat); */
        div.innerHTML += `
            <div class="col-lg-4 col-md-6">
                    <img src=${cat.strCategoryThumb} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${cat.strCategory}</h5>
                        <p class="card-text">${cat.strCategoryDescription.slice(0, 100)}</p>
                    </div>
                </div>
        `
    })

    resultContainer.appendChild(div);
}

function showResults(meals) {
    /* console.log(meals); */

    const resultContainer = document.getElementById("results");
    resultContainer.textContent = "";

    if(!meals) {
        resultContainer.innerHTML += `<p class="text-danger w-50 mx-auto">Nothing found. Search something else.</p>`;
        return;
    }

    const div = document.createElement("div");
    div.classList.add("row");

    meals.map((meal) => {
        /* console.log(meal); */

        div.innerHTML += `
            <div class="col-lg-4 col-md-6">
                    <img src=${meal.strMealThumb} class="card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${meal.strMeal}</h5>
                        <p class="card-text">${meal.strInstructions.slice(0, 100)}</p>
                    </div>
                </div>
        `
    })

    resultContainer.appendChild(div);
}

function doStuff(key) {
    key = key.trim().replace( / +/g , "+");
    /* console.log(key); */
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${key}`;
    /* console.log(url); */

    fetch(url)
    .then(res => res.json())
    .then(data => showResults(data.meals));
}

function handleSearch() {
    const search = document.getElementById("search");
    doStuff(search.value);
    search.value = "";
}

function homeFetch() {
    const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

    fetch(url)
    .then(res => res.json())
    .then(data => showHomeResults(data.categories));
}