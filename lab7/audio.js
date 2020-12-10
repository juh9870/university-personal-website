window.addEventListener('load', function (event) {
    var cards = [...document.getElementsByClassName("card")];
    var cardActivators = [];
    var playing = document.getElementById("playing");
    var soundPlaying = false;
    for (let i=0;i<cards.length;i++) {
        let card =cards[i];
        let click = ()=>{
            if(soundPlaying)return;
            soundPlaying=true;
            playing.textContent=card.dataset.name;
            card.classList.add("fadeout");

            let audio = card.querySelector("audio");
            if(audio!=null) {
                audio.addEventListener('ended', () => {
                    playing.textContent="Nothing";
                    card.classList.remove("fadeout");
                    card.classList.add("fadein");
                    setTimeout(()=>{
                        soundPlaying = false;
                        card.classList.remove("fadein");
                    },500);
                });
                audio.play();
            } else {
                soundPlaying=false;
                playing.textContent="Nothing";
                card.classList.remove("fadeout");
            }
        }
        card.addEventListener("click",click);
        cardActivators[i]=click;
    }

    document.addEventListener('keypress',(e)=>{
        switch (e.code){
            case 'KeyB':
                cardActivators[0]();
                break;
            case 'KeyO':
                cardActivators[1]();
                break;
            case 'KeyU':
                cardActivators[2]();
                break;
            case 'KeyC':
                cardActivators[3]();
                break;
            case 'KeyA':
                cardActivators[4]();
                break;
            case 'KeyH':
                cardActivators[5]();
                break;
        }
    });

});