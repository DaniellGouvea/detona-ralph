const state = {
    view:{
        squares: document.querySelectorAll(".square"),
        enemy: document.querySelector(".enemy"),
        timeLeft: document.querySelector("#time-left"),
        score: document.querySelector("#score"),
        lives: document.querySelector("#lives")
    },
    values:{
        gameVelocity: 1000,
        hitPosition: 0,
        result: 0,
        currentTime:60,
        playerLives:3
    },
    actions:{
        timerId: setInterval(randomSquare, 1000), 
        countDownTimerId: setInterval(countDown, 1000)
    }
}

function countDown(){
    state.values.currentTime--
    state.view.timeLeft.textContent = state.values.currentTime

    if(state.values.currentTime <= 0){
        clearInterval(state.actions.countDownTimerId)
        clearInterval(state.actions.TimerId)
        alert("Game Over! O seu resultado foi: " + state.values.result)
        location.reload()
    }
}

function playSound(audioName){
    let audio = new Audio(`src/audios/${audioName}.m4a`)
    audio.volume = 0.05
    audio.play()
}

function randomSquare(){
    state.view.squares.forEach((square)=>{
        square.classList.remove("enemy")
    })

    let randomNumber = Math.floor(Math.random()*9)
    let randomSquare = state.view.squares[randomNumber]
    randomSquare.classList.add("enemy")
    state.values.hitPosition = randomSquare.id

}

function moveEnemy(){
    state.values.timerId= setInterval(randomSquare, state.values.gameVelocity)
}

function addListenerHitBox(){
    state.view.squares.forEach((square) => {
        square.addEventListener("mousedown", ()=>{
          if(square.id === state.values.hitPosition){
                state.values.result++
                state.view.score.textContent = state.values.result
                state.values.hitPosition = null
                playSound("hit")
          }else{
            state.values.playerLives--
            state.view.lives.textContent = state.values.playerLives +"x"
            playSound("fail")
            if(state.values.playerLives===0 && state.values.result != 1){
                alert(`Suas Vidas acabaram!! Sua pontuação foi de ${state.values.result} pontos`)
                location.reload()
            }else if(state.values.playerLives ===0){
                alert(`Suas Vidas acabaram!! Sua pontuação foi de ${state.values.result} ponto`)
                location.reload()
            }
          }
        
        })
    })
}


function init() {
    addListenerHitBox()
}

init()