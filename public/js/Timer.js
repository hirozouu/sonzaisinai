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

        circle.classList.remove("pie");
        requestAnimationFrame(() =>
        {
            setTimeout(() =>
            {
                // circle.classList.add("pie");
                circle.style.animation =  'pie '+ setTime*2 +'s linear';
            }, 0);
        });
        var timerId = setInterval(function() 
        {
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
        ;
    }
}