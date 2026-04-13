import * as game from "./Game.JS";
import * as gui from "./Gui.JS";
import * as assetHandler from "./AssetsHandler.JS";

const canvas = document.getElementById("main_game_canvas");
const scrWidth = 1280;
const scrWidthHalf = scrWidth/2;
const scrHeight = 720;
const scrHeightHalf = scrHeight/2;
canvas.width = scrWidth;
canvas.height = scrHeight;
const ctx = canvas.getContext("2d");

const FPS = 60;

const assetsToLoad = {
    images:{
        "BG/DEMO_THANKS":"./Sprites/THANKYOU.png",
        "MenuBackground":"./Sprites/UI/Menu/pink_circles_bg.png",
        "MenuSide":"./Sprites/UI/Menu/Side.png",
        "Logo":"./Sprites/UI/Menu/logo_x512.png",
        "SayoriMenu":"./Sprites/UI/Menu/Sayori.png",
        "YuriMenu":"./Sprites/UI/Menu/Yuri.png",
        "MonikaMenu":"./Sprites/UI/Menu/Monika.png",
        "NatsukiMenu":"./Sprites/UI/Menu/Natsuki.png",
        "BG/Exterior":"./Sprites/Backgrounds/Exterior.png",
        "BG_NotFound":"./Sprites/Backgrounds/FileNotFound.png",
        "UI/Popup":"./Sprites/UI/Generic/Dialog.png",
        "UI/Dialog":"./Sprites/UI/Generic/Dialog.png",
        "UI/DialogChar":"./Sprites/UI/Generic/DialogChar.png",
        "UI_Popup":"./Sprites/UI/Generic/Dialog.png",
        "UI_Dialog":"./Sprites/UI/Generic/Dialog.png",
        "UI_DialogChar":"./Sprites/UI/Generic/DialogChar.png",
        "BG/residential_day":"./Sprites/Backgrounds/Exterior.png",
        "CHARS/Sayori/UniformRaiseingArmLeft":"./Sprites/Characters/Sayori/UniformRaiseingArmLeft.png",
        "CHARS/Sayori/UniformRaiseingArmRight":"./Sprites/Characters/Sayori/UniformRaiseingArmRight.png",
        "CHARS/Sayori/UniformPoseC":"./Sprites/Characters/Sayori/UniformPoseC.png",
        "CHARS/Sayori/FaceXO":"./Sprites/Characters/Sayori/FaceXO.png",
        "CHARS/Sayori/CasualIdleLeft":"./Sprites/Characters/Sayori/CasualIdleLeft.png",
        "CHARS/Sayori/CasualIdleRight":"./Sprites/Characters/Sayori/CasualIdleRight.png",
        "CHARS/Sayori/UniformIdleLeft":"./Sprites/Characters/Sayori/UniformIdleLeft.png",
        "CHARS/Sayori/UniformIdleRight":"./Sprites/Characters/Sayori/UniformIdleRight.png",
        "CHARS/Sayori/FaceHappy":"./Sprites/Characters/Sayori/FaceHappy.png",
        "CHARS/Sayori/FaceSmiling":"./Sprites/Characters/Sayori/FaceSmiling.png",
        "CHARS/Sayori/FaceSmilingClosedEyes":"./Sprites/Characters/Sayori/FaceSmilingClosedEyes.png",
        "CHARS/Template":"./Sprites/Characters/Placeholder.png",
    },
    fonts:{ 
        "Menu":"./Fonts/Menu.ttf"
    }
};

await assetHandler.LoadAllAssets(assetsToLoad);

gui.Setup(game,assetHandler,ctx);
game.Setup(gui,assetHandler,ctx);

game.StartMainLoop(FPS);