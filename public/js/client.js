'use strict'

//object
const socket = io.connect();
const screen = new Screen(socket);
const timer = new Timer();

let PLAYERNAME = null;
let ROOMNAME = null;
let SELECT = 0;

let timecount = null;

//when unload page
$(window).on(
    'beforeunload', 
    (event) =>
    {
        var json = {
            "key": socket.id
        }
        socket.broadcast(ROOMNAME).emit("leave-the-room", json)
        socket.disconnect();
    }
);

// click room join button
$("#button_enter").on(
    "click", 
    () =>
    {
        PLAYERNAME = $("#input_playername").val();
        ROOMNAME = $("#input_roomname").val();
        if (PLAYERNAME == false && ROOMNAME == false)
        {
            alert("Your NameとRoom Nameを入力してください. ");
        }
        else if (!PLAYERNAME)
        {
            alert("Your Nameを入力してください. ");
        }
        else if (!ROOMNAME)
        {
            alert("Room Nameを入力してください. ")
        }
        else
        {
            document.getElementById("button_enter").style.display = "none";
            document.getElementById("loader_button_enter").style.display = "block";
            var json = {
                "playerName": PLAYERNAME, 
                "roomName": ROOMNAME, 
            };
            socket.emit("get-permission", json);
        }
    }
);

// enter the room
socket.on("give-permission", 
() =>
    {
        document.getElementById("start_scene").style.display = "none";
        document.getElementById("game_scene").style.display = "flex";
        document.getElementById("roomname").innerText = ROOMNAME;
        var json = {
            "playerName": PLAYERNAME, 
            "roomName": ROOMNAME, 
        };
        socket.emit("enter-the-room", json);
    }
);

// when players enter the room
socket.on("enter-the-room", 
(json) =>
    {
        screen.renderProfile(json.playerName, 0);
        console.log("enter-the-room : %s", json.playerName);
    }
);

// when server set other player information
socket.on("set-player-information", 
(json) =>
    {
        for (var key of Object.keys(json)){
            screen.renderProfile(json[key].playerName, json[key].score);
            console.log("get-player-information : %s", json[key].playerName)
        }
    }
);

// other player leave the room
socket.on("leave-the-room", 
(json) =>
    {
        console.log("%s : leave-the-room", json.playerName);
    }
);

// click ready button
$("#button_ready").on(
    "click", 
    () =>
    {
        document.getElementById("button_ready").style.display = "none";
        document.getElementById("loader_button_ready").style.display = "block";
        socket.emit("get-ready");
        console.log("get-ready");
    }
);

// other player get ready
socket.on("everyone-get-ready", 
    () =>
    {
        socket.emit("get-question");
    }
);

// render question and selection
socket.on("set-question", 
    (json) =>
    {
        document.getElementById("button_ready").style.display = "block";
        document.getElementById("loader_button_ready").style.display = "none"
        document.getElementById("box_ready").style.display = "none";
        document.getElementById("question1").style.display = "flex";
        document.getElementById("question2").style.display = "flex";
        document.getElementById("button_next").style.display = "block";
        document.getElementById("loader_button_next").style.display = "none"
        document.getElementById("answer").style.display = "none";
        screen.renderQuestion(json);
        timer.setTimer();
        timecount = setTimeout(function()
        {
            timer.resetTimer();
            document.getElementById("button_answer").style.display = "none";
            document.getElementById("loader_button_answer").style.display = "block";
            socket.emit("finish-answer");
            console.log("finish-answer");
        }, 10000)
    }
);

// click answer button
$("#button_answer").on(
    "click", 
    () =>
    {
        timer.resetTimer();
        clearTimeout(timecount)
        document.getElementById("button_answer").style.display = "none";
        document.getElementById("loader_button_answer").style.display = "block";
        socket.emit("finish-answer");
        console.log("finish-answer");
    }
);

// other player finish answer
socket.on("everyone-finish-answer", 
    () =>
    {
        socket.emit("get-answer", SELECT);
    }
);

// render answer
socket.on("set-answer", 
(json) =>
    {
        screen.renderAnswer(json);
        document.getElementById("button_answer").style.display = "block";
        document.getElementById("loader_button_answer").style.display = "none"
        document.getElementById("question2").style.display = "none";
        document.getElementById("answer").style.display = "flex";
    }
);

