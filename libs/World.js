//module
const Tank = require('./Tank.js');

//class Game

module.exports = class World
{
    constructor(io)
    {
        this.io = io; //socketIO
        this.setTank = new Set();
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
        this.setTank.forEach(
            (tank) =>
            {
                tank.update(fDeltaTime);
            }
        );
    }

    //check collisions
    checkCollisions(fDeltaTime)
    {

    }

    //new actions
    doNewActions(fDeltaTime)
    {

    }

    //create tank
    createTank()
    {
        //create tank
        const tank = new Tank();

        //add tank
        this.setTank.add(tank);

        return tank;
    }

    //destroy tank
    destroyTank(tank)
    {
        //delete tank
        this.setTank.delete(tank);
    }
}