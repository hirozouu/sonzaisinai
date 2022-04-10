//class timer

class Timer
{
    constructor()
    {
        ;
    }

    setTimer()
    {
    var setTime = 10;
    var countTime = setTime;
    var second = 0;
    const circle = document.querySelector(".circle");
    const seconds = document.querySelector(".second");

    circle.style.animation =  'pie '+ setTime*2 +'s linear';
        var timerId = setInterval(function() {
            second += 1;
            if(second >= setTime){
                clearInterval(timerId);
            }
            countTime = setTime - second;
            seconds.textContent= (countTime % 60);
            if(countTime < 0){
                document.querySelector(".seconds").style.color = 'red';
            };
        }, 1000);
    }

    resetTimer()
    {
        var elem = document.querySelector(".progressCircle");
        var p = elem.parentElement;
        p.removeChild(elem);
        p.appendChild(elem);
    }
}