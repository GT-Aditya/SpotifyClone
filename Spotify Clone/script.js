console.log('****Welcome to Spotify****');

var songInx = 0;
var progressBar = document.getElementById('progressBar');
var mainPlay = document.getElementById('mainPlay');
var audioVisual = document.getElementById('visualizer');
var currPlaying = document.getElementById('curr-song-name');
var currCover = document.getElementById('curr-cover-image');

var items = Array.from(document.getElementsByClassName('item'));

let songs = [
    { 
        songName: 'Aurora',
        artist: " K-391", 
        album: "The Neffex", 
        filePath: 'songs/Aurora - K-391.mp3', 
        coverPath: 'covers/Aurora.jpg' 
    },
    { 
        songName: 'Living_Life_In_The_Night', 
        artist: "Cheriimoya Sierra Kidd", 
        album: "The Neffex", 
        filePath: 'songs/Cheriimoya_Sierra_Kidd_-_Living_Life_In_The_Night.mp3', 
        coverPath: 'covers/Living life.jpg' 
    },
    { 
        songName: 'Excuses', 
        artist: "AP Dhillon, Gurinder Gill", 
        album: "The Neffex", 
        filePath: 'songs/Excuses - AP Dhillon, Gurinder Gill.mp3', 
        coverPath: 'covers/Excuses.jpg' 
    },
    { 
        songName: 'Middle Of The Night', 
        artist: "Elley Duhe", 
        album: "The Neffex", 
        filePath: 'songs/Middle_Of_The_Night - Elley Duhe.mp3', 
        coverPath: 'covers/Middle of the night.jpg' },
    { 
        songName: 'Grateful', 
        artist: "NEFFEX", 
        album: "The Neffex", 
        filePath: 'songs/Grateful - NEFFEX.mp3', 
        coverPath: 'covers/Gratefull.jpg' },
    { 
        songName: 'Arman Cekin', 
        artist: "Better Days (ft. Faydee & Karra)", 
        album: "The Neffex", 
        filePath: 'songs/Arman Cekin - Better Days (ft. Faydee & Karra).mp3', 
        coverPath: 'covers/Better Days.jpg' }
];

var audio = new Audio(songs[songInx].filePath);

//Handle play/pause event 
mainPlay.addEventListener('click', () => {
    if (audio.paused || audio.currentTime <= 0) {
        audio.play();
    }
    else {
        audio.pause();
        pauseToPlay();
    }
});

audio.addEventListener('play', () => {
    if (songs[songInx].coverPath.length > 0) {
        currCover.src = audioVisual.src = songs[songInx].coverPath;
        currCover.style.display = 'block';    
    }
    currPlaying.innerText = songs[songInx].songName.toUpperCase() + ' - ' + songs[songInx].artist.toUpperCase();
    spinAudioVisualizer();
    audioVisual.style.opacity = 1;
    mainPlay.classList.replace('fa-circle-play', 'fa-circle-pause');
});

spinAudioVisualizer = ()=>{
    audioVisual.style.animation = 'spin 2s linear infinite';
}

audio.addEventListener('pause', () => {
    stopAudioVisualizer();
    mainPlay.classList.replace('fa-circle-pause', 'fa-circle-play');
});

stopAudioVisualizer = ()=>{
    audioVisual.style.animationPlayState='paused';
}

//Listen to Events
audio.addEventListener('timeupdate', () => {
    progress = parseInt((audio.currentTime / audio.duration) * 100);
    progressBar.value = progress;
    followThumb();

});

progressBar.addEventListener('change', () => {
    audio.currentTime = (progressBar.value * audio.duration) / 100;
});

items.forEach((itm, inx) => {
    itm.getElementsByTagName('img')[0].src = songs[inx].coverPath;
    itm.getElementsByClassName('itemName')[0].innerText = songs[inx].songName;
});

Array.from(document.getElementsByClassName('timestamp')).forEach((itm) => {
    itm.addEventListener('click', (e) => {
        if (songInx == parseInt(e.target.id) && !audio.paused) {
            audio.pause();
            e.target.classList.replace('fa-pause-circle', 'fa-play-circle');
        } else {
            pauseToPlay();
            songInx = parseInt(e.target.id);
            audio.src = songs[songInx].filePath;
            audio.play();
            e.target.classList.replace('fa-play-circle', 'fa-pause-circle');
        }
    });
});

const pauseToPlay = () => {
    Array.from(document.getElementsByClassName('play')).forEach((itm) => {
        itm.classList.replace('fa-pause-circle', 'fa-play-circle');
    });
}

document.getElementById('next').addEventListener('click', () => {
    if (songInx > 6)
        songInx = 1;
    else
        songInx += 1;
    audio.src = songs[songInx].filePath;
    audio.currentTime = 0;
    audio.play();
});
document.getElementById('previous').addEventListener('click', () => {
    if (songInx < 0)
        songInx = 1;
    else
        songInx -= 1;
    audio.src = songs[songInx].filePath;
    audio.currentTime = 0;
    audio.play();
});

progressBar.addEventListener('mousemove', () => {
    followThumb();
});

const followThumb = () => {
    var x = progressBar.value;
    var color = 'linear-gradient(90deg, #038FD1 ' + x + '%, rgba(192,192,192,0) ' + x + '%)';
    progressBar.style.background = color;
}
