// function test(num1, num2) {
//     return num1 + num2;
// }
var darkModeButton = document.querySelector('.dark');
let status = 0;

// function switchMode() {

export function setStatus(caller) {

    var switchStatus = 0;

    // 1 Light Mode
    // 0 Dark Mode

    darkModeButton.addEventListener('click', () => {
        if (!localStorage.switch) {
            localStorage.setItem('switch', 0);
            // alert('with switch');
        } else {
            switchStatus = localStorage.getItem('switch');
            if (switchStatus == 1) {
                localStorage.setItem('switch', 0);
                // alert(localStorage.getItem('switch'))
                // alert('Now dark mode here!')
                // darkMode(caller);
            } else {
                localStorage.setItem('switch', 1);
                // alert(localStorage.getItem('switch'))
                // alert('Now in light mode!')
                // darkMode(caller);
            }
        }
        darkMode(caller)
    });

    // var switchStatus = localStorage.getItem('switch');
    // if (switchStatus == 1) {
    //     localStorage.setItem('switch', 0);
    //     alert(localStorage.getItem('switch'))
    //     alert('Now dark mode here!')
    //     darkMode(caller);
    // } else {
    //     localStorage.setItem('switch', 1);
    //     alert(localStorage.getItem('switch'))
    //     alert('Now in light mode!')
    //     darkMode(caller);
    // }

}

// console.log(status);
// }

export function darkMode(caller) {
    // console.log(caller);
    // console.log(status);
    // alert(status);
    var darkModeButton = document.querySelector('.dark');
    var main = document.querySelector('.main');
    var trending_gifos = document.querySelector('.trending-gifos');
    var myGifos = document.querySelector('.myGifos');
    var header = document.querySelector('.header');
    var footer = document.querySelector('.footer');
    var searchInput = document.querySelector('.searchInput');
    var logo = document.querySelector('.logo');
    var menu = document.querySelector('.menu');

    // darkModeButton.addEventListener('click', () => {
    if (localStorage.getItem('switch') == 0) {
        // alert('Zeroooo');
        if (caller === 'myGifos') {
            myGifos.classList.add('dark');
        }
        if (caller === 'main') {
            searchInput.classList.add('dark')
        }
        logo.classList.add('dark');
        header.classList.add('dark');
        footer.classList.add('dark');
        main.classList.add('dark');
        trending_gifos.classList.add('dark');
        menu.classList.add('dark');

    } else {
        // alert('Oneeeee');
        if (caller === 'myGifos') {
            myGifos.classList.remove('dark');
        }
        if (caller === 'main') {
            searchInput.classList.remove('dark')
        }
        logo.classList.remove('dark');
        header.classList.remove('dark');
        footer.classList.remove('dark');
        main.classList.remove('dark');
        trending_gifos.classList.remove('dark');
        menu.classList.remove('dark');
    }
    // })
}

export function displayTrendingGifos() {
    var carousel = document.querySelector('.carousel');
    var gif_menuContainer = document.querySelector('.gif-menuContainer');
    var rightRow = document.querySelector('.rightRow');
    var leftRow = document.querySelector('.leftRow');
    rightRow.addEventListener('click', () => {
        // alert(`width ${gif_menuContainer.clientWidth}`)
        carousel.scrollLeft += carousel.clientWidth / 2.85;
        // alert('clicked')
    });
    leftRow.addEventListener('click', () => {
        carousel.scrollLeft -= carousel.clientWidth / 2.85;
        // alert('on left')
    })

    var path = `${url}trending?api_key=${apiKey}&limit=10`;
    console.log(path);

    fetch(path).then(rawResponse => rawResponse.json())
        .then(res => {
            res.data.forEach(obj => {
                // localStorage.set
                // hoverMenuCarousel(obj.images.original.url, obj.title, obj.username, carousel);
                // console.log(obj);
                hoverGifMenu(obj, carousel);
            })
        })
        .catch(err => console.log(err))
}


