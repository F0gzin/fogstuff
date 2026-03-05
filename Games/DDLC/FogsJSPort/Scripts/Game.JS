import * as gui from "./Gui.JS";
import { button } from "./Gui.JS";

let game = {

"sceneType":"menu",
"playerName":"MC",
"NewGame":function(){
    console.log("Prompting player name...");
    PromptPlayerName();
}

};

function AcceptName(){
    const namePrompt = document.getElementById("player_name_prompt");
    game.playerName = namePrompt.value.trim();
    if(game.playerName.length<2){return;}

    console.log(game);
}

function PromptPlayerName(){
    gui.scene.buttons.forEach((element,id) => {
        gui.scene.buttons[id].enabled = false;
    });
    const playerPrompt = document.getElementById("player_name_prompt"); // input text box
    playerPrompt.hidden = false;
    gui.CreateEmptyPopup(480,200,320,320);
    gui.scene.texts[0]= new gui.text(530,240,"Choose your name:","MenuFont",24,"rgb(255, 255, 255)","rgb(156, 19, 122)",3,"left","top");
    gui.CreateButton(580,430,"Ok","generic",20,110,30,40,10,function(){AcceptName();});
}

export {game};