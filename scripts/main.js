import { noResult, setStatus, hoverGifMenu, 
    displayTrendingGifos, LIGHT_MODE } from "./shared.js";


const url = 'https://api.giphy.com/v1/gifs/';
const apiKey = 'ES5Qs5lBlti0twPy81oeRnqfaDotGqp8';

var resultsPage;
var resultsGrid;
var searchButton;
var resultsTitle;
var inputSearchGifos;
var suggestionsList;
var seeMoreButton;
var darkModeButton;

var q = '';
let queryCounter = 0;

init();

function init() {
    checkInitialViewMode();
    assignQuerySelectors();
    registerEventListeners();
    setStatus('main');
    displayTrendingGifos();
    dynamicTrendTitles();

    changeViewMode();
}

function checkInitialViewMode() {
    const viewMode = localStorage.getItem('switch');
    if(viewMode == null) {
        localStorage.setItem('switch', LIGHT_MODE);
    }
}

function assignQuerySelectors() {
    resultsPage = document.querySelector('.results');
    resultsGrid = document.querySelector('.resultsContainer');
    searchButton = document.querySelector('.searchAction');
    resultsTitle = document.querySelector('.heading');
    inputSearchGifos = document.querySelector('.searchInput');
    suggestionsList = document.querySelector('.suggestions');
    seeMoreButton = document.querySelector('.button');
    darkModeButton = document.querySelector('.dark-mode');
}

function registerEventListeners() {

    const ENTER_KEY_CODE = 13;
    inputSearchGifos.addEventListener('keydown', (e) => {
        q = inputSearchGifos.value;
        if (e.keyCode === ENTER_KEY_CODE) {
            e.preventDefault();
            suggestionsList.style = 'display : none';
            getSearchPath();
        }
    });
    
    inputSearchGifos.addEventListener('input', () => {
        const viewMode = localStorage.getItem('switch');

        resultsGrid.innerHTML = '';
        
        if (inputSearchGifos.value) {
            if(viewMode == LIGHT_MODE){
                searchButton.style.backgroundImage = 'url("../assets/button-close.svg")';
            } else {
                searchButton.style.backgroundImage = 'url("../assets/button-close-modo-noc.svg")';
            }
        } 
        else {
            if(viewMode == LIGHT_MODE){
                searchButton.style.backgroundImage = 'url("../assets/icon-search.svg")';
            } else {
                searchButton.style.backgroundImage = 'url("../assets/icon-search-mod-noc.svg")';
            }
        }
        setSuggestions(inputSearchGifos.value);
    });

    searchButton.addEventListener('click', () => {
        const viewMode = localStorage.getItem('switch');
        if(viewMode == LIGHT_MODE){
            searchButton.style.backgroundImage = 'url("../assets/icon-search.svg")';
        } else {
            searchButton.style.backgroundImage = 'url("../assets/icon-search-mod-noc.svg")';
        }
        inputSearchGifos.value = '';
        suggestionsList.innerText = '';
    });

    darkModeButton.addEventListener('click', () => changeViewMode(true));
}

function changeViewMode(changed) {
    const viewMode = localStorage.getItem('switch');

    if(changed) {
        if(viewMode == LIGHT_MODE) {
            searchButton.style.backgroundImage = 'url("../assets/icon-search-mod-noc.svg")';
        } else {
            searchButton.style.backgroundImage = 'url("../assets/icon-search.svg")';
        }
    } else {
        if(viewMode == LIGHT_MODE) {
            searchButton.style.backgroundImage = 'url("../assets/icon-search.svg")';
        } else {
            searchButton.style.backgroundImage = 'url("../assets/icon-search-mod-noc.svg")';
        }
    }
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

    const viewMode = localStorage.getItem('switch');

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

            viewMode != LIGHT_MODE ? search.classList.add('dark') : search.classList.remove('dark');

            li.appendChild(search);
            li.appendChild(text);
            suggestionsList.appendChild(li);
            li.addEventListener('click', () => {
                inputSearchGifos.value = li.innerText;
                q = inputSearchGifos.value;
                getSearchPath();
                suggestionsList.style = 'display : none';
            })
        })
    });
    suggestionsList.innerHTML = '';
}

function getSearchPath() {
    if (inputSearchGifos.value || q !== '') {
        resultsGrid.innerHTML = ''
        q = inputSearchGifos.value;
        var path = `${url}search?api_key=${apiKey}&q=${q}&limit=12`;
        search(path);
        seeMoreButton.addEventListener('click', seeMorePath);
    }
}

function seeMorePath() {
    queryCounter++;
    let offset = queryCounter * 12;
    var path = `${url}search?api_key=${apiKey}&q=${q}&offset=${offset}&limit=12`;
    search(path)
}

function search(endpoint) {

    resultsTitle.innerHTML = inputSearchGifos.value;

    var path = endpoint;

    if (inputSearchGifos.value || q !== '') {

        fetch(path).then(raw => raw.json())
            .then(json => {
                if (json.data.length === 0) {
                    var img = '../assets/icon-busqueda-sin-resultado.svg';
                    var text = 'Intenta con otra búsqueda';
                    resultsPage.style = 'display:block'
                    seeMoreButton.style.display = 'none'
                    resultsTitle.innerHTML = 'LOREM IMPSUM'
                    noResult(resultsPage, img, text)
                } else {
                    (json.data.length < 12) ? (seeMoreButton.style.display = 'none') : (seeMoreButton.style.display = 'block')
                    json.data.forEach(obj => {
                        resultsPage.style = 'display:flex'

                        hoverGifMenu(obj, resultsGrid);

                    })
                }
            })
    }
}
