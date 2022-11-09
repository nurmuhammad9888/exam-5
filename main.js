// TIME AND LEVEL 
const elForm = document.querySelector(".form-js");
const elFormTime = document.querySelector(".time-js");
const elFormLevel = document.querySelector(".level-js");
const elTimeNumber = document.querySelector(".time-number");
const elChange = document.querySelector(".change-js");
const elPoints = document.querySelector(".point-js");

// CLICK BTN 
const elBtn = document.querySelector(".btn-js");
const elBtnReset = document.querySelector(".reset-btn");
const elBtnWelcome = document.querySelector(".btn-welcome");

// MODAL 
const elModal = document.querySelector(".modal-wrap");
const elModalGameOver = document.querySelector(".modal-game-over");
const elModalGameOverText = document.querySelector(".youwin-img");
const elModalWelcome = document.querySelector(".modal-welcome");
const elList =  document.querySelector(".list");
const elTextTitle =  document.querySelector(".text-title-js");
const elTextPoints =  document.querySelector(".text-points");
const elScoreText = document.querySelector(".text-score");
const elTextOver = document.querySelector(".text-over");

// FRAGMENT AND TEMPLATE 
const fragmentItem =  document.createDocumentFragment();
const template = document.querySelector(".temp").content;

const titleArray = [];

elBtnWelcome.addEventListener("click", ()=>{
    elModalWelcome.classList.add("modal-welcome-show");
})

function paramFunc() {
    elModalGameOver.classList.add("modal-game-over-show");
    elModal.classList.add("d-none");
    elTextPoints.textContent = `Score : ${randomPoints}`;
    elScoreText.textContent = `Attempts :  ${randomChange}`
}

// TIME FUNCTION
let timeCler;

function timeFunc(time){
    let timeCler = setInterval(() => {
        let minut = Math.floor(time /60);
        let secund = time % 60 ;
        
        if(minut < 10){
            minut = "0" + minut;
        } else{
            minut = minut;
        }
        if(secund < 10){
            secund = "0" + secund;
        } else{
            secund =  secund;
        }
        elTimeNumber.textContent = `${minut} : ${secund}`
        
        if(time == 0){
            clearInterval(timeCler)
            paramFunc()
            elTextTitle.style.opacity = "0";
            elTextTitle.style.pointerEvents = "none";
            elList.innerHTML = "";
        }
        time--
    }, 1000);
}

// RANDOM FUNCTION 
function randomFunc() {
    let random = Math.floor(Math.random() * titleArray.length);
    elTextTitle.textContent = titleArray[random];
}

function titleFunc(item) {
    item.forEach(element => {
        titleArray.push(element.symbol_title)
    });
}

for (let i = 0; i < roadSymbol.length; i++) {
    let random1 = Math.floor(Math.random() * roadSymbol.length)
    let random2 = Math.floor(Math.random() * roadSymbol.length)
    
    const icon = roadSymbol[random1] 
    roadSymbol[random1] = roadSymbol[random2]
    roadSymbol[random2] = icon
}

// BTN CLICK
elBtn.addEventListener("click", ()=>{
    clearInterval(timeCler);
    timeFunc(elFormTime.value);
    elModal.classList.add("modal-wrap-show");
    mainFunc(roadSymbol.slice(0, elFormLevel.value));
    titleFunc(roadSymbol.slice(0, elFormLevel.value));
    randomFunc();
    elForm.style.display = "none";
    elBtn.style.display = "none";
})

// MAIN FUNCTION 
function mainFunc(item) {
    elList.innerHTML = "";
    item.forEach(arrays => {
        let temClon = template.cloneNode(true);
        temClon.querySelector(".item").dataset.id = arrays.symbol_title;
        temClon.querySelector(".item").style.backgroundImage = `url(${arrays.symbol_img})`;
        temClon.querySelector(".item").style.backgroundRepeat = "no-repeat";
        temClon.querySelector(".item").style.backgroundPosition = "center";
        temClon.querySelector(".item").style.backgroundSize = "contain";
        fragmentItem.appendChild(temClon)
    });
    elList.appendChild(fragmentItem);
}

let randomChange = 5;
let randomPoints = 0;

// EL LIST 
elList.addEventListener("click", (evt) =>{
    if(evt.target.matches(".item")){
        let signsId = evt.target.dataset.id;
        let signFind = roadSymbol.find((itm) => itm.symbol_title == signsId);
        let signIndex = titleArray.indexOf(signFind.symbol_title);
        
        if(signFind.symbol_title == elTextTitle.textContent){
            evt.target.style.pointerEvents = "none";
            evt.target.style.backgroundColor = "#77B43F";
            let audio = new Audio("./audios/audios.mp3");
            audio.play()
            setTimeout(() => {
                audio.pause()
            }, 800);
            setTimeout(() => {
                evt.target.style.opacity = "0.1";
            }, 1500);
            randomPoints+=2
            elPoints.textContent = `Score : ${randomPoints}`
            titleArray.splice(signIndex, 1);
            randomFunc()
            evt.target.querySelector(".img-checked").style.display = "block";
            evt.target.querySelector(".img-error").style.display = "none";
            setTimeout(() => {
                evt.target.querySelector(".img-checked").style.display = "none";
            }, 1800);
        }else{
            randomChange--
            elChange.textContent = `Attempts :  ${randomChange}`;
            randomPoints--
            elPoints.textContent = `Score : ${randomPoints}`;
            let audio = new Audio("./audios/erors.mp3");
            audio.play()
            evt.target.style.backgroundColor = "red";
            evt.target.classList.add("item-show-anim");
            evt.target.querySelector(".img-checked").style.display = "none";
            evt.target.querySelector(".img-error").style.display = "block";
            setTimeout(() => {
                evt.target.style.backgroundColor = "";
                evt.target.classList.remove("item-show-anim");
                evt.target.querySelector(".img-error").style.display = "none";
            }, 1000);
        }
        if(titleArray.length == 0){
            setTimeout(() => {
                elModalGameOverText.src = `./images/you-win-gif.gif`;
                elTextOver.textContent = "You Win";
                let audio = new Audio("./audios/audio-win.mp3");
                audio.play()
                paramFunc()
            }, 1000);
        }
        if(randomChange == 0){
            setTimeout(() => {
                paramFunc()
            }, 1000);
        }
    }
})

elBtnReset.addEventListener("click" , ()=>{
    window.location.reload();
})