import * as buildings from "./Buildings.JS";
let assetHandler = null;
let assets = {};
const canvas = document.getElementById("FanCanvas2D");
const ctx = canvas.getContext("2d");
const pageElements = {
    BuildsDivContent: document.getElementById("BuildsDivContent"),
    ShopContentDiv: document.getElementById("ShopContentDiv")
};
let FPS = 60;
let frameDuration = 1000 / FPS; // milliseconds per frame 
let lastFrameTime = performance.now();
let accumulatedTime = 0;
let userAlreadyInteracted = false;
const PI = Math.PI;
export let mouse = {x:0,y:0,isDown:false,x_:0,y_:0,justGotUp:false,justGotDown:false};
export let tickCount = 0;
export let stats = {
    "speed":0,
    "clickGain":1
};
let fanAngle = 0;
class Particle{
    type = "";
    x = 0;
    y = 0;
    gravity = 0;
    width = 64;
    height = 64;
    velX = 0;
    velY = 0;
    opacity = 100;
    decay = 0;
    constructor(type,x,y,scale=1,opacity=100,decay=40,gravity=20){
        this.gravity = gravity;
        this.type = type;
        this.x = x;
        this.y = y;
        this.width = this.width*scale;
        this.height = this.height*scale;
        this.opacity = opacity;
        this.decay = decay;

        if(type === "clicktext"){
            this.velY = -10;
            this.velX = 0;
            this.gravity = 0;
        }else{
            this.velY = -30;
            this.velX = (Math.random()-.5)*30;
        }
    }
}
let lastTimeClicked = 0;
const particles = [];
const elements = {
    SpeedCounter: document.getElementById("SpeedText"),
}

function update(fd,dt){
    elements.SpeedCounter.textContent = `Speed: ${stats.speed}`;
    lastTimeClicked = clamp(lastTimeClicked+(dt*10),240,256)

    particles.forEach(function(value,index,arr){
        if(value===null){return;}
        particles[index].x += value.velX*dt;
        particles[index].y += value.velY*dt;
        particles[index].velY += dt*value.gravity;
        particles[index].opacity -= dt*value.decay;
        if(value.opacity<0){
            particles[index]=null;
        }
    });
}

function clamp(x,min,max){
    if(x<min){return min;}
    if(x>max){return max;}
    return x;
}

function Rad(x){
    return x * (PI / 180);
}

function render(dt){
    let realWidth = canvas.getBoundingClientRect().width;
    let realHeight = canvas.getBoundingClientRect().height;
    
    let proportion = realWidth/realHeight;
    let Height = Math.floor(300/proportion);
    Height = clamp(Height,16,1024);
    
    canvas.width = 320;
    canvas.height = Height;
    let S = lastTimeClicked;
    let x = 30+(128+(S/2)-S);
    let y = (128+(S/2)-S);
    ctx.save();
    
    ctx.drawImage(assets.images.Fan$Layer0,x,y,S,S);
    const radians = Rad(fanAngle); 
    ctx.translate(152, 94);
    ctx.rotate(radians);
    ctx.drawImage(assets.images.Fan$Layer1,-80,-80,160,160);
    ctx.restore();
    ctx.drawImage(assets.images.Fan$Layer2,x,y,S,S);

    particles.forEach(function(value,index,arr){
        if(!value){return;}
        if(value.type === "clicktext"){
            ctx.globalAlpha = 1.0;
            ctx.font = "bold 20px sans-serif";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "rgb(255,255,255)";
            ctx.fillText(`+${value.textvalue}`,value.x,value.y);
        }else{
            ctx.globalAlpha = value.opacity/100; 
            ctx.drawImage(assets.images[`Particles$${value.type}`],value.x-(value.width*0.5),value.y-(value.height*0.5),value.width,value.height);
        }
    });
    ctx.globalAlpha = 1.0;

    /*
    ctx.fillStyle = "rgba(255,0,0,0.5)";
    ctx.fillRect(0,0,320,Height);
    */
}

function gameLoop(timestamp) {
    tickCount++;
    fanAngle = (fanAngle+(stats.speed*0.01))%360;
    const deltaTime = timestamp - lastFrameTime;
    lastFrameTime = timestamp;
    accumulatedTime += deltaTime;

    while(accumulatedTime >= frameDuration){
        update(frameDuration,deltaTime/100);
        render(accumulatedTime / frameDuration);
        accumulatedTime -= frameDuration;
    }

    requestAnimationFrame(gameLoop);
}

export function FanClick(){
    stats.speed+=stats.clickGain;
    lastTimeClicked = 0;
    if(lastTimeClicked<=0.4444){
        lastTimeClicked = Math.random()*512
    }

    const text = new Particle("clicktext",mouse.x,mouse.y-10,1.0);
    text.textvalue = String(stats.clickGain);
    
    particles.push(text);
    particles.push(new Particle("click",mouse.x,mouse.y,1.0));
    particles.push(new Particle("click",mouse.x,mouse.y,0.4));
    particles.push(new Particle("click",mouse.x,mouse.y,0.5));

    const audio = new Audio("./Assets/Audios/Click.webm");
    audio.play();
}

export function Setup(ASSETHANDLER){
    assetHandler = ASSETHANDLER;
    assets = assetHandler.assets;

    document.addEventListener("mousemove", (event) => {
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

    Object.keys(buildings.defs).forEach((key) => {
        const value = buildings.defs[key];
        const newElement = document.createElement("div");
        let htmlsrc = (assets.texts.StoreButton$html)
        .replaceAll("[SPRITE_SRC]",`./Assets/Sprites/Icons/${value.icon??`${(value.id).toLowerCase()}.png`}`)
        .replaceAll("[DISPLAY_NAME]",value.display_name)
        .replaceAll("[DESCRIPTION]",value.description)
        .replaceAll("[PRICE]",value.price);
        newElement.innerHTML = htmlsrc;
        pageElements.ShopContentDiv.appendChild(newElement);
    });
}

export function StartMainLoop(Fps){
    FPS = Fps; frameDuration = 1000 / Fps;
    requestAnimationFrame(gameLoop);
}