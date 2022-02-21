//class Game

module.exports = class World
{
    constructor(io)
    {
        this.io = io; //socketIO
    }

    //update
    update(fDeltaTime)
    {
        //update object coordinates
        this.updateObjects(fDeltaTime);

        //check collisions
        this.checkCollisions();

        //new actions
        this.doNewActions(fDeltaTime);
    }

    //update object coordinates
    updateObjects(fDeltaTime)
    {

    }

    //check collisions
    checkCollisions(fDeltaTime)
    {

    }

    //new actions
    doNewActions(fDeltaTime)
    {

    }
}