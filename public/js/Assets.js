// class Assets
class Assets
{
    // constructor
    constructor()
    {
        // background image
        this.imageField = new Image()
        this.imageField.src = '../images/grass.png'

        this.rectFieldInFieldImage = {sx: 0, sy: 0, sw: 512, sh: 512};

        // item image
        this.imageItems = new Image()
        this.imageItems.src = '../images/items.png'
        
        this.arectTankInItemsImage = [
            {sx: 2, sy: 2, sw: 16, sh: 16}, 
            {sx: 20, sy: 2, sw: 16, sh: 16}, 
        ];
    }
}