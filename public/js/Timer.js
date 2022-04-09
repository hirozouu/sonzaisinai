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
        document.getElementById("circle_timer").removeClass();
        window.requestAnimationFrame(function() 
        {
            window.requestAnimationFrame(function()
            {
                document.getElementById("circle_timer").addClass("circle");
                document.getElementById("circle_timer").addClass("pie");
                $(".circle").css({"animation": "pie "+ setTime*2 +"s linear"});
            });
        });
    }
}