function getFavs(json, caller) {
    var favs = JSON.parse(localStorage.getItem('favs'))
    var favsIds = [];
    var myGifs = JSON.parse(localStorage.getItem('myGifos'))
    // var myGifsIds = [];

    favs.forEach(json => {
        favsIds.push(json.id);
    })

    // myGifs.forEach(json => {
    //     myGifsIds.push(json.id);
    // })

    if (caller === 'any') {
        if (favsIds.includes(json.id)) {
            alert('This GIFO is already in your favorites');
        } else {
            favs.push(json);
            localStorage.setItem('favs', JSON.stringify(favs));
        }
    }
    if (caller === 'favorites') {
        favs.splice(favsIds.indexOf(json.id), 1);
        localStorage.setItem('favs', JSON.stringify(favs));
        // favsIds.includes(id)? alert('inside' + favsIds.indexOf(id)) : alert('No here!');
        location.reload();
        console.log('favs: ' + favs);
        console.log('favs ids: ' + favsIds);
    }
    if (caller === 'myGifs') {
        // myGifs.splice(favsIds.indexOf(json), 1);
        // localStorage.setItem('favs', JSON.stringify(favs));
        // favsIds.includes(id)? alert('inside' + favsIds.indexOf(id)) : alert('No here!');
        // location.reload();
        alert(myGifs.indexOf(json.id))
        alert(json.id)
        // console.log(myGifs.length);
        // myGifs.splice(favsIds.indexOf(json), 1);
        // console.log(myGifs.length);
        // localStorage.setItem('myGifos', JSON.stringify(myGifs));
        console.log('myGifs: ' + myGifs);
        // console.log('myGifsIds: ' + myGifsIds);
    }

}
export function hoverGifMenu(json, parent) {

    var gif_menuContainer = document.createElement('div');
    gif_menuContainer.className = 'gif-menuContainer'

    var trendGif = document.createElement('img');
    trendGif.className = 'trendGif';
    trendGif.src = json.images.original.url;
    // trendGif.setAttribute('src', json.images.original.url);

    var menu = document.createElement('div');
    menu.className = 'menu';

    var icons = document.createElement('div')
    icons.className = 'icons'

    var favActiveIcon = document.createElement('img');
    favActiveIcon.className = 'like-and-like-active icon';

    if (parent.className == 'favContainer') {

        favActiveIcon.style.backgroundImage = 'url(/assets/icon-fav-active.svg)';
        favActiveIcon.addEventListener('click', () => {
            // alert(json.id);
            getFavs(json, 'favorites');
        });
        // Click listener to quit from favorites list

    } else if (parent.className == 'myGifosContainer') {

        favActiveIcon.style.backgroundImage = 'url(/assets/icon_trash.svg)';
        favActiveIcon.addEventListener('click', () => {
            // alert(json.id);
            getFavs(json, 'myGifs');
        })
        // Click listener to delete from my gifos

    } else {

        favActiveIcon.style.backgroundImage = 'url(/assets/icon-fav-hover.svg)';

        favActiveIcon.addEventListener('click', () => {
            getFavs(json, 'any');
            // var favorites = []; // Can go outside HoverMenu function 
            // var idsArr = []; // Can go outside HoverMenu function 
            // if (localStorage.favs) {
            //     favorites = JSON.parse(localStorage.favs);
            //     favorites.forEach(obj => {
            //         idsArr.push(obj.id);
            //     });
            //     // if (idsArr.includes(json.id)) {
            //     //     alert('This GIFO is already in your favorites');
            //     // } else {
            //     //     favorites.push(json);
            //     //     localStorage.setItem('favs', JSON.stringify(favorites));
            //     // }
            // } else {
            //     favorites.push(json);
            //     localStorage.setItem('favs', JSON.stringify(favorites))
            // }

            // favorites.push(json);
            alert(`clicked ${json.id}`)
            // localStorage.setItem('favs', JSON.stringify(favorites))
        });

    }

    // var favActiveIcon = document.createElement('img')
    // favActiveIcon.className = 'like-and-like-active icon';
    // favActiveIcon.style.backgroundImage = 'url(/assets/icon-fav-hover.svg)';

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
    icons.appendChild(favActiveIcon)
    icons.appendChild(downloadIcon)
    icons.appendChild(maxIcon)

    menu.appendChild(icons);
    menu.appendChild(gifInfo);
    gif_menuContainer.appendChild(menu);
    parent.appendChild(gif_menuContainer);




    downloadIcon.addEventListener("click", () => {
        var x = new XMLHttpRequest();
        x.open("GET", json.images.original.url, true);
        alert(json.images.original.url)
        x.responseType = 'blob';
        x.onload = function (e) { download(x.response, "descarga.gif", "image/gif"); }
        x.send();
    });
    maxIcon.addEventListener('click', setFullImage);

    trendGif.addEventListener('click', () => {
        setFullImage();
        alert('Mobile touched');
    });

    var downloadIcon = document.querySelector('.download');


    function setFullImage() {
        // alert('clicked=================')
        var fullImageContainer = document.createElement('div');
        fullImageContainer.className = 'fullImageContainer';
        fullImageContainer.style.display = 'flex';
        fullImageContainer.innerHTML = '';

        var closeFullImage = document.createElement('img');
        closeFullImage.className = 'closeAction';
        closeFullImage.addEventListener('click', () => {
            fullImageContainer.style.display = 'none';
            trendGif.style.display = 'block';
        })

        var gif_menuContainer = document.createElement('div');
        gif_menuContainer.className = 'gif-menuContainer'

        var trendGif = document.createElement('img');
        trendGif.className = 'trendGif';
        trendGif.src = json.images.original.url;

        var menu = document.createElement('div');
        menu.className = 'menu';

        var icons = document.createElement('div')
        icons.className = 'icons'

        var likeIcon = document.createElement('img')
        likeIcon.className = 'dislike icon';
        var downloadIcon = document.createElement('img');
        downloadIcon.className = 'download icon'

        // var gifInfo = document.createElement('div');
        // gifInfo.className = 'gifInfo'
        // var gifUser = document.createElement('div');
        // gifUser.className = 'user';
        // gifUser.innerHTML = 'json.username';
        // var gifTitle = document.createElement('div');
        // gifTitle.className = 'title'
        // gifTitle.innerHTML = 'json.title';

        gifInfo.appendChild(gifUser);
        gifInfo.appendChild(gifTitle);

        icons.appendChild(likeIcon)
        icons.appendChild(downloadIcon)

        menu.appendChild(gifInfo);
        menu.appendChild(icons);

        gif_menuContainer.appendChild(trendGif);
        // icons.appendChild(maxIcon)
        gif_menuContainer.appendChild(menu);

        // parent.appendChild(gif_menuContainer);

        fullImageContainer.appendChild(closeFullImage);
        fullImageContainer.appendChild(gif_menuContainer);
        document.body.appendChild(fullImageContainer);
        // alert('click on!');
        // var fullImageContainer = document.createElement('div');
        // fullImageContainer.className = 'fullImageContainer';

        // var closeFullImage = document.createElement('img');
        // closeFullImage.className = 'closeAction';

        // fullImageContainer.appendChild(gif_menuContainer);
        // fullImageContainer.appendChild(closeFullImage);
        // alert('click on!');
    }
}



