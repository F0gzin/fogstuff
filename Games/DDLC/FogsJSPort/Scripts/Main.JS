import {game} from "./Game.JS";
import * as gui from "./Gui.JS";

let button = gui.button;

const canvas = document.getElementById("main_game_canvas");

const scrWidth = 1280;
const scrWidthHalf = scrWidth/2;
const scrHeight = 720;
const scrHeightHalf = scrHeight/2;
canvas.width = scrWidth;
canvas.height = scrHeight;
const ctx = canvas.getContext("2d");

let mouse = {x:0,y:0,isDown:false,x_:0,y_:0,justGotUp:false,justGotDown:false};

const FPS = 60;
const frameDuration = 1000 / FPS; // milliseconds per frame (16.667ms)
let lastFrameTime = performance.now();
let accumulatedTime = 0;
let tickCount = 0;

const assetsToLoad = {
    images: {
        menu_bg: "./Sprites/UI/Menu/pink_circles_bg.png",
        side: "./Sprites/UI/Menu/Side.png",
        logo_x512: "./Sprites/UI/Menu/logo_x512.png",
        cursor: "./Sprites/UI/Cursors/Default.png",
        sayori_menu: "./Sprites/UI/Menu/Sayori.png",
        yuri_menu: "./Sprites/UI/Menu/Yuri.png",
        natsuki_menu: "./Sprites/UI/Menu/Natsuki.png",
        monika_menu: "./Sprites/UI/Menu/Monika.png",
        
    },
    fonts: {
        MenuFont: "./Fonts/Menu.ttf",
    }
};

let assets = {
    images: {},
    fonts: {},
};

function loadImage(src) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = src;
        img.onload = () => resolve(img);
        img.onerror = reject;
    });
}

function loadFont(src,fontName) {
    return new Promise((resolve, reject) => {
        const fnt = new FontFace(fontName,`url(${src})`);
        //fnt.src = src;
        document.fonts.add(fnt);
        fnt.onload = () => resolve(fnt);
        fnt.onerror = reject;
    });
}

function loadAllAssets() {
    const imagePromises = Object.entries(assetsToLoad.images).map(([key, src]) =>
        loadImage(src).then(img => assets.images[key] = img)
    );
    const fontPromises = Object.entries(assetsToLoad.fonts).map(([key, src]) =>
        loadFont(src,key).then(fnt => {assets.fonts[key] = fnt; document.fonts.add(fnt);})
    );

    return Promise.all([...imagePromises,fontPromises]);
}

loadAllAssets().then(() => {
    console.log("Loaded assets!");
    startGame();
}).catch(err => {
    console.error("Failed to load assets:", err);
});

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

document.addEventListener('mousedown', () => {
    mouse.isDown = true;
    mouse.justGotDown = true;
});

document.addEventListener('mouseup', () => {
    mouse.isDown = false;
    mouse.justGotUp = true;
});

function gameLoop(timestamp) {
    tickCount++;
    const deltaTime = timestamp - lastFrameTime;
    lastFrameTime = timestamp;
    accumulatedTime += deltaTime;

    while(accumulatedTime >= frameDuration){
        update(frameDuration);
        render(accumulatedTime / frameDuration);
        accumulatedTime -= frameDuration;
    }

    requestAnimationFrame(gameLoop);
}

function update(dt){
    gui.Update(mouse);

    if(mouse.justGotUp){mouse.justGotUp=false};
    if(mouse.justGotDown){mouse.justGotDown=false};
}

function render(){
    ctx.style = "rgb(0,0,0)";
    ctx.fillRect(0,0,scrWidth,scrHeight);
    let menuOffset = -(tickCount%(1380));

    // Background

    ctx.drawImage(assets.images.menu_bg,menuOffset,menuOffset,1380,1320);
    ctx.drawImage(assets.images.menu_bg,menuOffset+1380,menuOffset,1380,1320);
    ctx.drawImage(assets.images.menu_bg,menuOffset+1380,menuOffset+1320,1380,1320);
    ctx.drawImage(assets.images.menu_bg,menuOffset,menuOffset+1320,1380,1320);
    
    // Side

    ctx.drawImage(assets.images.side,0,0,1280,720);
    ctx.drawImage(assets.images.logo_x512,60,-20,300,300);
    
    // Characters

    // Yuri
    ctx.drawImage(assets.images.yuri_menu,420,0,270,607);
    // Natsuki
    ctx.drawImage(assets.images.natsuki_menu,600,60,223,570);
    // Sayori
    ctx.drawImage(assets.images.sayori_menu,330,170,260,660);
    // Monika
    ctx.drawImage(assets.images.monika_menu,680,100,530,910);

    gui.RenderAll(ctx);

    ctx.style = "rgb(0,0,0)";
    // ctx.fillRect(mouse.x,mouse.y,4,4);

    ctx.drawImage(assets.images.cursor,mouse.x,mouse.y,40,40);
}


// main loop
function startGame(){
    gui.Load({
        "buttons":[
            new button(70,500,"New Game","menu_button",25,null,null,0,0,function(){console.log("New Game clicked.");game.NewGame();}),
            new button(70,530,"Load Game","menu_button",25,null,null,0,0,function(){console.log("Clicked!")}),
            new button(70,560,"Settings","menu_button",25,null,null,0,0,function(){console.log("Clicked!")}),
            new button(70,590,"About/Help","menu_button",25,null,null,0,0,function(){console.log("Clicked!")}),
            new button(70,620,"Mods","menu_button",25,null,null,0,0,function(){console.log("Clicked!")}),
        ],
        "frames":[],
        "texts":[]
    })
    requestAnimationFrame(gameLoop);
}