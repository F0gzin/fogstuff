import { assets } from "./AssetsHandler.JS";
import { Dialog } from "./Game.JS";
import { mouse } from "./Game.JS";
import { tickCount } from "./Game.JS";

let game = {};
let assetHandler = {};
let ctx = undefined;
const scrWidth = 1280;
const scrHeight = 720;
let fadeOpacity = 0;
let isDialogVisible = !!!0;
export let fadeState = "none";
export let IsAButtonFocused = false;

export function DialogClick(){
    isDialogVisible=!isDialogVisible;
}

export function SetFadeState(FadeState){
    fadeState = FadeState;
}

export function Setup(GAME,ASSETHANDLER,CTX){
    game = GAME; assetHandler = ASSETHANDLER; ctx = CTX;
}

export class Button{
    constructor(x,y,width,height,text,styleName,offsetx,offsety,action){
        this.x=x;this.y=y;
        this.text=text;
        this.styleName=styleName;
        this.action=action;
        this.width=width;this.height=height;
        this.offsetX=offsetx;this.offsetY=offsety;
        this.enabled=true;
    }
}

export class Frame{
    constructor(x,y,width,height,styleName){
        this.x=x;this.y=y;
        this.width=width;this.height=height;
        this.styleName=styleName;
        this.enabled = true;
    }
}

function clamp(x,min,max){
    if(x>=max){return max;}
    if(x<=min){return min;}
    return x;
}

function getFontSizeFromStyle(n){
    return {
        "menu":22,
        "dialog_settings":14,
    }[n];
}

function SetMouseStyle(styleName){
    document.body.style.cursor = styleName;
}

export function CreateFrame(x,y,width,height,styleName){
    return game.Scene.Frames.push(new Frame(x,y,width,height,styleName));
}

export function CreateButton(x=0,y=0,width=100,height=24,text="Button",styleName="none",offsetx=0,offsety=0,action=(function(){})){
    return game.Scene.Buttons.push(new Button(x,y,width,height,text,styleName,offsetx,offsety,action));
}

export function Update(dt){
    IsAButtonFocused = false;
    if(fadeState=="in"){
        fadeOpacity = clamp(fadeOpacity+(dt*.5),0,255);
        if(fadeOpacity>=255){
            fadeState="out";
        }
    }else if(fadeState=="out"){
        fadeOpacity = clamp(fadeOpacity-(dt*.5),0,255);
        if(fadeState<=0){
            fadeState="none";
        }
    }else{
        fadeOpacity = 0;
    }
    let atLeastASingleButtonFocused = false;
    game.Scene.Buttons.forEach((element,index) => {
        if(!element.enabled){
            game.Scene.Buttons[index].focused = false;
            return;
        }
        if(
        game.mouse.x>=element.x&&game.mouse.x<=element.x+element.width &&
        game.mouse.y>=element.y&&game.mouse.y<=element.y+element.height
        ){
            IsAButtonFocused = true;
            if(!element.focused){
                game.PlaySound("./Audios/UiButtonHover.ogg");
            }
            game.Scene.Buttons[index].focused = true;
            if(game.mouse.justGotUp){
                game.PlaySound("./Audios/UiButtonClick.ogg");
                element.action();
            }
            atLeastASingleButtonFocused = true;
        }else{
            game.Scene.Buttons[index].focused = false;
        }
    });
    SetMouseStyle((atLeastASingleButtonFocused? "pointer" : "default"));
}

