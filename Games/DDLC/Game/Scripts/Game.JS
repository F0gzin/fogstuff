import * as gui from "./Gui.JS"
const canvas = document.getElementById("main_game_canvas");
let FPS = 60;
let frameDuration = 1000 / FPS; // milliseconds per frame 
let lastFrameTime = performance.now();
let accumulatedTime = 0;
let userAlreadyInteracted = false;
export let tickCount = 0;

//let gui = {};
let assetsHandler = {};
let ctx = {};

class Character{
    constructor(name,id,sprites,wordChart){
        this.name=name;this.id=id;this.sprites=sprites;this.wordChart=wordChart;
    }
}

class CharOnScreen{
    x = 0;
    y = 0;
    id = "Sayori";
    targetPos = "t11";
    sprite = "DEFAULT";
    constructor(x,y,id,sprite){
        this.x=x;this.y=y;this.id=id;this.sprite=sprite;
    }

    MoveTo(pos) {
        let x = 0;
        let y = 0;
        if(pos[0]=="#"){
            this.targetPos = pos.slice(1);
            let foundValue = screenPositions[pos.slice(1)] || [0,0];
            x = foundValue[0]; y = foundValue[1];
        }
        this.x = x; this.y = y;
    }
}

export const screenPositions = {
    "t11":[280,0],
    "s11":[280,20],
}

