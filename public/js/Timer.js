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
        document.querySelector(".circle").className = "circle";
        window.requestAnimationFrame(function() 
        {
            window.requestAnimationFrame(function()
            {
                document.querySelector(".circle").className = "circle pie";
                $(".circle").css({"animation": "pie "+ setTime*2 +"s linear"});
            });
        });
    }
}