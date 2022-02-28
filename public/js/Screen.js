//class Screen
class Screen
{
    //constructor
    constructor(socket, canvas)
    {
        this.socket = socket;

        this.assets = new Assets()
        this.iProcessingTimeNanoSec = 0;

        //init socket
        this.initSocket();
    }

    //init socket
    initSocket()
    {
        //when connect
        this.socket.on(
            'connect', 
            () =>
            {
                console.log('connect : socket.id = %s', socket.id)
                //send to server
                this.socket.emit('enter-the-game');
            }
        )

        //when get from server
        this.socket.on(
            'update', 
            (iProcessingTimeNanoSec) =>
            {
                this.iProcessingTimeNanoSec = iProcessingTimeNanoSec;
            }
        )
    }

    renderQuestion()
    {
        document.getElementById("question").textContent = "存在しないカードは？"
        document.getElementById("answer1").textContent = "ワンショット・フレーム"
        document.getElementById("answer2").textContent = "ダブル・ディフェンス"
        document.getElementById("answer3").textContent = "トリプル・サイン"
        document.getElementById("answer4").textContent = "クアトロ・ブレイン"
        console.log("render question")
    }
}