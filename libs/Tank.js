//module
const GameObject = require('./GameObject.js');

//settings
const SharedSettings = require('../public/js/SharedSettings.js');
const GameSettings = require('./GameSettings.js');

//class tank
module.exports = class Tank extends GameObject
{
    //constructor
    constructor()
    {
        super(SharedSettings.TANK_WIDTH, SharedSettings.TANK_HEIGHT, 0.0, 0.0, Math.random()*2*Math.PI);

        this.objMovement = {};
        this.fSpeed = GameSettings.TANK_SPEED;
        this.fRotationSpeed = GameSettings.TANK_ROTATION_SPEED;

        //initial position
        this.fX = Math.random() * (SharedSettings.FIELD_WIDTH - SharedSettings.TANK_WIDTH);
        this.fY = Math.random() * (SharedSettings.FIELD_HEIGHT - SharedSettings.TANK_HEIGHT);
    }

    //update
    update(fDeltaTime)
    {
        //update state
        if (this.objMovement['forward'])
        {
            //forward
            const fDistance = this.fSpeed * fDeltaTime;
            console.log('forward');
            this.fX += fDistance * Math.cos(this.fAngle);
            this.fY += fDistance * Math.sin(this.fAngle);
        }
        if (this.objMovement['back'])
        {
            //back
            const fDistance = this.fSpeed * fDeltaTime;
            console.log('back');
            this.fX -= fDistance * Math.cos(this.fAngle);
            this.fY -= fDistance * Math.sin(this.fAngle);
        }
        if (this.objMovement['left'])
        {
            //left
            console.log('left');
            this.fAngle -= this.fRotationSpeed * fDeltaTime;
        }
        if (this.objMovement['right'])
        {
            //right
            console.log('right');
            this.fAngle += this.fRotationSpeed * fDeltaTime;
        }
    }
}