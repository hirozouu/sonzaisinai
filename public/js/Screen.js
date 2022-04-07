//class Screen
class Screen
{
    //constructor
    constructor(socket)
    {
        this.socket = socket;

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
                console.log('connect : socket.id = %s', socket.id);
                //send to server
                this.socket.emit('enter-the-game');
            }
        )
    }

    renderProfile(playerName, score)
    {
        var div_element = document.createElement("div");
        div_element.id = "box_" + playerName;
        div_element.class = "box_player";

        var name_element = document.createElement("p");
        name_element.id = "name_" + playerName;
        name_element.innerText = playerName;
        div_element.appendChild(name_element);

        var score_element = document.createElement("p");
        score_element.id = "score_" + playerName;
        score_element.innerText = score;
        div_element.appendChild(score_element);

        document.getElementById("box_players").appendChild(div_element);

        $("#box_"+playerName).css(
        {
            "padding": "0.5em 1em", 
            "margin": "2em 0", 
            "font-weight": "bold", 
            "border": "solid 3px white", 
        });
        $("#name_"+playerName).css(
            {
                "color": "white", 
                "font-size": "x-large"
            }
        );
        $("#score_"+playerName).css(
            {
                "color": "white", 
                "font-size": "xx-large"
            }
        );
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
        document.getElementById("text_answer").innerText = "A. " + answer.text_answer;
        document.getElementById("text_explanation").innerText = answer.text_explanation;
        if (answer.check)
        {
            console.log("%s : right-answer", PLAYERNAME);
        }
        else
        {
            console.log("%s : wrong-answer", PLAYERNAME);
        }
    }

    renderScore(data)
    {
        for (var key of Object.keys(data)){
            document.getElementById("score_"+data[key].playerName).innerText 
            = data[key].score;
        }
        console.log("update-score");
    }
}