function drawButtons(){
    game.Scene.Buttons.forEach((element,index) => {
        switch(element.styleName){
            case "menu":{
                ctx.fillStyle = "rgb(255, 255, 255)";
                ctx.strokeStyle = "rgb(156, 19, 122)";
                if(element.focused){
                    ctx.strokeStyle = "rgb(240, 166, 221)";
                    
                }
                ctx.font = `${element.fontSize || getFontSizeFromStyle(element.styleName)}px Menu`;
                ctx.lineWidth = 4;       
                ctx.textAlign = "left"; 
                ctx.textBaseline = "top";
                ctx.strokeText(element.text, element.x+element.offsetX, element.y+element.offsetY);
                ctx.fillText(element.text, element.x+element.offsetX, element.y+element.offsetY);
                break;
            }case "generic":{
                ctx.fillStyle = "rgb(255, 255, 255)";
                ctx.strokeStyle = "rgb(156, 19, 122)";
                if(element.focused){
                    ctx.strokeStyle = "rgb(240, 166, 221)";
                    ctx.fillStyle = "rgb(156, 19, 122)";
                    ctx.fillRect(element.x,element.y,element.width,element.height);
                    ctx.fillStyle = "rgb(255,255,255)";
                }
                ctx.font = `${element.fontSize || getFontSizeFromStyle(element.styleName)}px Menu`;
                ctx.lineWidth = 4;       
                ctx.textAlign = "left"; 
                ctx.textBaseline = "top";
                ctx.strokeText(element.text, element.x+element.offsetX, element.y+element.offsetY);
                ctx.fillText(element.text, element.x+element.offsetX, element.y+element.offsetY);
                ctx.fillStyle = "rgb(156, 19, 122)";
                ctx.fillRect(element.x,element.y,element.width,1);
                ctx.fillRect(element.x,element.y+element.height,element.width,1);
                ctx.fillRect(element.x,element.y,1,element.height);
                ctx.fillRect(element.x+element.width,element.y,1,element.height);
                break;
            }case "dialog_settings":{
                ctx.fillStyle = "rgb(90, 15, 71)";
                ctx.font = `${element.fontSize || getFontSizeFromStyle(element.styleName)}px Arial`;
                ctx.lineWidth = 4;       
                ctx.textAlign = "left"; 
                ctx.textBaseline = "top";
                ctx.fillText(element.text, element.x+element.offsetX, element.y+element.offsetY);
                
                break;
            }default:{
                if(element.focused){
                    ctx.fillStyle = "rgb(0,128,255)";
                }else{
                    ctx.fillStyle = "rgb(255,255,255)";
                }
                ctx.fillRect(element.x,element.y,element.width,element.height);
                ctx.fillStyle = "rgb(0, 0, 0)";
                ctx.strokeStyle = "rgb(216, 255, 255)";
                ctx.font = `${element.fontSize || getFontSizeFromStyle(element.styleName)}px Arial`;
                ctx.lineWidth = 2;       
                ctx.textAlign = "left"; 
                ctx.textBaseline = "top";
                ctx.strokeText(element.text, element.x+element.offsetX, element.y+element.offsetY);
                ctx.fillText(element.text, element.x+element.offsetX, element.y+element.offsetY);
            }
        }
    });
}

function drawFrames(){
    game.Scene.Frames.forEach((element,index) => {
        if(!element.enabled){return;}
        switch(element.styleName){
            case "null":{
                ctx.fillStyle = "rgb(82, 82, 82)";
                ctx.fillRect(element.x,element.y,element.width,element.height);
                break;
            }case "generic":{
                ctx.fillStyle = "rgb(240,166,221)";
                ctx.fillRect(element.x,element.y,element.width,element.height);
                ctx.fillStyle = "rgb(156, 19, 122)";
                ctx.fillRect(element.x,element.y,element.width,1);
                ctx.fillRect(element.x,element.y+element.height,element.width,1);
                ctx.fillRect(element.x,element.y,1,element.height);
                ctx.fillRect(element.x+element.width,element.y,1,element.height);
                break;
            }default:{
                ctx.fillStyle = "rgb(255, 255, 255)";
                ctx.fillRect(element.x,element.y,element.width,element.height);
            }
        }
    });
}

