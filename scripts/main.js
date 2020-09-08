import { hoverGifMenu, displayTrendingGifos } from "./shared.js";
var url = 'https://api.giphy.com/v1/gifs/'; // Exportable
const apiKey = 'ES5Qs5lBlti0twPy81oeRnqfaDotGqp8'; // Exportable
var resultsPage = document.querySelector('.results');
var resultsGrid = document.querySelector('.resultsContainer');
var searchButton = document.querySelector('.searchAction'); // Exportable


function dynamicTrendTitles() {

    var trend = document.querySelector('.trendNames')

    var path = `${url}trending?api_key=${apiKey}&limit=5`

    var title = ''

    fetch(path).then(rawResponse => rawResponse.json())
        .then(json => {
            var titles;
            json.data.forEach(data => {
                title += `${data.title.split(' GIF')[0]}, `;
            });
            console.log(title.split(', '));
            console.log(title.split(',').length);
            titles = title;
            trend.textContent = titles;
            console.log(title);
        })
}
dynamicTrendTitles();

var input = document.querySelector('.searchInput');
input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        // alert('enter');
        e.preventDefault();
        getSearchPath();
    }
});
input.addEventListener('input', autocomplete);
function autocomplete() {
    // searchButton.style.backgroundImage = 'url("/assets/button-close.svg")';
    if (input.value) {
        searchButton.style.backgroundImage = 'url("/assets/button-close.svg")';
    } else {
        searchButton.style.backgroundImage = 'url("/assets/icon-search.svg")';
    }
    setSuggestions(input.value);
    // setIcon;
}
// function setIcon() {
//     if(input.value) {
//         searchButton.style.backgroundImage = 'url("/assets/button-close.svg")';
//     }
// }

// Function with async/await aproach
var suggestionsList = document.querySelector('.suggestions');
async function setSuggestions(query) {

    // if(query === ' ') {
    //     alert('empty query');
    //     searchButton.style.backgroundImage = 'url("/assets/button-close.svg")';
    // } else {
    //     alert('filled query')
    // }
    suggestionsList.style = 'display : block';
    var path = `${url}search/tags?api_key=${apiKey}&q=${query}&limit=5`

    var response = await fetch(path);
    var data = response.json();
    data.then(res => {
        res.data.forEach(autocomplete => {
            var li = document.createElement('li')
            var search = document.createElement('div');
            var text = document.createElement('div');
            search.className = 'image';
            text.className = 'text';
            text.innerHTML = autocomplete.name;
            li.appendChild(search);
            li.appendChild(text);
            // li.addEventListener('click', getSearchPath);
            suggestionsList.appendChild(li);
            console.log(autocomplete.name);
            li.addEventListener('click', () => {
                input.value = li.innerText;
                getSearchPath();
            })
        })
    });
    suggestionsList.innerHTML = '';
    console.log(input.value);
}

// searchButton.addEventListener('click', getSearchPath) // Exportable

// while (input.value != '') {
//     searchButton.style.backgroundImage = 'url("/assets/button-close.svg")';
// }
var searchOffsetCounter = 0; // Exportable
var seeMoreButton = document.querySelector('.button'); // Exportable

// This function gets the path and sends it to the *search* function
var q = '';
searchButton.addEventListener('click', () => {
    input.value = '';
    suggestionsList.innerText = '';
    searchButton.style.backgroundImage = 'url("/assets/icon-search.svg")';
    resultsPage.style.display = 'none';
    //=====================================================================================
});
function getSearchPath() { // Exportable
    if (input.value) {
        resultsGrid.innerHTML = ''
        var path = `${url}search?api_key=${apiKey}&q=${input.value}&limit=12`;
        q = input.value;
        console.log(`${path}`);
        search(path);
        seeMoreButton.addEventListener('click', seeMorePath);
    } else {
        alert('empty input');
    }
}
// getSearchPath();


let queryCounter = 0; // Exportable
var offset = 1; // Exportable

