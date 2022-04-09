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
        $(".circle").removeClass("pie");
        $(".circle").css(
            {
                "stroke-dasharray": "0, 157"
            }
        )
        window.requestAnimationFrame(function() 
        {
            window.requestAnimationFrame(function()
            {
                $(".circle").addClass("pie");
                $(".circle").css({"animation": "pie "+ setTime*2 +"s linear"});
            });
        });
    }
}