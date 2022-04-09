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
                "stroke-dasharray": "0,157"
            }
        );
        $(".circle")[0].offsetWidth = $(".circle")[0].offsetWidth;
        $(".circle").addClass("pie");
        $(".circle").css(
            {
                "animation": "pie "+ setTime*2 +"s linear"
            }
        );
    }
}