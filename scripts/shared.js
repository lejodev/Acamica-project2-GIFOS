var darkModeButton = document.querySelector('.dark-mode');

export const DARK_MODE = 0;
export const LIGHT_MODE = 1;

export function setStatus(caller) {
    darkMode(caller);
    darkModeButton.addEventListener('click', () => changeViewMode(caller));
}

function changeViewMode(caller) {
    const viewMode = localStorage.getItem('switch');        
    if (viewMode == LIGHT_MODE) {
        localStorage.setItem('switch', DARK_MODE);
    } else {
        localStorage.setItem('switch', LIGHT_MODE);
    }    
    darkMode(caller);
}

export function darkMode(caller) {
    var main = document.querySelector('.main');
    var trending_gifos = document.querySelector('.trending-gifos');
    var myGifos = document.querySelector('.myGifos');
    var header = document.querySelector('.header');
    var footer = document.querySelector('.footer');
    var searchInput = document.querySelector('.searchInput');
    var logo = document.querySelector('.logo');
    var menu = document.querySelector('.menu');
    var title_full_width = document.querySelector('.full-width');
    var title = document.querySelectorAll('.title');
    var searchBox = document.querySelector('.searchBox');
    var searchAction = document.querySelectorAll('.searchAction');
    var trending_title = document.querySelector('.trending-title');
    var trend = document.querySelector('.trendNames');
    var see_more_button = document.querySelectorAll('.button');
    var burger = document.querySelector('.stick');
    var createGif_button = document.querySelector('.createGif');
    var step = document.querySelectorAll('.step');
    var bar = document.querySelector('.bar');
    var camera = document.querySelector('.camera');
    var tape = document.querySelector('.tape');

    var image = document.querySelector('.image');
    var text = document.querySelector('.text');

    if (localStorage.getItem('switch') == DARK_MODE) {
        darkModeButton.innerHTML = 'MODO DIURNO';

        if (caller === 'myGifos') {
            myGifos.classList.add('dark');
            trending_gifos.classList.add('dark');
        }
        if (caller === 'main') {
            trending_title.classList.add('dark');
            trend.classList.add('dark');
            searchAction.forEach(obj => {
                obj.classList.add('dark');
            })
            title.forEach(eachTitle => {
                eachTitle.classList.add('dark');
            })
            title_full_width.classList.add('dark');
            searchInput.classList.add('dark');
            searchBox.classList.add('dark');
            trending_gifos.classList.add('dark');
        }
        if (caller === 'favorites') {
            trending_gifos.classList.add('dark');
            title.forEach(eachTitle => {
                eachTitle.classList.add('dark');
            })
        }
        if (caller === 'createGifs') {
            step.forEach(step => {
                step.classList.add('dark');
            });
            bar.classList.add('dark');
            camera.classList.add('dark');
            tape.classList.add('dark')
        }
        title.forEach(eachTitle => {
            eachTitle.classList.add('dark');
        })
        createGif_button.classList.add('dark');
        logo.classList.add('dark');
        header.classList.add('dark');
        footer.classList.add('dark');
        main.classList.add('dark');
        menu.classList.add('dark');
        see_more_button.forEach(button => {
            button.classList.add('dark')
        });
        burger.classList.add('dark');

    } else {
        darkModeButton.innerHTML = 'MODO NOCTURNO';
        if (caller === 'myGifos') {
            myGifos.classList.remove('dark');
            trending_gifos.classList.remove('dark');
        }
        if (caller === 'main') {
            trending_title.classList.remove('dark');
            trend.classList.remove('dark');
            searchAction.forEach(obj => {
                obj.classList.remove('dark');
            })
            title.forEach(eachTitle => {
                eachTitle.classList.remove('dark');
            })
            title_full_width.classList.remove('dark');
            searchInput.classList.remove('dark');
            searchBox.classList.remove('dark');
            trending_gifos.classList.remove('dark');
        }
        if (caller === 'favorites') {
            trending_gifos.classList.remove('dark');
            title.forEach(eachTitle => {
                eachTitle.classList.remove('dark');
            })
        }
        if (caller === 'createGifs') {
            step.forEach(step => {
                step.classList.remove('dark');
            });
            bar.classList.remove('dark');
            camera.classList.remove('dark');
            tape.classList.remove('dark');
        }
        title.forEach(eachTitle => {
            eachTitle.classList.remove('dark');
        })
        
        createGif_button.classList.remove('dark');
        logo.classList.remove('dark');
        header.classList.remove('dark');
        footer.classList.remove('dark');
        main.classList.remove('dark');
        menu.classList.remove('dark');
        see_more_button.forEach(button => {
            button.classList.remove('dark')
        })
        burger.classList.remove('dark');
    }
}

export function displayTrendingGifos() {
    var carousel = document.querySelector('.carousel');
    var gif_menuContainer = document.querySelector('.gif-menuContainer');
    var rightRow = document.querySelector('.rightRow');
    var leftRow = document.querySelector('.leftRow');
    rightRow.addEventListener('click', () => {
        
        carousel.scrollLeft += carousel.clientWidth / 2.85;
        
    });
    leftRow.addEventListener('click', () => {
        
        carousel.scrollLeft -= carousel.clientWidth / 2.85;

    })

    var path = `${url}trending?api_key=${apiKey}&limit=10`;

    fetch(path).then(rawResponse => rawResponse.json())
        .then(res => {
            res.data.forEach(obj => {
                hoverGifMenu(obj, carousel);
            })
        })
        .catch(err => console.log(err))
}

