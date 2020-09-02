// function test(num1, num2) {
//     return num1 + num2;
// }

export function hoverGifMenu(json, parent) {

    var gif_menuContainer = document.createElement('div');
    gif_menuContainer.className = 'gif-menuContainer'

    var trendGif = document.createElement('img');
    trendGif.className = 'trendGif';
    trendGif.setAttribute('src', json.images.original.url);

    var menu = document.createElement('div');
    menu.className = 'menu';

    var icons = document.createElement('div')
    icons.className = 'icons'

    var likeIcon = document.createElement('img')
    likeIcon.className = 'like icon';
    var downloadIcon = document.createElement('img');
    downloadIcon.className = 'download icon'
    var maxIcon = document.createElement('img')
    maxIcon.className = 'expand icon'

    var gifInfo = document.createElement('div');
    gifInfo.className = 'gifInfo'
    var gifUser = document.createElement('div');
    gifUser.className = 'user';
    gifUser.innerHTML = json.username;
    var gifTitle = document.createElement('div');
    gifTitle.className = 'title'
    gifTitle.innerHTML = json.title;

    gifInfo.appendChild(gifUser);
    gifInfo.appendChild(gifTitle);


    gif_menuContainer.appendChild(trendGif);
    icons.appendChild(likeIcon)
    icons.appendChild(downloadIcon)
    icons.appendChild(maxIcon)

    likeIcon.addEventListener('click', () => {
        var favorites = [];
        var idsArr = [];
        if(localStorage.favs) {
            favorites = JSON.parse(localStorage.favs);
            favorites.forEach(obj => {
                idsArr.push(obj.id);
            });
            if (idsArr.includes(json.id)) {
                alert('This GIFO is already in your favorites');
            } else {
                favorites.push(json);
                localStorage.setItem('favs', JSON.stringify(favorites));
            }
        }else {
            favorites.push(json);
            localStorage.setItem('favs', JSON.stringify(favorites))
        }

        // favorites.push(json);
        alert(`clicked ${json.id}`)
        // localStorage.setItem('favs', JSON.stringify(favorites))
    })

    menu.appendChild(icons);
    menu.appendChild(gifInfo);
    gif_menuContainer.appendChild(menu);
    parent.appendChild(gif_menuContainer);
}

const apiKey = 'ES5Qs5lBlti0twPy81oeRnqfaDotGqp8'; // Export this
var url = 'https://api.giphy.com/v1/gifs/'; // Export this

export function displayTrendingGifos() {
    var carousel = document.querySelector('.carousel');

    var path = `${url}trending?api_key=${apiKey}&limit=10`;

    fetch(path).then(rawResponse => rawResponse.json())
        .then(res => {
            res.data.forEach(obj => {
                localStorage.set
                // hoverMenuCarousel(obj.images.original.url, obj.title, obj.username, carousel);
                hoverGifMenu(obj, carousel);
            })
        })
        .catch(err => console.log(err))
}

export function noResult (parent, image, text) {
    var parentContainer = parent;
    var noreSultContainer = document.createElement('div');
    noreSultContainer.className = 'noResult';
    
    var img = document.createElement('div')
    img.className = 'image'
    img.style.backgroundImage = `url(${image})`
    noreSultContainer.appendChild(img)

    var txt = document.createElement('span');
    txt.innerHTML = text;
    txt.className = 'text'
    noreSultContainer.appendChild(txt)
    
    parentContainer.appendChild(noreSultContainer);
}



// export default hoverGifMenu;