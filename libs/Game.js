//module
const World = require('./World.js');

//constant
const GameSetting = require('./GameSetting.js');

//class Game
module.exports = class Game;
{
    //start
    start(io)
    {
        //variable
        const world = new World(io);
        let iTimeLast = Dte.now();

        //when connect
        io.on(
            'connection', 
            (socket) => 
            {
                console.log('connection : socket.id = %s', socket.id);
                //when disconnect
                socket.on('disconnect', 
                () => 
                {
                    console.log('disconnect : socket.id = %s', socket.id)
                });
            });
        
        setInterval(
            () => 
            {
                const iTimeCurrent = Date.now(); //m sec
                const fDeltaTime = (iTimeCurrent - iTimeLast) * 0.001; // to sec
                iTimeLast = iTimeCurrent;

                const hrtime = process.hrtime(); //n sec

                //update world
                world.update(fDeltaTime);

                const hrtimeDiff = process.hrtime(hrtime);
                const iNanosecDiff = hrtimeDiff[0] * le9 + hrtimeDiff[1]

                //to client
                io.emit('update', iNanosecDiff);
            }, 
            1000 / GameSettings.FRAMERATE);
    }
}