export const gameChars = {
    "Sayori":new Character(
        "Sayori","Sayori",
        {
            "DEFAULT":[
                "FaceHappy",
                "UniformRaiseingArmLeft",
                "UniformRaiseingArmRight"
            ],
            "4p":[
                "UniformRaiseingArmLeft",
                "UniformRaiseingArmRight",
                "FaceXO",
            ],
            "1a":[
                "UniformIdleRight",
                "UniformIdleLeft",
                "FaceSmiling",
            ],
            "1q":[
                "UniformIdleRight",
                "UniformIdleLeft",
                "FaceSmilingClosedEyes",
            ],
            "5c":[
                "UniformPoseC",
            ]
        },
        {
            "Adventure":3,
            "Afterimage":1,
            "Agonizing":2,
            "Alone":3,
            "Amazing":3,
            "Ambient":2,
            "Analysis":1,
            "Anger":2,
            "Anime":2,
            "Anxiety":2,
            "Atone":2,
            "Aura":2,
            "Awesome":3,
            "Beauty":3,
            "Bed":3,
            "Blanket":1,
            "Bliss":3,
            "Boop":2,
            "Bouncy":2,
            "Breathe":1,
            "Broken":3,
            "Bubbles":2,
            "Bunny":2,
            "Cage":1,
            "Calm":3,
            "Candy":2,
            "Captive":2,
            "Charm":3,
            "Cheeks":2,
            "Cheer":3,
            "Childhood":3,
            "Chocolate":2,
            "Climax":1,
            "Clouds":2,
            "Clumsy":3,
            "Color":3,
            "Comfort":3,
            "Contamination":1,
            "Covet":1,
            "Crimson":1,
            "Cry":3,
            "Cute":2,
            "Dance":3,
            "Dark":3,
            "Daydream":3,
            "Dazzle":3,
            "Death":3,
            "Defeat":3,
            "Depression":3,
            "Desire":1,
            "Despise":2,
            "Destiny":2,
            "Determination":1,
            "Disarray":1,
            "Disaster":2,
            "Disoriented":1,
            "Disown":1,
            "Doki-Doki":2,
            "Dream":2,
            "Effulgent":1,
            "Electricity":1,
            "Email":2,
            "Embrace":3,
            "Empty":3,
            "Entropy":1,
            "Essence":2,
            "Eternity":2,
            "Excitement":3,
            "Existence":2,
            "Explode":1,
            "Extraordinary":3,
            "Extreme":1,
            "Family":3,
            "Fantasy":1,
            "Fear":3,
            "Feather":3,
            "Fester":2,
            "Fickle":1,
            "Fireflies":3,
            "Fireworks":3,
            "Flee":2,
            "Flower":3,
            "Fluffy":2,
            "Flying":3,
            "Forgive":3,
            "Friends":3,
            "Frightening":2,
            "Fun":3,
            "Games":2,
            "Giggle":2,
            "Graveyard":2,
            "Grief":3,
            "Hair":2,
            "Happiness":3,
            "Headphones":2,
            "Heartbeat":1,
            "Heart":3,
            "Heavensent":2,
            "Holiday":3,
            "Hopeless":3,
            "Hope":3,
            "Hop":2,
            "Horror":2,
            "Hurt":3,
            "Imagination":2,
            "Incapable":2,
            "Incongruent":1,
            "Infallible":1,
            "Inferno":2,
            "Infinite":2,
            "Insight":2,
            "Intellectual":1,
            "Journey":2,
            "Joy":3,
            "Judgment":1,
            "Jumpy":2,
            "Jump":2,
            "Kawaii":2,
            "Kiss":1,
            "Kitty":2,
            "Landscape":2,
            "Laugh":3,
            "Lazy":3,
            "Lipstick":1,
            "Lollipop":2,
            "Loud":3,
            "Love":3,
            "Lucky":3,
            "Lust":1,
            "Marriage":3,
            "Marshmallow":2,
            "Massacre":2,
            "Meager":1,
            "Melancholy":2,
            "Melody":2,
            "Memories":3,
            "Milk":2,
            "Misery":3,
            "Misfortune":3,
            "Mouse":1,
            "Music":3,
            "Nature":3,
            "Nibble":2,
            "Nightgown":1,
            "Ocean":3,
            "Pain":3,
            "Papa":2,
            "Parfait":2,
            "Party":3,
            "Passion":3,
            "Peaceful":3,
            "Peace":2,
            "Philosophy":1,
            "Pink":2,
            "Playground":2,
            "Play":3,
            "Pleasure":1,
            "Poof":2,
            "Portrait":2,
            "Pout":2,
            "Prayer":3,
            "Precious":3,
            "Promise":3,
            "Puppy":2,
            "Pure":1,
            "Question":1,
            "Rainbow":3,
            "Raincloud":3,
            "Raindrops":2,
            "Ribbon":2,
            "Romance":3,
            "Rose":3,
            "Sadness":3,
            "Scars":3,
            "Secretive":2,
            "Sensation":1,
            "Shame":3,
            "Shiny":2,
            "Shopping":2,
            "Silly":3,
            "Sing":3,
            "Skipping":2,
            "Skirt":2,
            "Smile":3,
            "Socks":2,
            "Sparkle":3,
            "Special":3,
            "Spinning":2,
            "Starscape":2,
            "Sticky":2,
            "Strawberry":2,
            "Sugar":2,
            "Suicide":2,
            "Summer":2,
            "Sunny":3,
            "Sunset":3,
            "Sweet":3,
            "Swimsuit":2,
            "Tears":3,
            "Tenacious":1,
            "Time":2,
            "Together":3,
            "Tragedy":3,
            "Treasure":3,
            "Twirl":2,
            "Uncanny":2,
            "Uncontrollable":2,
            "Unending":2,
            "Universe":2,
            "Unrequited":3,
            "Unrestrained":1,
            "Unstable":1,
            "Vacation":3,
            "Valentine":2,
            "Vanilla":2,
            "Variance":1,
            "Vertigo":1,
            "Vibrant":1,
            "Vitality":1,
            "Vivacious":1,
            "Vivid":2,
            "Warm":3,
            "Waterfall":1,
            "Whirlwind":1,
            "Whisper":2,
            "Whistle":2,
            "Wonderful":3,
            "Wrath":2,
        }
    )
}

let music = new Audio('./Audios/Menu.ogg');
music.loop = true;
export let mouse = {x:0,y:0,isDown:false,x_:0,y_:0,justGotUp:false,justGotDown:false};
export let GameVars = {
    PlayerName:"MC",
    DokisScore: {
        "sayori":1,
        "natsuki":1,
        "yuri":1
    }
};

export let Dialog = {
    CharsOnTheScreen: {},
    CurrentSpeakingChar: null,
    DialogData: ["a"],
    Count: 0,
    Background: null,

};

export let Scene = {
    SceneType:"Menu",
    Sprites:[],
    Frames:[],
    Texts:[],
    Buttons:[
        new gui.Button(70,500,130,32,"New Game","menu",0,6,function(){console.log("new game clicked.");NewGameButton();}),
        new gui.Button(70,532,130,32,"Load Game","menu",0,6,function(){console.log("load game clicked.");alert("sybau 💔");}),
        new gui.Button(70,564,130,32,"Settings","menu",0,6,function(){console.log("settings clicked.");alert("sybau 💔");}),
        new gui.Button(70,596,130,32,"About/Help","menu",0,6,function(){console.log("help clicked.");alert("sybau 💔");}),
        new gui.Button(70,628,130,32,"Mods","menu",0,6,function(){console.log("mods clicked.");alert("sybau 💔");}),
    ],
    Clear:function(){
        this.Buttons.length=0;this.Sprites=[];this.Frames=[];this.Texts=[];
    }
};

