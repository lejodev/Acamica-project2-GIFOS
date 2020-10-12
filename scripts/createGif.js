import { setStatus, darkMode, downloadListener, download } from "./shared.js";
var url = 'https://upload.giphy.com/v1/gifs';
const apiKey = 'ES5Qs5lBlti0twPy81oeRnqfaDotGqp8';
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
var linkIcon = document.querySelector('.copy-link');
var createGif_button = document.querySelector('.createGif');
var dark_mode = document.querySelector('.dark-mode');

let hours = `00`;
let minutes = `00`;
let seconds = `00`;

var iniciado = false;

button_film.style.display = 'none';
button_stop.style.display = 'none';
button_upload.style.display = 'none';
chronometerContainer.style.display = 'none';
createGif_button.classList.toggle('btn_active');

setStatus('createGifs');

button_start.addEventListener('click', () => {
    console.log('button_start');
    iniciado = true;
    // step1.style.backgroundColor = '#572ee5';
    // step1.style.color = '#fff';
    title.innerHTML = `<span> ¿Nos das acceso </span><span> a tu cámara? </span>`
    if (dark_mode.innerHTML === 'MODO NOCTURO') {
        step2.style.backgroundColor = '#572ee5';
    } else {
        step2.style.backgroundColor = '#572ee5';
    }
    // button_film.addEventListener('click', getStreamAndRecord);
    getStreamAndRecord();
    paragraph.innerHTML = `El acceso a tu cámara será solo por el tiempo en que estás creando el GIFO`;
    button_start.style.display = 'none';
    button_film.style.display = 'block';
});

step2.addEventListener('click', () => {
    step1.style.backgroundColor = '#FFF';
    step1.style.color = '#FFF';
    if (iniciado) {
        step1.style.backgroundColor = 'unset';
        step2.style.backgroundColor = '#572ee5';
        // if (dark_mode.innerHTML === 'MODO NOCTURO') {
        //     step2.style.backgroundColor = '#572ee5';
        // } else {
        //     step2.style.backgroundColor = '#572ee5';
        // }
        step1.style.color = '#572ee5';
        step2.style.color = '#fff';
        // button_film.style.display = 'block';
        // button_film.addEventListener('click', getStreamAndRecord);
        iniciado = false;
    }
})

function timer() {

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

    chronometerDisplay.textContent = `${hours}:${minutes}:${seconds}`;
    
}

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
            

            var recorder = null;

            button_film.onclick = () => {
                button_film.style.display = 'none';
            button_stop.style.display = 'block'

                recorder = RecordRTC(stream, {
                    type: 'gif',
                    frameRate: 1,
                    quality: 10,
                    width: 360,
                    hidden: 240,
                    onGifRecordingStarted: function () {
                        chronometerContainer.style.display = 'block';
                        chronometerDisplay.style.display = 'block';
                        chronometerDisplay.style.textDecoration = 'none';
                        timerInterval = setInterval(timer, 1000);
                    },
                });
    
                recorder.startRecording();

            }

            

            button_stop.onclick = () => {
                recorder.stopRecording();
                clearInterval(timerInterval);
                chronometerDisplay.innerHTML = 'repetir captura';
                chronometerDisplay.style.borderBottom = '5px solid #5ED7C6'
                video_container.pause();
                let form = new FormData();
                form.append('file', recorder.getBlob(), 'myGif.gif');
                button_stop.style.display = 'none';
                button_upload.style.display = 'block';
                console.log(`This is the form ${form}`);
                stream.getTracks().forEach(function (track) {
                    track.stop();
                });

                hours = `00`;
                minutes = `00`;
                seconds = `00`;
                
                button_upload.onclick = () => {
                    chronometerContainer.style.display = 'none';
                    chronometerDisplay.style.display = 'none';
                    button_upload.style.display = 'none';
                    upload(form);
                }
            };
        })
}

function upload(formObj) {
    
    var endpoint = `${url}?api_key=${apiKey}`;
    gifo_status_uploading.style.display = 'block';
    video_container.style.opacity = '0.3';
    fetch(endpoint, {
        method: 'POST',
        body: formObj
    }).then(resp => {
        
        step2.style.backgroundColor = 'unset';
        step2.style.color = '#572ee5';
        step3.style.backgroundColor = '#572ee5';
        step3.style.color = '#FFF';
        button_upload.style.display = 'none';
        let data = resp.json();
        gifo_status_uploading.style.display = 'none';
        gifo_status_success.style.display = 'block';
        
        return data;
    }).then(obj => {
        
        let id = obj.data.id;
        downloadFromId(id)
        
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
    if (e.target.innerHTML === 'repetir captura') {

        button_upload.style.display = 'none';
        chronometerContainer.style.display = 'none';
        chronometerDisplay.style.display = 'none';
        button_film.style.display = 'block';
        button_film.removeEventListener('click', getStreamAndRecord);
        button_film.onclick = getStreamAndRecord;
    }
})

function downloadFromId(id) {
    
    var url = 'https://api.giphy.com/v1/gifs/';
    const apiKey = 'ES5Qs5lBlti0twPy81oeRnqfaDotGqp8';
    var path = `${url}${id}?api_key=${apiKey}`;
    fetch(path).then(gifObj => gifObj.json())
        .then(json => {
            
            linkIcon.addEventListener('click', () => {
                var gifUrl = json.data.url;

                navigator.clipboard.writeText(gifUrl).then(function() {
                    alert('Link copiado al clipboard');
                  }, function(err) {
                    console.log('Error al copiar el link de tu GIFO. ERROR : ', err);
                  });
            })

            download_icon.addEventListener("click", () => {
                var x = new XMLHttpRequest();
                x.open("GET", json.data.images.original.url, true);
                x.responseType = 'blob';
                x.onload = function (e) { download(x.response, "descarga.gif", "image/gif"); }
                x.send();
            });
        })
        .catch(err => {
            console.log('Error obteniendo ti GIFO' + err);
        })
}
