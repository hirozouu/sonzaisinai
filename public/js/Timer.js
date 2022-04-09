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
        var second = 0;
        $('.circle').addClass('pie');
        $('.circle').css({'animation': 'pie '+ setTime*2 +'s linear'})
        var timerId = setInterval(function() 
        {
            second += 1;
            if(second >= setTime)
            {
                clearInterval(timerId);
            }
        }, 1000);
    }

    resetTimer()
    {
        document.getElementById("timer").style.display="none";
        document.getElementById("timer").style.display="block";
    }
}