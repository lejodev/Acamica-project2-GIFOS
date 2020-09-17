import { noResult, displayTrendingGifos, hoverGifMenu } from "./shared.js";
var url = 'https://api.giphy.com/v1/gifs/'; // Exportable

// var url = 'https://api.giphy.com/v1/gifs';
const apiKey = 'ES5Qs5lBlti0twPy81oeRnqfaDotGqp8';
// var parentContainer = document.querySelector('.myGifosContainer');

// // var path = `${url}trending?api_key=${apiKey}&limit=5`
// // console.log(path);
// fetch(path).then(gifObj => gifObj.json())
//     .catch(err => {
//         console.log('Error getting gif');
//     })

var parentContainer = document.querySelector('.myGifos');
var gifsContainer = document.querySelector('.myGifosContainer');
var button = document.querySelector('.button');
var myGifosIds = [];
var gifsObjects = [];

button.style.display = 'none';

async function checkLocalstorage() {
    if (localStorage.myGifos) {

        myGifosIds = JSON.parse(localStorage.getItem('myGifos'));
        button.style.display = 'block';
        myGifosDisplaying();

    } else {

        alert('No myGifos');
        gifsContainer.style.display = 'none';
        button.style.display = 'none';
        var img = '/assets/icon-mis-gifos-sin-contenido.svg';
        var text = 'Sin contenido';
        noResult(parentContainer, img, text);
        button.style.display = 'none';

    }
}

button.addEventListener('click', myGifosDisplaying);  // Pending

function myGifosDisplaying() {

    if (myGifosIds.length > 8) {

        console.log(myGifosIds.length);
        alert('Display my gifs (Greater than 12)');
        console.log(myGifosIds);
        var newIdsArr = myGifosIds.splice(0, 8);
        console.log('new = ' + newIdsArr);
        geAndSetGifos(newIdsArr);
        
    } else {

        alert('Display my gifs (Lower than 12)');
        geAndSetGifos(myGifosIds);
        button.style.display = 'none';

    }
}
checkLocalstorage();

displayTrendingGifos();
console.log('Ckecking asynchrony');

// console.log(gifsObjects);

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

    // console.log(gifsObjects);

    // let process = (prom) => {
    //     prom.then(obj => {
    //         gifsObjects.push(obj)
    //     })
    // }
}

