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
// darkMode('myGifos');

var img = "./assets/icon-fav-sin-contenido.svg";
var text = '¡Anímate a crear tu primer GIFO!';

async function checkLocalstorage() {
    if (localStorage.myGifos) {

        myGifosIds = JSON.parse(localStorage.getItem('myGifos'));
        if (myGifosIds.length === 0) {
            noResult(parentContainer, img, text);
            button.style.display = 'none';
        }
        button.style.display = 'block';
        myGifosDisplaying();

    } else {

        gifsContainer.style.display = 'none';
        button.style.display = 'none';

        noResult(parentContainer, img, text);
        button.style.display = 'none';

    }
}

button.addEventListener('click', myGifosDisplaying);

function myGifosDisplaying() {

    if (myGifosIds.length > 8) {

        var newIdsArr = myGifosIds.splice(0, 8);
        getAndSetGifos(newIdsArr);

    } else {

        getAndSetGifos(myGifosIds);
        button.style.display = 'none';

    }
}

checkLocalstorage();
displayTrendingGifos();

function getAndSetGifos(gifsIds) {
    var gifsPromises = gifsIds.map(gifId => fetch(`${url}${gifId}?api_key=${apiKey}`));

    Promise.all(gifsPromises).then(async (promisesResolveArray) => {
        for (const resolve of promisesResolveArray) {
            
            let gifObject = await resolve.json();
            hoverGifMenu(gifObject.data, gifsContainer);
        }
    });


    // ------------------------old way -----------------------
    // var gifsarr = [];
    // var promises = [];

    // var promesasGifs_long_way = gifsIds.map((gifId) => {
    //     var path = `${url}${gifId}?api_key=${apiKey}`;        
    //     return fetch(`${url}${gifId}?api_key=${apiKey}`);
    // });

    // gifsIds.forEach(gifId => {
    //     var path = `${url}${gifId}?api_key=${apiKey}`;
    //     var respPromise = fetch(path);
    //     promises.push(respPromise);
    // })


    // console.table(gifsIds);


    //Promise.all(promises);

    // Promise.all(promises.map(prom => {
    //     prom.then(resp => resp.json())
    //         .then(obj => {
    //             console.log(obj.data.id);
    //             hoverGifMenu(obj.data, gifsContainer)
    //         })
    // }))
}

