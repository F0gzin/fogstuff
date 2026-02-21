const body = document.body;
console.log("hello");
const fullscreenButton = document.getElementById("maximize_button");
const gameArea = document.getElementById("game_frame_container");
const defaultState = "overflow-y:hidden;position:relative;margin-left: auto;margin-right: auto;z-index: 1000;height: calc(100% - 60px);"
gameArea.style=defaultState;

function toggleFullScreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().catch(err => {
            alert(`FULLSCREEN ERROR: ${err.message} (${err.name})`);
        });
        gameArea.style="position:fixed;width:100%;height:100vh;left:0px;top:0px";
        body.style.overflowY = "hidden";
    }else{
        document.exitFullscreen();
        gameArea.style=defaultState
        body.style.overflowY = "scroll";
    }
}

fullscreenButton.addEventListener("click",(e)=>{
    toggleFullScreen();
});

document.addEventListener('fullscreenchange', (e)=>{
    if (document.fullscreenElement) {
        console.log('entered fullscreen');
    } else {
        console.log('exited fullscreen');
        gameArea.style="position:relative;";
        body.style.overflowY = "scroll";
    }
});