const FPS = 60;
const fanbutton = document.getElementById("FanButton");
import * as game from "./Game.JS";
import * as assetHandler from "./AssetsHandler.JS";

const assetsToLoad = {
    images:{
        "Fan$Layer0":"../Assets/Sprites/Fan/Fan_Back.png",
        "Fan$Layer1":"../Assets/Sprites/Fan/Fan_Helices.png",
        "Fan$Layer2":"../Assets/Sprites/Fan/Fan_Front.png",
        "Particles$click":"../Assets/Sprites/ClickParticleBlue.png",
    },
    fonts:{},
    texts:{
        "StoreButton$html":"../Assets/Html/StoreButton.html"
    }
};

await assetHandler.LoadAllAssets(assetsToLoad);
fanbutton.onclick = game.FanClick;
game.Setup(assetHandler);
game.StartMainLoop(FPS);