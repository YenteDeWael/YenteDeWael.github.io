//#region variables

const api_url = 'https://www.themealdb.com/api/json/v1/1/random.php';
let ingredientArray = []
let measurementArray = []
//#endregion

//#region fetch en verwerk data
const fetchData = () => {
    return fetch(api_url)
        .then(r => r.json())
        .then(data => data);
};


const getMeal = async function() {
    const data = await fetchData(api_url);
    console.log(data);
    verwerkData(data);


};

const verwerkData = data => {
    console.log("meal " + data.meals[0].strMeal);
    console.log("area " + data.meals[0].strArea);
    console.log("categorie " + data.meals[0].strCategory);
    console.log("youtubelink  " + data.meals[0].strYoutube);
    console.log("afbeelding " + data.meals[0].strMealThumb);
    console.log("tags " + data.meals[0].strSource);
    console.log("instructies " + data.meals[0].strInstructions);

    for (let [key, value] of Object.entries(data.meals[0])) {
        if (key.includes('strIngredient') && value) {
            ingredientArray.push(value)
        };
    };
    for (let [key, value] of Object.entries(data.meals[0])) {
        if (key.includes('strMeasure') && value && value != " ") {
            measurementArray.push(value)
        };
    };
    console.log(ingredientArray.length + " ingrediënten: " + ingredientArray);
    console.log(measurementArray.length + " measurements: " + measurementArray);

    // domPosterMovie.setAttribute('src', data.meals[0].strMealThumb);
    // domPosterMovie.innerHTML = moviePosterHTML;

    // data in de html steken
    mealName(data);
    ingredAndMeasure();
    mealInstructions(data);
    tagsMeal(data); 
    mealCulture(data);
    mealImg(data);
    sourceMeal(data);
    mealProgress();


};
//#endregion
//#region region fill data functions
const sourceMeal = data =>{
    let sourceHTML = "";
    if(data.meals[0].strSource !== (null || "")){
        sourceHTML = `<div class="o-layout c-hidden">
        <div class="o-layout__item-context">
            <h2 class="c-subtitel">Source</h2>
        </div>
        <div class="o-layout__item-context">   
            <a class="c-lead c-lead--md c-link" href="data.meals[0].strSource">${data.meals[0].strSource}</a>  
        </div><!-- test-->

        </div>`;
        domSource.innerHTML = sourceHTML; 
    }
}



const tagsMeal = data => {
    let tagsHTML = "";
    if(data.meals[0].strTags !== null){
        tagsHTML = `<div class="o-layout">
        <div class="o-layout__item-context">                         
            <h2 class="c-subtitel">Tags</h2>
        </div>
        <div class="o-layout__item-context">
            <p class="js-tags c-lead c-lead--md">${data.meals[0].strTags}</p>
        </div>
    </div>`;
    domTags.innerHTML = tagsHTML; 
    }
}

// const tagsMeal2 = data => {
//     let tagsHTML = "";
//     if(data.meals[0].strTags == null){
//         tagsHTML = `<p class="js-tags c-lead c-lead--md">No tags</p> `;
//     }else{
//         tagsHTML = `<p class="js-tags c-lead c-lead--md">${data.meals[0].strTags}</p> `;
//     }
//     domTags.innerHTML = tagsHTML;    
// }

// location.reload();
const mealInstructions = data => {
    let instructionsHTML = "";
    instructionsHTML = `<p class="js-instructions c-lead c-lead--md"> ${data.meals[0].strInstructions}</p> `;
    domInstructions.innerHTML = instructionsHTML;
}

const mealName = data => {
    let nameHTML = "";
    nameHTML = `<h1 class="js-nameMeal">${data.meals[0].strMeal}</h1>`;
    domName.innerHTML = nameHTML;
    
};

function getId(url) {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);

    return (match && match[2].length === 11)
      ? match[2]
      : null;
}
 

const mealImg = data => {
    const videoId = getId(data.meals[0].strYoutube);
    let imgHTML = "";
    console.log(videoId);
    //https://www.youtube.com/watch?v=i_zemP3yBKw
    imgHTML = `<img class=" c-figure  " src="${data.meals[0].strMealThumb}" alt="test">`;

    if(data.meals[0].strYoutube !== (null || "")){
        imgHTML += `<iframe class="u-mb-lg c-video c-hidden" src="https://www.youtube.com/embed/${videoId}"></iframe>`;
    }   
    domThumb.innerHTML = imgHTML;
}


const mealCulture = data => { 
    let cultureHTML = "";
    cultureHTML = `<p class="js-culture c-lead c-lead--md">${data.meals[0].strArea}</p>`;
    domCulture.innerHTML = cultureHTML;
}


const ingredAndMeasure = () => {
    let htmlIngredients = "";
    let htmltest = "";
    let htmltest2 ="";
    let htmltest3 ="";
    htmlIngredients += `<p class="js-ingredients c-lead c-lead--md">`;
    htmltest2 = `</p>`;

    htmltest3= `${measurementArray[parseInt(ingredientArray.length-1)]} ${ingredientArray[parseInt(ingredientArray.length-1)]}.`;
    console.log(ingredientArray.length)
    for(let i = 0; i < ingredientArray.length - 1; i++){ 
        htmltest += `${measurementArray[i]} ${ingredientArray[i]}, `; 
    }
    domIngredients.innerHTML = htmlIngredients + htmltest + htmltest3+ htmltest2;
}

const mealProgress = ()=> {
    console.log(parseInt(((ingredientArray.length / 20) * 100)));
    let percentage =parseInt(((ingredientArray.length / 20) * 100));
    let htmlTitle = "";
    htmlTitle = `
    <h2 class="c-subtitel">Ingredients:</h2>
    <h2 class="c-ingredients">${ingredientArray.length}</h2>
    <progress  class="c-progressbar" id="file" value="${percentage}" max="100"></progress>`;
    //
    domTitleIngredients.innerHTML = htmlTitle;
}
//#endregion


const testing=()=>{
	const testfile=document.querySelector(".js-wait");
	testfile.className="hidden";
}

window.addEventListener("load", function () {
	const loader = document.querySelector(".js-loader");
	timerfunct(loader);
});

const timerfunct=(loader)=>{
	setTimeout(function(){	loader.className += " hidden";},1000)
}

//#region DOM
document.addEventListener('DOMContentLoaded', function() {
    console.log('Script loaded!');
    domName = document.querySelector('.js-nameMeal');
    domThumb = document.querySelector('.js-mealThumb');
    domIngredients = document.querySelector('.js-ingredients');
    domInstructions = document.querySelector('.js-instructions');
    domTags = document.querySelector('.js-tags');
    domCulture = document.querySelector('.js-culture');
    domSource = document.querySelector('.js-source');
    domTitleIngredients = document.querySelector('.js-titleIngredients');
    getMeal();
    // let htmlsensor="";
    // htmlsensor.innerHTML = `<div class="c-progress">
    //                                 <div class="c-progress-light c-progress-center" style="width:20%">
    //                                 <p class="c-progress-text rotate-90">°C</p>
    //                                 </div> 
    // 							  </div>`;
    // document.getElementById("js-sensordata").innerHTML = HTML;
});
//#endregion