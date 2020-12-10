async function wait(time){
    return new Promise(((resolve) => {
        setTimeout(resolve,time)
    }));
}


$(document).ready(()=>{
    var boxes = $(".playbox");
    var beeps = [];
    var error = $(new Audio("./assets/error.mp3"));
    var order = [];
    var colors =["red","blue","yellow","green"];
    var playerTurn=0;
    var locked = true;
    var gameOver=true;
    var text = $("#top");

    for (let i = 0; i < boxes.length; i++) {
        beeps[i]=$(new Audio(`./assets/beep${i}.mp3`));
        $(boxes[i]).on("click",()=>click(i));
    }

    $(document).on('keypress',restart);

    function playsound(audio){
        return new Promise(((resolve, reject) => {
            // debugger;
            audio.one('ended',resolve);
            audio[0].play();
        }))
    }

    async function clickEffect(id,sound,duration){
        sound=sound||beeps[id];
        duration=duration||500;
        locked=true;
        var box = $(boxes[id]);
        box.css("background-color",colors[id]);
        var promise = playsound(sound);
        if(duration<0) {
            await promise;
        } else {
            await wait(duration);
        }
        box.css("background-color","");
        locked=false;
    }

    async function click(id){
        if(locked)return;
        if(gameOver){
            restart();
            return;
        }
        if(id===order[playerTurn]){
            await clickEffect(id,null,150);
            playerTurn++;
            if(playerTurn>=order.length){
                text.text("Good job! Prepare for more!");
                await wait(2000);
                await nextLevel();
            }
        } else {
            await clickEffect(order[playerTurn],error,2000);
            gameOver=true;
            text.text("Game Over. Press any key to restart");
        }
    }

    async function playOrder(){
        for (let id of order) {
            await clickEffect(id);
            await wait(150);
        }
    }

    async function nextLevel(){
        order.push(Math.floor(Math.random()*boxes.length));
        text.text(`Level ${order.length}`);
        playerTurn=0;
        await playOrder();
        text.text(`Level ${order.length}. Your turn.`);
    }

    function restart(){
        if(!gameOver)return;
        gameOver=false;
        locked=true;
        order=[];
        nextLevel();
        locked=false;
    }

});