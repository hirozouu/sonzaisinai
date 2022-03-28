// class rendering settings

class RenderingSettings
{

}

function clickSelection(element, num) {
    $("#select1 > p").css("color", "black")
    $("#select2 > p").css("color", "black")
    $("#select3 > p").css("color", "black")
    $("#select4 > p").css("color", "black")
    $("#select${num} > p").css('color', "red")
    console.log("click : selection%s", num)
    SELECT = num;
}