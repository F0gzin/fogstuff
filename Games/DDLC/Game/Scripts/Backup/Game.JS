import * as gui from "./Gui.JS";
import { button } from "./Gui.JS";
import * as assets from "./AssetsHandler.JS";

let game = {

"sceneType":"menu",
"playerName":"MC",
"Update":function(gui){
    gui.RenderDialog(game);
},
"dialog":{
    "file":"null",
    "part":0,
    "background":"MCsRoom"
},
"NewGame":function(){
    console.log("Prompting player name...");
    PromptPlayerName();
},
"LoadDialog":function(dialog_file_name){
    ///////// File Stuff ////////////

    game.sceneType = "dialog";
    let dialogDataRaw = "";
    const request = new XMLHttpRequest();
    request.open("GET", "./Dialogs/"+dialog_file_name, false); // "false" makes it sync
    request.send(null);

    if (request.status === 200) {
        dialogDataRaw = request.responseText;
    }else{
        alert("Dialog file \"./Dialogs/"+dialog_file_name+"\" not found.")
        dialogDataRaw = `[
    {"action":"clear_all_chars"},
    {"action":"music_stop","fadeout":"2.0"},
    {"action":"set_bg","background":"crash"},
    {"action":"dialog","char":"$NULL","text":"Dialog file not found."},
]`
    }

    let dialogData = [{"action":"clear_all_chars"},{"action":"music_stop","fadeout":"2.0"},{"action":"set_bg","background":"crash"},{"action":"dialog","char":"$NULL","text":"Dialog file not found."}];
    try{
        dialogData = JSON.parse(dialogDataRaw);
    }catch (err){
        alert("Failed to parse JSON: "+String(err));
    }
    
    ////////////////////////////////////

    game.dialog.part=0; game.dialog.file=dialog_file_name;
    game.background = "FileNotFound";

    
}

};

function captalize(pName){
    return pName.slice(0,1).toUpperCase()+pName.slice(1,pName.length);
}

function AcceptName(){
    const namePrompt = document.getElementById("player_name_prompt");
    game.playerName = namePrompt.value.trim();
    if(game.playerName.length<2){alert("Name must be at least 3 characters long.");return;};
    game.playerName = captalize(game.playerName);
    let v = game.playerName.toLowerCase();
    if(v==="yuri"||v==="sayori"||v==="natsuki"||v==="monika"){alert("Just don't do that...");return;};

    console.log("Choosen player name: "+game.playerName);

    gui.ClearAll();
    namePrompt.hidden = true;

    game.LoadDialog("dialog_ch0.json");
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