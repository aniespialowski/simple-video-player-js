var playButton = document.getElementById("playButton");
var pauseButton = document.getElementById("pauseButton");
var videoPlayer = document.getElementById("videoPlayer");

var progressResult = 0;
var progressLineTop = document.getElementById("progressLineTop");
var timeProgress = document.getElementById("current-time");

var muteButton = document.getElementById("muteButton");
var unMuteButton = document.getElementById("unMuteButton");
var idTimer;

function ChangePlayButtonToPauseButton(){
    playButton.classList.remove("play-container-visible-on");
    playButton.classList.add("play-container-visible-off");

    pauseButton.classList.remove("pause-container-visible-off");
    pauseButton.classList.add("pause-container-visible-on");

    doPlayVideo();
    function doPlayVideo(){
        videoPlayer.play();
    }
    GoWithProgressLine();
    TimeUpdateEvent();
}
function ChangePauseButtonToPlayButton(){
    pauseButton.classList.remove("pause-container-visible-on");
    pauseButton.classList.add("pause-container-visible-off");

    playButton.classList.remove("play-container-visible-off");
    playButton.classList.add("play-container-visible-on");

    doPauseVideo();
    function doPauseVideo(){
        videoPlayer.pause();
    }
    GoWithProgressLine();
    TimeUpdateEvent();
}
function GoWithProgressLine(){
    var id = setInterval(frame,5);
    function frame(){
        if (videoPlayer.readyState){
            progressResult = (videoPlayer.currentTime*560)/videoPlayer.duration;
            progressLineTop.style.width = progressResult;
        }
    }
}
function doCurrentTimeMeasure(){
    var properCurrentTimeRes = "";
    var minutes = Math.floor(videoPlayer.currentTime/60);
    var seconds = (videoPlayer.currentTime - minutes*60);
    seconds = seconds.toFixed(0);

    if (minutes<10 && seconds<10){
        properCurrentTimeRes = "0" + minutes + ":" + "0" + seconds;
    }
    else if (minutes<10 && seconds>=10){
        properCurrentTimeRes = "0" + minutes + ":" + seconds;
        if (seconds==60){
            seconds=0;
            properCurrentTimeRes = "0" + minutes + ":" + "0" + seconds;
        }
    }
    else if (minutes>=10 && seconds<10){
        properCurrentTimeRes = "" + minutes + ":" + "0" + seconds;
    }
    else if (minutes>=10 && seconds>=10){
        properCurrentTimeRes = "" + minutes + ":" + "" + seconds;
        if (seconds==60){
            seconds=0;
            properCurrentTimeRes = "0" + minutes + ":" + "0" + seconds;
        }
    }
    timeProgress.innerHTML = properCurrentTimeRes;
    if (videoPlayer.currentTime==videoPlayer.duration) ChangePauseButtonToPlayButton();
}
function TimeUpdateEvent(){
    videoPlayer.ontimeupdate = function(){
        doCurrentTimeMeasure();
    };
}
function DisplayFilmDurationTime(){
    var durationRes = "";
    var minutes = Math.floor(videoPlayer.duration/60);
    var seconds = (videoPlayer.duration - minutes*60);
    seconds = seconds.toFixed(0);

    if (minutes<10 && seconds<10){
        durationRes = "0" + minutes + ":" + "0" + seconds;
    }
    else if (minutes<10 && seconds>=10){
        durationRes = "0" + minutes + ":" + seconds;
        if (seconds==60){
            seconds=0;
            durationRes = "0" + minutes + ":" + "0" + seconds;
        }
    }
    else if (minutes>=10 && seconds<10){
        durationRes = "" + minutes + ":" + "0" + seconds;
    }
    else if (minutes>=10 && seconds>=10){
        durationRes = "" + minutes + ":" + "" + seconds;
        if (seconds==60){
            seconds=0;
            durationRes = "0" + minutes + ":" + "0" + seconds;
        }
    }
    document.getElementById("duration-time").innerHTML = durationRes;
}
function FilmDurationTimeFunc(){
    videoPlayer.ondurationchange = function(){
        DisplayFilmDurationTime();
    };
}
FilmDurationTimeFunc();
function doMute(){
    muteButton.classList.remove("mute-ico-visible-on");
    muteButton.classList.add("mute-ico-visible-off");

    unMuteButton.classList.remove("un-mute-ico-visible-off");
    unMuteButton.classList.add("un-mute-ico-visible-on");

    videoPlayer.muted = true;
}
function doUnMute(){
    muteButton.classList.remove("mute-ico-visible-off");
    muteButton.classList.add("mute-ico-visible-on");

    unMuteButton.classList.remove("un-mute-ico-visible-on");
    unMuteButton.classList.add("un-mute-ico-visible-off");

    videoPlayer.muted = false;
}
window.onload = function(){
    var canvas = document.getElementById("canvas");
    var ctx = canvas.getContext("2d");

    videoPlayer.addEventListener("play",function(){
        ctx.drawImage(videoPlayer,0,0,620,400);
    },30); 
}
function MakeFullScreen(){
    if (videoPlayer.requestFullscreen){
        videoPlayer.requestFullscreen();
    } else if (videoPlayer.webkitRequestFullScreen){
        videoPlayer.webkitRequestFullScreen();
    } else if (videoPlayer.mozRequestFullScreen){
        videoPlayer.mozRequestFullScreen();
    }
}