function seeMorePath() { // Exportable
    queryCounter++;
    offset = queryCounter * 12;
    var path = `${url}search?api_key=${apiKey}&q=${q}&offset=${offset}&limit=12`;
    console.log(path);
    search(path)
}

// Function with fetch default promises aproach
function search(endpoint) { // Exportable and change name

    var resultsTitle = document.querySelector('.heading');
    resultsTitle.innerHTML = input.value;
    resultsPage.style = 'display:flex'

    var path = endpoint;

    if (input.value) {

        fetch(path).then(raw => raw.json()).then(json => {
            (json.data.length < 12) ? (seeMoreButton.style.display = 'none') : (seeMoreButton.style.display = 'block')
            json.data.forEach(obj => {
                hoverGifMenu(obj, resultsGrid);
            })
        })
    } else {
        alert('empty')
    }
}
displayTrendingGifos();

// localStorage.clear();

// search()

// function displayTrendingGifos() {
//     // var carousel = document.querySelector('.carousel');


//     var path = `${url}trending?api_key=${apiKey}&limit=10`;

//     fetch(path).then(rawResponse => rawResponse.json())
//         .then(res => {
//             res.data.forEach(obj => {
//                 localStorage.set
//                 // hoverMenuCarousel(obj.images.original.url, obj.title, obj.username, carousel);
//                 hoverGifMenu(obj, carousel);
//             })
//         })
//         .catch(err => console.log(err))
// }
// localStorage.clear()
// var carousel = document.querySelector('.carousel');

// ==================================== TEST =======================================

// function hoverGifMenu(json, parent) {

//     var gif_menuContainer = document.createElement('div');
//     gif_menuContainer.className = 'gif-menuContainer'

//     var trendGif = document.createElement('img');
//     trendGif.className = 'trendGif';
//     trendGif.setAttribute('src', json.images.original.url);

//     var menu = document.createElement('div');
//     menu.className = 'menu';

//     var icons = document.createElement('div')
//     icons.className = 'icons'

//     var likeIcon = document.createElement('img')
//     likeIcon.className = 'like icon';
//     var downloadIcon = document.createElement('img');
//     downloadIcon.className = 'download icon'
//     var maxIcon = document.createElement('img')
//     maxIcon.className = 'expand icon'

//     var gifInfo = document.createElement('div');
//     gifInfo.className = 'gifInfo'
//     var gifUser = document.createElement('div');
//     gifUser.className = 'user';
//     gifUser.innerHTML = json.username;
//     var gifTitle = document.createElement('div');
//     gifTitle.className = 'title'
//     gifTitle.innerHTML = json.title;

//     gifInfo.appendChild(gifUser);
//     gifInfo.appendChild(gifTitle);


//     gif_menuContainer.appendChild(trendGif);
//     icons.appendChild(likeIcon)
//     icons.appendChild(downloadIcon)
//     icons.appendChild(maxIcon)

//     likeIcon.addEventListener('click', () => {
//         var favorites = [];
//         var idsArr = [];
//         if(localStorage.favs) {
//             favorites = JSON.parse(localStorage.favs);
//             favorites.forEach(obj => {
//                 idsArr.push(obj.id);
//             });
//             if (idsArr.includes(json.id)) {
//                 alert('This GIFO is already in your favorites');
//             } else {
//                 favorites.push(json);
//                 localStorage.setItem('favs', JSON.stringify(favorites));
//             }
//         }else {
//             favorites.push(json);
//             localStorage.setItem('favs', JSON.stringify(favorites))
//         }

//         // favorites.push(json);
//         alert(`clicked ${json.id}`)
//         // localStorage.setItem('favs', JSON.stringify(favorites))
//     })

//     menu.appendChild(icons);
//     menu.appendChild(gifInfo);
//     gif_menuContainer.appendChild(menu);
//     parent.appendChild(gif_menuContainer);
// }

// module.exports = hoverGifMenu;
// localStorage.clear()