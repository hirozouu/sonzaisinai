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
        document.querySelector(".circle").class = "circle";
        window.requestAnimationFrame(function() 
        {
            window.requestAnimationFrame(function()
            {
                document.querySelector(".circle").class = "circle pie";
                $(".circle").css({"animation": "pie "+ setTime*2 +"s linear"});
            });
        });
    }
}