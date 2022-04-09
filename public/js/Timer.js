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
        $(".circle").addClass("pie");
        $(".circle").css({"animation": "pie "+ setTime*2 +"s linear"});
    }
}