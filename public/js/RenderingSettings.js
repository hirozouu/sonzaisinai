// class rendering settings

class RenderingSettings
{

}

function clickSelection(element, num) {
    const arr_p = ["#select1 > p", "#select2 > p", "#select3 > p", "#select4 > p"];
    const arr_div = ["#select1", "select2", "select3", "select4"]
    for (var ref of arr_p)
    {
        $(ref).css("color", "white");
    }
    for (var id of arr_div)
    {
        $(id).css("color", "#5342eb")
    }
    $(arr_p[num]).css("color", "#5342eb");
    $(arr_div[num]).css("background", "white")
    console.log("click : selection%s", num)
    SELECT = num;
}