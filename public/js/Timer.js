//class timer

class Timer
{
    constructor()
    {
        ;
    }

    setTimer()
    {
        var setTime = 10;   //60秒に設定
    var second = 0;
    const circle = document.querySelector(".circle");
    const seconds = document.querySelector(".second");

    circle.classList.add('pie');
    circle.style.animation =  'pie '+ setTime*2 +'s linear';
        var timerId = setInterval(function() {
            second += 1;
            if(second >= setTime){
                clearInterval(timerId);
            }
            countTime = setTime - second;
            seconds.textContent= (countTime % 60);
            if(countTime < 0){  //10秒切ったら文字が赤くなります
                document.querySelector(".seconds").style.color = 'red';
            };
        }, 1000);
    }
}