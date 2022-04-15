// class rendering settings

class RenderingSettings
{

}

function clickSelection(element, num)
{
    const arr_p = ["#select1 > p", "#select2 > p", "#select3 > p", "#select4 > p"];
    const arr_div = ["#select1", "#select2", "#select3", "#select4"]
    for (var ref of arr_p)
    {
        $(ref).css("color", "white");
    }
    for (var id of arr_div)
    {
        $(id).css("background", "#50c1e9")
    }
    $(arr_p[num]).css("color", "dcf2fa");
    $(arr_div[num]).css("background", "#409aba")
    console.log("click : selection%s", num)
    SELECT = num;
}