let hours = `00`,
    minutes = `00`,
    seconds = `00`,
    chronometerDisplay = document.querySelector('.data-chronometer')
export function timer() {



    // function chronometer() {

    seconds++

    if (seconds < 10) seconds = `0` + seconds

    if (seconds > 59) {
        seconds = `00`
        minutes++

        if (minutes < 10) minutes = `0` + minutes
    }

    if (minutes > 59) {
        minutes = `00`
        hours++

        if (hours < 10) hours = `0` + hours
    }

    chronometerDisplay.textContent = `${hours}:${minutes}:${seconds}`

    // }


}


const apiKey = 'ES5Qs5lBlti0twPy81oeRnqfaDotGqp8'; // Export this
var url = 'https://api.giphy.com/v1/gifs/'; // Export this



export function noResult(parent, image, text) {
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

export function downloadListener(node) {
    node.addEventListener("click", () => {
        var x = new XMLHttpRequest();
        x.open("GET", json.images.original.url, true);
        alert(json.images.original.url)
        x.responseType = 'blob';
        x.onload = function (e) { download(x.response, "descarga.gif", "image/gif"); }
        x.send();
    });
}

export function download(data, strFileName, strMimeType) {
    var self = window, // this script is only for browsers anyway...
        defaultMime = "application/octet-stream", // this default mime also triggers iframe downloads
        mimeType = strMimeType || defaultMime,
        payload = data,
        url = !strFileName && !strMimeType && payload,
        anchor = document.createElement("a"),
        toString = function (a) { return String(a); },
        myBlob = (self.Blob || self.MozBlob || self.WebKitBlob || toString),
        fileName = strFileName || "download",
        blob,
        reader;
    myBlob = myBlob.call ? myBlob.bind(self) : Blob;
    if (String(this) === "true") { //reverse arguments, allowing download.bind(true, "text/xml", "export.xml") to act as a callback
        payload = [payload, mimeType];
        mimeType = payload[0];
        payload = payload[1];
    }
    if (url && url.length < 2048) { // if no filename and no mime, assume a url was passed as the only argument
        fileName = url.split("/").pop().split("?")[0];
        anchor.href = url; // assign href prop to temp anchor
        if (anchor.href.indexOf(url) !== -1) { // if the browser determines that it's a potentially valid url path:
            var ajax = new XMLHttpRequest();
            ajax.open("GET", url, true);
            ajax.responseType = 'blob';
            ajax.onload = function (e) {
                download(e.target.response, fileName, defaultMime);
            };
            setTimeout(function () { ajax.send(); }, 0); // allows setting custom ajax headers using the return:
            return ajax;
        } // end if valid url?
    } // end if url?
    //go ahead and download dataURLs right away
    if (/^data\:[\w+\-]+\/[\w+\-]+[,;]/.test(payload)) {
        if (payload.length > (1024 * 1024 * 1.999) && myBlob !== toString) {
            payload = dataUrlToBlob(payload);
            mimeType = payload.type || defaultMime;
        } else {
            return navigator.msSaveBlob ?  // IE10 can't do a[download], only Blobs:
                navigator.msSaveBlob(dataUrlToBlob(payload), fileName) :
                saver(payload); // everyone else can save dataURLs un-processed
        }
    }//end if dataURL passed?
    blob = payload instanceof myBlob ?
        payload :
        new myBlob([payload], { type: mimeType });
    function dataUrlToBlob(strUrl) {
        var parts = strUrl.split(/[:;,]/),
            type = parts[1],
            decoder = parts[2] == "base64" ? atob : decodeURIComponent,
            binData = decoder(parts.pop()),
            mx = binData.length,
            i = 0,
            uiArr = new Uint8Array(mx);
        for (i; i < mx; ++i) uiArr[i] = binData.charCodeAt(i);
        return new myBlob([uiArr], { type: type });
    }
    function saver(url, winMode) {
        if ('download' in anchor) { //html5 A[download]
            anchor.href = url;
            anchor.setAttribute("download", fileName);
            anchor.className = "download-js-link";
            anchor.innerHTML = "downloading...";
            anchor.style.display = "none";
            document.body.appendChild(anchor);
            setTimeout(function () {
                anchor.click();
                document.body.removeChild(anchor);
                if (winMode === true) { setTimeout(function () { self.URL.revokeObjectURL(anchor.href); }, 250); }
            }, 66);
            return true;
        }
        // handle non-a[download] safari as best we can:
        if (/(Version)\/(\d+)\.(\d+)(?:\.(\d+))?.*Safari\//.test(navigator.userAgent)) {
            url = url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
            if (!window.open(url)) { // popup blocked, offer direct download:
                if (confirm("Displaying New Document\n\nUse Save As... to download, then click back to return to this page.")) { location.href = url; }
            }
            return true;
        }
        //do iframe dataURL download (old ch+FF):
        var f = document.createElement("iframe");
        document.body.appendChild(f);
        if (!winMode) { // force a mime that will download:
            url = "data:" + url.replace(/^data:([\w\/\-\+]+)/, defaultMime);
        }
        f.src = url;
        setTimeout(function () { document.body.removeChild(f); }, 333);
    }//end saver
    if (navigator.msSaveBlob) { // IE10+ : (has Blob, but not a[download] or URL)
        return navigator.msSaveBlob(blob, fileName);
    }
    if (self.URL) { // simple fast and modern way using Blob and URL:
        saver(self.URL.createObjectURL(blob), true);
    } else {
        // handle non-Blob()+non-URL browsers:
        if (typeof blob === "string" || blob.constructor === toString) {
            try {
                return saver("data:" + mimeType + ";base64," + self.btoa(blob));
            } catch (y) {
                return saver("data:" + mimeType + "," + encodeURIComponent(blob));
            }
        }
        // Blob but not URL support:
        reader = new FileReader();
        reader.onload = function (e) {
            saver(this.result);
        };
        reader.readAsDataURL(blob);
    }
    return true;
}; /* end download() */



// export default hoverGifMenu;