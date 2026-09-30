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
        "BG/class_day":"./Sprites/Backgrounds/Classroom1.png",
        "BG/corridor":"./Sprites/Backgrounds/Hallway.png",
        "BG_NotFound":"./Sprites/Backgrounds/FileNotFound.png",
        "BG/club_day":"./Sprites/Backgrounds/Classroom2.png",

        "UI/Popup":"./Sprites/UI/Generic/Dialog.png",
        "UI/Dialog":"./Sprites/UI/Generic/Dialog.png",
        "UI/DialogChar":"./Sprites/UI/Generic/DialogChar.png",
        "UI_Popup":"./Sprites/UI/Generic/Dialog.png",
        "UI_Dialog":"./Sprites/UI/Generic/Dialog.png",
        "UI_DialogChar":"./Sprites/UI/Generic/DialogChar.png",
        "BG/residential_day":"./Sprites/Backgrounds/Exterior.png",
        "BG/warning":"./Sprites/GameTitleScreenWarning.png",

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
        "CHARS/Sayori/FaceWorriedTalking":"./Sprites/Characters/Sayori/FaceWorriedTalking.png",
        "CHARS/Sayori/FaceAngryTalking":"./Sprites/Characters/Sayori/FaceAngryTalking.png",
        "CHARS/Sayori/FaceSmilingOpenMouthClosedEyes":"./Sprites/Characters/Sayori/FaceSmilingOpenMouthClosedEyes.png",
        "CHARS/Sayori/FaceSad":"./Sprites/Characters/Sayori/FaceSad.png",
        "CHARS/Sayori/FaceNeutral":"./Sprites/Characters/Sayori/FaceNeutral.png",
        "CHARS/Sayori/FaceBlushedWorried":"./Sprites/Characters/Sayori/FaceBlushedWorried.png",
        "CHARS/Sayori/UniformPoseD":"./Sprites/Characters/Sayori/UniformPoseD.png",
        "CHARS/Sayori/UniformPoseB":"./Sprites/Characters/Sayori/UniformPoseB.png",
        "CHARS/Sayori/Missing":"./Sprites/Characters/Sayori/Missing.png",

        "CHARS/Monika/MonikaHead":"./Sprites/Characters/Monika/MonikaHead.png",
        "CHARS/Monika/MonikaWarmlySmileTalking":"./Sprites/Characters/Monika/MonikaWarmlySmileTalking.png",
        "CHARS/Monika/MonikaRight":"./Sprites/Characters/Monika/MonikaRight.png",
        "CHARS/Monika/MonikaLeft":"./Sprites/Characters/Monika/MonikaLeft.png",
        "CHARS/Monika/MonikaStaring":"./Sprites/Characters/Monika/MonikaStaring.png",
        "CHARS/Monika/MonikaRightPose":"./Sprites/Characters/Monika/MonikaRightPose.png",
        "CHARS/Monika/MonikaPoseA":"./Sprites/Characters/Monika/MonikaPoseA.png",
        "CHARS/Monika/Missing":"./Sprites/Characters/Monika/Missing.png",

        "CHARS/Yuri/YuriHeadA":"./Sprites/Characters/Yuri/YuriHeadA.png",
        "CHARS/Yuri/UniformIdle":"./Sprites/Characters/Yuri/UniformIdle.png",
        "CHARS/Yuri/UniformPoseARight":"./Sprites/Characters/Yuri/UniformPoseARight.png",
        "CHARS/Yuri/UniformPoseALeft":"./Sprites/Characters/Yuri/UniformPoseALeft.png",
        "CHARS/Yuri/UniformIdleLeft":"./Sprites/Characters/Yuri/UniformPoseALeft.png",
        "CHARS/Yuri/YuriHeadA5":"./Sprites/Characters/Yuri/YuriHeadA5.png",
        "CHARS/Yuri/YuriHeadR":"./Sprites/Characters/Yuri/YuriHeadR.png",
        "CHARS/Yuri/YuriHeadD":"./Sprites/Characters/Yuri/YuriHeadD.png",
        "CHARS/Yuri/UniformPoseB":"./Sprites/Characters/Yuri/UniformPoseB.png",
        "CHARS/Yuri/Missing":"./Sprites/Characters/Yuri/Missing.png",

        "CHARS/Natsuki/UniformCrossedArms":"./Sprites/Characters/Natsuki/UniformCrossedArms.png",
        "CHARS/Natsuki/UniformIdleLeft":"./Sprites/Characters/Natsuki/UniformIdleLeft.png",
        "CHARS/Natsuki/UniformIdleRight":"./Sprites/Characters/Natsuki/UniformIdleRight.png",
        "CHARS/Natsuki/UniformPoseRight":"./Sprites/Characters/Natsuki/UniformPoseRight.png",
        "CHARS/Natsuki/UniformPoseLeft":"./Sprites/Characters/Natsuki/UniformPoseLeft.png",
        "CHARS/Natsuki/FaceB2":"./Sprites/Characters/Natsuki/FaceB2.png",
        "CHARS/Natsuki/FaceB2_Offset":"./Sprites/Characters/Natsuki/FaceB2_Offset.png",
        "CHARS/Natsuki/Missing":"./Sprites/Characters/Natsuki/Missing.png",
        "CHARS/Natsuki/FaceBlushed":"./Sprites/Characters/Natsuki/FaceBlushed.png",
        "CHARS/Natsuki/FaceTalking2":"./Sprites/Characters/Natsuki/FaceTalking2.png",

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

function GoToDialog(x){
    game.Dialog.Count=(x);
}