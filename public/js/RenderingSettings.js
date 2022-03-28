// class rendering settings

let SELECT = 
class RenderingSettings
{

}

document

function clickSelection(element, num) {
    document.getElementById("select1").class = "selection";
    document.getElementById("select2").class = "selection";
    document.getElementById("select3").class = "selection";
    document.getElementById("select4").class = "selection";
    element.class = "selection_selected";
    SELECT = num;
}