function deleteMyGif(id, caller) {

    if (!localStorage.myGifos) {
        localStorage.setItem('myGifos')
    }

    var myGifs = JSON.parse(localStorage.getItem('myGifos'));

    myGifs.splice(myGifs.indexOf(id.id), 1);
    localStorage.setItem('myGifos', JSON.stringify(myGifs));
    location.reload();

}


function getFavs(json, caller) {

    var favs = JSON.parse(localStorage.getItem('favs'));

    if(!localStorage.favs) {
        localStorage.setItem('favs')
    }
    var favsIds = [];

    favs.forEach(json => {
        favsIds.push(json.id);
    })

    if (caller === 'any') {
        if (favsIds.includes(json.id)) {
            alert('Este GIFO ya está en tus favoritos!');
        } else {
            favs.push(json);
            localStorage.setItem('favs', JSON.stringify(favs));
        }
    }
    if (caller === 'favorites') {
        favs.splice(favsIds.indexOf(json.id), 1);
        localStorage.setItem('favs', JSON.stringify(favs));
        location.reload();
    }

}
export function hoverGifMenu(json, parent) {

    var gif_menuContainer = document.createElement('div');
    gif_menuContainer.className = 'gif-menuContainer'

    var trendGif = document.createElement('img');
    trendGif.className = 'trendGif';
    trendGif.src = json.images.original.url;

    var menu = document.createElement('div');
    menu.className = 'menu';

    var icons = document.createElement('div')
    icons.className = 'icons'

    var favActiveIcon = document.createElement('img');
    favActiveIcon.className = 'like-and-like-active icon';

    if (parent.className == 'favContainer') {

        favActiveIcon.style.backgroundImage = 'url(../assets/icon-fav-active.svg)';
        favActiveIcon.addEventListener('click', () => {
            getFavs(json, 'favorites');
        });

    } else if (parent.className == 'myGifosContainer') {

        favActiveIcon.style.backgroundImage = 'url(../assets/icon_trash.svg)';
        favActiveIcon.addEventListener('click', () => {
            deleteMyGif(json, 'myGifs');
        })

    } else {

        favActiveIcon.style.backgroundImage = 'url(../assets/icon-fav-hover.svg)';

        favActiveIcon.addEventListener('click', () => {
            var favorites = [];
            var idsArr = [];
            if (localStorage.favs) {
                favorites = JSON.parse(localStorage.getItem('favs'));
                favorites.forEach(obj => {
                    idsArr.push(obj.id);
                });
            } else {
                favorites.push(json);
                localStorage.setItem('favs', JSON.stringify(favorites))
                favActiveIcon.style.backgroundImage = 'url(../assets/icon-fav-active.svg)';
            }
            getFavs(json, 'any');
            
        });

    }

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
        x.responseType = 'blob';
        x.onload = function (e) { download(x.response, "descarga.gif", "image/gif"); }
        x.send();
    });
    maxIcon.addEventListener('click', setFullImage);

    trendGif.addEventListener('click', () => {
        setFullImage();
    });

    function setFullImage() {

        var fullImageContainer = document.createElement('div');
        fullImageContainer.className = 'fullImageContainer';
        fullImageContainer.style.display = 'flex';
        fullImageContainer.innerHTML = '';

        var closeFullImage = document.createElement('div');
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

        var likeIcon = document.createElement('div')
        likeIcon.className = 'dislike icon';

        if (parent.className == 'favContainer') {
            likeIcon.style.backgroundImage = 'url(../assets/icon-fav-active.svg)';
        }
        else {
            likeIcon.style.backgroundImage = 'url(../assets/icon-fav-hover.svg)';

        }
        
        likeIcon.addEventListener('click' , () => {

            if (parent.className == 'favContainer') {
                likeIcon.style.backgroundImage = 'url(../assets/icon-fav-active.svg)';
                getFavs(json, 'favorites');
            } else {
                getFavs(json, 'any');
            }
        })

        var downloadIcon = document.createElement('div');
        downloadIcon.className = 'download icon'

        downloadIcon.addEventListener("click", () => {
            var x = new XMLHttpRequest();
            x.open("GET", json.images.original.url, true);
            x.responseType = 'blob';
            x.onload = function (e) { download(x.response, "descarga.gif", "image/gif"); }
            x.send();
        });

        gifInfo.appendChild(gifUser);
        gifInfo.appendChild(gifTitle);

        icons.appendChild(likeIcon)
        icons.appendChild(downloadIcon)

        menu.appendChild(gifInfo);
        menu.appendChild(icons);

        gif_menuContainer.appendChild(trendGif);
        
        gif_menuContainer.appendChild(menu);

        fullImageContainer.appendChild(closeFullImage);
        fullImageContainer.appendChild(gif_menuContainer);
        document.body.appendChild(fullImageContainer);

        var closeAction = document.querySelector('.closeAction');

        if(darkModeButton.innerHTML === 'MODO DIURNO') {
            closeAction.classList.add('dark');
        } else {
            closeAction.classList.remove('dark');
        }
    }
}


const apiKey = 'ES5Qs5lBlti0twPy81oeRnqfaDotGqp8';
var url = 'https://api.giphy.com/v1/gifs/';



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
        x.responseType = 'blob';
        x.onload = function (e) { download(x.response, "descarga.gif", "image/gif"); }
        x.send();
    });
}

export function download(data, strFileName, strMimeType) {
    var self = window,
        defaultMime = "application/octet-stream",
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