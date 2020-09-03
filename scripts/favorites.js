import { noResult, hoverGifMenu, displayTrendingGifos } from "./shared.js";

var seeMoreButton = document.querySelector('.button');
var resultsParentContainer = document.querySelector('.favContainer');
var parentContainer = document.querySelector('.favGifs');
var favorites = [];

function checkLocalstorage() {
    if (localStorage.favs) {
        favorites = JSON.parse(localStorage.favs);
        resultsParentContainer.style.display = 'grid';
        alert('With favorites');
    } else {
        alert('No favs');
        var img = '/assets/icon-mis-gifos-sin-contenido.svg';
        var text = 'Sin contenido';
        noResult(parentContainer, img, text);
    }
    // for (let i = 0; i < favorites.length; i++) {
    //     console.log(favorites[i].title);
    // }
}
seeMoreButton.addEventListener('click', setFavorites)
function setFavorites() {
    if (favorites.length > 12) {
        for (let i = 0; i < 12; i++) {
            hoverGifMenu(favorites[i], resultsParentContainer);
        }
        favorites.splice(0, 12);
    } else {
        for(let i = 0; i < favorites.length; i++) {
            hoverGifMenu(favorites[i], resultsParentContainer)
        }
        seeMoreButton.style.display = 'none';
    }
}


checkLocalstorage();
setFavorites();

displayTrendingGifos()



// export default hoverGifMenu;