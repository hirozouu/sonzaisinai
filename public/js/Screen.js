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
        document.getElementById("question").innerText = question.question;
        document.getElementById("statement_ans1").innerText = question.statement_ans1;
        document.getElementById("statement_ans2").innerText = question.statement_ans2;
        document.getElementById("statement_ans3").innerText = question.statement_ans3;
        document.getElementById("statement_ans4").innerText = question.statement_ans4;
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