// code from FJOLT :)
const wrapText = function(ctx, text, x, y, maxWidth, lineHeight) {
    // First, start by splitting all of our text into words, but splitting it into an array split by spaces
    let words = text.split(' ');
    let line = ''; // This will store the text of the current line
    let testLine = ''; // This will store the text when we add a word, to test if it's too long
    let lineArray = []; // This is an array of lines, which the function will return

    // Lets iterate over each word
    for(var n = 0; n < words.length; n++) {
        // Create a test line, and measure it..
        testLine += `${words[n]} `;
        let metrics = ctx.measureText(testLine);
        let testWidth = metrics.width;
        // If the width of this test line is more than the max width
        if (testWidth > maxWidth && n > 0) {
            // Then the line is finished, push the current line into "lineArray"
            lineArray.push([line, x, y]);
            // Increase the line height, so a new line is started
            y += lineHeight;
            // Update line and test line to use this word as the first word on the next line
            line = `${words[n]} `;
            testLine = `${words[n]} `;
        }
        else {
            // If the test line is still less than the max width, then add the word to the current line
            line += `${words[n]} `;
        }
        // If we never reach the full max width, then there is only one line.. so push it into the lineArray so we return something
        if(n === words.length - 1) {
            lineArray.push([line, x, y]);
        }
    }
    // Return the line array
    return lineArray;
} // code from FJOLT :)

function renderWrappedText(ctx,text,x,y,width,lineHeight=24,fname="fillText"){
    let wrappedText = wrapText(ctx,text,x,y,width,lineHeight);
    wrappedText.forEach(function(item){
        ctx[fname](item[0],item[1],item[2])
    })
}

function renderWrappedTextFormatted(ctx,text,x,y,width,lineHeight=24,fname="fillText"){
    let wrappedText = wrapText(ctx,text,x,y,width,lineHeight);
    let oldFont = ctx.font;
    wrappedText.forEach(function(item){
        let offX = 0;
        let parsed = getTags(item[0]);
        parsed.forEach(function(val,ind,arr){
            if(val.style==="italic"){
                ctx.font = `Italic ${oldFont}`;
            }else{
                ctx.font = oldFont;
            }
            ctx[fname](val.text,item[1]+offX,item[2])
            offX += ctx.measureText(val.text).width;
        });
    })
    ctx.font = oldFont;
}

function drawDialogChars(){
    Object.entries(game.Dialog.CharsOnTheScreen).forEach(function([key,val]){
        //ctx.drawImage(assets.images["CHARS/Template"],val.x,val.y,720,720)
        if(!val){return;}
        let charData = game.gameChars[val.id]||game.gameChars["Sayori"];
        let spriteData = charData.sprites[val.sprite]||charData.sprites.DEFAULT;
        spriteData.forEach(function(sprVal,sprIndex){
            let Img = assets.images[`CHARS/${val.id}/${sprVal}`];
            if(!Img){
                //console.log(`Invalid sprite for ${val.id}: \"CHARS/${val.id}/${sprVal}\"`);
                Img = assets.images["CHARS/Template"];
            }
            ctx.drawImage(Img,val.x,val.y,720,720)
        });
    });
}

function getTags(src){
    let blocks = [];
    let isInTag = false;
    let tagStart = 0;
    for(let i=0;i<src.length;i++){
        if(src.slice(i,i+3)==="{i}"){
            blocks.push(
                {
                text:src.slice(tagStart,i),
                style:"normal"
                }
                );
            tagStart = i+3;
            isInTag = true;
        }
        if(src.slice(i,i+4)==="{/i}"){
            if(isInTag){
                blocks.push({
                    text:src.slice(tagStart,i),
                    style:"italic"
                }
                );
            }
            tagStart=i+4;
            isInTag = false;
        }

        if(i>=src.length-1){
            blocks.push({text:src.slice(tagStart,i+1),style:"normal"});
        }
    }
    return blocks;
}   

