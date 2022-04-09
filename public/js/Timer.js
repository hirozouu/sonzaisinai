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
                $(".circle").addClass("pie")
                $(".circle").css({"animation": "pie "+ setTime*2 +"s linear"});
            });
        });
    }
}