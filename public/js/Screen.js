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
        document.getElementById("question").innerText = "存在しないカードは？";
        document.getElementById("statement_ans1").innerText = "ワンショット・フレーム";
        document.getElementById("statement_ans2").innerText = "ダブル・ディフェンス";
        document.getElementById("statement_ans3").innerText = "トリプル・サイン";
        document.getElementById("statement_ans4").innerText = "クアトロ・ブレイン";
        console.log("render question");
        console.log("answer1 : %s", document.getElementById("statement_ans1").innerText);
    }
}