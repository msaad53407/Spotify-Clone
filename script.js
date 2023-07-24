
let songIndex = 0;
let masterSongName = document.querySelector('.masterSongName');
const audioElement = new Audio('songs/1.mp3'),
    playButtons = document.querySelectorAll('.fa-circle-play'),
    pauseButton = document.querySelector('.fa-circle-pause'),
    masterPlay = document.getElementById('masterPlay'),
    progressBar = document.getElementById('progressBar'),
    timeStamp = document.getElementById('timeStamp'),
    songItems = document.querySelectorAll('.songItem'),
    songItemPlay = document.querySelectorAll('.songItemPlay');


const songs = [
    { songName: "Warriyo - Mortals ", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo - Huma-Huma", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "DEAF KEV - Invincible ", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different Heaven & EH!DE", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji-Heroes-Tonight", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/6.jpg" },
    { songName: "Sakhiyaan - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/7.jpg" },
    { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg" },
    { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg" },
    { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg" },
]

//  Some Necessary Functions
const makeAllPlays = () => {
    songItemPlay.forEach((element) => {
        element.classList.remove('fa-circle-pause')
        element.classList.add('fa-circle-play')
    })
}

const toggleClassesPlayPause = (currentNum, previousNum) => {
    songItemPlay.forEach(function (element) {
        if (element.id == (songIndex + currentNum)) {
            currentPlaying = element
            currentPlaying.classList.remove('fa-circle-play')
            currentPlaying.classList.add('fa-circle-pause')
        }
        if (element.id == (songIndex + previousNum)) {
            previousPlaying = element
            previousPlaying.classList.remove('fa-circle-pause')
            previousPlaying.classList.add('fa-circle-play')
        }
    })
}

//  Settings Cover and Names in Container
songItems.forEach(function (element, i) {
    element.querySelector('img').src = songs[i].coverPath
    element.querySelector('.songName').innerText = songs[i].songName
})

// Listening to different Events
masterPlay.addEventListener('click', function () {
    if (audioElement.paused || audioElement.currentTime === 0) {
        songItemPlay[songIndex].classList.remove('fa-circle-play')
        songItemPlay[songIndex].classList.add('fa-circle-pause')
        gif.style.opacity = 1
        audioElement.play()
        this.classList.remove('fa-circle-play')  // this is actually the element on which event handler is attached i.e masterPlay
        this.classList.add('fa-circle-pause')
    } else {
        gif.style.opacity = 0
        audioElement.pause()
        this.classList.remove('fa-circle-pause')
        this.classList.add('fa-circle-play')
    }
})

audioElement.addEventListener('timeupdate', function () {
    let progress = parseInt((audioElement.currentTime / audioElement.duration) * 100)
    progressBar.value = progress
    let audioDuration = ((audioElement.duration) / 60).toString().slice(0, 4).split('.', 6)
    timeStamp.innerText = `Duration: ${audioDuration[0]}:${audioDuration[1]}`
})

progressBar.addEventListener('change', function () {
    audioElement.currentTime = (this.value * audioElement.duration) / 100
})

//  Logic to Play Music By Clicking on Any Play Icon in Container
songItemPlay.forEach(function (element) {
    element.addEventListener('click', function (e) {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `/songs/${songIndex}.mp3`;
        masterSongName.innerText = `${songs[songIndex - 1].songName}`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

//  Next Button Logic
document.getElementById('next').addEventListener('click', () => {
    makeAllPlays()
    if (songIndex >= 9) {
        songIndex = 0
    }
    else {
        songIndex += 1;
    }
    toggleClassesPlayPause(1, 0)
    gif.style.opacity = 1
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');

})

//  Previous Button Logic
document.getElementById('previous').addEventListener('click', () => {
    makeAllPlays()
    if (songIndex <= 0) {
        songIndex = 9
    }
    else {
        songIndex -= 1;
    }
    toggleClassesPlayPause(1, 2)
    gif.style.opacity = 1
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause');
})

