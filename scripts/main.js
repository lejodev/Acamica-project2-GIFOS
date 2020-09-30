import { noResult, setStatus, darkMode, hoverGifMenu, displayTrendingGifos } from "./shared.js";
var url = 'https://api.giphy.com/v1/gifs/'; // Exportable
const apiKey = 'ES5Qs5lBlti0twPy81oeRnqfaDotGqp8'; // Exportable
var resultsPage = document.querySelector('.results');
var resultsGrid = document.querySelector('.resultsContainer');
var searchButton = document.querySelector('.searchAction'); // Exportable
var resultsTitle = document.querySelector('.heading');

var darkModeButton = document.querySelector('.dark-mode');
// var main = document.querySelector('.main');

// darkModeButton.addEventListener('click', () => {
//     main.classList.toggle('dark')
// })

setStatus('main');
darkMode('main');

function dynamicTrendTitles() {

    var trend = document.querySelector('.trendNames')

    var path = `${url}trending?api_key=${apiKey}&limit=5`

    var title = ''

    fetch(path).then(rawResponse => rawResponse.json())
        .then(json => {
            var titles;
            json.data.forEach(data => {
                // title += `${data.title.split(' GIF')[0]}, `;
                // console.log(title);
                var trendTitle = document.createElement('span')
                trendTitle.className = 'trend';
                trendTitle.innerText = `${data.title.split(' GIF')[0]}, `;
                trendTitle.addEventListener('click', () => {
                    input.value = data.title.split(' GIF')[0];
                    getSearchPath();
                })
                // addEventListener('click', () => {
                //     alert(data.title.split(' GIF')[0])
                // })
                trend.appendChild(trendTitle);
            });
            // console.log(title.split(', '));
            // console.log(title.split(',').length);
            // titles = title;
            // trend.textContent = titles;
            // console.log(title);
        })
}
dynamicTrendTitles();

var input = document.querySelector('.searchInput');
input.addEventListener('keydown', (e) => {
    if (e.keyCode === 13) {
        // alert('enter');
        e.preventDefault();
        suggestionsList.style = 'display : none';
        getSearchPath();
    }
});
input.addEventListener('input', autocomplete);
function autocomplete() {
    if (input.value) {
        searchButton.style.backgroundImage = 'url("/assets/button-close.svg")';
    } else {
        searchButton.style.backgroundImage = 'url("/assets/icon-search.svg")';
    }
    setSuggestions(input.value);
}

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
            search.className = 'searchAction';
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
                suggestionsList.style = 'display : none';
            })
        })
    });
    suggestionsList.innerHTML = '';
    console.log(input.value);
}

var searchOffsetCounter = 0; // Exportable
var seeMoreButton = document.querySelector('.button'); // Exportable
var q = '';

searchButton.addEventListener('click', () => {
    input.value = '';
    suggestionsList.innerText = '';
    searchButton.style.backgroundImage = 'url("/assets/icon-search.svg")';
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

    resultsTitle.innerHTML = input.value;

    var path = endpoint;

    if (input.value) {

        fetch(path).then(raw => raw.json())
            .then(json => {
                if (json.data.length === 0) {
                    alert('Incorrect')
                    var img = '/assets/icon-busqueda-sin-resultado.svg';
                    var text = 'Intenta con otra búsqueda';
                    resultsPage.style = 'display:block'
                    seeMoreButton.style.display = 'none'
                    resultsTitle.innerHTML = 'LOREM IMPSUM'
                    noResult(resultsPage, img, text)
                } else {
                    (json.data.length < 12) ? (seeMoreButton.style.display = 'none') : (seeMoreButton.style.display = 'block')
                    json.data.forEach(obj => {
                        console.log(obj.length);
                        resultsPage.style = 'display:flex'

                        hoverGifMenu(obj, resultsGrid);

                    })
                }
            })
    } else {
        alert('empty')
    }
}
displayTrendingGifos();