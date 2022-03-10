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

    renderQuestion(question)
    {
        document.getElementById("question").innerText = question[0];
        document.getElementById("statement_ans1").innerText = question[1]
        document.getElementById("statement_ans2").innerText = question[2]
        document.getElementById("statement_ans3").innerText = question[3]
        document.getElementById("statement_ans4").innerText = question[4]
        console.log("render : question");
    }

    renderExample()
    {
        document.getElementById("example").innerText = "正解 : "
        console.log("render : example")
    }

    renderExplanation()
    {
        document.getElementById("explanation").innerText = "ぐぐれ";
        console.log("render : explanation");
    }
}