export function Render(){
    //ctx.fillStyle = "rgb(0, 0, 255)";
    //ctx.fillRect(0,0,scrWidth,scrHeight);

    // yes the menu is hardcoded
    // sorry i was too lazy to make a fancy UI system
    // the buttons were already too much for me lol
    
    if(game.Scene.SceneType==="Menu"){
        menuRender();
    }else if(game.Scene.SceneType==="GameDialog"){
        ctx.drawImage(/*game.Dialog.Background*/assets.images[game.Dialog.Background]||assetHandler.assets.images.BG_NotFound,0,0,scrWidth,scrHeight);
        if(game.Dialog.DialogData[game.Dialog.Count]){
            let msgState = game.Dialog.DialogData[game.Dialog.Count];
            
            drawDialogChars();

            
            if(msgState.action==="dialog" && isDialogVisible){
                ctx.drawImage(assetHandler.assets.images.UI_Popup,(scrWidth/2)-(816/2),scrHeight-146,816,146);
                let T = msgState.text;
                if(game.Dialog.TextTyping!==0){
                    T = T.slice(0,0-(game.Dialog.TextTyping))
                }
                ctx.fillStyle = "rgb(255,255,255)";
                ctx.strokeStyle = "rgba(19, 17, 18,0.8)";
                ctx.font = `23px Arial`;
                ctx.lineWidth = 3;       
                ctx.textAlign = "left"; 
                ctx.textBaseline = "top";
                //ctx.fillText(T,232+8,574+8);
                //ctx.strokeText(T,232+8,574+8);
                renderWrappedTextFormatted(ctx,T,232+28,574+30,760,24,"strokeText")
                renderWrappedTextFormatted(ctx,T,232+28,574+30,760,24)

                if(game.Dialog.CurrentSpeakingChar){
                    ctx.drawImage(assetHandler.assets.images.UI_DialogChar,(scrWidth/2)-408+30,scrHeight-183,168,39);

                    ctx.fillStyle = "rgb(255, 255, 255)";
                    ctx.strokeStyle = "rgb(209, 23, 184)";
                    ctx.font = `20px Menu`;   
                    ctx.textAlign = "center"; 
                    ctx.textBaseline = "top";
                    ctx.lineWidth = 4; 
                    let X = (scrWidth/2)-408+90+20; let Y = scrHeight-170;
                    let charSpeaking = game.Dialog.CurrentSpeakingChar;
                    if(charSpeaking==="$MC"){
                        charSpeaking = game.GameVars.PlayerName;
                    }
                    ctx.strokeText((charSpeaking).toString(),X,Y);
                    ctx.fillText((charSpeaking).toString(),X,Y);
                }
            }

        }
    }

    drawFrames();
    drawButtons();


    ctx.fillStyle = `rgba(0,0,0,${fadeOpacity/255})`
    ctx.fillRect(0,0,scrWidth,scrHeight);

    //ctx.fillStyle = "rgba(255,255,255,100)";
    //ctx.fillRect(game.mouse.x,game.mouse.y,2,2);
}

function menuRender(){
    let bg = assetHandler.assets.images.MenuBackground;
    let assets = assetHandler.assets;
    let menuOffset = -(game.tickCount%1380)/2;
        // Background   
        ctx.drawImage(bg,menuOffset,menuOffset,1380,1320);
        ctx.drawImage(bg,menuOffset+1380,menuOffset,1380,1320);
        ctx.drawImage(bg,menuOffset+1380,menuOffset+1320,1380,1320);
        ctx.drawImage(bg,menuOffset,menuOffset+1320,1380,1320);

        // Side
        ctx.drawImage(assets.images.MenuSide,0,0,1280,720);
        // Logo
        ctx.drawImage(assets.images.Logo,60,-20,300,300);

        // Characters
        const e = 1.26;

        let yinterpolated,ninterpolated,sinterpolated,minterpolated;

        if(tickCount<=90){
            yinterpolated = (clamp(400-((tickCount**e)*4),0,2000));
            ninterpolated = (clamp(400-((tickCount**e)*3.7),60,2000));
            sinterpolated = (clamp(400-((tickCount**e)*3),170,2000));
            minterpolated = (clamp(400-((tickCount**e)*3.2),100,2000));
        }else{
            yinterpolated = 0;
            ninterpolated = 60;
            sinterpolated = 170;
            minterpolated = 100;
        }

        // Yuri
        ctx.drawImage(assets.images.YuriMenu,420,yinterpolated,270,607);
        // Natsuksi
        ctx.drawImage(assets.images.NatsukiMenu,600,ninterpolated,223,570);
        // Sayori
        ctx.drawImage(assets.images.SayoriMenu,330,sinterpolated,260,660);
        // Monika
        ctx.drawImage(assets.images.MonikaMenu,680,minterpolated,530,910);
}