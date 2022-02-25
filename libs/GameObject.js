//class game object
module.exports = class GameObject
{
    //constructor
    constructor(fWidth, fHeight, fX, fY, fAngle)
    {
        this.fWidth = fWidth;
        this.fHeight = fHeight;
        this.fX = fX;
        this.fY = fY;
        this.fAngle = fAngle;

        this.fX = fX;
        this.fY = fY;
    }

    toJSON()
    {
        return {
            fX: this.fX, 
            fY: this.fY, 
            fAngle: this.fAngle
        };
    }
};