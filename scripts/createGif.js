import { timer } from "./shared.js";
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
var myGifos = [];
var chronometerDisplay = document.querySelector('.data-chronometer');

button_film.style.display = 'none';
button_stop.style.display = 'none';
button_upload.style.display = 'none';


// format_text.style.display = 'none';
button_start.addEventListener('click', () => {
    // e.preventDefault();
    step1.style.backgroundColor = '#572ee5';
    step1.style.color = '#fff';
    title.innerHTML = `<span> ¿Nos das acceso </span><span> a tu cámara? </span>`
    paragraph.innerHTML = `El acceso a tu cámara será solo por el tiempo en que estás creando el GIFO`;
    button_start.style.display = 'none';
    step2.addEventListener('click', () => {
        step1.style.backgroundColor = '#fff';
        step1.style.color = '#572ee5';
        step2.style.backgroundColor = '#572ee5';
        step2.style.color = '#fff';
        button_film.style.display = 'block';
        button_film.addEventListener('click', getStreamAndRecord);
        // format_text.style.display = 'none'
        // video.style.display = 'block';
        // button_film.style.display = 'block'
        // button_start.style.display = 'block';
        // button_start.innerHTML = 'GRABAR'
        // step1.addEventListener('click', film);
        // alert('Step one clicked!')
    })

    // alert('clicked man!')
});

async function getStreamAndRecord() { // Call this function when button GRABAR clicked
    navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
            height: { max: 480 }
        }
    })
        .then(function (stream) {
            var recordInterval = null;
            format_text.style.display = 'none'
            video_container.style.display = 'block';
            video_container.srcObject = stream;
            video_container.play();
            button_film.style.display = 'none';
            button_stop.style.display = 'block';

            let recorder = RecordRTC(stream, {
                type: 'gif',
                frameRate: 1,
                quality: 10,
                width: 360,
                hidden: 240,
                onGifRecordingStarted: function () {
                    console.log('started');
                    recordInterval = setInterval(timer, 1000);
                }
            });

            recorder.startRecording();

            // var button_stop_clone = button_stop.cloneNode(true);

            function stopRecording() {
                recorder.stopRecording();
                video_container.pause();
                // recorder.reset();
                clearInterval(recordInterval);
                chronometerDisplay.innerHTML = 'REPETIR CAPTURA';
                cleanStopButton();
                button_stop.style.display = 'none';
                button_upload.style.display = 'block';
                button_upload.addEventListener('click', () => {
                    let form = new FormData();
                    form.append('file', recorder.getBlob(), 'myGif.gif');
                    console.log(form.get('file'));
                    upload(form);
                })
            }

            button_stop.addEventListener('click', stopRecording);

            function cleanStopButton() {
                button_stop.removeEventListener('click', stopRecording);
            }


            // button_stop = button_stop_clone;


        }).catch(err => {
            console.log('Hay un error');
        });

}

// document.addEventListener('click', e => {
//     if (e.target.innerHTML === 'REPETIR CAPTURA') {
//         getStreamAndRecord();
//     }
// })

document.addEventListener('click', e => {
    if (e.target.innerHTML === 'REPETIR CAPTURA') {
        button_upload.style.display = 'none';
        button_stop.style.display = 'none';
        button_film.style.display = 'block';
        button_film.addEventListener('click', getStreamAndRecord)
        // getStreamAndRecord();
    }
})
// step3.addEventListener('click', () => {
//     button_stop.removeEventListener('click', null);
//     getStreamAndRecord();
// })


// function getStream() {
//     navigator.mediaDevices.getUserMedia({
//         audio: false,
//         video: {
//             height: { max: 480 }
//         }
//     })
//     .then(function (stream) {
//         format_text.style.display = 'none'
//         videoo.style.display = 'block';
//         // button_film.style.display = 'none';
//         videoo.srcObject = stream;
//         videoo.play();

//         button_film.style.display = 'block';
//         button_film.addEventListener('click', () => {

//             record(stream);
//         });
//         return stream;
//     });
// }

// function record(stream) {
//     var recordInterval = null;
//     let recorder = new RecordRTC(stream, {
//         type: 'gif',
//         frameRate: 1,
//         quality: 10,
//         width: 360,
//         hidden: 240,
//         onGifRecordingStarted: function () {
//             console.log('started')
//             recordInterval = setInterval(timer, 1000);
//         },
//     });
//     button_film.style.display = 'none';
//     recorder.startRecording();
//     // timer();
//     // setTimeout(() => {
//     //     console.log('In timeout');
//     // }, 3000);

//     // recorder.stopRecording(function () {
//     //     let blob = recorder.getBlob();
//     //     invokeSaveAsDialog(blob);
//     // });
//     button_stop.style.display = 'block';

//     button_stop.addEventListener('click', () => {
//         recorder.stopRecording(function () {

//             let form = new FormData();
//             form.append('file', recorder.getBlob(), 'myGif.gif');
//             console.log(form.get('file'))

//             button_stop.style.display = 'none'
//             button_upload.style.display = 'block';

//             button_upload.addEventListener('click', () => {
//                 upload(form) 
//             })
//             // Convert chronometer in film again button === DONE ===
//             // if button clicked, upload gif / else call again the film function

//             clearInterval(recordInterval)
//             chronometerDisplay.innerHTML = 'REPETIR CAPTURA'
//             stream.getTracks().forEach(function (track) {
//                 track.stop();
//             });
//             // chronometerDisplay.addEventListener('click', () => {
//             //     FormData.delete;
//             //     recorder
//             //     getStream();
//             // });
//             // chronometerDisplay.innerHTML = 'sadggf';
//         });
//         // console.log('response:' + response);
//         FormData.delete;
//     });

// }

function upload(form) {
    var path = `${url}?api_key=${apiKey}`
            console.log(path);

            fetch(path, {
                // mode: 'no-cors',
                method: 'POST',
                body: form
            }).then(response => {
                console.log(`status: ${response.status}`);
                let data = response.json();
                // console.log(`data: ${data}`);
                return data
            }).then(json => {
                let id = json.data.id;
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
                .catch(err => console.error(err));

}

// document.addEventListener('click', e => {
//     if (e.target.innerHTML === 'REPETIR CAPTURA') {
//         var str = getStream();
//         record(str);
//     }
// })