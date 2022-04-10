let timerId = null;

//class timer
class Timer
{

    constructor()
    {

    }

    setTimer()
    {
        var setTime = 10;
        var countTime = setTime;
        var second = 0;
        const circle = document.querySelector(".circle");
        const seconds = document.querySelector(".second");

        timerId = setInterval(function() 
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
        clearInterval(timerId)
    }
}