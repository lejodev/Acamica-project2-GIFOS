import { setStatus, darkMode, timer, downloadListener, download } from "./shared.js";
var url = 'https://upload.giphy.com/v1/gifs'; // Exportable
const apiKey = 'ES5Qs5lBlti0twPy81oeRnqfaDotGqp8'; // Exportable
var button_start = document.querySelector('.button');
var button_film = document.querySelector('.film');
var button_stop = document.querySelector('.stop');
var button_upload = document.querySelector('.upload');
var step1 = document.querySelector('.one');
var step2 = document.querySelector('.two');
var step3 = document.querySelector('.three');
var title = document.querySelector('.title');
var paragraph = document.querySelector('.paragraph');
var format_text = document.querySelector('.format-text');
var video_container = document.querySelector('.make-gif');
var gifo_status = document.querySelector('.gifo-status');
var gifo_status_uploading = document.querySelector('.uploading');
var gifo_status_success = document.querySelector('.succuess');
var myGifos = [];
var chronometerDisplay = document.querySelector('.data-chronometer');
var chronometerContainer = document.querySelector('.timer');
var download_icon = document.querySelector('.download');
var linkIcon = document.querySelector('.link');
var createGif_button = document.querySelector('.createGif');

var iniciado = false;

button_film.style.display = 'none';
button_stop.style.display = 'none';
button_upload.style.display = 'none';
// chronometerContainer.style.visibility = 'hidden';
chronometerContainer.style.display = 'none';
createGif_button.classList.toggle('btn_active');

setStatus('createGifs');
darkMode('createGifs');

button_start.addEventListener('click', () => {
    console.log('button_start');
    iniciado = true;
    // e.preventDefault();
    step1.style.backgroundColor = '#572ee5';
    step1.style.color = '#fff';
    title.innerHTML = `<span> ¿Nos das acceso </span><span> a tu cámara? </span>`
    paragraph.innerHTML = `El acceso a tu cámara será solo por el tiempo en que estás creando el GIFO`;
    button_start.style.display = 'none';
});

step2.addEventListener('click', () => {
    if (iniciado) {
        console.log('step2');
        step1.style.backgroundColor = '#fff';
        step1.style.color = '#572ee5';
        step2.style.backgroundColor = '#572ee5';
        step2.style.color = '#fff';
        button_film.style.display = 'block';
        button_film.addEventListener('click', getStreamAndRecord);
        iniciado = false;
    } else {
        console.log('NO HA INICIADO');
    }
})

function getStreamAndRecord() {
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    })
        .then(function (stream) {
            var timerInterval = null;
            format_text.style.display = 'none';
            video_container.style.display = 'block';
            video_container.srcObject = stream;
            video_container.play()
            button_film.style.display = 'none';
            button_stop.style.display = 'block';

            var recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('started')
                    chronometerContainer.style.display = 'block';
                    chronometerDisplay.style.display = 'block';
                    timerInterval = setInterval(timer, 1000);
                },
            });

            recorder.startRecording();

            button_stop.onclick = () => {
                recorder.stopRecording();
                clearInterval(timerInterval);
                chronometerDisplay.innerHTML = 'REPETIR CAPTURA';
                video_container.pause();
                console.log(recorder);
                let form = new FormData();
                form.append('file', recorder.getBlob(), 'myGif.gif');
                // console.log(form.get('file'))
                alert('stopped!');
                button_stop.style.display = 'none';
                button_upload.style.display = 'block';
                stream.getTracks().forEach(function (track) {
                    track.stop();
                });
                button_upload.onclick = () => {
                    chronometerContainer.style.display = 'none';
                    chronometerDisplay.style.display = 'none';
                    upload(form);
                }
                // upload(form)
            };
        })
}

function upload(formObj) {
    // var file = formObj;
    console.log(formObj.get('file'))
    var endpoint = `${url}?api_key=${apiKey}`;
    console.log(endpoint);
    gifo_status_uploading.style.display = 'block';
    fetch(endpoint, {
        // mode : 'no-cors',
        method: 'POST',
        body: formObj
    }).then(resp => {
        console.log('status = ' + resp.status);
        console.log(resp);
        step2.style.backgroundColor = '#FFF';
        step2.style.color = '#572ee5';
        step3.style.backgroundColor = '#572ee5';
        step3.style.color = '#FFF';
        button_upload.style.display = 'none';
        let data = resp.json();
        gifo_status_uploading.style.display = 'none';
        gifo_status_success.style.display = 'block';

        // console.log(data);
        return data;
    }).then(obj => {
        console.log(obj);
        let id = obj.data.id;

        // ====================================================================
        // download_icon.addEventListener('click', () => {
            downloadFromId(id)
        // })
        // ====================================================================

        console.log(id);
        if (localStorage.myGifos) {
            myGifos = JSON.parse(localStorage.getItem('myGifos'));
            myGifos.push(id);
            localStorage.setItem('myGifos', JSON.stringify(myGifos));
        } else {
            myGifos.push(id);
            localStorage.setItem('myGifos', JSON.stringify(myGifos));
        }
    })
        .catch(err => {
            console.log(err);
        })
}

document.addEventListener('click', (e) => {
    if (e.target.innerHTML === 'REPETIR CAPTURA') {
        // alert('REPETIR CAPTURA');
        button_upload.style.display = 'none';
        chronometerContainer.style.display = 'none';
        chronometerDisplay.style.display = 'none';
        button_film.style.display = 'block';
        button_film.removeEventListener('click', getStreamAndRecord);
        button_film.onclick = getStreamAndRecord;
    }
})

function downloadFromId(id) {

    console.log(id);
    var url = 'https://api.giphy.com/v1/gifs/';
    const apiKey = 'ES5Qs5lBlti0twPy81oeRnqfaDotGqp8';
    var path = `${url}${id}?api_key=${apiKey}`;
    console.log(path);
    fetch(path).then(gifObj => gifObj.json())
        .then(json => {
            console.log(json.data.images.original.url);
            alert('Inside');
            linkIcon.addEventListener('click', () => {
                var gifUrl = json.data.url;
                alert('Link copiado al clipboard' + gifUrl);
                gifUrl.select();
                document.execCommand('copy');
            })
            // ======================== Download query ========================
            download_icon.addEventListener("click", () => {
                var x = new XMLHttpRequest();
                x.open("GET", json.data.images.original.url, true);
                // alert(json.images.original.url)
                x.responseType = 'blob';
                x.onload = function (e) { download(x.response, "descarga.gif", "image/gif"); }
                x.send();
            });
            // var x = new XMLHttpRequest();
            // x.open("GET", json.data.images.original.url, true);
            // alert(json.images.original.url)
            // x.responseType = 'blob';
            // x.onload = function (e) { download(x.response, "descarga.gif", "image/gif"); }
            // x.send();
            // ================================================================
        })
        .catch(err => {
            console.log('Error getting gif' + err);
        })
}