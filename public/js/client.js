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
        quizname = $("#textarea_quizname").val();
        writername = $("textarea_writername").val();
        text_question = $("textarea_text_question").val();
        selection0 = $("textarea_selection0").val();
        selection1 = $("textarea_selection1").val();
        selection2 = $("textarea_selection2").val();
        selection3 = $("textarea_selection3").val();
        text_answer = $("textarea_text_answer").val();
        answer = $("select_answer").val();
        text_explanation = $("textarea_text_explanation").val();
        console.log(quizname)

        if (!quizname)
        {
            $("#error_post_quizname").style.display = "block";
        }
        if (!writername)
        {
            $("#error_post_writername").style.display = "block";
        }
        if (!text_question)
        {
            $("#box_post_question .error_post").style.display = "block";
        }
        if (!selection0 || !selection1 || !selection2 || !selection3)
        {
            $("#box_post_selection .error_post").style.display = "block";
        }
        if (!text_answer)
        {
            $("#error_post_answer").style.display = "block";
        }
        if (!text_explanation)
        {
            $("#error_post_explanation").style.display = "block";
        }
        else
        {
            ;
        }
    }
)