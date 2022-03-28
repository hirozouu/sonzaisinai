// class rendering settings

class RenderingSettings
{

}

function clickSelection(element, num) {

    $('#select1 > p').style.color = 'black';
    $('#select2 > p').tyle.color = 'black';
    $('#select3 > p').style.color = 'black';
    $('#select4 > p').style.color = 'black';
    this.children('p').style.color = "red";
    console.log("click : selection%s", num)
    SELECT = num;
}