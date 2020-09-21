import { setStatus, darkMode, noResult, displayTrendingGifos, hoverGifMenu } from "./shared.js";

const apiKey = 'ES5Qs5lBlti0twPy81oeRnqfaDotGqp8';

var parentContainer = document.querySelector('.myGifos');
var gifsContainer = document.querySelector('.myGifosContainer');
var button = document.querySelector('.button');
var myGifosIds = [];
var gifsObjects = [];
var url = 'https://api.giphy.com/v1/gifs/'; // Exportable

button.style.display = 'none';

setStatus('myGifos');
darkMode('myGifos');

async function checkLocalstorage() {
    if (localStorage.myGifos) {

        myGifosIds = JSON.parse(localStorage.getItem('myGifos'));
        button.style.display = 'block';
        myGifosDisplaying();

    } else {

        gifsContainer.style.display = 'none';
        button.style.display = 'none';
        var img = '/assets/icon-mis-gifos-sin-contenido.svg';
        var text = 'Sin contenido';
        noResult(parentContainer, img, text);
        button.style.display = 'none';

    }
}

button.addEventListener('click', myGifosDisplaying);

function myGifosDisplaying() {

    if (myGifosIds.length > 8) {

        console.log(myGifosIds.length);
        // alert('Display my gifs (Greater than 12)');
        console.log(myGifosIds);
        var newIdsArr = myGifosIds.splice(0, 8);
        console.log('new = ' + newIdsArr);
        geAndSetGifos(newIdsArr);
        
    } else {

        // alert('Display my gifs (Lower than 12)');
        geAndSetGifos(myGifosIds);
        button.style.display = 'none';

    }
}
checkLocalstorage();

displayTrendingGifos();
console.log('Ckecking asynchrony');

function geAndSetGifos(arr) {

    var gifsarr = [];
    var promises = [];

    arr.forEach(id => {
        var path = `${url}${id}?api_key=${apiKey}`;
        var respPromise = fetch(path);
        promises.push(respPromise);
    })

    console.log(`Promises = ${promises}`);

    Promise.all(promises.map( prom => {
        prom.then(resp => resp.json())
            .then(obj => {
                console.log(obj.data.id);
                hoverGifMenu(obj.data, gifsContainer)
            })
    }))
}

