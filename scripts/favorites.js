import { noResult, hoverGifMenu, displayTrendingGifos } from "./shared.js";

var seeMoreButton = document.querySelector('.button'); // Exportable
var resultsParentContainer = document.querySelector('.favContainer');

var favorites = JSON.parse(localStorage.favs);

function getFavorites() {
    if(localStorage.favs) {
        alert('With favorites');
        for (let i = 0; i < favorites.length; i++) {
            resultsParentContainer.style.display = 'grid';
            console.log(favorites[i]);
            hoverGifMenu(favorites[i], resultsParentContainer)
        }
    } else {
        alert('No favs');
        var img = '/assets/icon-mis-gifos-sin-contenido.svg';
        var text = 'Sin contenido';
        noResult(resultsParentContainer, img, text);
    }
    // for (let i = 0; i < favorites.length; i++) {
    //     console.log(favorites[i].title);
    // }
}
getFavorites();

// seeMoreButton.style.display = 'none';

// console.log(favorites);

displayTrendingGifos()



// export default hoverGifMenu;