export class Sprite{
    constructor(textureName,x,y,width,height){
        this.texture = textureName || "None";
        this.x=x || 0;this.y=y || 0;
        this.width = width || 20; this.height = height || 20;
    }
}

function NewGameButton(){
    Scene.Buttons.forEach((element,index) => {
        Scene.Buttons[index].enabled = false;
    });
    const html_textbox = document.getElementById("player_name_prompt");
    gui.CreateFrame((1280/2)-128,(720/2)-128,256,256,"generic");
    gui.CreateButton(640-64,380,120,40,"OK","generic",45,12,ConfirmName);
    gui.CreateButton(640-95,270,0,0,"Choose your name","menu",2,2,function(){}); // text
    
    html_textbox.hidden = false;
       
    function ConfirmName(){
        console.log("Confirmed name");
        let N = html_textbox.value.trim();
        const emoji_regex = /\p{Extended_Pictographic}/gu;
        if(N.match(emoji_regex)){alert("Emojis? 😭🥀💔");return;}
        if(N==""||(!N)||N==false||N==null||N==undefined){ // yes == not ===
            N = "MC";
        }else if(N.length<3){
            alert("Name must be at least 3 characters long.");
            return;
        }
        
        N = N.slice(0,1).toUpperCase()+N.slice(1,N.length).toLowerCase()
        let nlow = N.toLowerCase();
        if(nlow==="gooner"||nlow==="triple t"||nlow==="skibidi"||nlow==="tung tung tung"||nlow==="tung tung sahur"||nlow==="sahur"||nlow==="tung sahur"){alert("Seriously bro? 💔");}
        if(nlow=="monika"||nlow=="sayori"||nlow=="natsuki"){
            alert("Don't do that...");
            return;
        }
        if(nlow=="yuri"){alert("Uhh, that might create some problems but ok.");}
        if(N==="Mc"){N="MC";}
        console.log("Name: "+N);
        GameVars.PlayerName = N;

        html_textbox.hidden = true;
        music.pause();
        gui.SetFadeState("in");
        setTimeout(() => {
            Scene.SceneType = "GameDialog";
            Scene.Clear();
            LoadDialogFile("./Dialogs/dialog_ch0.json");
        }, 600);
    }
}

const internalSavedScenes = {
    "Menu":{
        SceneType:"Menu",
        Sprites:[
            new Sprite("SayoriMenu",330,170,260,660),
        ],
    }
};

function loadFileSync(url) {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', url, false); 
    xhr.send(null);

    if (xhr.status === 200) {
        return xhr.responseText;
    } else {
        throw new Error("Couldn't load file: "+String(url));
    }
}

export function LoadDialogFile(filePath){
    const fileRawData = loadFileSync(filePath);
    const fileAsArray = JSON.parse(fileRawData); // array
    console.log(fileAsArray);

    Dialog.DialogData = fileAsArray;
}

function render(){
    gui.Render();
}

function ExecDialog(dialogData){
    if(!dialogData){return;}
    switch (dialogData.action){
        case "dialog":{
            if((!dialogData.char_display_name&&!dialogData.char) || (dialogData.char_display_name||dialogData.char)==="$NULL"){
                Dialog.CurrentSpeakingChar = null;
            }else{
                Dialog.CurrentSpeakingChar = String(dialogData.char_display_name||dialogData.char);
            }
        }break;
        case "js_eval":{
            eval(dialogData.script);
        }break;
        case "show_char":{
            console.log("Showing: "+String(dialogData.char));
            let x = 0;
            let y = 0;
            if(dialogData.pos[0]=="#"){
                let foundValue = screenPositions[dialogData.pos.slice(1)] || [0,0];
                x = foundValue[0]; y = foundValue[1];
            }
            Dialog.CharsOnTheScreen[dialogData.char]=(new CharOnScreen(x,y,dialogData.char,dialogData.sprite));
        }break;
        case "hide_char":{
            console.log("Hiding: "+String(dialogData.char));
            Dialog.CharsOnTheScreen[dialogData.char]=null;
        }break;
        case "change_sprite":{
            Dialog.CharsOnTheScreen[dialogData.char].sprite = dialogData.sprite;
        }break;
        case "move_char":{
            Dialog.CharsOnTheScreen[dialogData.char].MoveTo(dialogData.pos);
        }break;
        case "set_bg":{
            Dialog.Background="BG/"+dialogData.background;
        }break;
    }
}

