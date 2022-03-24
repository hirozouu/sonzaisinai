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
        document.getElementById("text_question").innerText = question.text_question;
        document.getElementById("text1").innerText = question.selection1;
        document.getElementById("text2").innerText = question.selection2;
        document.getElementById("text3").innerText = question.selection3;
        document.getElementById("text4").innerText = question.selection4;
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