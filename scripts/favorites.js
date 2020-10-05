import { setStatus, darkMode, noResult, hoverGifMenu, displayTrendingGifos } from "./shared.js";

var seeMoreButton = document.querySelector('.button');
var resultsParentContainer = document.querySelector('.favContainer');
var parentContainer = document.querySelector('.favGifs');
var favorites = [];

setStatus('favorites');
// darkMode('favorites');

var img = '/assets/icon-mis-gifos-sin-contenido.svg';
var text = '"Guarda tu primer gifo en favoritoa para que se muestre aquí!"';

function checkLocalstorage() {
    if (localStorage.favs) {

        favorites = JSON.parse(localStorage.favs);

        if (favorites.length === 0) {

            seeMoreButton.style.display = 'none';
            noResult(parentContainer, img, text);

        }

        resultsParentContainer.style.display = 'grid';
        
        setFavorites();

    } else {

        seeMoreButton.style.display = 'none';
        noResult(parentContainer, img, text);
    }
}
seeMoreButton.addEventListener('click', setFavorites)
function setFavorites() {
    if (favorites.length > 12) {
        for (let i = 0; i < 12; i++) {
            hoverGifMenu(favorites[i], resultsParentContainer);
        }
        favorites.splice(0, 12);
    } else {
        for (let i = 0; i < favorites.length; i++) {
            hoverGifMenu(favorites[i], resultsParentContainer)
        }
        seeMoreButton.style.display = 'none';
    }
}

checkLocalstorage();

displayTrendingGifos();