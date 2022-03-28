// class rendering settings

class RenderingSettings
{

}

function clickSelection(element, num) {

    document.getElementById("select1").children('p').style.color = 'black';
    document.getElementById("select2").children('p').style.color = 'black';
    document.getElementById("select3").children('p').style.color = 'black';
    document.getElementById("select4").children('p').style.color = 'black';
    this.children('p').style.color = "red";
    console.log("click : selection%s", num)
    SELECT = num;
}