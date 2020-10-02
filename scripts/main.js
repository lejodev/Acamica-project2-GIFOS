import { noResult, setStatus, darkMode, hoverGifMenu, displayTrendingGifos } from "./shared.js";


const url = 'https://api.giphy.com/v1/gifs/'; // Exportable
const apiKey = 'ES5Qs5lBlti0twPy81oeRnqfaDotGqp8'; // Exportable

var resultsPage;
var resultsGrid;
var searchButton;
var resultsTitle;
var inputSearchGifos;
var suggestionsList;
var seeMoreButton;

var q = '';
let queryCounter = 0; // Exportable

init();

function init() {
    assignQuerySelectors();
    registerEventListeners();
    
    setStatus('main');
    darkMode('main');    
    displayTrendingGifos();
    dynamicTrendTitles();
}

function assignQuerySelectors() {
    resultsPage = document.querySelector('.results');
    resultsGrid = document.querySelector('.resultsContainer');
    searchButton = document.querySelector('.searchAction'); // Exportable
    resultsTitle = document.querySelector('.heading');
    inputSearchGifos = document.querySelector('.searchInput');
    suggestionsList = document.querySelector('.suggestions');
    seeMoreButton = document.querySelector('.button'); // Exportable
}


function registerEventListeners() {
    inputSearchGifos.addEventListener('keydown', (e) => {
        if (e.keyCode === 13) {
            // alert('enter');
            e.preventDefault();
            suggestionsList.style = 'display : none';
            getSearchPath();
        }
    });
    
    inputSearchGifos.addEventListener('input', () => {
        if (inputSearchGifos.value) {
            searchButton.style.backgroundImage = 'url("/assets/button-close.svg")';
        } else {
            searchButton.style.backgroundImage = 'url("/assets/icon-search.svg")';
        }
        setSuggestions(inputSearchGifos.value);
    });

    searchButton.addEventListener('click', () => {
        inputSearchGifos.value = '';
        suggestionsList.innerText = '';
        searchButton.style.backgroundImage = 'url("/assets/icon-search.svg")';
    });
}

function dynamicTrendTitles() { 
    var trend = document.querySelector('.trendNames');
    var path = `${url}trending?api_key=${apiKey}&limit=5`;    

    fetch(path).then(rawResponse => rawResponse.json())
        .then(json => {
            var titles;
            json.data.forEach(data => {
                var trendTitle = document.createElement('span')
                trendTitle.className = 'trend';
                trendTitle.innerText = `${data.title.split(' GIF')[0]}, `;
                trendTitle.addEventListener('click', () => {
                    inputSearchGifos.value = data.title.split(' GIF')[0];
                    getSearchPath();
                })
                trend.appendChild(trendTitle);
            });
        })
}

async function setSuggestions(query) {
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
            suggestionsList.appendChild(li);
            console.log(autocomplete.name);
            li.addEventListener('click', () => {
                inputSearchGifos.value = li.innerText;
                getSearchPath();
                suggestionsList.style = 'display : none';
            })
        })
    });
    suggestionsList.innerHTML = '';
    console.log(inputSearchGifos.value);
}

function getSearchPath() { // Exportable
    if (inputSearchGifos.value) {
        resultsGrid.innerHTML = ''
        var path = `${url}search?api_key=${apiKey}&q=${inputSearchGifos.value}&limit=12`;
        q = inputSearchGifos.value;
        console.log(`${path}`);
        search(path);
        seeMoreButton.addEventListener('click', seeMorePath);
    } else {
        alert('empty input');
    }
}

function seeMorePath() { // Exportable
    queryCounter++;
    let offset = queryCounter * 12;
    var path = `${url}search?api_key=${apiKey}&q=${q}&offset=${offset}&limit=12`;
    console.log(path);
    search(path)
}

// Function with fetch default promises aproach
function search(endpoint) { // Exportable and change name

    resultsTitle.innerHTML = inputSearchGifos.value;

    var path = endpoint;

    if (inputSearchGifos.value) {

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