// render score
socket.on("update-score", 
(json) =>
    {
        screen.renderScore(json);
    }
);

// click next button
$("#button_next").on(
    "click", 
    () =>
    {
        document.getElementById("button_next").style.display = "none";
        document.getElementById("loader_button_next").style.display = "block";
        socket.emit("get-ready");
    }
)

$("#button_move").on(
    "click", 
    () =>
    {
        document.getElementById("start_scene").style.display = "none";
        document.getElementById("post_scene").style.display = "flex";
    }
)

$("#button_post").on(
    "click", 
    () =>
    {
        resetErrorText();

        const quizname = $("#textarea_quizname").val();
        const writername = $("#textarea_writername").val();
        const text_question = $("#textarea_text_question").val();
        const selection0 = $("#textarea_selection0").val();
        const selection1 = $("#textarea_selection1").val();
        const selection2 = $("#textarea_selection2").val();
        const selection3 = $("#textarea_selection3").val();
        const text_answer = $("#textarea_text_answer").val();
        const answer = $("#select_answer").val();
        const text_explanation = $("#textarea_text_explanation").val();

        if (text_question.indexOf("存在しない")==-1)
        {
            document.getElementById("error_required_keyword").style.display = "block";
        }
        if (!quizname)
        {
            document.getElementById("error_post_quizname").style.display = "block";
        }
        if (!writername)
        {
            document.getElementById("error_post_writername").style.display = "block";
        }
        if (!text_question)
        {
            document.getElementById("error_post_question").style.display = "block";
        }
        if (!selection0 || !selection1 || !selection2 || !selection3)
        {
            document.getElementById("error_post_selection").style.display = "block";
        }
        if (!text_answer)
        {
            document.getElementById("error_post_answer").style.display = "block";
        }
        if (!text_explanation)
        {
            document.getElementById("error_post_explanation").style.display = "block";
        }
        else
        {
            document.getElementById("textarea_quizname").value = "";
            document.getElementById("textarea_text_question").value = "";
            document.getElementById("textarea_selection0").value = "";
            document.getElementById("textarea_selection1").value = "";
            document.getElementById("textarea_selection2").value = "";
            document.getElementById("textarea_selection3").value = "";
            document.getElementById("textarea_text_answer").value = "";
            document.getElementById("textarea_text_explanation").value = "";
            document.getElementById("post_scene").style.display = "none";
            document.getElementById("check_scene").style.display = "flex";
            document.getElementById("quizname_check").innerText = "クイズの名前 : " + quizname;
            document.getElementById("writername_check").innerText = "作成者 : " + writername;
            document.getElementById("text_question_check").innerText = "問題 : " + text_question;
            document.getElementById("selection0_check").innerText = "選択肢1 : " + selection0;
            document.getElementById("selection1_check").innerText = "選択肢2 : " + selection1;
            document.getElementById("selection2_check").innerText = "選択肢3 : " + selection2;
            document.getElementById("selection3_check").innerText = "選択肢4 : " + selection3;
            document.getElementById("text_answer_check").innerText = "答え : " + text_answer;
            document.getElementById("answer_check").innerText = "正解の番号 : " + String(Number(answer)+1);
            document.getElementById("text_explanation_check").innerText = "解説 : " + text_explanation;
            
            var json = {
                "name": quizname, 
                "writer": writername, 
                "text_question": text_question, 
                "selection0": selection0, 
                "selection1": selection1, 
                "selection2": selection2, 
                "selection3": selection3, 
                "text_answer": text_answer, 
                "answer": answer, 
                "text_explanation": text_explanation
            }
            socket.emit("post-quiz", json);
        }
    }
)

$("#button_repeat").on(
    "click", 
    () =>
    {
        document.getElementById("check_scene").style.display = "none";
        document.getElementById("post_scene").style.display = "flex";
    }
)

$(".button_back").on(
    "click", 
    () =>
    {
        document.getElementById("post_scene").style.display = "none";
        document.getElementById("check_scene").style.display = "none";
        document.getElementById("start_scene").style.display = "flex";
    }
)

function resetErrorText()
{
    var text_error = document.getElementsByClassName("error_post");
    for (var i = 0; i < text_error.length; i++)
    {
        text_error[i].style.display = "none";
    }
}