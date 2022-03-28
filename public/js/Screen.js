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

    renderProfile(playerName, score)
    {
        document.getElementById("player1name").innerText = playerName;
        document.getElementById("player1score").innerText = score;
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

    renderAnswer(answer)
    {
        document.getElementById("text_answer").innerText = answer.text_answer;
        if (answer.check == "right")
        {
            console.log("%s : right-answer", json.playerName);
            SCORE++;
            document.getElementById("player1score").innerText = SCORE;
        }
        else
        {
            console.log("%s : wrong-answer", json.playerName);
        }
    }
}