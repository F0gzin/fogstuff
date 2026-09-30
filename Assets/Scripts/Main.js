const template = `<img src="./Assets/GameImages/[GAME_ID].png" class="GameCardIcon" alt="[GAME_ID] card image">
                        <div class="GamecardTexts">
                            <h2>[GAME_NAME]</h2>
                            <p>[GAME_DESCRIPTION]</p>
                            <a href="./Games/[GAME_ID]/">
                                <button>Play</button>
                            </a>
                        </div>`;

console.log("Hello, World!");
const ListScrollArea = document.getElementById("ListScrollArea");

ListScrollArea.innerHTML = " ";
ListScrollArea.style.height = "auto";

async function requestServerFile(url) {
    try{
        const response = await fetch(url);
      
        if(!response.ok){
            throw new Error(`HTTP error status: ${response.status}`);
        }
        
        const fileContent = await response.text(); 
        return fileContent;
    }catch(error){
        console.error("Failed to fetch the server file:", error);
    }
}

let dataRaw = await requestServerFile("./Data/Games.json");
let data = JSON.parse(dataRaw);

for(var i=0; i<data.length-1; i++){
    const newElement = document.createElement("article");
    newElement.className = "GameCardMain";
    let html = template;
    if(data[i].disabled){
        html = html.replaceAll("<button","<button disabled ").replaceAll("<a href=\"./Games/[GAME_ID]/\">"," ").replaceAll("</a>"," ");
    }
    html = html.replaceAll("[GAME_ID]",data[i].id).replaceAll("[GAME_NAME]",data[i].display_name).replaceAll("[GAME_DESCRIPTION]",data[i].description);
    newElement.innerHTML = html;
    ListScrollArea.appendChild(newElement);
}