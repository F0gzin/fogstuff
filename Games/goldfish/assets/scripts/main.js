const fish = document.getElementById("fish_entity")

let fishDir = -1

setInterval(() => {
    fishDir = (-fishDir);
}, 2000);

let fishPos = (screenX/2) + 500

let fishTick = 0

setInterval(() => {
    fishTick += 1;

    if(fishTick > 100){
        fishTick = 0;
    }

    fishPos += fishDir * 3;
    let offset = (Math.sin(fishTick/10)*100);
    fish.style.transform = `scale(1,1) translateX(${fishPos + 40}px) rotate3d(0,1,0,${ ((-fishDir+1)*90)}deg)`;
//    console.log(fishPos);
}, 10);

let score = 0

const scoreText = document.getElementById("score_text")

const feedButton = document.getElementById("feed_button")

function updateButton(){
    if(score >= 10){
        feedButton.style.cursor = `pointer`;
        feedButton.disabled = false;
    }else{
        feedButton.style.cursor = `not-allowed`;
        feedButton.disabled = true;
    }
}

updateButton()

fish.addEventListener('click', self => {
    score += 1

    scoreText.innerText = `Bubbles: ${score}`

    updateButton()
})

const hungerBar = document.getElementById("hunger_bar")

let fishNutrition = 100;

setInterval(() => {
    fishNutrition -= .1;

    if(fishNutrition < 0){
        fishNutrition = 100;  
    };

    if(fishNutrition > 100){
        fishNutrition = 100;
    };

    hungerBar.style.width = `${fishNutrition}%`;

}, 100);

feedButton.addEventListener('click', self => {
    if(score >= 10){

        score -= 10;
        
        fishNutrition += 20;

        if(fishNutrition > 100){
            fishNutrition = 100;
        };

        hungerBar.style.width = `${fishNutrition}%`;

        scoreText.innerText = `Bubbles: ${score}`   

        updateButton()
    }
});