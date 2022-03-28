// class rendering settings

class RenderingSettings
{

}

function clickSelection(element, num) {
    arr = ["NO_NAME", "#select1 > p", "#select2 > p", "#select3 > p", "#select4 > p"];
    $("#select1 > p").css("color", "black");
    $("#select2 > p").css("color", "black");
    $("#select3 > p").css("color", "black");
    $("#select4 > p").css("color", "black");
    $(arr[num]).css("color", "red");
    console.log("click : selection%s", num)
    SELECT = num;
}