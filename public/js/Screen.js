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
        var div_element = document.createElement("div");
        div_element.id = "box_";
        div_element.class = "box_player";
        $("#box_").css({
            "padding": "0.5em 1em", 
            "margin": "2em 0", 
            "font-weight": "bold", 
            "border": "solid 3px #000000"
            }
        );

        var name_element = document.createElement("p");
        name_element.id = "name_" + playerName;
        name_element.innerText = playerName;
        div_element.appendChild(name_element);

        var score_element = document.createElement("p");
        score_element.id = "score_" + playerName;
        score_element.innerText = score;
        div_element.appendChild(score_element);


        document.getElementById("box_players").appendChild(div_element);
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
            console.log("%s : right-answer", answer.playerName);
            SCORE++;
            document.getElementById("player1score").innerText = SCORE;
        }
        else
        {
            console.log("%s : wrong-answer", answer.playerName);
        }
    }
}