function ClickDialog(){
    if(!Dialog.DialogData[Dialog.Count]){return;}
    if(Dialog.DialogData[Dialog.Count]["action"]==="dialog"){
        Dialog.Count++;
        let txt = Dialog.DialogData[Dialog.Count].text;
        if(txt){
            Dialog.DialogData[Dialog.Count].text = txt.replace("[player]",GameVars.PlayerName);
        }
        ExecDialog(Dialog.DialogData[Dialog.Count]);
        /*if((!Dialog.DialogData[Dialog.Count].char) || Dialog.DialogData[Dialog.Count].char==="$NULL"){
            Dialog.CurrentSpeakingChar = null;
        }else{
            Dialog.CurrentSpeakingChar = String(Dialog.DialogData[Dialog.Count].char);
        }*/

        while(Dialog.DialogData[Dialog.Count] && Dialog.DialogData[Dialog.Count]["action"]!=="dialog"){
            ExecDialog(Dialog.DialogData[++Dialog.Count]);
        }
    }else{
        while(Dialog.DialogData[Dialog.Count] && Dialog.DialogData[Dialog.Count]["action"]!=="dialog"){
            ExecDialog(Dialog.DialogData[Dialog.Count++]);
        }
    }
}

function update(dt){
    gui.Update(dt);
    if(!music.onplaying&&Scene.SceneType=="Menu"&&gui.fadeState=="none"&&userAlreadyInteracted){
        try {
            music.play();
        } catch (error) {
            // nothing lol
        }
    }

    if(mouse.justGotDown&&mouse.button===0){
        if(Scene.SceneType==="GameDialog"){
            ClickDialog();
        }

        mouse.justGotDown=false;
    }
    if(mouse.justGotUp){mouse.justGotUp=false;}
}

function gameLoop(timestamp) {
    tickCount++;
    const deltaTime = timestamp - lastFrameTime;
    lastFrameTime = timestamp;
    accumulatedTime += deltaTime;

    while(accumulatedTime >= frameDuration){
        update(frameDuration,deltaTime);
        render(accumulatedTime / frameDuration);
        accumulatedTime -= frameDuration;
    }


    requestAnimationFrame(gameLoop);
}

export function PlaySound(soundName){
    const audio = new Audio(soundName);
    audio.play();
}

export function Setup(GUI,ASSETHANDLER,CTX){
    //gui = GUI;
    assetsHandler = ASSETHANDLER; ctx = CTX;
 
    document.addEventListener('mousemove', (event) => {
        const xPos = event.clientX;
        const yPos = event.clientY;

        mouse.x_ = xPos || 0;
        mouse.y_ = yPos || 0;

        const rect = canvas.getBoundingClientRect();
        const canvasAspect = canvas.width / canvas.height;
        const rectAspect = rect.width / rect.height;

        let drawWidth, drawHeight;
        let offsetX = 0;
        let offsetY = 0;

        if (rectAspect > canvasAspect) {
            drawHeight = rect.height;
            drawWidth = drawHeight * canvasAspect;
            offsetX = (rect.width - drawWidth) / 2;
        } else {
            // top and bottom bars
            drawWidth = rect.width;
            drawHeight = drawWidth / canvasAspect;
            offsetY = (rect.height - drawHeight) / 2;
        }

        const x = (event.clientX - rect.left)-offsetX;
        const y = (event.clientY - rect.top)-offsetY;

        const normalizedX = x * (canvas.width / drawWidth);
        const normalizedY = y * (canvas.height / drawHeight);

        mouse.x = normalizedX || 0;
        mouse.y = normalizedY || 0;
    });

    document.addEventListener('mousedown', (ev) => {
        mouse.isDown = true;
        mouse.justGotDown = true;
        mouse.button = ev.button;

        userAlreadyInteracted = true;
    });

    document.addEventListener('mouseup', (ev) => {
        mouse.isDown = false;
        mouse.justGotUp = true;
        mouse.button = -1;

        userAlreadyInteracted = true;
    });

    document.addEventListener("click",function(ev){
        userAlreadyInteracted = true;
    })

    document.addEventListener(/*"input"*/"touchstart",function(ev){
        userAlreadyInteracted = true;
    })

    document.addEventListener("keydown",function(ev){
        userAlreadyInteracted = true;
    })

}

export function StartMainLoop(Fps){
    FPS = Fps; frameDuration = 1000 / Fps;
    requestAnimationFrame(gameLoop);
}