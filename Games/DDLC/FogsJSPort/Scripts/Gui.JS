export class button{
    constructor(x,y,text,styleName,fontSize,width,height,offsetX,offsetY,action){
        console.log(x,y,text,styleName,fontSize,width,height,offsetX,offsetY,action);
        this.focused = false;
        this.enabled = true;
        this.offsetX = offsetX || 0;
        this.offsetY = offsetY || 0;
        this.width = width || (text.length*fontSize/2+30); this.height = height || (fontSize-1);
        this.x = x; this.y = y; this.text = text; this.fontSize = fontSize; this.styleName = styleName;
        this.action = action;
    }
}

export class frame{
    constructor(x,y,width,height){
        this.x = x; this.y = y;
        this.width = width; this.height = height;
    }
}

export class text{
    constructor(x,y,text,font,fontSize,fillStyle,strokeStyle,strokeWidth,textAlign,textBaseline){
        this.x = x; this.y = y; this.text = text || "Text";
        this.fontSize = fontSize || 10;
        this.font = font || "Arial";
        this.fillStyle = fillStyle || "rgb(255,255,255)";
        this.strokeStyle = strokeStyle || "rgb(0,0,0)"; this.strokeWidth = strokeWidth || 0;
        this.textAlign = textAlign || "left"; this.textBaseline = textBaseline || "top";
    }
}

let scene = {
    "buttons":[],
    "frames":[],
    "texts":[]
}

export function Load(sceneToLoad){
    scene = sceneToLoad;
}

export function CreateEmptyPopup(x,y,width,height){
    scene.frames.push(new frame(x,y,width,height));
}

export function CreateButton(x,y,text,styleName,fontSize,width,height,offsetX,offsetY,action){
    scene.buttons.push(new button(x,y,text,styleName,fontSize,width,height,offsetX,offsetY,action));
}

export function RenderAll(ctx){
    scene.frames.forEach(element => {
        ctx.fillStyle = "rgb(240, 166, 221)";
        ctx.fillRect(element.x,element.y,element.width,element.height);
        ctx.fillStyle = "rgb(156, 19, 122)";
        ctx.fillRect(element.x,element.y,1,element.height);
        ctx.fillRect(element.x+element.width,element.y,1,element.height);
        ctx.fillRect(element.x,element.y,element.width,1);
        ctx.fillRect(element.x,element.y+element.height,element.width,1);
    });

    scene.buttons.forEach(element => {
        if(element.styleName === "menu_button"){
            if(element.focused){
                ctx.fillStyle = "rgb(255, 255, 255)";
                ctx.strokeStyle = "rgb(240, 166, 221)";
            }else{
                ctx.fillStyle = "rgb(255, 255, 255)";
                ctx.strokeStyle = "rgb(156, 19, 122)";
            }
            ctx.font = `${element.fontSize}px MenuFont`;
            ctx.lineWidth = 6;       
            ctx.textAlign = "left"; 
            ctx.textBaseline = "top";
            ctx.strokeText(element.text, element.x+element.offsetX, element.y+element.offsetY);
            ctx.fillText(element.text, element.x+element.offsetX, element.y+element.offsetY);
        }else if(element.styleName === "generic"){
            
            if(element.focused){
                ctx.fillStyle = "rgb(156, 19, 122)";
                ctx.fillRect(element.x,element.y,(element.width),element.height);
                ctx.fillStyle = "rgb(255, 255, 255)";
                ctx.strokeStyle = "rgb(240, 166, 221)";
            }else{
                ctx.fillStyle = "rgb(240, 166, 221)";
                ctx.fillRect(element.x,element.y,(element.width),element.height);
                ctx.fillStyle = "rgb(156, 19, 122)";
                ctx.fillRect(element.x,element.y,element.width,1);
                ctx.fillRect(element.x,element.y+element.height,element.width,1);
                ctx.fillRect(element.x+element.width,element.y,1,element.height);
                ctx.fillRect(element.x,element.y,1,element.height);
                
                ctx.fillStyle = "rgb(255, 255, 255)";
                ctx.strokeStyle = "rgb(156, 19, 122)";
            }
            ctx.font = `${element.fontSize}px MenuFont`;
            ctx.lineWidth = 6;       
            ctx.textAlign = "left"; 
            ctx.textBaseline = "top";
            ctx.strokeText(element.text, element.x+element.offsetX, element.y+element.offsetY);
            ctx.fillText(element.text, element.x+element.offsetX, element.y+element.offsetY);
        }else{
            if(element.focused){
                ctx.fillStyle = "rgb(138, 232, 255)";
                ctx.fillRect(element.x,element.y,(element.width),element.height)
            }

            ctx.font = `${element.fontSize}px Arial`;
            ctx.fillStyle = "rgb(255, 255, 255)";
            ctx.strokeStyle = "rgb(0, 0, 0)";
            ctx.lineWidth = 4;       
            ctx.textAlign = "left"; 
            ctx.textBaseline = "top";
            ctx.strokeText(element.text, element.x, element.y);
            ctx.fillText(element.text, element.x, element.y);
        }
    });

    scene.texts.forEach((element) => {

        ctx.fillStyle = element.fillStyle;
        ctx.strokeStyle = element.strokeStyle;
        ctx.font = `${element.fontSize}px ${element.font}`;
    
        ctx.textAlign = element.textAlign; 
        ctx.textBaseline = element.textBaseline;
        ctx.strokeText(element.text, element.x, element.y);
        ctx.fillText(element.text, element.x, element.y);
    });
}

export function Update(mouse){
    scene.buttons.forEach((element,index) => {
        if(!element.enabled){element.focused=false;return;}
        if(mouse.x>=element.x&&mouse.x<=element.x+element.width
        && mouse.y>=element.y&&mouse.y<=(element.y+element.height)){
            scene.buttons[index].focused = true;
            if(mouse.justGotUp){
                element.action();
            }
        }else{
            scene.buttons[index].focused = false;
        }
    });
}

export {scene};